import React from "react";
import "./Checkout.css";
import Subtotal from "./Subtotal";
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
function Checkout() {
  const [{basket , user } , dispatch] = useStateValue();
  return (
    <div className="checkout">
      <div className="checkout__left">
        <img
          src="https://rukminim1.flixcart.com/fk-p-flap/844/140/image/9a3a734aef20053a.jpg?q=50"
          className="checkout__ad"
          alt=""
        />
        <div>
          <h3>hello, {user?.email}</h3>
          <h2 className="checkout__title">Your Shopping basket</h2>
          {basket.map(item =>(
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



      <div className="checkout__right">
        <Subtotal />
      </div>
    </div>
  );
}

export default Checkout;
