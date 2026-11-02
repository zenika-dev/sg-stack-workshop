# Event Management — Product Requirements Document (reference)

> Reference PRD for participants who could not finish Section 1 (Specs).
> Copy it into `02-application/event-listing-service/docs/product/` (step 2.3).

## 1. Context

The Event Listing Service lists upcoming tech community events (meetups, workshops, conferences,
flagship events) ranked by a prominence score. Today, events can only be added or changed by an
engineer, directly in the database, from a spreadsheet sent by the Events Coordinator. Corrections
take 2 to 3 days, and nothing checks the data: dates in the wrong format, events with no date or a
date typed as "sometime next week" reach the database.

This is a new feature added to the existing listing page, not a new application.

## 2. Users

- **Events Coordinator**: manages the events sent by about 40 external organisers. Not technical.

## 3. Goals

- The Events Coordinator can add and correct events without an engineer, in minutes.
- Invalid data can no longer be saved.

## 4. Requirements

### 4.1 Add and edit events

| ID | Requirement |
|---|---|
| EM-1 | An "Add event" button in the header of the existing listing page opens an add / edit modal, empty, titled "Add event". |
| EM-2 | An "Edit" button on each event card opens the same modal, pre-filled, titled "Edit event". |
| EM-3 | Fields: title, kind, status, start date and time, topics, venue, embargoed until, archived. The creation date is set automatically. |
| EM-4 | An event is saved only if it is valid (see 4.2). Each invalid field shows a clear message under it, the modal stays open, and nothing is saved. |
| EM-5 | "Cancel" and the Escape key close the modal without saving. |
| EM-6 | After saving, the modal closes, a short confirmation is shown and the saved event's card is highlighted. |
| EM-7 | The modal and the new buttons follow the existing style of the listing page. |
| EM-8 | The rest of the listing page (header counters, filters, cards) and the ranking do not change. |

### 4.2 Validation rules

| Field | Rule |
|---|---|
| Title | Required, 3 to 120 characters |
| Kind | Required, one of: meetup, workshop, conference, flagship |
| Status | Required, one of: announced, open (registration open), tentative, completed |
| Start date and time | Required, a real date and time in Singapore time, picked with a date and time picker (no free text) |
| Topics | Optional, list of single-word topics, lowercase, no duplicates |
| Venue | Optional, up to 100 characters |
| Embargoed until | Optional, a real date and time, before the start date |
| Archived | On / off switch, off by default |

## 5. User stories and acceptance criteria

**US-1 — Add an event.** As the Events Coordinator, I want to add an event myself, so that it is published without waiting for an engineer.
- Given I am on the listing page, when I click "Add event" and save a workshop titled "Testing with Playwright" starting in 3 days with valid data, then the modal closes and the new event is shown as a highlighted card.

**US-2 — Correct an event.** As the Events Coordinator, I want to edit an existing event, so that corrections are made immediately.
- Given the event "Contract Law for Speakers", when I click "Edit" on its card, change its venue to "Funan Level 7" and save, then its card shows the new venue.
- Given the edit modal is open, when I press Escape, then the modal closes and nothing is changed.

**US-3 — Prevent bad data.** As the Events Coordinator, I want invalid events to be refused, so that mistakes do not reach the database.
- Given the add event modal, when I leave the start date empty and click "Save", then the event is not saved, the modal stays open and the message "Start date and time is required" is shown under the field.
- Given the add event modal, when I choose an embargo date after the start date and click "Save", then the event is not saved and a message explains why.

**US-4 — Set an embargo.** As the Events Coordinator, I want to set the "Embargoed until" date of an event, so that the organiser's announcement date is recorded with the event.
- Given an event, when I set "Embargoed until" to a date before its start date and save, then the date is saved and shown when I open "Edit" again.

**US-5 — Archive an event.** As the Events Coordinator, I want to switch "Archived" on for an event, so that it is recorded as archived.
- Given an event, when I switch "Archived" on and save, then the switch is still on when I open "Edit" again.

## 6. Out of scope

Any other change to the listing page, its filters and its ranking; user accounts and permissions;
organiser self-service; registration and ticketing; recurring series.

## 7. Open questions

- Should existing events with bad data be fixed by hand, or flagged? (owner: Programme squad)
- Can a completed event still be edited? (owner: Events Coordinator)
