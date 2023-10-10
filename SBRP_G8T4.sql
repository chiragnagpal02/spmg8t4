drop database if exists SBRP_G8T4;
create database SBRP_G8T4;
use SBRP_G8T4;

create table STAFF_DETAILS
(
staff_id int not null,
fname varchar(50) not null,
lname varchar(50) not null,
dept varchar(50) not null,
email varchar(50) not null,
phone varchar(20) not null,
biz_address varchar(255) not null,
sys_role enum ('staff', 'hr', 'manager', 'inactive'),
constraint staff_details_pk primary key (staff_id)
);

create table ROLE_DETAILS
(
role_id int not null,
role_name varchar(50) not null,
role_description varchar(50000) not null,
role_status enum ('active', 'inactive') not null,
constraint role_details_pk primary key (role_id)
);

create table SKILL_DETAILS
(
skill_id int not null,
skill_name varchar(50) not null,
skill_status enum ('active', 'inactive') not null,
constraint skills_details_pk primary key (skill_id)
);

create table STAFF_REPORTING_OFFICER
(
staff_id int not null,
RO_id int not null,
constraint staff_reporting_officer_pk primary key (staff_id, RO_id),
constraint staff_reporting_officer_fk foreign key (staff_id) references STAFF_DETAILS(staff_id)
);

create table STAFF_ROLES
(
staff_id int not null,
staff_role int not null,
role_type enum ('primary', 'secondary') not null,
sr_status enum ('active', 'inactive') not null,
constraint staff_roles_pk primary key (staff_id, staff_role),
constraint staff_roles_fk foreign key (staff_role) references ROLE_DETAILS(role_id)
);

create table STAFF_SKILLS
(
staff_id int not null,
skill_id int not null,
ss_status enum ('active', 'unverified', 'in-progress') not null,
constraint staff_skills_pk primary key (staff_id, skill_id),
constraint staff_skills_fk1 foreign key (staff_id) references STAFF_DETAILS(staff_id),
constraint staff_skills_fk2 foreign key (skill_id) references SKILL_DETAILS(skill_id)
);

create table ROLE_SKILLS
(
role_id int not null,
skill_id int not null,
constraint role_skills_pk primary key (role_id, skill_id),
constraint role_skills_fk1 foreign key (role_id) references ROLE_DETAILS(role_id),
constraint role_skills_fk2 foreign key (skill_id) references SKILL_DETAILS(skill_id)
);

create table ROLE_LISTINGS
(
role_listing_id int not null,
role_id int not null,
role_listing_desc varchar(50000),
role_listing_source int not null,
role_listing_open datetime not null,
role_listing_close datetime not null,
role_listing_creator int not null,
role_listing_ts_create timestamp not null,
role_listing_updater int not null,
role_listing_ts_update timestamp not null,
role_listing_type enum ('open', 'closed') not null,
role_listing_department varchar(50) not null,
role_listing_salary int,
role_listing_location varchar(500) not null,
constraint role_listings_pk primary key (role_listing_id),
constraint role_listing_fk1 foreign key (role_id) references ROLE_DETAILS(role_id),
constraint role_listing_fk2 foreign key (role_listing_source) references STAFF_DETAILS(staff_id),
constraint role_listing_fk3 foreign key (role_listing_creator) references STAFF_DETAILS(staff_id),
constraint role_listing_fk4 foreign key (role_listing_updater) references STAFF_DETAILS(staff_id)
);

create table ROLE_APPLICATIONS
(
role_app_id int not null,
role_listing_id int not null,
staff_id int not null,
role_app_status enum ('withdrawn', 'applied') not null,
role_app_ts_create timestamp not null,
constraint role_applications_pk primary key (role_app_id),
constraint role_applications_fk1 foreign key (role_listing_id) references ROLE_LISTINGS(role_listing_id),
constraint role_applications_fk2 foreign key (staff_id) references STAFF_DETAILS(staff_id)
);

CREATE INDEX idx_sys_role ON STAFF_DETAILS(sys_role);
create table LOGIN_DETAILS
(
staff_id int not null,
username varchar(20) not null,
password varchar(200) not null,
sys_role enum('staff', 'hr', 'manager', 'inactive') not null,
constraint login_details_pk primary key (staff_id),
constraint login_details_fk foreign key (sys_role) references STAFF_DETAILS(sys_role)
);

insert into STAFF_DETAILS values (123456789, 'AH GAO', 'TAN', 'FINANCE', 'tan_ah_gao@all-in-one.com.sg', '65-1234-5678', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'staff'),
('123456788', 'VINCENT REX', 'COLINS', 'HUMAN RESOURCE AND ADMIN', 'colins_vincent_rex@all-in-one.com.sg', '65-1234-5679', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'hr'),
('123456123', 'FAUD', 'NIZAM', 'SALES', 'faud_nizam@all-in-one.com.sg', '60-03-21345678', 'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia', 'manager'),
('1', 'JOHN', 'DOE', 'IT', 'John_doe@ all-in-one.com.sg', '65-5824-7888', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'inactive'),
(123456785, 'JACK', 'SMITH', 'IT', 'jack_smith@all-in-one.com.sg', '65-1234-5677', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'manager'),
(123456784, 'DAVID', 'JOHNSON', 'FINANCE', 'tan_ah_gao@all-in-one.com.sg', '60-03-21345677', 'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia', 'staff');

insert into STAFF_REPORTING_OFFICER values (123456789, 123456785), (123456784, 123456123);

insert into ROLE_DETAILS values (234567891, 'Head, Talent Attraction', 'The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation''s growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation''s talent attraction plans.

The Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.', 'inactive'),
(234567892, 'Learning Facilitator / Trainer', 'The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials. 

He is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. 

He works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.',	'active'),
(234567893, 'Agile Coach (SM)', 'The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.', 'active'),
(234511581, 'Fire Warden' ,'The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.', 'active');

insert into STAFF_ROLES values (123456789, 234567891, 'primary', 'active'), (123456789, 234567892, 'secondary', 'active'), (123456789, 234567893, 'secondary', 'inactive');

insert into SKILL_DETAILS values (345678913, 'Pascal Programming', 'inactive'), (345678866, 'Python Programming', 'active'), (345678790, 'Certified Scrum Master', 'active'), (345678890, 'C Programming', 'active'), (345678935, 'Java Programming', 'active'), (345678927, 'Database Management', 'active');

insert into STAFF_SKILLS values (123456789, 345678913, 'active'), (123456789, 345678866, 'active'), (123456789, 345678790, 'active'), (123456789, 345678890, 'unverified'), (123456789, 345678935, 'in-progress'), (123456789, 345678927, 'in-progress');

insert into ROLE_SKILLS values (234567891, 345678790), (234567892, 345678913), (234567892, 345678866);

insert into LOGIN_DETAILS values (123456788, 'vincentrex', 'root', 'hr'), (123456784, 'davidjohnson', 'root', 'staff');