const semanticTokens = {
  colors: {
    accents: {
      backgroundPrimary: { default: 'brandLight.1', _dark: 'brandDark.1' },
      backgroundSecondary: { default: 'brandLight.2', _dark: 'brandDark.2' },
      interactivePrimary: { default: 'brandLight.3', _dark: 'brandDark.3' },
      interactiveSecondary: { default: 'brandLight.4', _dark: 'brandDark.4' },
      interactiveTertiary: { default: 'brandLight.5', _dark: 'brandDark.5' },
      borderPrimary: { default: 'brandLight.6', _dark: 'brandDark.6' },
      borderSecondary: { default: 'brandLight.7', _dark: 'brandDark.7' },
      borderTertiary: { default: 'brandLight.8', _dark: 'brandDark.8' },
      solidPrimary: { default: 'brandLight.9', _dark: 'brandDark.9' },
      solidSecondary: { default: 'brandLight.10', _dark: 'brandDark.10' },
      textPrimary: { default: 'brandLight.11', _dark: 'brandDark.11' },
      textSecondary: { default: 'brandLight.12', _dark: 'brandDark.12' },
    },
    gray: {
      backgroundPrimary: { default: 'grayLight.1', _dark: 'grayDark.1' },
      backgroundSecondary: { default: 'grayLight.2', _dark: 'grayDark.2' },
      interactivePrimary: { default: 'grayLight.3', _dark: 'grayDark.3' },
      interactiveSecondary: { default: 'grayLight.4', _dark: 'grayDark.4' },
      interactiveTertiary: { default: 'grayLight.5', _dark: 'grayDark.5' },
      borderPrimary: { default: 'grayLight.6', _dark: 'grayDark.6' },
      borderSecondary: { default: 'grayLight.7', _dark: 'grayDark.7' },
      borderTertiary: { default: 'grayLight.8', _dark: 'grayDark.8' },
      solidPrimary: { default: 'grayLight.9', _dark: 'grayDark.9' },
      solidSecondary: { default: 'grayLight.10', _dark: 'grayDark.10' },
      textPrimary: { default: 'grayLight.11', _dark: 'grayDark.11' },
      textSecondary: { default: 'grayLight.12', _dark: 'grayDark.12' },
    },
    gradients: {
      nav: {
        default: 'linear-gradient(to bottom, #FDFDFE 80%, rgba(253, 253, 254, 0.98) 95%, rgba(253, 253, 254, 0.95))',
        _dark: 'linear-gradient(to bottom, #1D2938 80%, rgba(29, 41, 56, 0.98) 95%, rgba(29, 41, 56, 0.95) 100%)',
      },
      background: {
        default: 'linear-gradient(180deg, #DFEAFF 0%, transparent 100%)',
        _dark: 'linear-gradient(to bottom, rgba(240, 240, 240, 0.05) 0%, transparent 100%)',
      },
    },
  },
};

export default semanticTokens;
