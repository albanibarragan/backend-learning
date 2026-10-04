import cors from 'cors';
const ACCEPTED_ORIGINS = ['http://localhost:3000', 'http://example.com'];

export const middlewareCors = ({ acceptedOrigins = ACCEPTED_ORIGINS } = {}) => {
  return cors({
    origin: (origin, callback) => {
      if (!origin || acceptedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Origen no permitido'));
      }
    }
  });
};