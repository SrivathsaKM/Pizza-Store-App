const initialStateValues = [];

const pizzaReducers = (state = initialStateValues, action) => {
  switch (action.type) {
    case 'PIZZA_DETAILS':
      return [...state, ...action.payload];
    default: {
      return [...state];
    }
  }
};
export default pizzaReducers;
