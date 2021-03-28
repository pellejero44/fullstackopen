const ERROR_HANDLERS = {
  CastError: (response) =>
    response.status(400).send({ error: 'Value for id cannot be cast' }),
  ValidationError: (response, { message }) =>
    response.status(409).send({ error: message }),
  JsonWebTokenError: (response) =>
    response.status(401).send({ error: 'token missing or invalid' }),
  TokenExpirerError: (response) =>
    response.status(401).send({ error: 'token expired' }),
  defaultError: (response) => response.status(500).send(error.response.data),
};

module.exports = (error, request, response, next) => {
  const handler = ERROR_HANDLERS[error.name] || ERROR_HANDLERS.defaultError;
  handler(response, error);
};
