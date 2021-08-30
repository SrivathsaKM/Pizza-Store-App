import React from 'react';

import { AppBar, Toolbar, Typography } from '@material-ui/core';

const Footer = () => {
  return (
    <>
      <AppBar position='static' style={{ backgroundColor: '#414B4F' }}>
        <Toolbar>
          <Typography variant='body2' style={{ flex: '1' }}>
            Copyright &copy; 2021 All Rights Reserved.
          </Typography>
          <Typography variant='body2'> Designed and Developed by Srivathsa KM </Typography>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default Footer;
