import { Box } from '@mui/material';
import React from 'react';
import SectionInfo from './components/SectionInfo';
import SavingsManager from './components/SavingsManager';

function SavingsContainer() {
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
