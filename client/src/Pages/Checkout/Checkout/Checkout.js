import axios from 'axios';
import { useAuthState } from 'react-firebase-hooks/auth';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useParams } from 'react-router-dom';
import auth from '../../../firebase.init';
import useServiceDetail from '../../../hooks/useServiceDetails';
const Checkout = () => {
    const { id } = useParams();
    const [service] = useServiceDetail(id);
    const [user] = useAuthState(auth)
    const { register, handleSubmit, reset } = useForm({
        mode: 'onChange',
        registerOnChange: false,
        defaultValues: {
            name: user?.name,
            email: user?.email,
            service: service.name,
            amount: service.price,
        }
    });
    const onSubmit = data => {
        axios.post(`http://localhost:5000/order`, data)
            .then(res => {
                (res.status === 200) ? toast.success('Order placed successfully') : toast.error('Order failed');
                reset();
            })

    }

    return (
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
    );
};

export default Checkout;