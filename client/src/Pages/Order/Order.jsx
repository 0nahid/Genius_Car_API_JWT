import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from 'react-router-dom';
import axiosPrivate from "../../api/axiosPrivate";
import auth from "../../firebase.init";
export default function Order() {
    const [orders, setOrders] = useState([])
    const [user] = useAuthState(auth)
    const navigate = useNavigate()
    useEffect(() => {
        const getOrders = async () => {
            const email = user.email;
            const url = `http://localhost:5000/order?email=${email}`
            try {
                const { data } = await axiosPrivate.get(url)
                setOrders(data);
            } catch (error) {
                console.log(error?.message);
                if (error?.response?.status === 401 || error?.response?.status === 403) {
                    localStorage.removeItem('accessToken');
                    navigate('/login');
                }
            }
        }
        getOrders();
    }, [user, navigate])
    return (
        <>
            <h2>Your Order:</h2>
            <ul>
                {orders.map(order => (
                    <li key={order._id}>
                        {order.service} - {order.amount}$
                    </li>
                ))}
            </ul>
        </>
    );
}
