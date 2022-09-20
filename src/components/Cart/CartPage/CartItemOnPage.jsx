import "./CartItemOnPage.scss";

const CartItemInPage = ({
  item,
  addItemToCart,
  removeItem,
  reduceItemQuantity,
}) => {
  return (
    <div>
      <h2>{item.name}</h2>
      <button onClick={() => reduceItemQuantity(item)}>-</button>
      <div>{item.quantity} items</div>
      <button onClick={() => addItemToCart(item, item.selectedSize)}>+</button>
      <div>Size: {item.selectedSize}</div>
      <div>Price: {item.price.formattedValue}</div>
      <div>Total: {(item.price.value * item.quantity).toFixed(2)}</div>
      <button onClick={() => removeItem(item)}>Delete</button>
    </div>
  );
};

export default CartItemInPage;
