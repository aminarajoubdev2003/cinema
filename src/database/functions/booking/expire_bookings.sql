CREATE OR REPLACE FUNCTION expire_bookings()
RETURNS VOID
LANGUAGE plpgsql
AS $$
BEGIN

UPDATE "Booking" SET status = 'EXPIRED' WHERE status = 'RESERVED' AND expires_at <= NOW();

END;
$$;