-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost:8889
-- Generation Time: Oct 18, 2023 at 05:28 AM
-- Server version: 5.7.39
-- PHP Version: 8.2.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `SBRP_G8T4`
--

-- --------------------------------------------------------

--
-- Table structure for table `LOGIN_DETAILS`
--

CREATE TABLE `LOGIN_DETAILS` (
  `staff_id` int(11) NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `sys_role` enum('staff','hr','manager','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `LOGIN_DETAILS`
--

INSERT INTO `LOGIN_DETAILS` (`staff_id`, `username`, `password`, `sys_role`) VALUES
(123456784, 'davidjohnson', 'root', 'staff'),
(123456788, 'vincentrex', 'root', 'hr');

-- --------------------------------------------------------

--
-- Table structure for table `ROLE_APPLICATIONS`
--

CREATE TABLE `ROLE_APPLICATIONS` (
  `role_app_id` int(11) NOT NULL,
  `role_listing_id` int(11) NOT NULL,
  `staff_id` int(11) NOT NULL,
  `role_app_status` enum('withdrawn','applied') NOT NULL,
  `role_app_ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- --------------------------------------------------------

--
-- Table structure for table `ROLE_DETAILS`
--

CREATE TABLE `ROLE_DETAILS` (
  `role_id` int(11) NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` mediumtext NOT NULL,
  `role_status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ROLE_DETAILS`
--

INSERT INTO `ROLE_DETAILS` (`role_id`, `role_name`, `role_description`, `role_status`) VALUES
(1, 'Software Engineer', 'Responsible for developing and maintaining software applications.', 'active'),
(2, 'Marketing Manager', 'Responsible for creating and executing marketing campaigns.', 'active'),
(3, 'Data Analyst', 'Responsible for analyzing data to provide insights and recommendations.', 'active'),
(4, 'Project Manager', 'Responsible for managing project timelines and resources.', 'inactive'),
(5, 'Sales Representative', 'Responsible for selling products or services to customers.', 'active'),
(6, 'Customer Support Specialist', 'Responsible for providing excellent customer support.', 'active'),
(234511581, 'Fire Warden', 'The Fire Warden is responsible for testing fire alarms and firefighting equipment and implementing risk assessment recommendations. In the event of a confirmed fire alarm or fire drill, the warden assists in the safe evacuation of staff and visitors from the premise immediately.', 'active'),
(234567891, 'Head, Talent Attraction', 'The Head, Talent Attraction is responsible for strategic workforce planning to support the organisation\'s growth strategies through establishing talent sourcing strategies, determining the philosophy for the selection and securing of candidates and overseeing the onboarding and integration of new hires into the organisation. He/She develops various approaches to meet workforce requirements and designs employer branding strategies. He oversees the selection processes and collaborates with business stakeholders for the hiring of key leadership roles. As a department head, he is responsible for setting the direction and articulating goals and objectives for the team, and driving the integration of Skills Frameworks across the organisation\'s talent attraction plans.\n\nThe Head, Talent Attraction is an influential and inspiring leader who adopts a broad perspective in the decisions he makes. He is articulate and displays a genuine passion for motivating and developing his team.', 'inactive'),
(234567892, 'Learning Facilitator / Trainer', 'The Learning Facilitator delivers learning products and services in a variety of environments, using multiple learning delivery modes and methods. He/She assesses learning needs and adapts the facilitation approach to reflect desired learning outcomes and learner needs. He is responsible for knowledge and skills transfer by delivering learning content, facilitating group discussions and responding to queries. He drives learner development and commitment to continuous learning by actively providing feedback and learner support. He evaluates curriculum effectiveness and recommends improvement areas by collecting learner feedback as well as analysing learning delivery approaches and materials. \n\nHe is a strong communicator who builds trusted relationships and creates a cooperative and engaging learning environment. He is adaptable and adept at managing multiple stakeholders. \n\nHe works in multiple different environments, including different learning venues and client sites, and regularly interacts with digital systems.', 'active'),
(234567893, 'Agile Coach (SM)', 'The Agile Coach (SM) coaches teams in the conduct of Agile practices and the implementation of Agile methodologies and practices in the organisation and acts as an effective Scrum Master in Agile Scrum teams.', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `ROLE_LISTINGS`
--

CREATE TABLE `ROLE_LISTINGS` (
  `role_listing_id` int(11) NOT NULL,
  `role_id` int(11) NOT NULL,
  `role_listing_desc` mediumtext,
  `role_listing_source` int(11) NOT NULL,
  `role_listing_open` datetime NOT NULL,
  `role_listing_close` datetime NOT NULL,
  `role_listing_creator` int(11) NOT NULL,
  `role_listing_ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_listing_updater` int(11) NOT NULL,
  `role_listing_ts_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `role_listing_type` enum('open','closed') NOT NULL,
  `role_listing_department` varchar(50) NOT NULL,
  `role_listing_salary` int(11) DEFAULT NULL,
  `role_listing_location` varchar(500) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ROLE_LISTINGS`
--

INSERT INTO `ROLE_LISTINGS` (`role_listing_id`, `role_id`, `role_listing_desc`, `role_listing_source`, `role_listing_open`, `role_listing_close`, `role_listing_creator`, `role_listing_ts_create`, `role_listing_updater`, `role_listing_ts_update`, `role_listing_type`, `role_listing_department`, `role_listing_salary`, `role_listing_location`) VALUES
(1, 1, 'We are looking for a software engineer to join our development team.', 123456789, '2023-10-15 08:00:00', '2023-10-30 17:00:00', 123456789, '2023-10-10 23:21:21', 123456789, '2023-10-10 23:21:21', 'open', 'IT', 80000, 'New York'),
(2, 2, 'We are hiring a marketing manager to lead our marketing campaigns.', 123456789, '2023-10-20 09:00:00', '2023-11-05 18:00:00', 123456788, '2023-10-10 23:21:21', 123456788, '2023-10-10 23:21:21', 'open', 'Marketing', 90000, 'Los Angeles'),
(3, 3, 'Join our data analysis team and work on exciting projects.', 123456789, '2023-10-25 10:00:00', '2023-11-10 19:00:00', 123456789, '2023-10-10 23:21:21', 123456789, '2023-10-10 23:21:21', 'open', 'Analytics', 75000, 'Chicago'),
(4, 4, 'We need a project manager to oversee our important projects.', 123456123, '2023-10-28 11:00:00', '2023-11-15 20:00:00', 123456123, '2023-10-10 23:21:21', 123456123, '2023-10-10 23:21:21', 'open', 'Management', 95000, 'San Francisco'),
(5, 5, 'Join our sales team and help us grow our customer base.', 123456789, '2023-11-01 12:00:00', '2023-11-20 21:00:00', 123456789, '2023-10-10 23:21:21', 123456789, '2023-10-10 23:21:21', 'open', 'Sales', 70000, 'Seattle'),
(6, 6, 'We are hiring customer support specialists to provide excellent service.', 123456784, '2023-11-05 13:00:00', '2023-11-25 22:00:00', 123456784, '2023-10-10 23:21:21', 123456784, '2023-10-10 23:21:21', 'open', 'Customer Support', 65000, 'Miami');

-- --------------------------------------------------------

--
-- Table structure for table `ROLE_SKILLS`
--

CREATE TABLE `ROLE_SKILLS` (
  `role_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `ROLE_SKILLS`
--

INSERT INTO `ROLE_SKILLS` (`role_id`, `skill_id`) VALUES
(234567891, 345678790),
(234567892, 345678866),
(234567892, 345678913);

-- --------------------------------------------------------

--
-- Table structure for table `SKILL_DETAILS`
--

CREATE TABLE `SKILL_DETAILS` (
  `skill_id` int(11) NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  `skill_status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `SKILL_DETAILS`
--

INSERT INTO `SKILL_DETAILS` (`skill_id`, `skill_name`, `skill_status`) VALUES
(345678790, 'Certified Scrum Master', 'active'),
(345678866, 'Python Programming', 'active'),
(345678890, 'C Programming', 'active'),
(345678913, 'Pascal Programming', 'inactive'),
(345678927, 'Database Management', 'active'),
(345678935, 'Java Programming', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_DETAILS`
--

CREATE TABLE `STAFF_DETAILS` (
  `staff_id` int(11) NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `biz_address` varchar(255) NOT NULL,
  `sys_role` enum('staff','hr','manager','inactive') DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `STAFF_DETAILS`
--

INSERT INTO `STAFF_DETAILS` (`staff_id`, `fname`, `lname`, `dept`, `email`, `phone`, `biz_address`, `sys_role`) VALUES
(1, 'JOHN', 'DOE', 'IT', 'John_doe@ all-in-one.com.sg', '65-5824-7888', '1 Scotts Rd, #24-10 Shaw Centre, Singapore 228208', 'inactive'),
(123456123, 'FAUD', 'NIZAM', 'SALES', 'faud_nizam@all-in-one.com.sg', '60-03-21345678', 'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia', 'manager'),
(123456784, 'DAVID', 'JOHNSON', 'FINANCE', 'tan_ah_gao@all-in-one.com.sg', '60-03-21345677', 'Unit 3A-07, Tower A, The Vertical Business Suite, 8, Jalan Kerinchi, Bangsar South, 59200 Kuala Lumpur, Malaysia', 'staff'),
(123456785, 'JACK', 'SMITH', 'IT', 'jack_smith@all-in-one.com.sg', '65-1234-5677', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'manager'),
(123456788, 'VINCENT REX', 'COLINS', 'HUMAN RESOURCE AND ADMIN', 'colins_vincent_rex@all-in-one.com.sg', '65-1234-5679', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'hr'),
(123456789, 'AH GAO', 'TAN', 'FINANCE', 'tan_ah_gao@all-in-one.com.sg', '65-1234-5678', '60 Paya Lebar Rd, #06-33 Paya Lebar Square, Singapore 409051', 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_REPORTING_OFFICER`
--

CREATE TABLE `STAFF_REPORTING_OFFICER` (
  `staff_id` int(11) NOT NULL,
  `RO_id` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `STAFF_REPORTING_OFFICER`
--

INSERT INTO `STAFF_REPORTING_OFFICER` (`staff_id`, `RO_id`) VALUES
(123456784, 123456123),
(123456789, 123456785);

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_ROLES`
--

CREATE TABLE `STAFF_ROLES` (
  `staff_id` int(11) NOT NULL,
  `staff_role` int(11) NOT NULL,
  `role_type` enum('primary','secondary') NOT NULL,
  `sr_status` enum('active','inactive') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `STAFF_ROLES`
--

INSERT INTO `STAFF_ROLES` (`staff_id`, `staff_role`, `role_type`, `sr_status`) VALUES
(123456789, 234567891, 'primary', 'active'),
(123456789, 234567892, 'secondary', 'active'),
(123456789, 234567893, 'secondary', 'inactive');

-- --------------------------------------------------------

--
-- Table structure for table `STAFF_SKILLS`
--

CREATE TABLE `STAFF_SKILLS` (
  `staff_id` int(11) NOT NULL,
  `skill_id` int(11) NOT NULL,
  `ss_status` enum('active','unverified','in-progress') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

--
-- Dumping data for table `STAFF_SKILLS`
--

INSERT INTO `STAFF_SKILLS` (`staff_id`, `skill_id`, `ss_status`) VALUES
(123456789, 345678790, 'active'),
(123456789, 345678866, 'active'),
(123456789, 345678890, 'unverified'),
(123456789, 345678913, 'active'),
(123456789, 345678927, 'in-progress'),
(123456789, 345678935, 'in-progress');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `LOGIN_DETAILS`
--
ALTER TABLE `LOGIN_DETAILS`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `login_details_fk` (`sys_role`);

--
-- Indexes for table `ROLE_APPLICATIONS`
--
ALTER TABLE `ROLE_APPLICATIONS`
  ADD PRIMARY KEY (`role_app_id`),
  ADD KEY `role_applications_fk1` (`role_listing_id`),
  ADD KEY `role_applications_fk2` (`staff_id`);

--
-- Indexes for table `ROLE_DETAILS`
--
ALTER TABLE `ROLE_DETAILS`
  ADD PRIMARY KEY (`role_id`);

--
-- Indexes for table `ROLE_LISTINGS`
--
ALTER TABLE `ROLE_LISTINGS`
  ADD PRIMARY KEY (`role_listing_id`),
  ADD KEY `role_listing_fk1` (`role_id`),
  ADD KEY `role_listing_fk2` (`role_listing_source`),
  ADD KEY `role_listing_fk3` (`role_listing_creator`),
  ADD KEY `role_listing_fk4` (`role_listing_updater`);

--
-- Indexes for table `ROLE_SKILLS`
--
ALTER TABLE `ROLE_SKILLS`
  ADD PRIMARY KEY (`role_id`,`skill_id`),
  ADD KEY `role_skills_fk2` (`skill_id`);

--
-- Indexes for table `SKILL_DETAILS`
--
ALTER TABLE `SKILL_DETAILS`
  ADD PRIMARY KEY (`skill_id`);

--
-- Indexes for table `STAFF_DETAILS`
--
ALTER TABLE `STAFF_DETAILS`
  ADD PRIMARY KEY (`staff_id`),
  ADD KEY `idx_sys_role` (`sys_role`);

--
-- Indexes for table `STAFF_REPORTING_OFFICER`
--
ALTER TABLE `STAFF_REPORTING_OFFICER`
  ADD PRIMARY KEY (`staff_id`,`RO_id`);

--
-- Indexes for table `STAFF_ROLES`
--
ALTER TABLE `STAFF_ROLES`
  ADD PRIMARY KEY (`staff_id`,`staff_role`),
  ADD KEY `staff_roles_fk` (`staff_role`);

--
-- Indexes for table `STAFF_SKILLS`
--
ALTER TABLE `STAFF_SKILLS`
  ADD PRIMARY KEY (`staff_id`,`skill_id`),
  ADD KEY `staff_skills_fk2` (`skill_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `ROLE_APPLICATIONS`
--
ALTER TABLE `ROLE_APPLICATIONS`
  MODIFY `role_app_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `LOGIN_DETAILS`
--
ALTER TABLE `LOGIN_DETAILS`
  ADD CONSTRAINT `login_details_fk` FOREIGN KEY (`sys_role`) REFERENCES `STAFF_DETAILS` (`sys_role`);

--
-- Constraints for table `ROLE_APPLICATIONS`
--
ALTER TABLE `ROLE_APPLICATIONS`
  ADD CONSTRAINT `role_applications_fk1` FOREIGN KEY (`role_listing_id`) REFERENCES `ROLE_LISTINGS` (`role_listing_id`),
  ADD CONSTRAINT `role_applications_fk2` FOREIGN KEY (`staff_id`) REFERENCES `STAFF_DETAILS` (`staff_id`);

--
-- Constraints for table `ROLE_LISTINGS`
--
ALTER TABLE `ROLE_LISTINGS`
  ADD CONSTRAINT `role_listing_fk1` FOREIGN KEY (`role_id`) REFERENCES `ROLE_DETAILS` (`role_id`),
  ADD CONSTRAINT `role_listing_fk2` FOREIGN KEY (`role_listing_source`) REFERENCES `STAFF_DETAILS` (`staff_id`),
  ADD CONSTRAINT `role_listing_fk3` FOREIGN KEY (`role_listing_creator`) REFERENCES `STAFF_DETAILS` (`staff_id`),
  ADD CONSTRAINT `role_listing_fk4` FOREIGN KEY (`role_listing_updater`) REFERENCES `STAFF_DETAILS` (`staff_id`);

--
-- Constraints for table `ROLE_SKILLS`
--
ALTER TABLE `ROLE_SKILLS`
  ADD CONSTRAINT `role_skills_fk1` FOREIGN KEY (`role_id`) REFERENCES `ROLE_DETAILS` (`role_id`),
  ADD CONSTRAINT `role_skills_fk2` FOREIGN KEY (`skill_id`) REFERENCES `SKILL_DETAILS` (`skill_id`);

--
-- Constraints for table `STAFF_REPORTING_OFFICER`
--
ALTER TABLE `STAFF_REPORTING_OFFICER`
  ADD CONSTRAINT `staff_reporting_officer_fk` FOREIGN KEY (`staff_id`) REFERENCES `STAFF_DETAILS` (`staff_id`);

--
-- Constraints for table `STAFF_ROLES`
--
ALTER TABLE `STAFF_ROLES`
  ADD CONSTRAINT `staff_roles_fk` FOREIGN KEY (`staff_role`) REFERENCES `ROLE_DETAILS` (`role_id`);

--
-- Constraints for table `STAFF_SKILLS`
--
ALTER TABLE `STAFF_SKILLS`
  ADD CONSTRAINT `staff_skills_fk1` FOREIGN KEY (`staff_id`) REFERENCES `STAFF_DETAILS` (`staff_id`),
  ADD CONSTRAINT `staff_skills_fk2` FOREIGN KEY (`skill_id`) REFERENCES `SKILL_DETAILS` (`skill_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
