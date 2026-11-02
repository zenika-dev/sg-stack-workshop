import {initDb} from '../backend/db/seed';
import {DB_PATH} from '../backend/db/connection';

initDb();
console.log(`Reset ${DB_PATH} to the seed data.`);
