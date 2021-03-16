export const environment = {
  production: true,
  base: (path: string) =>
    'https://documentos-vaticanos-api.herokuapp.com/'.concat(path),
};
