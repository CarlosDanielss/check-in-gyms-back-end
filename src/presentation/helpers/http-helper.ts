export const created = <T>(data: T) => {
  return {
    statusCode: 201,
    body: data,
  };
};

export const sucess = <T>(data: T) => {
  return {
    statusCode: 200,
    body: data,
  };
};
