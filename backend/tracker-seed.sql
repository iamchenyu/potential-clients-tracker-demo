DROP DATABASE clients_tracker;
CREATE DATABASE clients_tracker;

\connect clients_tracker

\i tracker-schema.sql

INSERT INTO statuses (name)
VALUES ('Initial Contact'), 
       ('Information Session'), 
       ('Onsite Visit'), 
       ('Application Submission'), 
       ('Phone Screening'),
       ('Interview'),
       ('Application Approved'), 
       ('Application Denied'),
       ('Appealing'),
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

INSERT INTO users (email, password, first_name, last_name, profile_url, role)
VALUES ('chenyu.wang@ccacc-dc.org', 
        '$2b$12$7xsRpb4hvFZGSCmVgqWFk.bCnJfWJggBfIP1jZsKt1mW91urR3Gby', 
        'Chenyu', 
        'Wang', 
        'https://images.unsplash.com/photo-1611267254323-4db7b39c732c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8M3x8Y3V0ZSUyMGNhdHxlbnwwfHwwfHw%3D&auto=format&fit=crop&w=800&q=60', 
        'admin');

INSERT INTO clients (first_name, last_name,email, address, from_channel, current_status)
VALUES ('Test', 
        'Client', 
        'abc@gmail.com', 
        '123 Street, Rockville, MD 20876', 
        1, 
        2
        );


INSERT INTO clients_statuses (client_id, status_id, update_date)
VALUES (1, 1, '12/22/2022'), 
       (1, 2, '01/03/2023');