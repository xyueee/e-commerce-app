import {
  AiFillCaretLeft,
  AiFillCaretRight,
  AiOutlineSearch,
  AiOutlineShoppingCart,
} from "react-icons/ai";
import "../Styles/Products.css";
import { useState, useEffect } from "react";
import ProductDetail from "./ProductDetail";
import Modal from "react-modal";

import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Products = () => {
  const [data, setData] = useState([]);
  const [startIndex, setStartIndex] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [categories, setCategories] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);

  const slicedData = data.slice(startIndex, startIndex + 10);

  const showLess = startIndex > 0;
  const showMore = startIndex + 10 < data.length;

  const location = useLocation();
  const authHeader = location.state?.authHeader;
  const userId = location.state?.userId;
  const navigate = useNavigate();

  //do some side effect if state changes

  //empty array [] = load once

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("https://dummyjson.com/products");
      const jsonData = await response.json();
      setData(jsonData.products);
      extractCategories(jsonData.products);
      console.log(jsonData.products);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handleShowMore = () => {
    setStartIndex((prevIndex) => prevIndex + 10);
  };
  const handleShowLess = (e) => {
    setStartIndex((prevIndex) => Math.max(prevIndex - 10, 0));
  };

  const handleSearch = async () => {
    try {
      let url = `https://dummyjson.com/products`;
      if (searchTerm !== "") {
        url += `/search?q=${searchTerm}`;
      }
      if (category !== "") {
        url += `/category/${category}`;
      }

      console.log(url);
      const searchResponse = await fetch(url);
      const searchJsonData = await searchResponse.json();

      console.log({ searchJsonData });
      setData(searchJsonData.products);
      console.log(searchJsonData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const extractCategories = (data) => {
    const uniqueCategories = [...new Set(data.map((item) => item.category))];
    setCategories(uniqueCategories);
    console.log("category", uniqueCategories);
  };

  const handleProductClick = (product) => {
    setSelectedProduct(product);
    console.log("product", product);
  };

  const handleToCart = (userId) => {
    navigate("/cart", { state: { userId } });
  };

  //useEffect -> do some side effect everytime state changes

  return (
    <>
      <div>{userId}</div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          {categories.map((cat, index) => (
            <option key={index} value={cat}>
              {cat}
            </option>
          ))}
        </select>
        <button onClick={() => handleSearch()}>
          <AiOutlineSearch />
        </button>
        <button onClick={() => handleToCart(userId)}>
          <AiOutlineShoppingCart />
        </button>
      </div>
      <div className="product-container">
        {slicedData.map((item) => (
          <div
            className="product"
            key={item.id}
            onClick={() => handleProductClick(item)}
          >
            <img src={item.images[0]} alt={item.title}></img>
            {/* <div className="image-conatiner">
                  {item.images.map((image, imageIndex) => (
                    <img
                      key={imageIndex}
                      src={image}
                      alt={`Image ${imageIndex + 1}`}
                    />
                  ))}
                </div> */}
            {/* <p>ID : {item.id}</p> */}
            <div className="product-info-container">
              <p>Name: {item.title}</p>
              <p>{item.category}</p>
              <p>$ {item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="show-more">
        {showLess && (
          <button onClick={handleShowLess}>
            <AiFillCaretLeft className="less-icon" />
          </button>
        )}
        {showMore && (
          <button onClick={handleShowMore}>
            <AiFillCaretRight className="more-icon" />
          </button>
        )}
      </div>
      {selectedProduct && (
        <Modal
          isOpen={true}
          onRequestClose={() => setSelectedProduct(null)}
          appElement={document.getElementById("root")}
          ariaHideApp={false}
        >
          <ProductDetail
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        </Modal>
      )}
    </>
  );
};

export default Products;
