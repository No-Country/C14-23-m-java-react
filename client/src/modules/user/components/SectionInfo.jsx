import React from 'react';
import Lottie from 'lottie-react';
import ConfUser from '../../../assets/LottiesAnimations/confUserLottie.json';
import { Box, Typography } from '@mui/material';

function SectionInfo() {
  return (
    <Box
      display="flex"
      flexDirection={{ xs: 'column', sm: 'row' }}
      alignItems="center"
      padding="1rem"
       bgcolor="#f5f5f5"
    >
      <Box flex={{ xs: 'none', sm: '1' }} maxWidth={{ lg : '' }}>
        <Lottie animationData={ConfUser} />
      </Box>
      <Box flex="1">
        <Typography variant="h5" margin="1rem">
          Administra tu cuenta
        </Typography>
        <Typography textAlign="justify"  margin="1rem">
          Esta sección te permite personalizar la aplicación según tus preferencias. Aquí, puedes establecer objetivos de ahorro mensuales y ajustar la aplicación a tu manera. Esto te ayuda a tomar el control de tus finanzas y alcanzar tus metas de manera más eficaz.
        </Typography>
      </Box>
    </Box>
  );
}

export default SectionInfo;
