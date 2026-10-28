# Event listing order: product spec

This is the spec the Programme squad works from. It was last edited by a
producer, not an engineer, and it has not been re-read since the mobile launch.

## Which events appear

The default view shows **upcoming** events. An event is excluded when:

- it has **completed** (unless the caller asked for the `past` view), or
- it is **archived**.

Archiving is permanent from the organiser's point of view. An archived event
must never appear in any listing unless the caller explicitly opts in with
`include_archived`.

Optional filters, all combined with AND:

- `venue`: exact match on the venue name.
- `topic`: the event must carry that topic. Topics are a set, not free text.

## Ordering

Events are ranked by a prominence score, highest first.

1. Base score comes from the kind of event: meetup 1, workshop 3, conference 7,
   flagship 12.
2. **An event that is currently running always ranks above one that has not
   started yet.** This applies regardless of the kind of event: if it is
   happening right now, someone might still walk in.
3. An event **starting within the next 7 days, inclusive of today and of day 7**,
   gets a boost that grows as the start date approaches.
4. An event tagged `featured` gets a fixed boost.
5. An event with registration currently open gets a small boost, so that
   anything you can still buy a ticket for stays visible.
6. An event that has been listed for more than 30 days accrues a small
   visibility boost, capped, so that quiet listings are not buried forever.

Ties are broken by start date (soonest first), then by event id ascending. The
order must be stable: the same inputs must always produce the same output order.

## Counts

The header chips show two numbers: how many events are listed, and how many are
running right now. Both counts respect archiving and must agree with what the
listing shows.

## Non-goals

Recurring series, multi-track schedules and speaker management are out of scope
for now.
