import createHttpError from 'http-errors';

export const notFound = (req, res, next) => {
  throw createHttpError(404, 'Route not found');
};
