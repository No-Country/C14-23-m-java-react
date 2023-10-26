import { Box } from '@mui/material';
import React from 'react';
import SectionInfo from './components/SectionInfo';
import UserSettings from './components/UserSettings';
import SavingsManager from './components/SavingsManager';

function UserContainer(props) {
  return (
    <Box>
      <Box>
        <SectionInfo />
      </Box>

      <Box>
        <SavingsManager />
      </Box>

      <UserSettings />
    </Box>
  );
}

export default UserContainer;
