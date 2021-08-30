import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Header from './Navigations/Header';
import Hero from './Hero';
import PizzaContainer from './Components/Pizza/PizzaContainer';
import PizzaList from './Components/Pizza/PizzaList';
import Footer from './Navigations/Footer';
import { useDispatch } from 'react-redux';
import { pizzaAPI } from './Actions/PizzaActions';

import { Grid } from '@material-ui/core';

function App() {
  const dispatch = useDispatch();
  const [searchPizza, setSearchPizza] = useState('');
  const [sortPizza, setSortPizza] = useState('');
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    axios
      .get('https://run.mocky.io/v3/ec196a02-aaf4-4c91-8f54-21e72f241b68')
      .then((response) => {
        dispatch(pizzaAPI(response.data));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [dispatch]);

  const PizzaSearch = (data) => {
    setSearchPizza(data);
  };

  const PizzaSort = (data) => {
    setSortPizza(data);
  };

  const PizzaVegOnly = (data) => {
    setChecked(data);
  };

  return (
    <>
      <Grid container>
        <Grid item xs={12}>
          <Header />
          <Hero />
        </Grid>
        <Grid item container>
          <Grid item xs={false} sm={1}></Grid>
          <Grid item xs={12} sm={10}>
            <PizzaContainer PizzaSearch={PizzaSearch} PizzaSort={PizzaSort} PizzaVegOnly={PizzaVegOnly} searchPizza={searchPizza} checked={checked} sortPizza={sortPizza} />
            <PizzaList searchPizza={searchPizza} sortPizza={sortPizza} checked={checked} />
          </Grid>
          <Grid item xs={false} sm={1}></Grid>
        </Grid>
        <Grid item xs={12}>
          <Footer />
        </Grid>
      </Grid>
    </>
  );
}

export default App;
