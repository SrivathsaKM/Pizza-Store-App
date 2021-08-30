const initialStateValue = [];

const cartItemsReducer = (state = initialStateValue, action) => {
  switch (action.type) {
    case 'ADD_CART_ITEM':
      return [...state, { ...action.payload }];
    case 'INCREMENT_CART_ITEM':
      return state.map((cartItem) => {
        return cartItem.id === action.payload ? { ...cartItem, quantity: cartItem.quantity + 1 } : { ...cartItem };
      });
    case 'DECREMENT_CART_ITEM':
      return state.map((cartItem) => {
        return cartItem.id === action.payload ? { ...cartItem, quantity: cartItem.quantity - 1 } : { ...cartItem };
      });
    case 'DELETE_CART_ITEM':
      return state.filter((cartItem) => cartItem.id !== action.payload);
    case 'DELETE_ALL_CART_ITEMS':
      return initialStateValue;
    default:
      return [...state];
  }
};

export default cartItemsReducer;
