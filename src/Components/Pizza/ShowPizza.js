import React, { useState } from 'react';
import { useDispatch } from 'react-redux';

import { addCartItemsList } from '../../Actions/CartItemsAction';
import PizzaSize from './PizzaSize';

import { makeStyles } from '@material-ui/core/styles';
import { Card, CardActionArea, CardActions, CardContent, CardMedia, Button, Typography, Grid } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  root: {
    maxWidth: 345,
  },
  media: {
    height: 140,
  },
  text: {
    padding: theme.spacing(0.5),
  },
}));

const ShowPizza = ({ id, name, description, isVeg, rating, price, img_url, size, toppings }) => {
  const dispatch = useDispatch();
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [toppingsIsRadio, setToppingsIsRadio] = useState(false);
  const [toppingsOpt, setToppingsOpt] = useState([]);
  const [toppingsTitle, setToppingsTitle] = useState('');
  const [pizzaSize, setPizzaSize] = useState([]);
  const [pizzaSizeName, setPizzaSizeName] = useState('');
  const [quantity] = useState(1);

  const [addOns, setAddOns] = useState({});

  const handleModalOpen = () => {
    const toopingsRadio = toppings.map((ele) => {
      return ele.isRadio;
    });
    setToppingsIsRadio(toopingsRadio.join(''));

    const toppingItem = toppings.map((ele) => {
      return ele.items;
    });
    setToppingsOpt(toppingItem[0]);

    const toppingTitle = toppings.map((ele) => {
      return ele.title;
    });
    setToppingsTitle(toppingTitle);

    const pizzasize = size.map((ele) => {
      return ele.items;
    });
    setPizzaSize(pizzasize[0]);

    const pizzaName = size.map((ele) => {
      return ele.title;
    });
    setPizzaSizeName(pizzaName);
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  const customizePizzaData = (formData) => {
    setAddOns(formData);
  };

  const handleSubmitCartItems = () => {
    const cartItems = {
      date: new Date(),
      id: id,
      name: name,
      price: price,
      image: img_url,
      addOns: addOns,
      quantity: quantity,
      isVeg: isVeg,
    };
    //console.log(cartItems);
    dispatch(addCartItemsList(cartItems));
  };

  return (
    <>
      <Card className={classes.root}>
        <CardActionArea>
          <CardMedia className={classes.media} image={img_url} title='Contemplative Reptile' />
          <CardContent>
            <Grid container>
              <Grid item xs={12} sm={9} className={classes.text}>
                <Typography gutterBottom component='h2'>
                  {name}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={3} className={classes.text}>
                <Typography gutterBottom component='h5'>
                  ₹ {price}
                </Typography>
              </Grid>
            </Grid>

            <Typography variant='body2' color='textSecondary' component='p' style={{ marginBottom: '0.5rem' }}>
              {description}
            </Typography>

            <Grid container>
              <Grid item xs={12} sm={8} className={classes.text}>
                <Typography gutterBottom component='h2'>
                  {isVeg ? 'Veg' : 'Non-Veg'}
                </Typography>
              </Grid>
              <Grid item xs={12} sm={4} className={classes.text}>
                <Typography gutterBottom component='h5'>
                  Rating: {rating}
                </Typography>
              </Grid>
            </Grid>

            {Object.keys(addOns).length > 0 && (
              <Grid container>
                <Grid item xs={12} className={classes.text}>
                  <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
                    <strong>Toopings: </strong> {addOns.pizzaTopping.map((ele) => ele).join(', ')}
                  </Typography>
                </Grid>
                <Grid item xs={12} className={classes.text}>
                  <Typography gutterBottom variant='body2' color='textSecondary' component='p'>
                    <strong>Size:</strong> {addOns.pizzaSize}
                  </Typography>
                </Grid>
              </Grid>
            )}
          </CardContent>
        </CardActionArea>

        <CardActions>
          <Button size='small' color='primary' onClick={handleModalOpen}>
            Customize Pizza
          </Button>
          <Button size='small' color='primary' onClick={handleSubmitCartItems}>
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      {open && <PizzaSize handleModalClose={handleModalClose} open={open} toppingsIsRadio={toppingsIsRadio} toppingsOpt={toppingsOpt} toppingsTitle={toppingsTitle} pizzaSize={pizzaSize} pizzaName={pizzaSizeName} customizePizzaData={customizePizzaData} />}
    </>
  );
};

export default ShowPizza;
