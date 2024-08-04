'use client';

import { Box, Button, Typography } from '@mui/material';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  const navigateToInventory = () => {
    router.push('/inventory'); // Adjust the path if needed
  };

  return (
    <Box
      width="100vw"
      height="100vh"
      display="flex"
      justifyContent="center"
      flexDirection="column"
      alignItems="center"
      gap={2}
    >
      <Box
        width="800px"
        padding={4}
        bgcolor="white"
        boxShadow="0px 4px 8px rgba(0, 0, 0, 0.2)"
        borderRadius="8px"
        textAlign="center"
      >
        <Typography variant="h2" gutterBottom>
          Welcome to Inventory Manager
        </Typography>
        <Typography variant="body1" paragraph>
          This app helps you manage your inventory efficiently. You can add, remove, and update items in your inventory with ease.
        </Typography>
        <Typography variant="body1" paragraph>
          Click the button below to get started with managing your inventory.
        </Typography>
        <Button variant="contained" color="primary" onClick={navigateToInventory}>
          Go to Inventory
        </Button>
      </Box>
    </Box>
  );
}
