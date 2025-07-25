-- Archive laboratory_result records for orphaned tests
WITH orphaned_tests AS (
    SELECT DISTINCT t.id as test_id
    FROM laboratory_test t
    LEFT JOIN laboratory_order lo ON t.lab_order_id = lo.id
    LEFT JOIN patient_person pp ON lo.patient_id = pp.id
    WHERE pp.id IS NULL 
    AND t.archived = 0
    AND lo.archived = 0
)
UPDATE laboratory_result lr 
SET archived = 1,
    date_modified = NOW()
FROM orphaned_tests ot
WHERE lr.test_id = ot.test_id 
AND lr.archived = 0;

-- Archive laboratory_sample records for orphaned tests  
WITH orphaned_tests AS (
    SELECT DISTINCT t.id as test_id
    FROM laboratory_test t
    LEFT JOIN laboratory_order lo ON t.lab_order_id = lo.id
    LEFT JOIN patient_person pp ON lo.patient_id = pp.id
    WHERE pp.id IS NULL 
    AND t.archived = 0
    AND lo.archived = 0
)
UPDATE laboratory_sample ls 
SET archived = 1,
    date_modified = NOW()
FROM orphaned_tests ot
WHERE ls.test_id = ot.test_id 
AND ls.archived = 0;

-- Archive laboratory_test records for orphaned orders
WITH orphaned_orders AS (
    SELECT DISTINCT lo.id as order_id
    FROM laboratory_order lo
    LEFT JOIN patient_person pp ON lo.patient_id = pp.id  
    WHERE pp.id IS NULL 
    AND lo.archived = 0
)
UPDATE laboratory_test lt
SET archived = 1,
    date_modified = NOW()
FROM orphaned_orders oo
WHERE lt.lab_order_id = oo.order_id
AND lt.archived = 0;

-- Archive laboratory_order records for non-existent patients
UPDATE laboratory_order lo
SET archived = 1,
    date_modified = NOW()
FROM (
    SELECT lo2.id
    FROM laboratory_order lo2
    LEFT JOIN patient_person pp ON lo2.patient_id = pp.id
    WHERE pp.id IS NULL 
    AND lo2.archived = 0
) orphaned_orders
WHERE lo.id = orphaned_orders.id;

-- Create index for performance
CREATE INDEX IF NOT EXISTS idx_laboratory_order_patient_id 
    ON laboratory_order(patient_id) 
    WHERE archived = 0;

-- Verification query
SELECT 
    COUNT(CASE WHEN lr.id IS NOT NULL AND pp.id IS NULL THEN 1 END) as orphaned_results,
    COUNT(CASE WHEN ls.id IS NOT NULL AND pp.id IS NULL THEN 1 END) as orphaned_samples, 
    COUNT(CASE WHEN lt.id IS NOT NULL AND pp.id IS NULL THEN 1 END) as orphaned_tests,
    COUNT(CASE WHEN lo.id IS NOT NULL AND pp.id IS NULL THEN 1 END) as orphaned_orders
FROM laboratory_order lo
LEFT JOIN patient_person pp ON lo.patient_id = pp.id
LEFT JOIN laboratory_test lt ON lt.lab_order_id = lo.id AND lt.archived = 0
LEFT JOIN laboratory_sample ls ON ls.test_id = lt.id AND ls.archived = 0  
LEFT JOIN laboratory_result lr ON lr.test_id = lt.id AND lr.archived = 0
WHERE lo.archived = 0;