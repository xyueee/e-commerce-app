import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Cart.css";

const Cart = ({ cartItems }) => {
  // const location = useLocation();
  // const navigate = useNavigate();
  // const handlebackButton = () => {
  //   navigate("/products", { state: { cartId } });
  // };

  return (
    <>
      <h1>Cart</h1>
      {cartItems && cartItems.length === 0 ? (
        <p>No items in cart</p>
      ) : (
        <div className="cart-conatiner">
          {cartItems.map((item) => (
            <div key={item.id} className="cart-item">
              <p>Name: {item.title}</p>
              <p>${item.price}</p>
              <p>Quantity : {item.quantity}</p>
              <p>Total : ${item.total}</p>

              {/* <button>-</button> */}
            </div>
          ))}
          {/* <button onClick={handleAddToCart}>+</button> */}
          {/* <button onClick={handlebackButton}>Back</button> */}
        </div>
      )}
    </>
  );
};

export default Cart;
