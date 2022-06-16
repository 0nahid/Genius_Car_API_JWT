import axios from "axios";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../../firebase.init";

export default function Order() {
    const [orders, setOrders] = useState([])
    const [user] = useAuthState(auth)
    useEffect(() => {
        axios(`http://localhost:5000/order?email=${user.email}`,{
            headers: {
                authorization : `Bearer ${localStorage.getItem('accessToken')}`
            }
        })
            .then(res => setOrders(res.data));
    }, [user.email])
    return (
        <>
            <h2>Your Order:</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.id}>
                        {order.service} - {order.amount}$
                    </li>
                ))}
            </ul>
        </>
    );
}
