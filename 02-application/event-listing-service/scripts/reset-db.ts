import {DB_PATH, initDb} from '../lib/db';

initDb();
console.log(`Reset ${DB_PATH} to the seed data.`);
