import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Typography, Container } from '@material-ui/core';

const useStyles = makeStyles((theme) => ({
  heroContent: {
    backgroundColor: theme.palette.background.paper,
    padding: theme.spacing(8, 0, 6),
  },
  heroButtons: {
    marginTop: theme.spacing(4),
  },
}));

const Hero = () => {
  const classes = useStyles();
  return (
    <div className={classes.heroContent}>
      <Container maxWidth='md'>
        <Typography component='h1' variant='h2' align='center' color='textPrimary' gutterBottom>
          Welcome to Pizza Store
        </Typography>
        <Typography component='h1' variant='h5' align='center' color='textSecondary' paragraph>
          Your favourite pizza is now just a few clicks away. Order a delicious pizza on the go, anywhere, anytime. Pizza Store is happy to assist you with your home delivery. Every time you order, you get a hot and fresh pizza delivered at your doorstep in less than thirty minutes.
        </Typography>
      </Container>
    </div>
  );
};

export default Hero;
