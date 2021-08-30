import React from 'react';

import { Button, Dialog, DialogActions, DialogContent, DialogContentText } from '@material-ui/core';

const CartErrorMessage = (props) => {
  const { open, handleModalClose } = props;

  return (
    <>
      <Dialog open={open} onClose={handleModalClose} aria-labelledby='alert-dialog-title' aria-describedby='alert-dialog-description'>
        <DialogContent>
          <DialogContentText id='alert-dialog-description'>Cart is Empty!!!</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleModalClose} color='secondary' autoFocus>
            ok
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default CartErrorMessage;
