import React from 'react';
import Moment from 'react-moment';
import Swal from 'sweetalert2';
import { useSelector, useDispatch } from 'react-redux';

import { handleIncrement } from '../../Actions/CartItemsAction';
import { handleDecrement } from '../../Actions/CartItemsAction';
import { handleDelete } from '../../Actions/CartItemsAction';
import CartErrorMessage from './CartErrorMessage';

import { makeStyles } from '@material-ui/core/styles';
import { Dialog, DialogTitle, DialogContent, DialogActions, Button, Grid, Table, TableContainer, TableHead, TableBody, TableRow, TableCell, Paper } from '@material-ui/core';
import DeleteIcon from '@material-ui/icons/Delete';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  maincolor: {
    color: '#ffffff',
  },
  table: {
    minWidth: 650,
  },
  tableHead: {
    backgroundColor: '#619196',
    '& .MuiTableCell-head': {
      color: 'whitesmoke',
      fontSize: '18px',
      fontWeight: 'bold',
      opacity: 1,
    },
  },
  button: {
    margin: theme.spacing(1),
  },

  tableButton: {
    backgroundColor: '#FF8484',
    color: '#FFFFFF',
    borderRadius: '15px',
  },

  carditem: {
    textAlign: 'center',
  },

  namephone: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  innerTable: {
    fontSize: '18px',
    color: '#fff',
    fontWeight: 'normal',
    fontFamily: 'Arial',
  },
}));
const CartItemsList = (props) => {
  const { open, handleModalClose } = props;

  const cartItems = useSelector((state) => state.cartItems);
  const dispatch = useDispatch();

  const toatalQuantity = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.quantity;
    });
    return sum;
  };

  const totalAmount = () => {
    let sum = 0;
    cartItems.forEach((item) => {
      sum += item.price * item.quantity;
    });
    return sum;
  };

  const handleChangeIncrement = (id) => {
    dispatch(handleIncrement(id));
  };

  const handleChangeDecrement = (id) => {
    dispatch(handleDecrement(id));
  };

  const handleChangeDelete = (id) => {
    dispatch(handleDelete(id));
  };

  const classes = useStyles();
  return (
    <>
      {cartItems.length > 0 ? (
        <Dialog onClose={handleModalClose} aria-labelledby='customized-dialog-title' open={open} fullWidth maxWidth='lg' style={{ zIndex: 1, marginTop: '1rem' }}>
          <DialogTitle id='customized-dialog-title' onClose={handleModalClose} style={{ backgroundColor: '#48A7D4' }}>
            <span style={{ fontFamily: 'Montserrat, sans-serif', fontSize: '35px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', color: '#FFFFFF' }}>Order Summary</span>

            <Grid container>
              <Grid item xs={12} className={classes.innerTable}>
                <span style={{ fontFamily: 'Montserrat, sans-serif', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '1rem', fontWeight: 'bold', color: '#FFFFFF', textDecoration: 'underline' }}>
                  Date: &nbsp; <Moment format='DD MMM YYYY  HH:mm:ss'>{cartItems[0].date}</Moment>
                </span>
              </Grid>
            </Grid>
            <Grid container>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Total Items: {toatalQuantity()}</strong>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Order Count: {cartItems.length}</strong>
              </Grid>
              <Grid item xs={12} sm={6} md={4} className={classes.innerTable}>
                <strong>Total Amount (₹): {totalAmount()}</strong>
              </Grid>
            </Grid>
          </DialogTitle>

          <DialogContent dividers>
            <TableContainer component={Paper}>
              <Table style={{ minWidth: '500px' }} aria-label='simple table'>
                <TableHead className={classes.tableHead}>
                  <TableRow>
                    <TableCell align='center'>#</TableCell>
                    <TableCell align='center'>Pizza Name</TableCell>
                    <TableCell align='center'>Pizza Size</TableCell>
                    <TableCell align='center'>Pizza Toppings</TableCell>
                    <TableCell align='center'>Pizza Price (₹)</TableCell>
                    <TableCell align='center'>Quantity</TableCell>
                    <TableCell align='center'>Sub Total (₹)</TableCell>
                    <TableCell align='center'>Action</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((cartItem, idx) => {
                    const { id, name, price, quantity, addOns } = cartItem;
                    return (
                      <TableRow key={idx}>
                        <TableCell component='th' scope='row' align='center'>
                          {idx + 1}
                        </TableCell>
                        <TableCell align='center'>{name}</TableCell>

                        <TableCell align='center'>{addOns.pizzaSize ? addOns.pizzaSize : '__'}</TableCell>
                        <TableCell align='center'>{addOns.pizzaTopping ? addOns.pizzaTopping.map((ele) => ele).join(', ') : '__'}</TableCell>
                        <TableCell align='center'>{price}</TableCell>

                        <TableCell align='center'>
                          <Button variant='contained' color='secondary' className={classes.button} startIcon={<ChevronLeftIcon style={{ paddingLeft: '2px' }} />} disabled={quantity === 1} size='small' onClick={() => handleChangeDecrement(id)} style={{ maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} />
                          {quantity}
                          <Button variant='contained' style={{ backgroundColor: '#28A745', color: 'white', maxWidth: '30px', maxHeight: '30px', minWidth: '30px', minHeight: '30px' }} className={classes.button} size='small' onClick={() => handleChangeIncrement(id)} startIcon={<ChevronRightIcon style={{ paddingLeft: '2px' }} />} />
                        </TableCell>
                        <TableCell align='center'>{price * quantity}</TableCell>
                        <TableCell align='center'>
                          <Button
                            variant='contained'
                            color='secondary'
                            size='small'
                            className={classes.button}
                            startIcon={<DeleteIcon />}
                            onClick={() => {
                              Swal.fire({
                                title: 'Are you sure?',
                                text: "You won't be able to revert this!",
                                icon: 'warning',
                                showCancelButton: true,
                                confirmButtonColor: '#3085d6',
                                cancelButtonColor: '#d33',
                                confirmButtonText: 'Yes, delete it!',
                                customClass: {
                                  container: 'my-swal',
                                },
                              }).then((result) => {
                                if (result.isConfirmed) {
                                  handleChangeDelete(id);
                                  Swal.fire('Deleted!', 'Customer info has been deleted.', 'success');
                                }
                              });
                            }}>
                            delete
                          </Button>
                        </TableCell>
                      </TableRow>
                    );
                  })}
                </TableBody>
              </Table>
            </TableContainer>
          </DialogContent>
          <DialogActions style={{ display: 'flex', justifyContent: 'space-between' }}>
            <Button onClick={handleModalClose} variant='contained' style={{ backgroundColor: '#48A7D4', color: '#FFFFFF' }}>
              Close
            </Button>
          </DialogActions>
        </Dialog>
      ) : (
        <CartErrorMessage open={open} handleModalClose={handleModalClose} />
      )}
    </>
  );
};

export default CartItemsList;
