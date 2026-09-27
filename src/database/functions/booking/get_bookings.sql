CREATE OR REPLACE FUNCTION get_user_bookings(
    p_user_id INT
)
RETURNS TABLE (
    booking_id INT,
    movie_title TEXT,
    hall_name TEXT,
    seat_row TEXT,
    seat_number INT,
    show_start_time TIMESTAMP,
    show_end_time TIMESTAMP,
    status TEXT,
    expires_at TIMESTAMP,
    amount DECIMAL(10,2),
    created_at TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN

RETURN QUERY
SELECT
        b.id,
        m.title,
        h.name,
        s.row,
        s.number,
        sh.start_time,
        sh.end_time,
        b.status,
        b.expires_at,
        b.amount,
        b.created_at
    FROM "Booking" b
    JOIN "Show" sh
        ON sh.id = b.show_id
    JOIN "Movie" m
        ON m.id = sh.movie_id
    JOIN "Hall" h
        ON h.id = sh.hall_id
    JOIN "Seat" s
        ON s.id = b.seat_id
    WHERE b.user_id = p_user_id
    ORDER BY b.created_at DESC;

END;
$$;