import { defineStyleConfig, defineStyle } from '@chakra-ui/styled-system';

const primaryVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.700`,
    color: 'white',
    border: '1px solid',
    borderColor: `${c}.700`,
    _hover: {
      bg: `${c}.800`,
      borderColor: `${c}.100`,
    },
  };
});

const secondaryVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    color: `${c}.50`,
    border: '1px solid',
    borderColor: `${c}.700`,
    bg: `${c}.300`,
    _hover: {
      bg: `${c}.600`,
      color: `${c}.50`,
      borderColor: `${c}.800`,
    },
  };
});

const phantomVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    color: `${c}.900`,
    border: '1px solid',
    borderColor: `transparent`,
    _hover: {
      borderColor: `${c}.600`,
      border: '1px solid',
    },
    _active: {
      bg: `${c}.800`,
      color: `${c}.50`,
      borderColor: `${c}.600`,
      border: '1px solid',
    },
  };
});

const linkVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    color: `${c}.900`,
    _hover: {
      color: `${c}.800`,
      textDecoration: 'underline',
    },
  };
});

const flatVariant = defineStyle(props => {
  const { colorScheme: c } = props;
  return {
    bg: `${c}.700`,
    color: `${c}.50`,
    _hover: {
      color: `${c}.100`,
    },
  };
});

const Button = defineStyleConfig({
  baseStyle: {
    borderRadius: '7px',
    fontWeight: '400',
    fontFamily: 'var(--font-rubik)',
    _disabled: {
      opacity: '0.8',
      cursor: 'not-allowed',
      bg: 'gray.700',
    },
    _hover: {
      _disabled: {
        background: 'black',
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
    flat: flatVariant,
  },
  defaultProps: {
    size: 'md',
    variant: 'primary',
    colorScheme: 'brand',
  },
});

export default Button;
