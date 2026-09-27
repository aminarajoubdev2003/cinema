CREATE OR REPLACE FUNCTION register(
    p_name TEXT,
    p_email TEXT,
    p_password TEXT,
    p_role TEXT
)
RETURNS TABLE (
    user_name TEXT,
    user_email TEXT
)
LANGUAGE plpgsql
AS $$
BEGIN

IF EXISTS ( SELECT 1 FROM "User" WHERE email = p_email) 
    THEN RAISE EXCEPTION 'EMAIL_ALREADY_EXISTS';
END IF;

RETURN QUERY

INSERT INTO "User" ( name,email,password,role ) VALUES ( p_name,p_email,p_password,p_role )
RETURNING "User".name,"User".email;

END;
$$;