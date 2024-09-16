CREATE OR REPLACE FUNCTION remove_overlaps(
    main_range tstzrange,
    other_ranges tstzrange[]
) 
RETURNS TABLE (
    result_range tstzrange
) 
LANGUAGE plpgsql
AS $$
DECLARE
    current_range tstzrange;
    temp_range tstzrange;
BEGIN
    -- Initialize the current range with the main range
    current_range := main_range;

    -- Iterate through each range in the array
    FOREACH temp_range IN ARRAY other_ranges
    LOOP
        -- Skip the intersection and move to the next non-overlapping range
        IF current_range && temp_range THEN
            -- Generate left range before overlap
            IF lower(current_range) < lower(temp_range) THEN
                result_range := tstzrange(lower(current_range), lower(temp_range));
                RETURN NEXT;
            END IF;

            -- Adjust the current range to the remaining part after the overlap
            IF upper(temp_range) < upper(current_range) THEN
                current_range := tstzrange(upper(temp_range), upper(current_range));
            ELSE
                -- If the temp range covers the current range, exit the loop
                RETURN;
            END IF;
        END IF;
    END LOOP;

    -- If there's any part of the current range left after processing all other ranges, return it
    IF lower(current_range) < upper(current_range) THEN
        result_range := current_range;
        RETURN NEXT;
    END IF;
END;
$$;
