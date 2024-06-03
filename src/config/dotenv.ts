import dotenvSafe from 'dotenv-safe';
import path from 'path';

dotenvSafe.config({
  allowEmptyValues: true,
  path: path.join(__dirname, `../../.env`),
});

export default dotenvSafe;
