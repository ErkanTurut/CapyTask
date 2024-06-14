CREATE OR REPLACE FUNCTION create_work_step(
    _work_plan_template_id TEXT,
    _work_plan_id TEXT
)
RETURNS VOID
AS $$
BEGIN
    -- Copy step_template records linked to the inspection_template
    INSERT INTO work_step (id, name, description, created_at, updated_at, parent_step_id, created_by_id, step_order, _work_plan_id)
    SELECT nanoid(17), 
           name, 
           description, 
           created_at, 
           updated_at, 
           parent_step_id, 
           created_by_id, 
           step_order, 
           _work_plan_id
    FROM work_step_template
    WHERE work_step_template.work_plan_template_id = _work_plan_template_id;
END;
$$ LANGUAGE plpgsql;
