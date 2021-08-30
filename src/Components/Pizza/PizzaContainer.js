import React from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Grid, FormControlLabel, TextField, InputLabel, MenuItem, FormControl, Select, Switch } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  formControl: {
    minWidth: 300,
  },
  toggle: {
    width: 60,
    '& .Mui-checked': {
      color: '#109125',
      transform: 'translateX(25px) !important',
    },
    '& .MuiSwitch-track': {
      backgroundColor: 'grey',
    },
  },
}));

const PizzaContainer = (props) => {
  const classes = useStyles();
  const { PizzaSearch, PizzaSort, PizzaVegOnly, searchPizza, sortPizza, checked } = props;

  const handleSearchChange = (e) => {
    PizzaSearch(e.target.value);
  };

  const handleSort = (e) => {
    PizzaSort(e.target.value);
  };

  const toggleChecked = () => {
    PizzaVegOnly(!checked);
  };

  return (
    <>
      <Grid container spacing={6} style={{ margin: '28px' }}>
        <Grid item xs={4} sm={4}>
          <TextField id='outlined-basic' label='Search By Name' value={searchPizza} variant='outlined' type='text' className={classes.formControl} style={{ backgroundColor: '#FFFFFF' }} onChange={handleSearchChange} />
        </Grid>
        <Grid item xs={4} sm={5}>
          <FormControl variant='outlined' className={classes.formControl}>
            <InputLabel id='demo-simple-select-outlined-label'>Sort By Price/Rating</InputLabel>
            <Select labelId='demo-simple-select-outlined-label' value={sortPizza} id='demo-simple-select-outlined' onChange={handleSort} label='sort your pizza'>
              <MenuItem value=''>
                <em>None</em>
              </MenuItem>
              <MenuItem value='price'>Price</MenuItem>
              <MenuItem value='rating'>Rating</MenuItem>
            </Select>
          </FormControl>
        </Grid>
        <Grid item xs={4} sm={3}>
          <FormControlLabel control={<Switch value={checked} onChange={toggleChecked} className={classes.toggle} />} label='Veg Only' />
        </Grid>
      </Grid>
    </>
  );
};

export default PizzaContainer;
