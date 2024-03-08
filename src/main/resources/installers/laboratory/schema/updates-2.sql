--laboratory_order
insert into laboratory_labtestgroup(id, group_name)values(5, 'TB Tests');

update laboratory_labtest set labtestgroup_id=5 where lab_test_name='TB-LAM';

insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(64, 'AFB microscopy', '+/-', 5);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(65, 'Gene Xpert', '+/-', 5);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(66, 'LF LAM', '+/-', 5);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(67, 'TrueNAT', '+/-', 5);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(68, 'TB LAMP', '+/-', 5);



insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(63,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(64,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(65,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(66,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(67,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(68,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(69,1);




CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
update laboratory_labtest set uuid=uuid_generate_v4() where uuid is null;
update laboratory_labtestgroup set uuid=uuid_generate_v4() where uuid is null;
update laboratory_order set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sample set uuid=uuid_generate_v4() where uuid is null;
update laboratory_test set uuid=uuid_generate_v4() where uuid is null;
update laboratory_result set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sample_type set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sampletype_labtest_link set uuid=uuid_generate_v4() where uuid is null;

