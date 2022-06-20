
import axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetails';
const Checkout = () => {
    const { id } = useParams();
    // const [service] = useServiceDetail(id);
    const [service, setService] = useState({})
    useEffect(()=>{
        const url = `http://localhost:5000/service/${id}`;
        // console.log(url);
        fetch(url)
            .then(res => res.json())
            .then(data => setService(data));
    },[id])
    console.log(service.name + ' ' + service.price);
    const [user] = useAuthState(auth)
    const { register, handleSubmit, reset } = useForm();
    const onSubmit = data => {
        // axios.post('http://localhost:5000/order', data)
        //     .then(res => {
        //         (res.status === 200) ? toast.success('Order placed successfully') : toast.error('Order failed');
        //         reset();
        //     })
        console.log(data);
    }

    return (
        <div>
            <h2>Please Checkout your booking</h2>
            <div className="container mx-auto">
                <h2>Place Order : {service?.name} </h2>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input className='input-group mb-2 p-2 rounded-sm ' value={user?.displayName} type="text" placeholder="Name" {...register("name", {})} />
                    <input className='input-group mb-2 p-2 rounded-sm ' value={user?.email} type="email" placeholder="Email" {...register("email", {})} />
                    <input required className='input-group mb-2 p-2 rounded-sm ' type="text" placeholder="Address" {...register("address", {})} />
                    <input className='input-group mb-2 p-2 rounded-sm ' type="text" value={service?.name} readOnly placeholder="Service" {...register("service", {})} />
                    <input required className='input-group mb-2 p-2 rounded-sm ' type="text" placeholder="Card Number" {...register("cardNo", {})} />
                    <input required className='input-group mb-2 p-2 rounded-sm ' type="text" placeholder="Expiry Date" {...register("expiryDate", {})} />
                    <input required className='input-group mb-2 p-2 rounded-sm ' type="text" placeholder="CVV" {...register("cvv", {})} />
                    <input className='input-group mb-2 p-2 rounded-sm ' value={service.price} type="text" placeholder="Amount" {...register("amount", {})} />
                    <input className='mb-2 p-2 rounded-sm ' type="submit" value="Submit" />
                </form>
            </div>
        </div>
    );
};
export default Checkout;