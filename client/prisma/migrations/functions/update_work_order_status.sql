CREATE OR REPLACE FUNCTION update_work_order_status()
RETURNS TRIGGER AS $$
BEGIN
    -- Check if all work steps for the updated work_order are completed
    IF NOT EXISTS (
        SELECT 1
        FROM work_steps
        WHERE work_order_id = NEW.work_order_id
        AND work_step_status <> 'completed'
    ) THEN
        -- Update work_order status to 'completed'
        UPDATE work_orders
        SET work_order_status = 'completed'
        WHERE id = NEW.work_order_id;
    END IF;
    
    RETURN NEW;
END;
$$ LANGUAGE plpgsql;




CREATE TRIGGER trg_update_work_plan_template_updated_at
AFTER INSERT OR UPDATE OR DELETE ON work_step_template
FOR EACH ROW
EXECUTE FUNCTION update_work_plan_template_updated_at();
