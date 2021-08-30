import React, { useState } from 'react';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, Typography, Button, Grid, TextField, InputLabel, MenuItem, FormControl, Select } from '@material-ui/core';
import Autocomplete from '@material-ui/lab/Autocomplete';
import SendIcon from '@material-ui/icons/Send';
import CancelIcon from '@material-ui/icons/Cancel';

const useStyles = makeStyles((theme) => ({
  root: {
    width: 500,
    '& > * + *': {
      marginTop: theme.spacing(3),
    },
  },
  formControl: {
    minWidth: 500,
  },
}));

const PizzaSize = (props) => {
  const classes = useStyles();
  const { handleModalClose, open, toppingsIsRadio, toppingsOpt, toppingsTitle, pizzaSize, pizzaName, customizePizzaData } = props;

  const [selectToppings, setSelectToppings] = useState([]);
  const [selectPizzaSize, setSelectPizzaSize] = useState('');

  const handleChange = (param) => {
    setSelectToppings(param.map((ele) => ele.name));
  };

  const handleToppingsChange = (e) => {
    setSelectToppings([e.target.value]);
  };

  const handleSizeChange = (event) => {
    setSelectPizzaSize(event.target.value);
  };
  const handleSubmitData = (e) => {
    e.preventDefault();
    const formData = {
      pizzaTopping: selectToppings,
      pizzaSize: selectPizzaSize,
    };
    customizePizzaData(formData);
    handleModalClose();
  };

  return (
    <>
      <Dialog aria-labelledby='customized-dialog-title' open={open} maxWidth='md'>
        <DialogTitle id='customized-dialog-title' onClose={handleModalClose}>
          <Typography variant='body1' gutterBottom style={{ fontWeight: 'bold' }}>
            Customize Your Favourite Pizza
          </Typography>
        </DialogTitle>
        <DialogContent dividers>
          <form onSubmit={handleSubmitData}>
            <div className={classes.root}>
              {toppingsIsRadio === 'false' ? (
                <Autocomplete multiple id='tags-outlined' onChange={handleChange} options={toppingsOpt} getOptionLabel={(toppingsOpt) => toppingsOpt.name} renderInput={(params) => <TextField {...params} variant='outlined' label={toppingsTitle.join('')} placeholder={toppingsTitle.join('')} />} />
              ) : (
                <FormControl variant='outlined' className={classes.formControl}>
                  <InputLabel id='demo-simple-select-outlined-label'>{toppingsTitle.join('')}</InputLabel>
                  <Select labelId='demo-simple-select-outlined-label' id='demo-simple-select-outlined' value={selectToppings} onChange={handleToppingsChange} label={toppingsTitle.join('')}>
                    <MenuItem value=''>
                      <em>None</em>
                    </MenuItem>
                    {toppingsOpt.map((toppings, idx) => {
                      return (
                        <MenuItem value={toppings.name} key={idx}>
                          {toppings.name}
                        </MenuItem>
                      );
                    })}
                  </Select>
                </FormControl>
              )}

              <FormControl variant='outlined' className={classes.formControl}>
                <InputLabel id='demo-simple-select-outlined-label'>{pizzaName.join('')}</InputLabel>
                <Select labelId='demo-simple-select-outlined-label' id='demo-simple-select-outlined' value={selectPizzaSize} onChange={handleSizeChange} label={pizzaName.join('')}>
                  <MenuItem value=''>
                    <em>None</em>
                  </MenuItem>
                  {pizzaSize.map((psize, idx) => {
                    return (
                      <MenuItem value={psize.size} key={idx}>
                        {psize.size}
                      </MenuItem>
                    );
                  })}
                </Select>
              </FormControl>
            </div>
            <Grid item xs={2} style={{ marginTop: '.5rem' }}>
              <Button type='submit' variant='contained' color='primary' size='large' className={classes.button} endIcon={<SendIcon />} align='center'>
                Submit
              </Button>
            </Grid>
          </form>
        </DialogContent>

        <Button variant='contained' onClick={handleModalClose} color='secondary' size='large' className={classes.button} endIcon={<CancelIcon />} align='center'>
          Cancel
        </Button>
      </Dialog>
    </>
  );
};

export default PizzaSize;
