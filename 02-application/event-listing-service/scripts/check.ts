import {initDb, SEED_NOW} from '../backend/db/seed';
import {findAll} from '../backend/repositories/events';
import {buildEventList} from '../backend/services/events';

initDb();
const events = buildEventList(findAll(), {view: 'upcoming'}, 25, SEED_NOW);
for (const e of events) {
  console.log(`${String(e.score).padStart(4)}  id=${String(e.id).padEnd(3)} ${e.title}`);
}
