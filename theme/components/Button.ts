import { defineStyleConfig, defineStyle } from '@chakra-ui/styled-system';

const primaryVariant = defineStyle({
  bg: 'accents.solidPrimary',
  color: 'white',
  border: '1px solid',
  borderColor: 'accents.borderSecondary',
  _hover: {
    bg: 'accents.borderTertiary',
    borderColor: 'accents.borderPrimary',
    _disabled: {
      bg: 'accents.solidPrimary',
    },
  },
});

const secondaryVariant = defineStyle({
  bg: 'accents.interactiveTertiary',
  color: 'gray.textSecondary',
  border: '1px solid',
  borderColor: 'accents.borderSecondary',
  _hover: {
    bg: 'accents.interactiveSecondary',
    borderColor: 'accents.borderPrimary',
  },
});

const phantomVariant = defineStyle({
  color: 'gray.textSecondary',
  border: '1px solid',
  borderColor: 'gray.borderPrimary',
  bg: 'gray.backgroundSecondary',
  _hover: {
    bg: 'accents.interactiveTertiary',
    borderColor: 'accents.borderPrimary',
  },
  _active: {
    bg: 'accents.solidPrimary',
    color: 'white',
    borderColor: 'accents.backgroundPrimary',
    boxShadow: '2px 1px 5px 1px rgba(255, 255, 255, 0.12)',
  },
});

const linkVariant = defineStyle({
  color: 'gray.textSecondary',
  _hover: {
    color: 'gray.textPrimary',
    textDecoration: 'underline',
  },
});

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: '7px',
    fontWeight: '400',
    fontFamily: 'var(--font-rubik)',
    _disabled: {
      opacity: '0.7',
      cursor: 'not-allowed',
    },
    _hover: {
      _disabled: {
        cursor: 'not-allowed',
      },
    },
  },
  sizes: {
    sm: {
      px: '12px',
      h: '24px',
      fontSize: 'sm',
    },
    md: {
      px: '12px',
      h: '32px',
      fontSize: 'md',
    },
    lg: {
      px: '12px',
      h: '40px',
      fontSize: 'lg',
    },
    xl: {
      px: '16px',
      h: '48px',
      fontSize: 'xl',
    },
  },
  variants: {
    primary: primaryVariant,
    secondary: secondaryVariant,
    phantom: phantomVariant,
    link: linkVariant,
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
  },
});

export default Button;
