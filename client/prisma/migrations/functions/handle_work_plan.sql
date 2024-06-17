CREATE OR REPLACE FUNCTION handle_work_plan(
    _work_plan_template_id TEXT
)
RETURNS TEXT
AS $$
DECLARE
    _work_plan_id TEXT;
    _work_plan_created_at TIMESTAMP WITH TIME ZONE;
BEGIN
    -- Fetch creation timestamp from the work plan template
    SELECT updated_at INTO _work_plan_created_at
    FROM work_plan_template
    WHERE id = _work_plan_template_id;

    -- Check if a snapshot already exists for the given work plan template
    SELECT id INTO _work_plan_id 
    FROM work_plan
    WHERE work_plan.work_plan_template_id = _work_plan_template_id
    AND work_plan.created_at = _work_plan_created_at;

    -- If snapshot doesn't exist, create a new one
    IF _work_plan_id IS NULL THEN
        INSERT INTO work_plan (id, work_plan_template_id,team_id, name, description, created_at, updated_at)
        SELECT nanoid(10), _work_plan_template_id, team_id, name, description, _work_plan_created_at, _work_plan_created_at
        FROM work_plan_template
        WHERE id = _work_plan_template_id
        RETURNING id INTO _work_plan_id;

        -- Call create_step_template_snapshot function
        PERFORM create_work_step(_work_plan_template_id, _work_plan_id);

    END IF;

    RETURN _work_plan_id;

END;
$$ LANGUAGE plpgsql;
