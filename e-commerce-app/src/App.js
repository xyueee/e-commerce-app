import logo from "./logo.svg";
import "./App.css";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import Products from "./Components/Products";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useState } from "react";
import ProductDetail from "./Components/ProductDetail";

//pass function to product detail page
// const addItemToCart = () => {
//const cartItemsCopy = [...cartItems]
//cartItemsCopy.push()
//setCartItems(cartItemsCopy)
//this rule only applies to array or objects
// A -> A copy -> A copy (do all ur stuff here) -> A copy give back to react
//for others (boolean, string, number,...blabla)
//A -> setData(A+2)
//rule that applies for all types of data
//A = A+2
// };

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
      {/* <Login></Login> */}
      {/* <Navbar></Navbar> */}
      <Products></Products>
      {/* <ProductDetail></ProductDetail> */}
    </div>
  );
}

export default App;

//try to avoid useEffect
//try to write less logic in template
//keep in mind that your code might run a lot of times
