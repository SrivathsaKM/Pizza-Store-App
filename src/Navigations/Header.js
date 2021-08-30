import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import CartItemsList from './../Components/Cart/CartItemsList';

import { withStyles } from '@material-ui/core/styles';
import { AppBar, Toolbar, Typography, IconButton, Badge } from '@material-ui/core';
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';

const StyledBadge = withStyles((theme) => ({
  badge: {
    top: '50%',
    right: -3,
    border: `2px solid ${theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[900]}`,
  },
}))(Badge);

const Header = (props) => {
  const [open, setOpen] = useState(false);

  const handleModalOpen = () => {
    setOpen(!open);
  };

  const handleModalClose = () => {
    setOpen(!open);
  };

  const cartItems = useSelector((state) => {
    return state.cartItems;
  });

  return (
    <>
      <AppBar position='static' style={{ backgroundColor: '#414B4F', height: '60px', color: 'white' }}>
        <Toolbar>
          <Typography variant='h6' style={{ flex: 1 }}>
            Pizza Store App
          </Typography>
          <IconButton aria-label='cart' onClick={handleModalOpen}>
            <StyledBadge badgeContent={cartItems.length} color='primary'>
              <ShoppingCartIcon style={{ color: '#ffffff' }} />
            </StyledBadge>
          </IconButton>
          {open && <CartItemsList open={open} handleModalClose={handleModalClose} />}
        </Toolbar>
      </AppBar>
    </>
  );
};
export default Header;
