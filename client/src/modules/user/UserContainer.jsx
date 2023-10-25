import { Box } from '@mui/material';
import React from 'react';
import SectionInfo from './components/SectionInfo';
import UserSettings from './components/UserSettings';

function UserContainer(props) {
  return (
    <Box>
      <SectionInfo />
      <UserSettings />
    </Box>
  );
}

export default UserContainer;
