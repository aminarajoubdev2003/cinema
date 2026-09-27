CREATE OR REPLACE FUNCTION get_seats(
    p_show_id INT
)
RETURNS TABLE (
    seat_row TEXT,
    seat_number INT,
    price DECIMAL
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

RETURN QUERY
SELECT s.row, s.number, s.price FROM "Seat" s WHERE s.hall_id = v_hall_id 
AND NOT EXISTS ( SELECT 1 FROM "Booking" b WHERE b.seat_id = s.id AND b.show_id = p_show_id 
AND ( b.status = 'PAID' OR ( b.status = 'RESERVED' AND b.expires_at > NOW() ) ) ) 
ORDER BY s.row, s.number;

END;
$$;