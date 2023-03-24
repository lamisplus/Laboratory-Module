--laboratory_order
CREATE SEQUENCE laboratory_order_id_seq;
CREATE TABLE public.laboratory_order
(
    id bigint NOT NULL DEFAULT nextval('laboratory_order_id_seq'),
    uuid character varying(100),
    patient_id integer,
	visit_id INTEGER,
	order_date timestamp,
	patient_uuid Character varying(100),
	facility_id int,
	create_date timestamp,
	userid character varying(100),
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_order_id_seq OWNED BY laboratory_order.id;


--laboratory_test
CREATE SEQUENCE laboratory_test_id_seq;
CREATE TABLE public.laboratory_test
(
    id bigint NOT NULL DEFAULT nextval('laboratory_test_id_seq'),
    uuid character varying(100),
	patient_id INTEGER,
	lab_test_id INTEGER,
    description character varying(300),
	lab_number character varying(300),
	lab_test_group_id INTEGER,
	order_priority INTEGER,
	unit_measurement character varying(300),
	lab_test_order_status INTEGER,
	viral_load_indication INTEGER,
	patient_uuid Character varying(100),
	facility_id int,
	lab_order_id INTEGER,
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_test_id_seq OWNED BY laboratory_test.id;


--laboratory_sample
CREATE SEQUENCE laboratory_sample_id_seq;
CREATE TABLE public.laboratory_sample
(
    id bigint NOT NULL DEFAULT nextval('laboratory_sample_id_seq'),
    uuid character varying(100),
    sample_number character varying(100),
	sample_type_id INTEGER,
    sample_collection_mode INTEGER,
    date_sample_collected timestamp,
    comment_sample_collected character varying(500),
    sample_collected_by character varying(100),
    date_sample_verified timestamp,
    comment_sample_verified character varying(500),
    sample_verified_by character varying(100),
    sample_accepted Character varying(10),
	patient_uuid Character varying(100),
	facility_id int,
	patient_id int,
	test_id INTEGER,
    date_sample_logged_remotely timestamp,
    sample_logged_remotely integer,
	created_by Character varying(100),
	date_created timestamp,
	modified_by Character varying(100),
	date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_sample_id_seq OWNED BY laboratory_sample.id;


--laboratory_result
CREATE SEQUENCE laboratory_result_id_seq;
CREATE TABLE public.laboratory_result
(
    id bigint NOT NULL DEFAULT nextval('laboratory_result_id_seq'),
    uuid character varying(100),
    date_assayed timestamp,
    date_result_reported timestamp,
    result_reported character varying(500),
    result_report character varying(500),
    result_reported_by character varying(100),
	patient_uuid Character varying(100),
	facility_id int,
	patient_id int,
	pcr_lab_sample_number Character varying(100),
	date_sample_received_at_pcr_lab Date,
	test_id INTEGER,
    date_checked timestamp,
    checked_by Character varying(100),
    date_result_received timestamp,
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
	assayed_by Character varying(100),
	approved_by Character varying(100),
	date_approved timestamp,
	result_received_by Character varying(100),
    pcr_lab_name Character varying(100),
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_result_id_seq OWNED BY laboratory_result.id;


--laboratory_labtest
CREATE SEQUENCE laboratory_labtest_id_seq;
CREATE TABLE public.laboratory_labtest
(
    id bigint NOT NULL DEFAULT nextval('laboratory_labtest_id_seq'),
    uuid character varying(100),
    lab_test_name character varying(500),
	unit character varying(500),
	labtestgroup_id INTEGER,
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_labtest_id_seq OWNED BY laboratory_labtest.id;


--laboratory_labtestgroup
CREATE SEQUENCE laboratory_labtestgroup_id_seq;
CREATE TABLE public.laboratory_labtestgroup
(
    id bigint NOT NULL DEFAULT nextval('laboratory_labtestgroup_id_seq'),
    uuid character varying(100),
    group_name character varying(500),
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_labtestgroup_id_seq OWNED BY laboratory_labtestgroup.id;


--laboratory_sample_type
CREATE SEQUENCE laboratory_sample_type_id_seq;
CREATE TABLE public.laboratory_sample_type
(
    id bigint NOT NULL DEFAULT nextval('laboratory_sample_type_id_seq'),
    uuid character varying(100),
    sample_type_name character varying(500),
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_sample_type_id_seq OWNED BY laboratory_sample_type.id;


--laboratory_sampletype_labtest_link
CREATE SEQUENCE laboratory_sampletype_labtest_link_id_seq;
CREATE TABLE public.laboratory_sampletype_labtest_link
(
    id bigint NOT NULL DEFAULT nextval('laboratory_sampletype_labtest_link_id_seq'),
    uuid character varying(100),
    sample_type_id int,
	labtest_id int,
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_sampletype_labtest_link_id_seq OWNED BY laboratory_sampletype_labtest_link.id;


--laboratory_number
CREATE SEQUENCE laboratory_number_id_seq;
CREATE TABLE public.laboratory_number
(
    id bigint NOT NULL DEFAULT nextval('laboratory_number_id_seq'),
    uuid character varying(100),
    lab_name character varying(100),
    lab_number character varying(100),
    created_by Character varying(100),
    date_created timestamp,
    modified_by Character varying(100),
    date_modified timestamp,
    archived integer,
    PRIMARY KEY (id)
);
ALTER SEQUENCE laboratory_number_id_seq OWNED BY laboratory_number.id;


insert into laboratory_labtestgroup(id, group_name)values(1, 'Chemistry');
insert into laboratory_labtestgroup(id, group_name)values(2, 'Haematology');
insert into laboratory_labtestgroup(id, group_name)values(3, 'Microbiology');
insert into laboratory_labtestgroup(id, group_name)values(4, 'Others');

insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(1, 'CD4', 'cells/ul', 4);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(2, 'WBC', 'x10^9 c/l', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(3, 'Lymphocytes', '/mm3', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(4, 'Monocytes', '/mm3', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(5, 'Polymorphs', '/mm3', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(6, 'Eosinophils', '/mm3', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(7, 'Basophils', '/mm3', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(8, 'Haemoglobin (HB)', 'g/dl', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(9, 'PCV', '%', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(10, 'Platelets', 'x10^9 c/l', 2);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(11, 'K+', 'umol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(12, 'Creatinine', 'umol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(13, 'GLUCOSE', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(14, 'AST/SGOT', 'u/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(15, 'ALT/SGPT', 'u/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(16, 'Viral Load', 'copies/ml', 4);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(17, 'Na+', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(18, 'Cl-', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(19, 'HCO3', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(20, 'BUN', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(21, 'Total Bilirubin', 'umol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(22, 'Amylase', 'u/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(23, 'Total Cholesterol', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(24, 'LDL', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(25, 'HDL', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(26, 'Triglyceride', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(27, 'HBsAg', '+/-', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(28, 'Pregnancy', '+/-', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(29, 'Malaria Parasite', '+/-', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(30, 'VIA/Pap Smear', '+/-', 3);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(31, 'Fasting Glucose (FBS)', 'mmol/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(32, 'VDRL', '+/-', 4);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(33, 'Alk. Phosphatase', 'u/l', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(34, 'PROTEIN', 'g/dl', 3);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(35, 'Sputum Smear', '+/-', 3);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(36, 'HCV', '+/-', 1);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(37, 'Stool microscopy', '+/-', 3);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(50, 'Visitect CD4', 'cells/ul', 4);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(51, 'TB-LAM', '+/-', 4);
insert into laboratory_labtest(id, lab_test_name, unit, labtestgroup_id) values(52, 'Cryptococcal Antigen', '+/-', 4);


insert into laboratory_sample_type(id, sample_type_name) values(1, 'Blood');
insert into laboratory_sample_type(id, sample_type_name) values(2, 'Cells from the cervix');
insert into laboratory_sample_type(id, sample_type_name) values(3, 'Cerebrospinal fluid (CSF)');
insert into laboratory_sample_type(id, sample_type_name) values(4, 'Dried blood spot');
insert into laboratory_sample_type(id, sample_type_name) values(5, 'Plasma');
insert into laboratory_sample_type(id, sample_type_name) values(6, 'Serum');
insert into laboratory_sample_type(id, sample_type_name) values(7, 'Stool');
insert into laboratory_sample_type(id, sample_type_name) values(8, 'Urine');


insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(1,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(2,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(3,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(4,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(5,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(6,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(7,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(8,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(9,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(10,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(11,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(12,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(13,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(14,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(15,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(16,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(17,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(18,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(19,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(20,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(21,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(22,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(23,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(24,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(25,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(26,5);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(27,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(28,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(29,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(30,2);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(31,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(32,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(33,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(34,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(35,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(36,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(37,7);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(50,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(51,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(52,1);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(11,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(12,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(13,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(16,4);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(21,6);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(22,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(23,6);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(24,6);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(25,6);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(26,6);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(28,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(31,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(32,3);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(35,8);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(52,3);
insert into laboratory_sampletype_labtest_link(labtest_id, sample_type_id)values(21,8);


CREATE EXTENSION IF NOT EXISTS "uuid-ossp";
update laboratory_labtest set uuid=uuid_generate_v4() where uuid is null;
update laboratory_labtestgroup set uuid=uuid_generate_v4() where uuid is null;
update laboratory_order set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sample set uuid=uuid_generate_v4() where uuid is null;
update laboratory_test set uuid=uuid_generate_v4() where uuid is null;
update laboratory_result set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sample_type set uuid=uuid_generate_v4() where uuid is null;
update laboratory_sampletype_labtest_link set uuid=uuid_generate_v4() where uuid is null;

