CREATE OR REPLACE FUNCTION deposit(
    p_email TEXT,
    p_amount DECIMAL
)
RETURNS TABLE (
    email TEXT,
    balance DECIMAL
)
LANGUAGE plpgsql
AS $$
BEGIN

IF NOT EXISTS (  SELECT 1 FROM "User" u WHERE u.email = p_email ) 
    THEN RAISE EXCEPTION 'INVALID_EMAIL';
END IF;

RETURN QUERY

UPDATE "User" u SET balance = u.balance + p_amount WHERE  u.email = p_email RETURNING u.email, u.balance;

END;
$$;