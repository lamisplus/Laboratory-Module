export const PrescriptionObj = [
    {
        "encounterId": 1622,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "04-05-2022",
        "patientId": 50,
        "visitId": 290,
        "timeCreated": null,
        "formType": 0,
        "firstName": "Iliyasu",
        "lastName": "ABDULLAHI ",
        "dob": "1994-08-06",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/174",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2900,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 53,
                                "code": "438af549-c12a-4461-9cc6-bc5085b557c1",
                                "name": "Zidovudine",
                                "abbrev": "AZT",
                                "drugGroupId": 1
                            },
                            "dosage_strength": 23,
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "abbrev": "TDF",
                                "drugGroupId": 1
                            },
                            "dosage_strength": 44,
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)"
                            }
                        },
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "abbrev": "3TC",
                                "drugGroupId": 1
                            },
                            "dosage_strength": 44,
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)"
                            }
                        },
                        {
                            "drug": {
                                "id": 27,
                                "code": "6e1a5306-9a67-4945-aa1d-e89f2cd17099",
                                "name": "Lopinavir/Ritonavir",
                                "abbrev": "LPV/r",
                                "drugGroupId": 1
                            },
                            "dosage_strength": 44,
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)"
                            }
                        }
                    ],
                    "select": "",
                    "comment": "<p>test</p>",
                    "regimen": {
                        "id": 15,
                        "code": "4f280727-f22b-47e9-98fc-1a496d475c68",
                        "name": "TDF-3TC-AZT-LPV/r",
                        "regimenLineId": 2
                    },
                    "user_id": 0,
                    "duration": 5,
                    "patient_id": 50,
                    "start_date": "2022-05-04",
                    "duration_unit": "days",
                    "date_prescribed": "2022-05-04",
                    "time_prescribed": "02:45 pm",
                    "dosage_frequency": 5,
                    "quantity_dispensed": 0,
                    "prescription_status": 0
                },
                "encounterId": 1622,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "62964369-2e29-4d20-ade2-9d72c71229cb"
            }
        ],
        "details": {
            "dob": "1994-08-06",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 4,
                "code": "a2e19199-b704-485f-98c3-e6471dab9b45",
                "display": "Female",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "MOKWA, BIBA",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "ABDULLAHI ",
            "province": {
                "id": 593,
                "name": "Mokwa",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": null,
            "firstName": "Iliyasu",
            "occupation": {
                "id": 88,
                "code": "2b73879e-1a6f-4c99-a986-fb272358fcf2",
                "display": "Unemployed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "null",
            "maritalStatus": {
                "id": 6,
                "code": "d395c107-6c9c-4678-90f1-4e063cc6c933",
                "display": "Married",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/174",
            "personRelative": [
                {
                    "email": "",
                    "address": "KANJI JUNCTION",
                    "lastName": "KADIR",
                    "firstName": "MAMMAN",
                    "otherNames": "",
                    "relationshipType": "{\"id\" : 85, \"display\" : \"Spouse\", \"codeset_group\" : \"RELATIONSHIP\", \"code\" : \"c079b18b-974a-46be-a01d-1bfd662ec868\", \"language\" : \"en\"}"
                }
            ],
            "dateRegistration": "2021-03-25",
            "mobilePhoneNumber": "09053263331",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "50195a7e-a665-46a2-9d53-80c640b5728a",
        "visitUuid": null,
        "createdBy": "guest@lamisplus.org",
        "modifiedBy": "guest@lamisplus.org",
        "uuid": "ddca30fa-fb30-4b0f-ab16-c45f8f48cfa3",
        "dateModified": "2022-05-04T14:46:34.893",
        "archived": 0,
        "dateCreated": "2022-05-04T14:46:34.893"
    },
    {
        "encounterId": 1621,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "04-05-2022",
        "patientId": 50,
        "visitId": 687,
        "timeCreated": null,
        "formType": 0,
        "firstName": "Iliyasu",
        "lastName": "ABDULLAHI ",
        "dob": "1994-08-06",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/174",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2899,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 6,
                                "code": "425cb152-7e41-4c0a-a3ce-76ac2e0ce190",
                                "name": "Rifampicin/Isoniazid/Pyrazinamide",
                                "abbrev": "RHZ",
                                "drugGroupId": 3
                            },
                            "dosage_strength": 23,
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)"
                            }
                        }
                    ],
                    "comment": "<p>test</p>",
                    "user_id": 0,
                    "duration": 5,
                    "patient_id": 50,
                    "start_date": "2022-05-04",
                    "duration_unit": "days",
                    "date_prescribed": "2022-05-04",
                    "time_prescribed": "02:35 pm",
                    "dosage_frequency": 5,
                    "quantity_dispensed": 0,
                    "prescription_status": 0,
                    "brand_name_prescribed": "test"
                },
                "encounterId": 1621,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "c697ffe9-50a3-4b79-9279-2fafffe9fefe"
            }
        ],
        "details": {
            "dob": "1994-08-06",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 4,
                "code": "a2e19199-b704-485f-98c3-e6471dab9b45",
                "display": "Female",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "MOKWA, BIBA",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "ABDULLAHI ",
            "province": {
                "id": 593,
                "name": "Mokwa",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": null,
            "firstName": "Iliyasu",
            "occupation": {
                "id": 88,
                "code": "2b73879e-1a6f-4c99-a986-fb272358fcf2",
                "display": "Unemployed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "null",
            "maritalStatus": {
                "id": 6,
                "code": "d395c107-6c9c-4678-90f1-4e063cc6c933",
                "display": "Married",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/174",
            "personRelative": [
                {
                    "email": "",
                    "address": "KANJI JUNCTION",
                    "lastName": "KADIR",
                    "firstName": "MAMMAN",
                    "otherNames": "",
                    "relationshipType": "{\"id\" : 85, \"display\" : \"Spouse\", \"codeset_group\" : \"RELATIONSHIP\", \"code\" : \"c079b18b-974a-46be-a01d-1bfd662ec868\", \"language\" : \"en\"}"
                }
            ],
            "dateRegistration": "2021-03-25",
            "mobilePhoneNumber": "09053263331",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "50195a7e-a665-46a2-9d53-80c640b5728a",
        "visitUuid": null,
        "createdBy": "guest@lamisplus.org",
        "modifiedBy": "guest@lamisplus.org",
        "uuid": "09230898-6c85-4402-89ba-5328b000274f",
        "dateModified": "2022-05-04T14:35:25.948",
        "archived": 0,
        "dateCreated": "2022-05-04T14:35:25.948"
    },
    {
        "encounterId": 1612,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "21-06-2021",
        "patientId": 15,
        "visitId": 801,
        "timeCreated": null,
        "formType": 0,
        "firstName": "ABDUKADIR",
        "lastName": "ABDUKADIR",
        "dob": "1980-02-24",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/160",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2876,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-21",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-21",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-21",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1612,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "01a50126-5d28-4623-8c8d-79baea374c55"
            },
            {
                "id": 2877,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-21",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-21",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-21",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1612,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "cf28f90e-71be-41fb-9307-334da8275242"
            }
        ],
        "details": {
            "dob": "1980-02-24",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "MSCC MINNA NEW",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "ABDUKADIR",
            "province": {
                "id": 582,
                "name": "Chanchaga",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": {
                "id": 11,
                "code": "b0da8f6b-5a2c-4c2d-b295-b12a92f33278",
                "display": "Senior Secondary",
                "language": "en",
                "codesetGroup": "EDUCATION"
            },
            "firstName": "ABDUKADIR",
            "occupation": {
                "id": 88,
                "code": "2b73879e-1a6f-4c99-a986-fb272358fcf2",
                "display": "Unemployed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "true",
            "maritalStatus": {
                "id": 6,
                "code": "d395c107-6c9c-4678-90f1-4e063cc6c933",
                "display": "Married",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/160",
            "personRelative": [
                {
                    "email": "",
                    "address": "",
                    "lastName": "Nonso",
                    "firstName": "Musa",
                    "otherNames": "",
                    "relationshipType": {
                        "id": 84,
                        "code": "15ff77c3-e360-45ed-81b9-2e8cb8457163",
                        "display": "Son",
                        "language": "en",
                        "codesetGroup": "RELATIONSHIP"
                    },
                    "mobilePhoneNumber": "(234) 068-6540-943",
                    "relationshipTypeId": ""
                }
            ],
            "dateRegistration": "2021-02-24",
            "mobilePhoneNumber": "null",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "1be0dbe3-392b-4eba-933d-b21354dc7767",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "38e964e1-4a8f-4b56-9f4a-4132bae65225",
        "dateModified": "2021-11-25T13:01:21.319",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    },
    {
        "encounterId": 1607,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "25-06-2021",
        "patientId": 19,
        "visitId": 796,
        "timeCreated": null,
        "formType": 0,
        "firstName": "RABIU",
        "lastName": "Tijani",
        "dob": "1981-02-03",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/079",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2866,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-25",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-25",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-25",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1607,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "fad68c8c-1d3e-4c37-980a-4ae05ace4b6e"
            },
            {
                "id": 2867,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-25",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-25",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-25",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1607,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "c5f3f773-e904-4711-9249-e8051c3c538f"
            }
        ],
        "details": {
            "dob": "1981-02-03",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "Etishehsi, Type Railway Quarters",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "Tijani",
            "province": {
                "id": 582,
                "name": "Chanchaga",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": {
                "id": 14,
                "code": "7ea3c298-4e75-4d1e-8b99-b11e5315f884",
                "display": "Post Secondary",
                "language": "en",
                "codesetGroup": "EDUCATION"
            },
            "firstName": "RABIU",
            "occupation": {
                "id": 89,
                "code": "fdb095c7-d6b8-4627-a584-d728ced59e82",
                "display": "Employed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "false",
            "maritalStatus": {
                "id": 6,
                "code": "d395c107-6c9c-4678-90f1-4e063cc6c933",
                "display": "Married",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/079",
            "personRelative": [
                {
                    "email": "",
                    "address": "11 Bala Shamaki Road, Type Railway Quarters",
                    "lastName": "Alhaji",
                    "firstName": "Muhammed",
                    "otherNames": "",
                    "relationshipType": "{\"id\" : 77, \"display\" : \"Brother\", \"codeset_group\" : \"RELATIONSHIP\", \"code\" : \"612e736e-034a-4615-b32c-3b64c2260a5f\", \"language\" : \"en\"}",
                    "mobilePhoneNumber": ""
                }
            ],
            "dateRegistration": "2020-12-01",
            "mobilePhoneNumber": "",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "391df6f3-a5ce-47c9-80e0-67904c5b004e",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "221afeb0-8975-478d-b403-21c670c0fb05",
        "dateModified": "2021-11-25T13:01:21.318",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    },
    {
        "encounterId": 1606,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "25-06-2021",
        "patientId": 7,
        "visitId": 795,
        "timeCreated": null,
        "formType": 0,
        "firstName": "Moham",
        "lastName": "",
        "dob": "1994-06-16",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/078",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2864,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-25",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-25",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-25",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1606,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "c38344c4-b698-44e2-a81f-e2dfcc86b2a2"
            },
            {
                "id": 2865,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-25",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-25",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-25",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1606,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "d583df2b-339b-4bb8-88fb-1456a5e70246"
            }
        ],
        "details": {
            "dob": "1994-06-16",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "No. 34 Railway Line",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "Kazeem",
            "lastName": "",
            "province": {
                "id": 582,
                "name": "Chanchaga",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": {
                "id": 14,
                "code": "7ea3c298-4e75-4d1e-8b99-b11e5315f884",
                "display": "Post Secondary",
                "language": "en",
                "codesetGroup": "EDUCATION"
            },
            "firstName": "Moham",
            "occupation": {
                "id": 88,
                "code": "2b73879e-1a6f-4c99-a986-fb272358fcf2",
                "display": "Unemployed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "false",
            "maritalStatus": {
                "id": 5,
                "code": "1e4ba9bf-a6de-4e93-9705-a7ddf1080d69",
                "display": "Single",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/078",
            "personRelative": [
                {
                    "email": "",
                    "address": "House No. 19a Railway Quarters",
                    "lastName": "Yisa",
                    "firstName": "Dantala",
                    "otherNames": "",
                    "relationshipType": "{\"id\" : 77, \"display\" : \"Brother\", \"codeset_group\" : \"RELATIONSHIP\", \"code\" : \"612e736e-034a-4615-b32c-3b64c2260a5f\", \"language\" : \"en\"}",
                    "mobilePhoneNumber": ""
                }
            ],
            "dateRegistration": "2020-12-01",
            "mobilePhoneNumber": "",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "06c4fc47-ccba-48f3-bc6d-a10da3555a0a",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "b4487b0a-1614-4602-8d6b-861e9e38b1d3",
        "dateModified": "2021-11-25T13:01:21.317",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    },
    {
        "encounterId": 1592,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "18-06-2021",
        "patientId": 10,
        "visitId": 784,
        "timeCreated": null,
        "formType": 0,
        "firstName": "Dutse",
        "lastName": "Sadit ",
        "dob": "1971-02-22",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/159",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2833,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-18",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-18",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-18",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1592,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "c7c132ad-b154-429f-babc-b250b1424f99"
            },
            {
                "id": 2834,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-18",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-18",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-18",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1592,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "cc8d8483-3bf4-42b0-a9b0-8378a91e2e88"
            }
        ],
        "details": {
            "dob": "1971-02-22",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "MSCC MINNA NEW",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "Sadit ",
            "province": {
                "id": 601,
                "name": "Wushishi",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": {
                "id": 11,
                "code": "b0da8f6b-5a2c-4c2d-b295-b12a92f33278",
                "display": "Senior Secondary",
                "language": "en",
                "codesetGroup": "EDUCATION"
            },
            "firstName": "Dutse",
            "occupation": {
                "id": 89,
                "code": "fdb095c7-d6b8-4627-a584-d728ced59e82",
                "display": "Employed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "true",
            "maritalStatus": {
                "id": 6,
                "code": "d395c107-6c9c-4678-90f1-4e063cc6c933",
                "display": "Married",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/159",
            "personRelative": [
                {
                    "email": "",
                    "address": "",
                    "lastName": "Nonso",
                    "firstName": "Musa",
                    "otherNames": "",
                    "relationshipType": {
                        "id": 84,
                        "code": "15ff77c3-e360-45ed-81b9-2e8cb8457163",
                        "display": "Son",
                        "language": "en",
                        "codesetGroup": "RELATIONSHIP"
                    },
                    "mobilePhoneNumber": "(234) 068-6540-943",
                    "relationshipTypeId": ""
                }
            ],
            "dateRegistration": "2021-02-22",
            "mobilePhoneNumber": "null",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "4cdeaef9-4969-4ac7-bf67-a276877bffb4",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "9ef8c098-df30-4d2e-b78b-ccd95f717b94",
        "dateModified": "2021-11-25T13:01:21.314",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    },
    {
        "encounterId": 1583,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "14-06-2021",
        "patientId": 38,
        "visitId": 775,
        "timeCreated": null,
        "formType": 0,
        "firstName": "Etishehsi",
        "lastName": "Abdullahi",
        "dob": "1991-12-24",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/CCRHS/150",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2815,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1583,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "8d446904-09ae-40ab-ae0e-15ba6e2fbfcd"
            },
            {
                "id": 2816,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1583,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "c6b5498e-836e-4d4b-a7de-bf9a5f214366"
            }
        ],
        "details": {
            "dob": "1991-12-24",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "Spring stone Minna New",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "Abdullahi",
            "province": {
                "id": 582,
                "name": "Chanchaga",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": null,
            "firstName": "Etishehsi",
            "occupation": {
                "id": 88,
                "code": "2b73879e-1a6f-4c99-a986-fb272358fcf2",
                "display": "Unemployed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "null",
            "maritalStatus": {
                "id": 5,
                "code": "1e4ba9bf-a6de-4e93-9705-a7ddf1080d69",
                "display": "Single",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/CCRHS/150",
            "personRelative": [
                {
                    "email": "",
                    "address": "",
                    "lastName": "Nonso",
                    "firstName": "Musa",
                    "otherNames": "",
                    "relationshipType": {
                        "id": 84,
                        "code": "15ff77c3-e360-45ed-81b9-2e8cb8457163",
                        "display": "Son",
                        "language": "en",
                        "codesetGroup": "RELATIONSHIP"
                    },
                    "mobilePhoneNumber": "(234) 068-6540-943",
                    "relationshipTypeId": ""
                }
            ],
            "dateRegistration": "2021-02-18",
            "mobilePhoneNumber": "null",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "de28a502-da20-4e62-805f-54e190ec15aa",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "9793fcfb-2ee8-4946-8396-a8ff98f39925",
        "dateModified": "2021-11-25T13:01:21.311",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    },
    {
        "encounterId": 1582,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "14-06-2021",
        "patientId": 34,
        "visitId": 774,
        "timeCreated": null,
        "formType": 0,
        "firstName": "Jibu",
        "lastName": "Dantala",
        "dob": "1996-10-16",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/149",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2813,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1582,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "9943156c-009b-49a4-a9e7-7a4eee8556ca"
            },
            {
                "id": 2814,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1582,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "8678fba9-2f50-4eaa-a713-66546e3f1413"
            }
        ],
        "details": {
            "dob": "1996-10-16",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "Sunko Minna New",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "Dantala",
            "province": {
                "id": 582,
                "name": "Chanchaga",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": {
                "id": 11,
                "code": "b0da8f6b-5a2c-4c2d-b295-b12a92f33278",
                "display": "Senior Secondary",
                "language": "en",
                "codesetGroup": "EDUCATION"
            },
            "firstName": "Jibu",
            "occupation": {
                "id": 88,
                "code": "2b73879e-1a6f-4c99-a986-fb272358fcf2",
                "display": "Unemployed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "null",
            "maritalStatus": {
                "id": 5,
                "code": "1e4ba9bf-a6de-4e93-9705-a7ddf1080d69",
                "display": "Single",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/149",
            "personRelative": [
                {
                    "email": "",
                    "address": "",
                    "lastName": "Nonso",
                    "firstName": "Musa",
                    "otherNames": "",
                    "relationshipType": {
                        "id": 84,
                        "code": "15ff77c3-e360-45ed-81b9-2e8cb8457163",
                        "display": "Son",
                        "language": "en",
                        "codesetGroup": "RELATIONSHIP"
                    },
                    "mobilePhoneNumber": "(234) 068-6540-943",
                    "relationshipTypeId": ""
                }
            ],
            "dateRegistration": "2021-02-17",
            "mobilePhoneNumber": "null",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "3cb245a6-0e6a-497c-bed0-2ee13d16a403",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "b4d3e7a7-ae58-4ff8-bf23-39aa0a838a8e",
        "dateModified": "2021-11-25T13:01:21.311",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    },
    {
        "encounterId": 1581,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "14-06-2021",
        "patientId": 41,
        "visitId": 773,
        "timeCreated": null,
        "formType": 0,
        "firstName": "MOHAMMED",
        "lastName": "DUTSE",
        "dob": "1991-05-06",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/145",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2811,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1581,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "fd630b53-f672-4a3a-8200-d7fece8fe285"
            },
            {
                "id": 2812,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1581,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "a887d3b7-bdb5-4e8e-a951-cc97a678c3b0"
            }
        ],
        "details": {
            "dob": "1991-05-06",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "Market road Mokwa",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "DUTSE",
            "province": {
                "id": 593,
                "name": "Mokwa",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": {
                "id": 11,
                "code": "b0da8f6b-5a2c-4c2d-b295-b12a92f33278",
                "display": "Senior Secondary",
                "language": "en",
                "codesetGroup": "EDUCATION"
            },
            "firstName": "MOHAMMED",
            "occupation": {
                "id": 88,
                "code": "2b73879e-1a6f-4c99-a986-fb272358fcf2",
                "display": "Unemployed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "null",
            "maritalStatus": {
                "id": 5,
                "code": "1e4ba9bf-a6de-4e93-9705-a7ddf1080d69",
                "display": "Single",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/145",
            "personRelative": [
                {
                    "email": "",
                    "address": "SAWMIL MOKWA",
                    "lastName": "KASIM",
                    "firstName": "ISAH",
                    "otherNames": "",
                    "relationshipType": "{\"id\" : 77, \"display\" : \"Brother\", \"codeset_group\" : \"RELATIONSHIP\", \"code\" : \"612e736e-034a-4615-b32c-3b64c2260a5f\", \"language\" : \"en\"}"
                }
            ],
            "dateRegistration": "2021-02-15",
            "mobilePhoneNumber": "null",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "c5c0946f-209f-4ed2-a963-d3891d2b789a",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "af077bca-fcc0-4c04-b4c8-e2d301fb4165",
        "dateModified": "2021-11-25T13:01:21.31",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    },
    {
        "encounterId": 1573,
        "formCode": "4ab293ff-6837-41e8-aa85-14f25ce59ef0",
        "programCode": "25216afc-d158-4696-ada6-00df609b9a4c",
        "dateEncounter": "14-06-2021",
        "patientId": 3,
        "visitId": 765,
        "timeCreated": null,
        "formType": 0,
        "firstName": "Saul",
        "lastName": "Sabi",
        "dob": "1992-11-24",
        "patientNumberType": "Hospital Number",
        "hospitalNumber": "NG/DEMO/061",
        "formName": "Drug Prescription",
        "typePatient": 0,
        "data": null,
        "formDataObj": [
            {
                "id": 2795,
                "data": {
                    "type": 1,
                    "drugs": [
                        {
                            "drug": {
                                "id": 33,
                                "code": "09c5b2c8-e386-44f0-9b73-3f4d03be9c81",
                                "name": "Cotrimoxazole",
                                "drugGroupId": 3
                            },
                            "dosage_strength": "960",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1573,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "2c98eb1d-509d-4b53-84f5-cd1975518482"
            },
            {
                "id": 2796,
                "data": {
                    "type": 0,
                    "drugs": [
                        {
                            "drug": {
                                "id": 10,
                                "code": "dda1b9cc-ebcb-482a-ac6d-b4284912d871",
                                "name": "Lamivudine",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 47,
                                "code": "b0b7b16e-d05c-413b-b915-65497d3feb0c",
                                "name": "Dolutegravir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "50",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        },
                        {
                            "drug": {
                                "id": 49,
                                "code": "34f75c9d-7944-4c6d-868b-2a665d5aae9b",
                                "name": "Tenofovir",
                                "drugGroupId": 1
                            },
                            "dosage_strength": "300",
                            "dosage_strength_unit": {
                                "id": 389,
                                "code": "2f246758-9caf-44a4-995e-8a784b7e5ffc",
                                "display": "milligram (mg)",
                                "language": "en",
                                "codesetGroup": "DOSE_STRENGTH_UNIT"
                            }
                        }
                    ],
                    "regimen": {
                        "id": 23,
                        "name": "TDF-3TC-DTG",
                        "regimenLineId": 2
                    },
                    "duration": 90,
                    "start_date": "2021-06-14",
                    "duration_unit": "days",
                    "date_dispensed": "2021-06-14",
                    "dispensed_note": "Prescription Error : null ADR Screened : null ADR : [] Adherence : null",
                    "date_prescribed": "2021-06-14",
                    "dosage_frequency": 0,
                    "prescription_status": 1
                },
                "encounterId": 1573,
                "organisationUnitByOrganisationUnitId": {
                    "id": 1740,
                    "name": "Minna OSS",
                    "description": "Facility in Chanchaga",
                    "organisationUnitLevelId": 4,
                    "parentOrganisationUnitId": 582,
                    "details": null,
                    "parentOrganisationUnitName": null,
                    "parentParentOrganisationUnitName": null
                },
                "uuid": "2a98de84-f697-4629-b533-4cd5de291c46"
            }
        ],
        "details": {
            "dob": "1992-11-24",
            "email": "",
            "state": {
                "id": 28,
                "name": "Niger",
                "description": "Niger state  in Nigeria",
                "organisationUnitLevelId": 2,
                "parentOrganisationUnitId": 1
            },
            "gender": {
                "id": 1,
                "code": "912016f2-dca1-45b2-a613-b0b3edc414db",
                "display": "Male",
                "language": "en",
                "codesetGroup": "GENDER"
            },
            "street": "Jaagi Road Mokwa",
            "country": {
                "id": 1,
                "name": "Nigeria",
                "description": "Nigeria County in Africa",
                "organisationUnitLevelId": 1,
                "parentOrganisationUnitId": 0
            },
            "landmark": "",
            "lastName": "Sabi",
            "province": {
                "id": 593,
                "name": "Mokwa",
                "description": "Local government in Niger State",
                "organisationUnitLevelId": 3,
                "parentOrganisationUnitId": 28
            },
            "education": {
                "id": 11,
                "code": "b0da8f6b-5a2c-4c2d-b295-b12a92f33278",
                "display": "Senior Secondary",
                "language": "en",
                "codesetGroup": "EDUCATION"
            },
            "firstName": "Saul",
            "occupation": {
                "id": 89,
                "code": "fdb095c7-d6b8-4627-a584-d728ced59e82",
                "display": "Employed",
                "language": "en",
                "codesetGroup": "OCCUPATION"
            },
            "otherNames": "",
            "dobEstimated": "false",
            "maritalStatus": {
                "id": 6,
                "code": "d395c107-6c9c-4678-90f1-4e063cc6c933",
                "display": "Married",
                "language": "en",
                "codesetGroup": "MARITAL_STATUS"
            },
            "hospitalNumber": "NG/DEMO/061",
            "personRelative": [
                {
                    "email": "",
                    "address": "Lagos",
                    "lastName": "Bello",
                    "firstName": "Aremu",
                    "otherNames": "",
                    "relationshipType": "{\"id\" : 77, \"display\" : \"Brother\", \"codeset_group\" : \"RELATIONSHIP\", \"code\" : \"612e736e-034a-4615-b32c-3b64c2260a5f\", \"language\" : \"en\"}",
                    "mobilePhoneNumber": ""
                }
            ],
            "dateRegistration": "2020-11-24",
            "mobilePhoneNumber": "",
            "alternatePhoneNumber": ""
        },
        "organisationUnitId": 1740,
        "patientUuid": "ccfb2ccf-373b-4be4-abad-9eb58cad7209",
        "visitUuid": null,
        "createdBy": "",
        "modifiedBy": null,
        "uuid": "dfaab9f9-6e5e-422a-ae7f-7f3e8eec2bb5",
        "dateModified": "2021-11-25T13:01:21.308",
        "archived": 0,
        "dateCreated": "1970-01-01T17:17:00"
    }
]