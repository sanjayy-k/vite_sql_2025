import React from "react";
import { useLocation, Link } from "react-router-dom";
import "./bill.css";

export default function Bill() {
  const location = useLocation();
  const { items, counts, images } = location.state || {};

  if (!items || !counts) {
    return <h2>No items found.</h2>;
  }

  // Filter products with count > 0
  const selectedItems = items
    .map((item, index) => ({
      ...item,
      img: images[index],
      quantity: counts[index],
      totalPrice: counts[index] * item.PRICE_PER_QUANTITY
    }))
    .filter((p) => p.quantity > 0);

  // Calculate overall total
  const grandTotal = selectedItems.reduce((sum, item) => sum + item.totalPrice, 0);

  return (
    <div className="bill-page">

      <h1>Your Bill</h1><br></br>

      {selectedItems.length === 0 ? (
        <h3>No products added to cart.</h3>
      ) : (
        <div className="bill-items">
          {selectedItems.map((product, index) => (
            <div className="bill-card" key={index}>
              <img src={product.img} alt="" />
              <div className="info">
                <h3 className="prodcolor">{product.PRODUCT_NAME}</h3>
                <p>Price: ₹ {product.PRICE_PER_QUANTITY}</p>
                <p>Quantity: {product.quantity}</p>
                <h3>Total: ₹ {product.totalPrice}</h3>
              </div>
            </div>
          ))}
        </div>
      )}

      <h1 className="grand-total">Grand Total: ₹ {grandTotal}</h1><br></br>

      <Link to="/Shoppingcart">
        <button className="back-btn">BACK TO SHOPPING</button>
      </Link>
      
      <div><br></br>
      <Link to="/Thankyou">
        <button className="back-btn" id = 'checkout'>CHECK OUT</button>
      </Link>

      </div>
    </div>
  );
}
