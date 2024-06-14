CREATE OR REPLACE FUNCTION manage_work_step_status(work_plan_id TEXT, work_order_id TEXT)
RETURNS VOID AS $$
DECLARE
    work_step RECORD;
BEGIN
    -- Fetch work steps related to the work plan
    FOR work_step IN
        SELECT * FROM work_step WHERE work_plan_id = work_plan_id
    LOOP
        -- Insert or update work step statuses
        INSERT INTO work_step_status (
            work_step_id, work_order_id, step_order
        ) VALUES (
            work_step.id, work_order_id, work_step.step_order
        )
        ON CONFLICT (work_step_id, work_order_id) DO NOTHING;
    END LOOP;
END;
$$ LANGUAGE plpgsql;
