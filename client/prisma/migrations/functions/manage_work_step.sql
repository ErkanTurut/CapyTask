CREATE OR REPLACE FUNCTION manage_work_step(work_plan_id TEXT, work_plan_template_id TEXT)
RETURNS TABLE (
    work_step_id TEXT,
    name TEXT,
    description TEXT,
    step_order INTEGER,
    work_step_template_id TEXT,
    parent_step_id TEXT,
    work_plan_id TEXT
) AS $$
DECLARE
    work_step RECORD;
    work_step_template RECORD;
    work_step_exists BOOLEAN;
BEGIN
    -- Check if there are already work steps related to the work plan
    SELECT TRUE INTO work_step_exists
    FROM work_step
    WHERE work_plan_id = work_plan_id
    LIMIT 1;

    IF work_step_exists THEN
        -- Return existing work steps
        RETURN QUERY
        SELECT * FROM work_step WHERE work_plan_id = work_plan_id;
    ELSE
        -- Fetch work_step_template by work_plan_template_id
        FOR work_step_template IN
            SELECT *
            FROM work_step_template
            WHERE work_plan_template_id = work_plan_template_id
        LOOP
            -- Insert new work steps based on the templates
            INSERT INTO work_step (
                name, description, step_order, work_step_template_id, parent_step_id, work_plan_id
            ) VALUES (
                work_step_template.name, work_step_template.description,
                work_step_template.step_order, work_step_template.id,
                work_step_template.parent_step_id, work_plan_id
            )
            RETURNING * INTO work_step;

            -- Return the inserted work step
            RETURN QUERY
            SELECT work_step.id, work_step.name, work_step.description,
                   work_step.step_order, work_step.work_step_template_id,
                   work_step.parent_step_id, work_step.work_plan_id;
        END LOOP;
    END IF;
END;
$$ LANGUAGE plpgsql;
