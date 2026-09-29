-- This is an empty migration.
CREATE EXTENSION IF NOT EXISTS btree_gist;

ALTER TABLE "Show"
ADD CONSTRAINT show_no_overlap
EXCLUDE USING gist (
    hall_id WITH =,
    tsrange(start_time, end_time, '[)') WITH &&
);