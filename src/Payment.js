import React, { useState, useEffect } from 'react'
import './Payment.css'
import { useStateValue } from './StateProvider';
import CheckoutProduct from './CheckoutProduct';
import { Link, useHistory } from 'react-router-dom';
import { useStripe, useElements, CardElement} from '@stripe/react-stripe-js';
import { getBasketTotal } from './reducer';
import CurrencyFormat from 'react-currency-format';
import axios from './axios'
import { db } from './firebase';


function Payment() {
    const [{basket, user}, dispatch] = useStateValue();

    const history =useHistory();


    const stripe = useStripe();
    const elements = useElements()

    const [succeded, setSucceded] = useState(false);
    const [processing, setProcessing] = useState("");

    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);

    const [clientSecret, setClientSecret] = useState(true);


    useEffect(() =>{
        // generate special stripe secret that enables charge
        const getClientSecret = async () =>{
            const response = await axios({
                method: 'post',
                //stripes expects the total in currency subunits
                url: `/payments/create?total=${Math.round(getBasketTotal(basket) * 100)}`
            });
            setClientSecret(response.data.clientSecret)
        };

        getClientSecret();
    }, [basket]);

    console.log("secret iss >>>>>", clientSecret)

    const handleSubmit = async(event) =>{
            //stripe stuff
            event.preventDefault();//prevent refresh
            setProcessing(true); //prevent multiple click of buy button

            const payload = await stripe.confirmCardPayment(clientSecret,{
                payment_method: {
                    card: elements.getElement(CardElement)
                }
            }).then(({paymentIntent}) =>{
                // response destructured = paymentIntent = paymentConfirmation

                db
                    .collection('users')
                    .doc(user?.uid)
                    .collection('orders')
                    .doc(paymentIntent.id)
                    .set({
                        basket: basket,
                        amount: paymentIntent.amount,
                        created: paymentIntent.created
                    })

                setSucceded(true);
                setError(null);
                setProcessing(false);

                dispatch({
                    type: 'EMPTY_BASKET'
                });
                history.replace('/orders');

            })

    }

    const handleChange =event => {

        // listen for for changes  in cardelement and dispaly any error as the customer types their card details
        setDisabled(event.disabled);
        // setError(event.error ? event.error.message : "");
    }

    return (
        <div className="payment">
            <div className ='payment__container'>


                <h1>
                    Checkout (<Link to='/checkout' >{basket?.length} items</Link>)
                </h1>

                <div className ="payment__section">
                    <div className ='payment__title'>
                        <h3>Delivery Address </h3>         
                    </div>    

                    <div className = "payment__address">
                        <p>{user?.email}</p>
                        <p>133 facke lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>    

                <div className ="payment__section">
                    <div className ='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className = 'payment__items'>  
                        {basket.map( (item,index) =>(
                            <CheckoutProduct
                                key = {index}
                                id = {item.id}
                                title = {item.title}
                                image = {item.image}
                                rating = {item.rating}
                                price = {item.price}
                            />
                        ))}
                    </div>

                </div>   


                <div className ="payment__section">
                    <div className ='payment__title'>
                        <h3>Payment Method</h3>
                    </div>
                    <div className = 'payment__details'>
                            {/* stripe stuff */}

                            <form onSubmit={handleSubmit}>
                                <CardElement onChange={handleChange} />
                                <div className = 'payment__priceContainer'>
                                    <CurrencyFormat
                                            renderText  = {(value) =>(
                                            <>
                                                <h3>Order Total: {value}</h3>
                                            </>
                                        )}
                                        decimalScale = {2}
                                        value = {getBasketTotal(basket)}
                                        displayType = {'text'}
                                        thousandSeperator = {true}
                                        prefix = {'$'}
                                    />

                                    <button disabled= {processing || disabled || succeded}>
                                        <span>
                                            {processing? <p>Processing</p>: 'Buy Now'}
                                        </span>           
                                    </button>
                                </div>  

                                {/* errs */}
                                {error && <div>{error}</div>}
                                </form>
                    </div>
                </div>    

            </div>
            
        </div>
    )
}

export default Payment
