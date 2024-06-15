CREATE OR REPLACE FUNCTION manage_work_step_status(_work_plan_id TEXT, _work_order_id TEXT)
RETURNS VOID AS $$
DECLARE
    work_step RECORD;
    existing_status RECORD;
BEGIN
    -- Fetch work steps related to the work plan
    FOR work_step IN
        SELECT ws.id, ws.step_order
        FROM work_step ws
        WHERE ws.work_plan_id = _work_plan_id
    LOOP
        -- Insert the work step status without checking for conflict
        INSERT INTO work_step_status (
            work_step_id, work_order_id, step_order
        ) VALUES (
            work_step.id, _work_order_id, work_step.step_order
        );
    END LOOP;
END;
$$ LANGUAGE plpgsql;
