import { Inter } from 'next/font/google';
import { Box, Button, Typography } from '@mui/material';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Inventory Management System',
  description: 'Quick and easy fix to all your inventory management needs',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Box component="header" sx={headerStyle}>
          <Box sx={headerLeftStyle}>
            <Typography variant="h6">Inventory Management System</Typography>
          </Box>
          <Box sx={headerRightStyle}>
            <Button variant="outlined" sx={outlinedButtonStyle} href="/">
              Home
            </Button>
            <Button variant="outlined" sx={outlinedButtonStyle} href="/">
              Inventory
            </Button>
          </Box>
        </Box>
        <Box component="main" sx={mainStyle}>{children}</Box>
        <Box component="footer" sx={footerStyle}>
          <Typography>Footer</Typography>
        </Box>
      </body>
    </html>
  );
}

const headerStyle = {
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  backgroundColor: '#001328', // Dark navy blue for header background
  color: '#09D4F8', // Bright blue text color
  padding: '1rem',
  borderBottom: `2px solid #001328`, // Dark navy blue border
};

const headerLeftStyle = {
  flex: 1,
};

const headerRightStyle = {
  display: 'flex',
  gap: '1rem',
};

const outlinedButtonStyle = {
  borderColor: '#09D4F8', // Bright blue for button border
  color: '#09D4F8', // Bright blue text color
  '&:hover': {
    borderColor: '#FFFFFF', // White border color on hover
    color: 'WHITE', // White text color on hover
  },
};

const mainStyle = {
  flex: 1,
  display: 'flex',
  flexDirection: 'column',
};

const footerStyle = {
  backgroundColor: '#001328', // Dark navy blue for footer
  color: '#09D4F8', // Bright blue text color
  padding: '1rem',
  textAlign: 'center',
};
