insert into laboratory_labtestgroup(id, group_name)values(6, 'Histology') ON CONFLICT (id) DO NOTHING;



INSERT INTO laboratory_labtest(id, lab_test_name, unit, labtestgroup_id)
VALUES
    (74, 'CD4 + cell count', 'cells/mm3', 2),
    (75, 'HCV antibody', '+/-', 3),
    (76, 'Urinalysis', '', 1),
    (77, 'Cytology', '', 6),
    (78, 'TB LF LAM', '+/-', 3),
    (79, 'Malaria smear', '+/-', 3),
    (80, 'Serology for Cr Ag', '+/-', 3),
    (81, 'CSF M/C/S', '+/-', 3)
    ON CONFLICT (id) DO NOTHING;

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
update laboratory_labtest set uuid=uuid_generate_v4() where uuid is null;
update laboratory_labtestgroup set uuid=uuid_generate_v4() where uuid is null;
update laboratory_order set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sample set uuid=uuid_generate_v4() where uuid is null;
update laboratory_test set uuid=uuid_generate_v4() where uuid is null;
update laboratory_result set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sample_type set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sampletype_labtest_link set uuid=uuid_generate_v4() where uuid is null;