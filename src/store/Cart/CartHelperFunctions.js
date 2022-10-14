export const addItemToArray = (cartItems, productToAdd, size) => {
  let newCartItems;

  if (cartItems.length === 0) {
    newCartItems = [{ ...productToAdd, ectedSize: size }];
  }

  let findElement = cartItems.find((el) => {
    return (
      el.articles[0].code === productToAdd.articles[0].code &&
      el.selectedSize === size
    );
  });

  if (!findElement) {
    newCartItems = [
      ...cartItems,
      { ...productToAdd, quantity: 1, selectedSize: size },
    ];
  } else {
    let newArr = cartItems.map((cartItem) =>
      cartItem.articles[0].code === productToAdd.articles[0].code &&
      cartItem.selectedSize === size
        ? {
            ...cartItem,
            quantity: cartItem.quantity + 1,
            selectedSize: size,
          }
        : cartItem
    );
    newCartItems = newArr;
  }
  return newCartItems;
};

export const removeItemFromArray = (cartItems, item) => {
  let itemString = JSON.stringify(item);
  let newArr = JSON.parse(
    JSON.stringify(cartItems)
      .replace(itemString, "")
      .replace(",,", ",")
      .replace("[,", "[")
      .replace(",]", "]")
  );
  return newArr;
};

export const reduceItemQuantityinArray = (cartItems, item) => {
  let newArr = [];

  if (item.quantity === 1) {
    let itemString = JSON.stringify(item);
    newArr = JSON.parse(
      JSON.stringify(cartItems)
        .replace(itemString, "")
        .replace(",,", ",")
        .replace("[,", "[")
        .replace(",]", "]")
    );
  } else {
    newArr = cartItems.map((cartItem) => {
      if (
        cartItem.articles[0].code === item.articles[0].code &&
        cartItem.selectedSize === item.selectedSize
      ) {
        return {
          ...cartItem,
          quantity: cartItem.quantity - 1,
          selectedSize: cartItem.selectedSize,
        };
      } else {
        return cartItem;
      }
    });
  }

  return newArr;
};
