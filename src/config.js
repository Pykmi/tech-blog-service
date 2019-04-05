import dotenv from 'dotenv';

const STAGE = process.env.NODE_ENV;
export default () => (dotenv.config({ path: `./.env.${STAGE}` }));