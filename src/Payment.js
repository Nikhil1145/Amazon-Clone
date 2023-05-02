import React, { useState , useEffect } from "react";
import "./Payment.css";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useNavigate } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from "./axios";
import { db } from "./firebase";
function Payment() {
  const [{ basket, user }, dispatch] = useStateValue();
  const navigate = useNavigate();

  const stripe = useStripe();
  const elements = useElements();

  const [error, setError] = useState(null);
  const [disabled, setDisabled] = useState(true);
  const [succeeded , setSucceeded] = useState(false)
  const [processing , setProcessing] = useState("")
  const [clientSecret , setClientSecret] = useState(true)

  useEffect(()=>{
//generate the special stripe secrect which allow us to charge a customer
const getClientsecret = async()=>{
const response = await axios({
  method:'post',
  //stripe eexpects the total in currency subUnits
  url:`/payments/create?total=${getBasketTotal(basket)*100}`
})
setClientSecret(response.data.clientSecret)
}
getClientsecret();
  },[basket])

  console.log('The Secret is ' , clientSecret)

  const handleSubmit = async(e) => {
    e.preventDefault();
    setProcessing(true)
    const payload = await stripe.confirmCardPayment(clientSecret , {
      payment_method:{
        card: elements.getElement(CardElement)
      }
    }).then(({paymentIntent})=>{
      //paymentIntent = payment Confirmation
      db
      .collection('users')
      .doc(user?.uid)
      .collection('orders')
      .doc(paymentIntent.id)
      .set({
        basket:basket,
        amount:paymentIntent.amount,
        created:paymentIntent.created
      })

      setSucceeded(true)
      setError(null)
      setProcessing(false)
      dispatch({
        type:'EMPTY_BASKET'
      })
      navigate('/orders') 
    })
    //to handle stripe
  };

  const handleChange = (e) => {
    //Listen for changes in card element
    //and displays any error as the customer types their cards details
    setDisabled(e.empty);
    setError(e.error ? e.error.message : "");
  };
  return (
    <div className="payment">
      <div className="payment__container">
        <h1>
          Checkout (<Link to="/checkout">{basket?.length} items </Link>)
        </h1>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Deliver Address</h3>
          </div>
          <div className="payment__address">
            <p>{user?.email}</p>
            <p>Mansarovar</p>
            <p>Jaipur</p>
          </div>
        </div>

        <div className="payment__section">
          <div className="payment__title">
            <h3>Review Items and Delivery</h3>
          </div>
          <div className="payment__items">
            {basket.map((item) => (
              <CheckoutProduct
                id={item.id}
                title={item.title}
                image={item.image}
                price={item.price}
                rating={item.rating}
              />
            ))}
          </div>
        </div>
        <div className="payment__section">
          <div className="payment__title">
            <h3>Payment method</h3>
          </div>
          <div className="payment__details">
            <form onSubmit={handleSubmit}>
              <CardElement onChange={handleChange} />
              <div className="payment__priceContainer">
                <CurrencyFormat
                  renderText={(value) => (
                    <>
                      <h3>Order Total:{value}</h3>
                    </>
                  )}
                  decimalScale={2}
                  value={getBasketTotal(basket)}
                  displayType={"text"}
                  thousandSeparator={true}
                  prefix="₹"
                />
                <button disabled={processing || disabled || succeeded}>
                  <span>{processing ? <p>Processing</p>: 'Buy Now'}</span>
                </button>
              </div>
              {error && <div>{error}</div>}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Payment;
