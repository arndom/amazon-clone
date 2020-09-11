import React from 'react';
import './Order.css';
import moment from 'moment';// lib for passing date stamps
import CheckoutProduct from './CheckoutProduct';
import './Order.css';
import CurrencyFormat from 'react-currency-format';
import { getBasketTotal } from './reducer';
import { useStateValue } from './StateProvider';


function Order({order}) {

    const [{basket, user}, dispatch] = useStateValue();

    return (
        <div className ='order'>
            <h2>Order</h2>
            <p>{moment.unix(order.data.created).format("MMMM Do YYYY, h:mma")}
            </p>
            <p className ='order__id'>
            <small>{order.id}</small>
            </p>
            {order.data.basket?.map(item => (
                <CheckoutProduct
                id = {item.id}
                title = {item.title}
                image = {item.image}
                rating = {item.rating}
                price = {item.price}
                hideButton
                /> 
            ))}
            <CurrencyFormat
                    renderText  = {(value) =>(
                    <>
                        <h3 className='order__total'>Order Total: {value}</h3>
                    </>
                )}
                decimalScale = {2}
                value = {order.data.amount/100}
                displayType = {'text'}
                thousandSeperator = {true}
                prefix = {'$'}
            />
        </div>
    )
}

export default Order

