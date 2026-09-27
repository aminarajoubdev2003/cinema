CREATE OR REPLACE FUNCTION create_show(
    p_hall_id INT,
    P_movie_id INT,
    P_start_time TIMESTAMP,
    P_end_time TIMESTAMP
)
RETURNS TABLE (
    hall_id INT,
    movie_id INT,
    start_time TIMESTAMP,
    end_time TIMESTAMP
)
LANGUAGE plpgsql
AS $$
BEGIN

IF p_end_time <= p_start_time 
    THEN RAISE EXCEPTION 'INVALID_SHOW_TIME'; 
END IF;

IF p_start_time < CURRENT_TIMESTAMP + INTERVAL '24 hours' 
    THEN RAISE EXCEPTION 'SHOW_MUST_BE_AT_LEAST_24_HOURS_AHEAD';
END IF;

IF p_start_time::DATE <> p_end_time::DATE 
    THEN RAISE EXCEPTION 'SHOW_MUST_BE_ON_SAME_DAY';
END IF;

IF NOT EXISTS ( SELECT 1 FROM "Hall" WHERE id = p_hall_id ) 
    THEN RAISE EXCEPTION 'HALL_NOT_FOUND'; 
END IF; 
    
IF NOT EXISTS ( SELECT 1 FROM "Movie" WHERE id = p_movie_id ) 
    THEN RAISE EXCEPTION 'MOVIE_NOT_FOUND'; 
END IF; 

IF EXISTS ( SELECT 1 FROM "Show" s WHERE s.hall_id = p_hall_id AND p_start_time < s.end_time AND p_end_time > s.start_time ) 
    THEN RAISE EXCEPTION 'SHOW_TIME_CONFLICT'; 
END IF;

RETURN QUERY
INSERT INTO "Show" ( hall_id, movie_id, start_time, end_time ) 
VALUES ( p_hall_id, P_movie_id, P_start_time, P_end_time) 
RETURNING "Show".hall_id, "Show".movie_id, "Show".start_time, "Show".end_time;
END;
$$;