// src/theme.ts
'use client';
import { Roboto } from 'next/font/google';
import { createTheme } from '@mui/material/styles';

const roboto = Roboto({
  weight: ['300', '400', '500', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-roboto',
});

const theme = createTheme({
  typography: {
    fontFamily: roboto.style.fontFamily,
  },
  // You can customize your theme further here
});

export default theme;