CREATE OR REPLACE FUNCTION manage_work_plan(_work_plan_template_id TEXT, _team_id TEXT)
RETURNS TABLE (
    work_plan_id TEXT,
    name TEXT,
    team_id TEXT,
    work_plan_template_id TEXT,
    description TEXT,
    created_at TIMESTAMPTZ,
    updated_at TIMESTAMPTZ
) AS $$
DECLARE
    work_plan_template RECORD;
    work_plan RECORD;
BEGIN
    -- Fetch work_plan_template by id
    SELECT * INTO work_plan_template
    FROM work_plan_template
    WHERE id = _work_plan_template_id;

    IF NOT FOUND THEN
        RAISE EXCEPTION 'Work plan template not found';
    END IF;

    -- Fetch work_plan by work_plan_template_id and created_at
    SELECT * INTO work_plan
    FROM work_plan
    WHERE work_plan_template_id = _work_plan_template_id
    AND created_at = work_plan_template.updated_at;

    -- If work_plan is not found, insert a new one
    IF NOT FOUND THEN
        INSERT INTO work_plan (
            name, team_id, work_plan_template_id, description,
            created_at, updated_at
        ) VALUES (
            work_plan_template.name, _team_id, work_plan_template.id,
            work_plan_template.description, work_plan_template.updated_at,
            work_plan_template.updated_at
        )
        RETURNING * INTO work_plan;
    END IF;

    -- Return the final work_plan
    RETURN QUERY
    SELECT work_plan.id, work_plan.name, work_plan.team_id,
           work_plan.work_plan_template_id, work_plan.description,
           work_plan.created_at, work_plan.updated_at;
END;
$$ LANGUAGE plpgsql;
