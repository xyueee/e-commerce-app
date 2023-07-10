import Modal from "react-modal";
import "../Styles/ProductDetails.css";
import { AiFillCloseCircle } from "react-icons/ai";
Modal.setAppElement("#root");

const ProductDetail = ({ product, onClose }) => {
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
      </div>
    </Modal>
  );
};
export default ProductDetail;
