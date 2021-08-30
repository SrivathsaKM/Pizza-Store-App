import { createStore, combineReducers } from 'redux';
import pizzaReducers from './Reducers/PizzaReducers';
import cartItemsReducer from './Reducers/CartItemsReducer';

const ConfigureStore = () => {
  const rootReducers = combineReducers({
    pizza: pizzaReducers,
    cartItems: cartItemsReducer,
  });
  const store = createStore(rootReducers);
  return store;
};

export default ConfigureStore;
