import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import Cart from "./Components/Cart";
import ProductDetail from "./Components/ProductDetail";

function App() {
  const [cartItems, setCartItems] = useState([]);
  const addItemToCart = () => [];

  return (
    // <Router>
    //   <Routes>
    //     <Route exact path="/login" Component={Login} />
    //     <Route path="/products" Component={Products} />
    //   </Routes>
    // </Router>
    <div className="App">
      <Router>
        <Routes>
          <Route exact path="/" Component={Login} />
          <Route path="/products" Component={Products} />
          <Route path="/cart" Component={Cart} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
