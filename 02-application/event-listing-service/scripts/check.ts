import {fetchEvents, initDb, SEED_NOW} from '../lib/db';
import {buildEventList} from '../lib/events';

initDb();
const events = buildEventList(fetchEvents(), {view: 'upcoming'}, 25, SEED_NOW);
for (const e of events) {
  console.log(`${String(e.score).padStart(4)}  id=${String(e.id).padEnd(3)} ${e.title}`);
}
