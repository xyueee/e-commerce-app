import { useEffect } from "react";

import { useLocation } from "react-router-dom";

const Cart = () => {
  const location = useLocation();
  const userId = location.state?.userId;
  console.log("USERID", userId);

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
        const getCartJsonData = await getCartResponse.json();
        console.log(getCartJsonData);
      } else {
        console.log("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return <>Cart {userId}</>;
};

export default Cart;
