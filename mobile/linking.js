const config = {
  screens: {
    Login: {
      path: 'login/:params',
      parse: {
        name: params => `${params}`,
      },
    },
  },
};

const linking = {
  prefixes: ['socialpassport://app'],
  config,
};

export default linking;
