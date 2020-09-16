import {
    config
} from 'dotenv';

const {
    parsed
} = config();

export const {
    DB,
    PORT,
    SECRET,
    BASE_URL = `http://localhost:${PORT}/`
} = parsed;