import { Rubik } from 'next/font/google';
import { Roboto_Mono } from 'next/font/google';

const rubik = Rubik({
  subsets: ['latin'],
  variable: '--font-rubik',
  display: 'swap',
});

const robotoMono = Roboto_Mono({
  subsets: ['latin'],
  variable: '--font-roboto-mono',
  display: 'swap',
});

export const fonts = {
  rubik,
  robotoMono,
};
