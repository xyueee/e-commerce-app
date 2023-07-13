import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import Products from "./Components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useEffect, useState } from "react";
import Cart from "./Components/Cart";
import ProductDetail from "./Components/ProductDetail";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const [productQuantity, setProductQuantity] = useState([]);
  const [userId, setUserId] = useState(null);
  const [cartId, setCartId] = useState("");
  const [authHeader, setAuthHeader] = useState(null);

  const fetchCart = async (userId) => {
    try {
      const getCartResponse = await fetch(
        `https://dummyjson.com/carts/user/${userId}`
      );
      if (getCartResponse) {
        const CartJsonData = await getCartResponse.json();
        const products = CartJsonData.carts[0].products;
        const quantities = {};
        products.forEach((product) => {
          quantities[product.id] = product.quantity;
        });
        setCartItems(CartJsonData.carts[0].products);
        setProductQuantity(quantities);
        setCartId(CartJsonData.carts[0].id);
      } else {
        console.log("Error fetching data:");
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const addToCart = async (productId, quantity) => {
    try {
      const updateCartResponse = await fetch(
        `https://dummyjson.com/carts/${cartId}`,
        {
          method: "PUT",
          headers: authHeader,
          body: JSON.stringify({
            merge: true,
            products: [...cartItems, { id: productId, quantity: quantity + 1 }],
          }),
        }
      );
      if (updateCartResponse) {
        const updatedCartJsonData = await updateCartResponse.json();
        console.log("updatedCartJsonData", updatedCartJsonData);
        const updatedCartItems = updatedCartJsonData.products;
        setCartItems(updatedCartItems);
      }
    } catch (error) {}
  };

  const handleAddToCart = async (productId) => {
    const quantity = productQuantity[productId] || 0;
    try {
      const updatedCartItems = await addToCart(productId, quantity);
      setCartItems(updatedCartItems.products);
    } catch (error) {}
  };

  useEffect(() => {
    if (userId) {
      fetchCart(userId);
    }
  }, [userId]);

  useEffect(() => {
    const tokenFromSession = sessionStorage.getItem("token");
    if (tokenFromSession) {
      setAuthHeader({
        "Content-Type": "application/json",
        Authorization: `Bearer ${tokenFromSession}`,
      });
    }
  }, []);

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route
            exact
            path="/"
            element={
              <Login setUserId={setUserId} setAuthHeader={setAuthHeader} />
            }
          />
          <Route
            path="/products"
            element={
              <Products userId={userId} handleAddToCart={handleAddToCart} />
            }
          />
          <Route path="/cart" element={<Cart cartItems={cartItems} />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
