module.exports = (error, request, response, next) => {
  console.error(error);
  console.log(error.name);
  if (error.name === 'CastError') {
    return response.status(400).send({
      error: 'Value for id cannot be cast',
    });
  } else {
    return response.status(500).send(
      error.response.data
    );
  }
};
