export function getCartTotals(cartItems) {
  return cartItems.reduce(
    (totals, item) => ({
      itemCount: totals.itemCount + item.quantity,
      totalPrice: totals.totalPrice + item.price * item.quantity
    }),
    { itemCount: 0, totalPrice: 0 }
  );
}

export function formatEuro(value) {
  return `€${Number(value).toFixed(2)}`;
}
