CREATE OR REPLACE FUNCTION create_hall(
    p_name TEXT
)
RETURNS TABLE (
    hall_name TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN

IF EXISTS ( SELECT 1 FROM "Hall" WHERE name = p_name ) 
    THEN RAISE EXCEPTION 'HALL_ALREADY_EXISTS';
END IF;

RETURN QUERY
INSERT INTO "Hall" ( name ) VALUES ( p_name ) RETURNING "Hall".name;
END;
$$;

CREATE OR REPLACE FUNCTION create_hall_seats() RETURNS TRIGGER LANGUAGE plpgsql
AS $$
DECLARE
    row_number INT;
    seat_number INT;
BEGIN
    FOR row_number IN 1..10 LOOP
        FOR seat_number IN 1..12 LOOP
            INSERT INTO "Seat" (hall_id,row,number,price)
            VALUES (NEW.id,CHR(64 + row_number),seat_number,(11 - row_number) * 10000);
        END LOOP;
    END LOOP;
RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS create_hall_seats_trigger ON "Hall";

CREATE TRIGGER create_hall_seats_trigger AFTER INSERT ON "Hall" FOR EACH ROW 
EXECUTE FUNCTION create_hall_seats();



