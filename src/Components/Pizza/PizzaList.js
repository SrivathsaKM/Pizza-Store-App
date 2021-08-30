import React, { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';

import ShowPizza from './ShowPizza';
import Loading from '../../Loading';

import { Grid } from '@material-ui/core';

const PizzaList = (props) => {
  const { searchPizza, sortPizza, checked } = props;
  const [filteredData, setFilteredData] = useState([]);

  const pizza = useSelector((state) => {
    return state.pizza;
  });

  useEffect(() => {
    if (searchPizza.length > 0) {
      const data = pizza.filter((ele) => ele.name.toLowerCase().includes(searchPizza.toLowerCase()));
      console.log(data);
      if (data.length != 0) {
        setFilteredData(data);
      } else {
        alert('Not Found');
        setFilteredData(pizza);
      }
    } else {
      setFilteredData(pizza);
    }
  }, [searchPizza, pizza]);

  useEffect(() => {
    if (sortPizza.length > 0) {
      const option = sortPizza;
      let sortedData;
      if (option === 'price') {
        sortedData = [...filteredData].sort((a, b) => {
          if (a.price < b.price) {
            return -1;
          }
        });
      } else if (option === 'rating') {
        sortedData = [...filteredData].sort((a, b) => {
          if (a.rating > b.rating) {
            return -1;
          }
        });
      }
      setFilteredData(sortedData);
    } else {
      setFilteredData(pizza);
    }
  }, [sortPizza, pizza]);

  useEffect(() => {
    if (checked === true) {
      const isVeg = pizza.filter((ele) => ele.isVeg);
      setFilteredData(isVeg);
    } else {
      setFilteredData(pizza);
    }
  }, [checked, pizza]);

  return (
    <div style={{ marginTop: '1em' }}>
      <Grid container spacing={3} style={{ margin: '28px' }}>
        {filteredData.length > 0 ? (
          filteredData.map((pizzaList, idx) => {
            return (
              <Grid item xs={12} sm={4} key={idx}>
                <ShowPizza {...pizzaList} />
              </Grid>
            );
          })
        ) : (
          <Loading />
        )}
      </Grid>
    </div>
  );
};

export default PizzaList;
