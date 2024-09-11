export const created = <T>(data: T) => {
  return {
    statusCode: 201,
    body: data,
  };
};