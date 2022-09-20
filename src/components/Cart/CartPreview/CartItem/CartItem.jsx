import "./CartItem.scss";

const CartItem = ({ cartItem }) => {
  const { name, quantity, selectedSize, images, price } = cartItem;
  console.log(images);
  return (
    <div className="cart-container">
      <img src={images[0].url} className="img-card-small" />
      <div className="info-cart-container">
        <h2>{name}</h2>
        <div className="cart-item-details">
          <b>{quantity}</b> items &times; {price.formattedValue}
        </div>
        <div className="cart-item-details">Size: {selectedSize}</div>
      </div>
    </div>
  );
};

export default CartItem;
