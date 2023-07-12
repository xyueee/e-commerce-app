import { useEffect, useState, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../Styles/Cart.css";

const Cart = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  const productId = location.state?.addProduct;
  const [cartItems, setCartItems] = useState([]);
  const [cartId, setCartId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  const fetchCart = async (userId) => {
    try {
      const getCartResponse = await fetch(
        `https://dummyjson.com/carts/user/${userId}`
      );
      if (getCartResponse) {
        const CartJsonData = await getCartResponse.json();
        // console.log(".carts", CartJsonData.carts);
        // console.log(".products", CartJsonData.carts[0].products);
        setCartItems(CartJsonData.carts[0].products);
        setCartId(CartJsonData.carts[0].id);
      } else {
        console.log("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async () => {
    try {
      const updateCartResponse = await fetch(
        `https://dummyjson.com/carts/${cartId}`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            merge: true,
            products: [{ id: productId, quantity: 1 }],
          }),
        }
      );
      if (updateCartResponse) {
        const updatedCartJsonData = await updateCartResponse.json();
        // console.log("updatedCartJsonData", updatedCartJsonData);
        setCartItems(updatedCartJsonData.products);
      }
    } catch (error) {}
  };
  const handleAddToCart = async () => {
    try {
      const updatedCartItems = await addToCart(cartId);
      // setCartItems(updatedCartItems);
    } catch (error) {}
  };

  // const handlebackButton = () => {
  //   navigate("/products", { state: { cartId } });
  // };

  return (
    <>
      <h1>Cart</h1>
      {cartItems.length === 0 ? (
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
          <button onClick={handleAddToCart}>+</button>
          {/* <button onClick={handlebackButton}>Back</button> */}
        </div>
      )}
    </>
  );
};

export default Cart;
