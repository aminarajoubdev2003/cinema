CREATE OR REPLACE FUNCTION create_moive(
    p_title TEXT
)
RETURNS TABLE (
    movie_title TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN

IF EXISTS ( SELECT 1 FROM "Movie" WHERE title = p_title ) 
    THEN RAISE EXCEPTION 'MOVIE_ALREADY_EXISTS';
END IF;

RETURN QUERY
INSERT INTO "Movie" ( title ) VALUES ( p_title ) RETURNING "Movie".title;
END;
$$;