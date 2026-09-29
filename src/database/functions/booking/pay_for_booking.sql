CREATE OR REPLACE FUNCTION pay(
    p_user_id INT,
    P_booking_id INT
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
    v_price DECIMAL(10,2);
    v_balance DECIMAL(10,2);
BEGIN


PERFORM 1  FROM "User" WHERE id = p_user_id;
IF NOT FOUND THEN
    RAISE EXCEPTION 'USER_NOT_FOUND';
END IF;

SELECT u.balance INTO v_balance FROM "User" u WHERE u.id = p_user_id
FOR UPDATE;

PERFORM 1  FROM "Booking" b WHERE b.id = P_booking_id AND b.user_id = p_user_id AND b.status = 'RESERVED' AND b.expires_at > NOW()
FOR UPDATE;
IF NOT FOUND THEN
    RAISE EXCEPTION 'BOOKING_NOT_AVAILABLE';
END IF;

SELECT s.price INTO v_price FROM "Booking" b JOIN "Seat" s ON s.id = b.seat_id WHERE b.id = p_booking_id;
IF (v_balance < v_price) THEN
    RAISE EXCEPTION 'INSUFFICIENT_BALANCE';
END IF;

UPDATE "User" SET balance = balance - v_price WHERE id = p_user_id;
UPDATE "Booking" SET status = 'PAID',amount = v_price WHERE id = p_booking_id;

RETURN QUERY
SELECT
    b.user_id,
    b.show_id,
    b.seat_id,
    b.status,
    b.expires_at,
    b.created_at,
    b.amount
FROM "Booking" b
WHERE b.id = p_booking_id;

END;
$$;




