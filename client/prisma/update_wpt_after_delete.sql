CREATE OR REPLACE FUNCTION update_work_plan_template_updated_at()
RETURNS TRIGGER AS $$
BEGIN
    IF TG_OP = 'DELETE' THEN
        UPDATE work_plan_template
        SET updated_at = now()
        WHERE id = OLD.work_plan_template_id;
    ELSE
        UPDATE work_plan_template
        SET updated_at = now()
        WHERE id = NEW.work_plan_template_id;
    END IF;

    RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER trg_update_work_plan_template_updated_at
AFTER INSERT OR UPDATE OR DELETE ON work_step_template
FOR EACH ROW
EXECUTE FUNCTION update_work_plan_template_updated_at();
