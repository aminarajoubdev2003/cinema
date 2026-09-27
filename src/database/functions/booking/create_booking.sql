
CREATE OR REPLACE FUNCTION create_booking(
    p_user_id INT,
    p_show_id INT,
    p_seat_id INT
)
RETURNS TABLE (
    user_id INT,
    show_id INT,
    seat_id INT,
    status TEXT,
    expires_at TIMESTAMP,
    created_at TIMESTAMP,
    amount DECIMAL(10,2)
)
LANGUAGE plpgsql
AS $$

DECLARE
    v_hall_id INT;
BEGIN

    SELECT hall_id INTO v_hall_id FROM "Show"  WHERE id = p_show_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'SHOW_NOT_FOUND';
    END IF;

    PERFORM 1 FROM "Seat" WHERE id = p_seat_id AND hall_id = v_hall_id;
    IF NOT FOUND THEN
        RAISE EXCEPTION 'SEAT_NOT_FOUND';
    END IF;

    UPDATE "Booking" b SET status = 'EXPIRED' WHERE b.show_id = p_show_id
    AND b.seat_id = p_seat_id AND b.status = 'RESERVED' AND b.expires_at <= NOW();

    IF EXISTS ( SELECT 1 FROM "Booking" b WHERE b.show_id = p_show_id AND b.seat_id = p_seat_id
    AND ( b.status = 'PAID' OR ( b.status = 'RESERVED' AND b.expires_at > NOW()))
    ) THEN
        RAISE EXCEPTION 'SEAT_ALREADY_BOOKED';
    END IF;


    RETURN QUERY
    INSERT INTO "Booking" (user_id,show_id,seat_id,status,expires_at,created_at,amount)
    VALUES (p_user_id,p_show_id,p_seat_id,'RESERVED',NOW() + INTERVAL '10 minutes',NOW(),0)
    RETURNING "Booking".user_id,"Booking".show_id,"Booking".seat_id,"Booking".status,"Booking".expires_at,
    "Booking".created_at,"Booking".amount;

EXCEPTION WHEN unique_violation THEN RAISE EXCEPTION 'SEAT_ALREADY_BOOKED';
END;
$$;

