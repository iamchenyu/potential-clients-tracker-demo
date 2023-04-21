-- DROP DATABASE clients_tracker;
-- CREATE DATABASE clients_tracker;

-- \connect clients_tracker

-- \i tracker-schema.sql

-- \i backend/tracker-schema.sql



INSERT INTO statuses (name)
VALUES ('Initial Contact'), 
       ('Information Session'), 
       ('Onsite Visit'), 
       ('Applying for Green Card'),
       ('Applying for Citizenship'),
       ('Applying for SSI'),
       ('Applying for Medicaid'),
       ('Daycare Application Submission'), 
       ('Government Phone Screening'),
       ('Government Interview'),
       ('Daycare Application Approved'), 
       ('Daycare Application Denied'),
       ('Daycare Application Appealing'),
       ('Enrolled'),
       ('Not To Proceed');

INSERT INTO channels (name)
VALUES ('Search engine'), 
       ('Social media'), 
       ('Blog or publication'),
       ('Store ads'),
       ('Word of mouth'),
       ('Newspaper'),
       ('Vehicle ads'),
       ('Referral');

INSERT INTO users (email, password, first_name, last_name, role)
VALUES ('admin@test.com', 
        '$2b$12$7xsRpb4hvFZGSCmVgqWFk.bCnJfWJggBfIP1jZsKt1mW91urR3Gby', 
        'Admin', 
        'User', 
        'admin'),
        ('editor@test.com', 
        '$2b$12$7xsRpb4hvFZGSCmVgqWFk.bCnJfWJggBfIP1jZsKt1mW91urR3Gby', 
        'Editor', 
        'User', 
        'editor'),
        ('viewer@test.com', 
        '$2b$12$7xsRpb4hvFZGSCmVgqWFk.bCnJfWJggBfIP1jZsKt1mW91urR3Gby', 
        'Viewer', 
        'User', 
        'viewer');

INSERT INTO clients (first_name, last_name, gender, marital, contact, relationship, dob, email, phone, address, citizenship, medicaid, daycare, from_channel, current_status, created_at)
VALUES ('Odille', 
        'Miskin', 
        'Male',
        'Divorced',
        'Allen Miskin',
        'Son',
        '03/21/1968',
        'omiskin0@npr.org', 
        '288-731-3030',
        '2825 Forest Dale Court', 
        'U.S. Citizen',
        'Medicaid',
        TRUE,
        1, 
        1,
        '12/22/2022'
        ),
        ('Marni', 
        'Samme', 
        'Marni Samme',
        'Self',
        'Female',
        'Widowed',
        '08/03/1950',
        'msamme1@printfriendly.com', 
        '549-245-9927',
        '34 Scoville Place', 
        'Green Card Holder',
        'N/A',
        FALSE,
        5, 
        2,
        '01/03/2023'
        ),
       ('Hubie', 
        'Collerd', 
        'Male',
        'Unknown',
        'Bobby',
        'Friend',
        '11/14/1973',
        'hcollerd2@com.com', 
        '549-245-9927',
        '517 Mccormick Place', 
        'U.S. Citizen',
        'QMB',
        TRUE,
        3, 
        3,
        '09/03/2022'
        ),
        ('Andriana', 
        'Lawlie', 
        'Female',
        'Married',
        'Alex',
        'Husband',
        '05/13/1952',
        'alawlie5@tiny.cc', 
        '395-980-998',
        '5 Haas Crossing', 
        'None',
        'N/A',
        FALSE,
        4, 
        2,
        '02/01/2023'
        ),
        ('Tyler', 
        'Bryant', 
        'Male',
        'Unknown',
        'Dixon',
        'Friend',
        '11/20/1961',
        'tylerb@gmail.com', 
        '830-305-2394',
        '2405 Morris Street', 
        'Green Card Holder',
        'N/A',
        FALSE,
        4, 
        1,
        '04/21/2023'
        ),
        ('Jessica', 
        'Rubenstein', 
        'Female',
        'Married',
        'Davis',
        'Caregiver',
        '01/13/1954',
        'davisled@gmail.com', 
        '307-762-7364',
        '2280 Archwood Avenue', 
        'U.S. Citizen',
        'QMB',
        FALSE,
        3, 
        1,
        '03/12/2023'
        );


INSERT INTO clients_statuses (client_id, status_id, update_date)
VALUES (1, 1, '12/22/2022'), 
       (2, 1, '01/03/2023'),
       (2, 2, '01/15/2023'),
       (3, 1, '09/03/2022'),
       (3, 2, '11/13/2022'),
       (3, 3, '11/21/2022'),
       (4, 1, '02/01/2023'),
       (4, 2, '02/03/2023'),
       (5, 1, '04/21/2023'),
       (6, 2, '03/12/2023');

INSERT INTO updates (user_id, client_id, comment)
VALUES (1, 1, 'The potential client would like to schedule an onsite visit after discussing with his family'),
       (2, 2, 'The potential client has no medicaid but is considering self-pay option'),
       (1, 3, 'He is asking information for his blind dad'),
       (2, 4, 'Low probability of enrolling in our program');