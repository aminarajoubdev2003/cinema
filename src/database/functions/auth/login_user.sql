CREATE OR REPLACE FUNCTION login(
    p_email TEXT
)
RETURNS TABLE (
    user_id INT, 
    user_email TEXT, 
    user_password TEXT, 
    user_role TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN

IF NOT EXISTS (  SELECT 1 FROM "User" WHERE email = p_email ) 
    THEN RAISE EXCEPTION 'INVALID_EMAIL';
END IF;

RETURN QUERY
SELECT  "User".id, "User".email, "User".password, "User".role FROM "User"  WHERE "User".email = p_email;
END;
$$;