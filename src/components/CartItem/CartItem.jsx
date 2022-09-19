import "./CartItem.scss";

const CartItem = ({ cartItem }) => {
  const { name, quantity, selectedSize } = cartItem;
  return (
    <div>
      <h2>{name}</h2>
      <span>{quantity}</span>
      <span>{selectedSize}</span>
    </div>
  );
};

export default CartItem;
