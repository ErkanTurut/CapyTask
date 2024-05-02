CREATE OR REPLACE FUNCTION create_work_step(
    work_plan_template_id_param TEXT,
    work_plan_id TEXT
)
RETURNS VOID
AS $$
BEGIN
    -- Copy step_template records linked to the inspection_template
    INSERT INTO work_step (id, name, description, created_at, updated_at, parent_step_id, created_by_id, step_order, work_plan_id)
    SELECT nanoid(17), 
           name, 
           description, 
           created_at, 
           updated_at, 
           parent_step_id, 
           created_by_id, 
           step_order, 
           work_plan_id
    FROM work_step_template
    WHERE work_step_template.work_plan_template_id = work_plan_template_id_param;
END;
$$ LANGUAGE plpgsql;
