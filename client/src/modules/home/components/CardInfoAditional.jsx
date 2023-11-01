import React from 'react';
import {
  Button,
  Container,
  Grid,
  IconButton,
  Paper,
  Typography,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

function CardInfoAditional({ text, setView }) {
  return (
    <Paper>
      <Container>
        <Grid container alignItems="center">
          <Grid item xs={10} marginTop={'2rem'}  marginBottom={'2rem'} >
            <Typography variant="h5">¿Qué es esto?</Typography>
          </Grid>
          <Grid item xs={2} style={{ display: 'flex', justifyContent: 'flex-end' }}>
            <IconButton
              onClick={() => setView(true)}
              sx={{ bgcolor: 'white', border: '1px solid red',  }}
            >
              <CloseIcon sx={{ fontSize: '20px', color : 'red' }} />
            </IconButton>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Typography sx={{ textAlign: 'justify' }}>{text}</Typography>
        </Grid>
      </Container>
    </Paper>
  );
}

export default CardInfoAditional;
