let responseDto = (success, data, message) => {
  return {
    data: data,
    message: message,
    success: success
  };
};

module.exports = responseDto;
