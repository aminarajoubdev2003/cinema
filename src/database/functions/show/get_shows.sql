CREATE OR REPLACE FUNCTION get_shows()
RETURNS TABLE (
    movie_title TEXT, hall_name TEXT, start_time TIMESTAMP, end_time TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN

RETURN QUERY
    SELECT
        m.title,
        h.name,
        sh.start_time,
        sh.end_time
    FROM "Show" sh
    JOIN "Hall" h
        ON sh.hall_id = h.id
    JOIN "Movie" m
        ON m.id = sh.movie_id
    ORDER BY sh.start_time DESC;

END;
$$;