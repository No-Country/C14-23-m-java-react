import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import SectionInfo from './components/SectionInfo';
import SavingsManager from './components/SavingsManager';
import { useUser } from '../../context/UserContext';
import Cookies from 'js-cookie';

function SavingsContainer() {
  const { userData } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!userData) {
      Cookies.remove('token');
      navigate('/login');
    }
  }, [userData]);

  return (
    <Box>
      <Box>
        <SectionInfo />
      </Box>

      <Box>
        <SavingsManager />
      </Box>
    </Box>
  );
}

export default SavingsContainer;
