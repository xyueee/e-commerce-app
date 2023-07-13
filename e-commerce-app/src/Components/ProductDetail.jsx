import Modal from "react-modal";
import "../Styles/ProductDetails.css";
import { AiFillCloseCircle } from "react-icons/ai";
Modal.setAppElement("#root");

const ProductDetail = ({ product, onClose, handleAddToCart }) => {
  console.log("typeof handleAddToCart", typeof handleAddToCart);
  if (!product) {
    return null; // Return null if product details are not available
  }

  return (
    <Modal
      className="product-details-container"
      isOpen={true}
      onRequestClose={onClose}
    >
      {" "}
      <button onClick={onClose}>
        <AiFillCloseCircle className="close-icon" />
      </button>
      <div className="product-details">
        <img src={product.images[0]} alt={product.title} />
        <h2>{product.title}</h2>
        <p>Price: {product.price}</p>
        <p>
          Description: <br></br> {product.description}
        </p>
        <button onClick={() => handleAddToCart(product.id)}>Add to Cart</button>
      </div>
    </Modal>
  );
};
export default ProductDetail;
