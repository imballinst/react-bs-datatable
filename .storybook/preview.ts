// Need to wrap this and use `require`.
// This is because, during testing, we don't need to import Bootstrap CSS.
if (process.env.NODE_ENV !== 'test') {
  require('bootstrap/dist/css/bootstrap.css');
}

export const parameters = {
  actions: { argTypesRegex: '^on[A-Z].*' },
  controls: {
    matchers: {
      color: /(background|color)$/i,
      date: /Date$/
    }
  }
};
