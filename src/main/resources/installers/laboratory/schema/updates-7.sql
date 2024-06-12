ALTER TABLE laboratory_test
    ADD COLUMN IF NOT EXISTS clinical_note varchar(255);
