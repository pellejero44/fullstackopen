const jwt = require('jsonwebtoken');

module.exports = (request, response, next) => {
  const authorization = request.get('authorization');
  let token = null;
  if (authorization && authorization.toLocaleLowerCase().startsWith('bearer')) {
    token = authorization.substring(7);
  }

  let decodedToken = {};
  try {
    decodedToken = jwt.verify(token, process.env.SECRET);
  } catch {}

  if (!token || !decodedToken.id) {
    return response.status(401).send({
      error: 'token missing or invalid',
    });
  }

  const { id: userId } = decodedToken;
  request.userId = userId;

  next();
};
