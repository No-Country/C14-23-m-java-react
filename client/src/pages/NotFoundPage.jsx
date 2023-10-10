import React from "react";
import {Typography} from '@mui/material'
import { Link } from "react-router-dom";
import SentimentVeryDissatisfiedIcon from '@mui/icons-material/SentimentVeryDissatisfied';


function NotFoundPage() {
  return (
    <div style={{ textAlign: 'center', marginTop: '2rem' }}>
    <SentimentVeryDissatisfiedIcon
      style={{ fontSize: '5rem', color: '#f44336' }}
    />
    <Typography variant="h4" component="h1" gutterBottom>
      Oops! Page Not Found
    </Typography>
    <Typography variant="body1">
      We searched high and low, but couldn't find the page you were looking for.
    </Typography>
    <Typography variant="body1" style={{ marginTop: '2rem' }}>
      Maybe you can go back to{' '}
      <Link to="/" style={{ textDecoration: 'underline' }}>
        the homepage
      </Link>{' '}
      and try again?
    </Typography>
  </div>
  );
}

export default NotFoundPage;
