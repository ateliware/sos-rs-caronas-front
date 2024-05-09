const pattern = RegExp(/^(https?:\/\/)?([^\s/?$#]+\.)+[^\s/?$#]+(\/.*)?$/);

export const formSitePattern = {
  pattern: {
    value: pattern,
    message: 'invalid website',
  },
};
