export const created = <T>(data: T) => {
  return {
    statusCode: 201,
    body: data,
  };
};

export const success = <T>(data: T, cookies?: Record<string, string>) => {
  return {
    statusCode: 200,
    body: data,
    cookies,
  };
};
