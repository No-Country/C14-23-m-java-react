import { useEffect, useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  List,
  ListItem,
  ListItemText,
  ListItemSecondaryAction,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useIncome } from '../../../context/IncomeContext';
import CardIncomes from './CardIncomes';
import FilterComponent from './FilterComponent';

function IncomeDetails() {
  const [isHovered, setIsHovered] = useState(false);
  const { incomes, delIncome } = useIncome(); // uso el contexto

  const styles = {
    paper: {
      margin: '1rem',
      padding: '2rem',
      display: 'flex',
     justifyContent: 'center',
     
      transition: 'box-shadow 0.3s',
      cursor: 'pointer',
      width: '45vw',
      
      '@media (max-width: 899px)': {
        width: '90vw',
      },
    },
    paperHover: {
      boxShadow: '0 0 10px rgba(0, 255, 0, 0.5)',
    },
    contInfo: {
      backgroundColor: 'yellow',
    },
  };

  return (
    <Paper
      onMouseOver={() => setIsHovered(true)}
      onMouseOut={() => setIsHovered(false)}
      sx={{ ...styles.paper, ...(isHovered && styles.paperHover) }}
    >
      <Box sx={{
      '@media (max-width: 400px)': {
        display: 'flex', flexDirection: 'column',justifyContent: 'center'
      },}} >
        <Box>
          <Typography variant='h5' display={'flex'} justifyContent={'center'}>
            Tus ingresos
          </Typography>
          <FilterComponent />
        </Box>

        <List
          sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'greenyellow',
            
            '@media (max-width: 599px)': {
              width: '80vw',
            },
          }}
        >
          {incomes?.map((income, index) => {
            return (
              <CardIncomes
                key={index}
                id={income.idIncome}
                delIncome={delIncome}
                date={income.date}
                amount={income.amount}
                categoryName={income.categoryName}
                description={income.description}
              />
            );
          })}
        </List>
      </Box>
      {/* <Box sx={styles.contInfo} >
        <Typography variant='h5' display={'flex'} justifyContent={'center'}>
          Tus ingresos
        </Typography>

        <List  sx={{display: 'flex', flexDirection: 'column', alignItems: 'center' ,justifyContent: 'center', color:'greenyellow', width: '73vw'}} >
          {incomes?.map((income, index) => {
            return (
              <CardIncomes  key ={index} id={income.idIncome} delIncome={delIncome} date={income.date} amount={income.amount} categoryName={income.categoryName}  description={income.description}/>
              
            );
          })}
        </List>
      </Box> */}
    </Paper>
  );
}

export default IncomeDetails;
