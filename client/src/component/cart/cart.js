

import axios from 'axios';
import { useState } from 'react';
import { useDispatch } from 'react-redux';

import { showMessageInfo } from '../../reducer/message';

import './cart.css';

function Cart({ idDoc, count }) {
    const [show, setShow] = useState(false)
    const [countToCart, setCount] = useState(1);
    const dispatch = useDispatch();

    const handleShow = () => {
        setShow(!show)
    }
    const incNum = () => {
        setCount(countToCart >= count ? count : countToCart + 1);
    }
    const decNum = () => {
        setCount(countToCart <= 1 ? 1 : countToCart - 1);
    }

    const handleSave = () => {
        const take = async () => {
            const result = await axios.post('/take', idDoc);
            if (result.status === 200) {
                dispatch(showMessageInfo('Взяли компонент'));
                handleShow();
            }
        };
        take();
    }
    
    return (
        <div className='cart-container '>
            <button className='cart' onClick={handleShow} >В корзину</button>
            {show &&
                <div className='cart-form'>
                    <span>Укажите кол-во</span>
                    <div className='action-cart-count'>
                        <button className='cart' onClick={decNum} >минус</button>
                        <input className='count-input' type='number' value={countToCart} onChange={(e) => setCount(e.target.value)}  />
                        <button className='cart' onClick={incNum} >плюс</button>
                        <button className='cart' onClick={handleSave} >Ок</button>
                    </div>
                </div>
            }

        </div>
    )
}

export default Cart;
