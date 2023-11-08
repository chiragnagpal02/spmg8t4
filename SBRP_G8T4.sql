drop database if exists SBRP_G8T4;
create database SBRP_G8T4;
use SBRP_G8T4;

-- phpMyAdmin SQL Dump
-- version 5.1.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1:3306
-- Generation Time: Nov 08, 2023 at 11:52 AM
-- Server version: 8.0.27
-- PHP Version: 7.4.26

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `sbrp_g8t4`
--

-- --------------------------------------------------------

--
-- Table structure for table `login_details`
--

DROP TABLE IF EXISTS `login_details`;
CREATE TABLE IF NOT EXISTS `login_details` (
  `staff_id` int NOT NULL,
  `username` varchar(20) NOT NULL,
  `password` varchar(200) NOT NULL,
  `sys_role` enum('staff','hr','manager','inactive') NOT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `login_details_fk` (`sys_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `login_details`
--

INSERT INTO `login_details` (`staff_id`, `username`, `password`, `sys_role`) VALUES
(1, 'johndoestaff', 'pass', 'staff'),
(2, 'janesmithstaff', 'pass', 'staff'),
(3, 'alicehr', 'pass', 'hr'),
(4, 'bobmanager', 'pass', 'manager'),
(5, 'michaelbrownstaff', 'pass', 'staff'),
(6, 'emilydavisstaff', 'pass', 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `role_applications`
--

DROP TABLE IF EXISTS `role_applications`;
CREATE TABLE IF NOT EXISTS `role_applications` (
  `role_app_id` int NOT NULL AUTO_INCREMENT,
  `role_listing_id` int NOT NULL,
  `staff_id` int NOT NULL,
  `role_app_status` enum('withdrawn','applied') NOT NULL,
  `role_app_ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`role_app_id`),
  KEY `role_applications_fk1` (`role_listing_id`),
  KEY `role_applications_fk2` (`staff_id`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `role_applications`
--

INSERT INTO `role_applications` (`role_app_id`, `role_listing_id`, `staff_id`, `role_app_status`, `role_app_ts_create`) VALUES
(1, 71395, 1, 'applied', '2023-11-08 06:19:11'),
(2, 71395, 2, 'applied', '2023-11-08 06:19:23'),
(3, 5010, 2, 'applied', '2023-11-08 06:19:33'),
(4, 5010, 1, 'applied', '2023-11-08 11:26:31'),
(5, 28955, 1, 'applied', '2023-11-08 11:41:50'),
(6, 74217, 1, 'applied', '2023-11-08 11:47:00');

-- --------------------------------------------------------

--
-- Table structure for table `role_details`
--

DROP TABLE IF EXISTS `role_details`;
CREATE TABLE IF NOT EXISTS `role_details` (
  `role_id` int NOT NULL,
  `role_name` varchar(50) NOT NULL,
  `role_description` mediumtext NOT NULL,
  `role_status` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`role_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `role_details`
--

INSERT INTO `role_details` (`role_id`, `role_name`, `role_description`, `role_status`) VALUES
(1, 'Customer Success Analyst', 'Provide support to customers', 'active'),
(2, 'Software Engineer (SW3)', 'Develop software applications', 'active'),
(3, 'HR Specialist', 'Human resources management', 'active'),
(4, 'Project Manager', 'Manage projects', 'active'),
(5, 'Data Analyst', 'Analyze data', 'active'),
(6, 'Marketing Specialist', 'Manage marketing campaigns', 'active'),
(7, 'Sales Manager', 'Manage sales team', 'active'),
(8, 'Accountant', 'Manage financial records', 'active'),
(9, 'Legal Counsel', 'Provide legal advice', 'active'),
(10, 'Graphic Designer', 'Design graphics and visuals', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `role_listings`
--

DROP TABLE IF EXISTS `role_listings`;
CREATE TABLE IF NOT EXISTS `role_listings` (
  `role_listing_id` int NOT NULL,
  `role_id` int NOT NULL,
  `role_listing_desc` mediumtext,
  `role_listing_source` int NOT NULL,
  `role_listing_open` datetime NOT NULL,
  `role_listing_close` datetime NOT NULL,
  `role_listing_creator` int NOT NULL,
  `role_listing_ts_create` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `role_listing_updater` int NOT NULL,
  `role_listing_ts_update` timestamp NOT NULL DEFAULT '0000-00-00 00:00:00',
  `role_listing_type` enum('open','closed') NOT NULL,
  `role_listing_department` varchar(50) NOT NULL,
  `role_listing_salary` int DEFAULT NULL,
  `role_listing_location` varchar(500) NOT NULL,
  PRIMARY KEY (`role_listing_id`),
  KEY `role_listing_fk1` (`role_id`),
  KEY `role_listing_fk2` (`role_listing_source`),
  KEY `role_listing_fk3` (`role_listing_creator`),
  KEY `role_listing_fk4` (`role_listing_updater`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `role_listings`
--

INSERT INTO `role_listings` (`role_listing_id`, `role_id`, `role_listing_desc`, `role_listing_source`, `role_listing_open`, `role_listing_close`, `role_listing_creator`, `role_listing_ts_create`, `role_listing_updater`, `role_listing_ts_update`, `role_listing_type`, `role_listing_department`, `role_listing_salary`, `role_listing_location`) VALUES
(5010, 1, 'The Customer Success Analyst plays a pivotal role in ensuring the overall satisfaction and retention of our valued customers. This role requires a keen eye for data analysis, a deep understanding of customer needs, and the ability to translate insights into actionable strategies. As a Customer Success Analyst, you will work closely with our customer success team to identify key trends, track performance metrics, and provide data-driven recommendations that enhance the customer experience. Your contributions will be instrumental in driving customer loyalty, reducing churn, and ultimately contributing to the company\'s success.\n\nIn this role, you will collaborate with various cross-functional teams, including sales, marketing, and product development, to provide valuable insights that help shape product improvements and inform customer engagement strategies. You will be responsible for monitoring customer feedback, conducting surveys, and analyzing user behavior to identify pain points and opportunities for improvement. Additionally, as a Customer Success Analyst, you will have the chance to develop and maintain customer success KPIs, create insightful reports, and communicate your findings to both internal stakeholders and customers. This position offers a unique opportunity to make a significant impact on our customers\' satisfaction and the company\'s overall growth and success.', 4, '2023-11-08 00:00:00', '2023-12-08 00:00:00', 3, '2023-11-08 05:45:55', 3, '2023-11-08 05:45:55', 'open', 'Operations', 3000, 'Singapore'),
(11965, 5, 'Testing124-chirag', 8, '2023-11-08 00:00:00', '2023-12-13 00:00:00', 3, '2023-11-08 06:10:47', 3, '2023-11-08 06:10:47', 'open', 'IT', 50000, 'Los Angeles'),
(25605, 9, 'Testinf1234', 8, '2023-11-08 00:00:00', '2023-12-21 00:00:00', 3, '2023-11-08 06:24:28', 3, '2023-11-08 06:24:28', 'open', 'Finance', 1000, 'Singapore'),
(28068, 10, 'testing', 4, '2023-11-08 00:00:00', '2023-11-30 00:00:00', 3, '2023-11-08 11:41:09', 3, '2023-11-08 11:41:09', 'open', 'Marketing', 213123, 'singapore'),
(28955, 4, 'As a Software Engineer (SW3), you will be an integral part of our dynamic engineering team, responsible for designing, developing, and maintaining cutting-edge software solutions. Your role will involve collaborating with cross-functional teams to understand project requirements, architecting software systems, and writing high-quality code that meets both functional and performance standards. With a strong background in software development, you will contribute to the creation of innovative applications, features, and enhancements that drive our products forward. Your technical expertise and problem-solving skills will be crucial in ensuring the reliability, scalability, and security of our software systems', 4, '2023-11-08 00:00:00', '2023-11-23 00:00:00', 3, '2023-11-08 06:32:56', 3, '2023-11-08 06:32:56', 'open', 'Marketing', 3000, 'Pasir ris '),
(30194, 3, 'Update', 4, '2023-11-08 00:00:00', '2023-11-15 00:00:00', 3, '2023-11-08 06:40:57', 3, '2023-11-08 06:40:58', 'open', 'Finance', 2000, 'Malaysia'),
(71395, 2, 'Testing 123', 8, '2023-11-30 00:00:00', '2024-01-30 00:00:00', 3, '2023-11-08 06:29:25', 3, '2023-11-08 06:29:25', 'open', 'IT', 100000, 'Vietnam'),
(74217, 8, 'qwedqweqw', 4, '2023-11-08 00:00:00', '2023-11-29 00:00:00', 1, '2023-11-08 11:46:30', 1, '2023-11-08 11:46:30', 'open', 'Operations', 5500, 'singapore');

-- --------------------------------------------------------

--
-- Table structure for table `role_skills`
--

DROP TABLE IF EXISTS `role_skills`;
CREATE TABLE IF NOT EXISTS `role_skills` (
  `role_id` int NOT NULL,
  `skill_id` int NOT NULL,
  PRIMARY KEY (`role_id`,`skill_id`),
  KEY `role_skills_fk2` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `role_skills`
--

INSERT INTO `role_skills` (`role_id`, `skill_id`) VALUES
(1, 1),
(3, 1),
(6, 1),
(7, 1),
(8, 1),
(1, 2),
(2, 2),
(6, 2),
(2, 3),
(3, 3),
(7, 3),
(4, 4),
(9, 4),
(4, 5),
(10, 5),
(6, 6),
(10, 6),
(8, 7),
(8, 8),
(2, 11),
(5, 11),
(2, 12),
(5, 12),
(2, 13),
(5, 13);

-- --------------------------------------------------------

--
-- Table structure for table `skill_details`
--

DROP TABLE IF EXISTS `skill_details`;
CREATE TABLE IF NOT EXISTS `skill_details` (
  `skill_id` int NOT NULL,
  `skill_name` varchar(50) NOT NULL,
  `skill_status` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `skill_details`
--

INSERT INTO `skill_details` (`skill_id`, `skill_name`, `skill_status`) VALUES
(1, 'Communication', 'active'),
(2, 'Java Programming', 'active'),
(3, 'Problem Solving', 'active'),
(4, 'Project Management', 'active'),
(5, 'Data Analysis', 'active'),
(6, 'Marketing Campaigns', 'active'),
(7, 'Sales Management', 'active'),
(8, 'Financial Management', 'active'),
(9, 'Legal Advice', 'active'),
(10, 'Graphic Design', 'active'),
(11, 'Python', 'active'),
(12, 'R', 'active'),
(13, 'SQL', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `staff_details`
--

DROP TABLE IF EXISTS `staff_details`;
CREATE TABLE IF NOT EXISTS `staff_details` (
  `staff_id` int NOT NULL,
  `fname` varchar(50) NOT NULL,
  `lname` varchar(50) NOT NULL,
  `dept` varchar(50) NOT NULL,
  `email` varchar(50) NOT NULL,
  `phone` varchar(20) NOT NULL,
  `biz_address` varchar(255) NOT NULL,
  `sys_role` enum('staff','hr','manager','inactive') DEFAULT NULL,
  PRIMARY KEY (`staff_id`),
  KEY `idx_sys_role` (`sys_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `staff_details`
--

INSERT INTO `staff_details` (`staff_id`, `fname`, `lname`, `dept`, `email`, `phone`, `biz_address`, `sys_role`) VALUES
(1, 'John', 'Doe', 'Customer Success', 'john.doe@example.com', '123-456-7890', '123 Main St', 'staff'),
(2, 'Jane', 'Smith', 'Engineering', 'jane.smith@example.com', '987-654-3210', '456 Elm St', 'staff'),
(3, 'Alice', 'Johnson', 'HR', 'alice.johnson@example.com', '111-222-3333', '789 Oak St', 'hr'),
(4, 'Bob', 'Wilson', 'Management', 'bob.wilson@example.com', '333-444-5555', '567 Pine St', 'manager'),
(5, 'Michael', 'Brown', 'Customer Success', 'michael.brown@example.com', '555-666-7777', '789 Oak St', 'staff'),
(6, 'Emily', 'Davis', 'Engineering', 'emily.davis@example.com', '222-333-4444', '456 Elm St', 'staff'),
(7, 'Caroline', 'Lee', 'HR', 'caroline.lee@example.com', '111-222-3333', '123 Main St', 'hr'),
(8, 'David', 'Martin', 'Management', 'david.martin@example.com', '333-444-5555', '567 Pine St', 'manager'),
(9, 'Sarah', 'Wilson', 'Customer Success', 'sarah.wilson@example.com', '555-666-7777', '123 Main St', 'staff'),
(10, 'Daniel', 'Thomas', 'Engineering', 'daniel.thomas@example.com', '222-333-4444', '456 Elm St', 'staff');

-- --------------------------------------------------------

--
-- Table structure for table `staff_reporting_officer`
--

DROP TABLE IF EXISTS `staff_reporting_officer`;
CREATE TABLE IF NOT EXISTS `staff_reporting_officer` (
  `staff_id` int NOT NULL,
  `RO_id` int NOT NULL,
  PRIMARY KEY (`staff_id`,`RO_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

-- --------------------------------------------------------

--
-- Table structure for table `staff_roles`
--

DROP TABLE IF EXISTS `staff_roles`;
CREATE TABLE IF NOT EXISTS `staff_roles` (
  `staff_id` int NOT NULL,
  `staff_role` int NOT NULL,
  `role_type` enum('primary','secondary') NOT NULL,
  `sr_status` enum('active','inactive') NOT NULL,
  PRIMARY KEY (`staff_id`,`staff_role`),
  KEY `staff_roles_fk` (`staff_role`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `staff_roles`
--

INSERT INTO `staff_roles` (`staff_id`, `staff_role`, `role_type`, `sr_status`) VALUES
(1, 1, 'primary', 'active'),
(1, 2, 'secondary', 'active'),
(2, 2, 'primary', 'active'),
(2, 3, 'secondary', 'active'),
(3, 1, 'primary', 'active'),
(3, 4, 'secondary', 'active'),
(4, 4, 'primary', 'active'),
(4, 5, 'secondary', 'active'),
(5, 1, 'primary', 'active'),
(5, 6, 'secondary', 'active');

-- --------------------------------------------------------

--
-- Table structure for table `staff_skills`
--

DROP TABLE IF EXISTS `staff_skills`;
CREATE TABLE IF NOT EXISTS `staff_skills` (
  `staff_id` int NOT NULL,
  `skill_id` int NOT NULL,
  `ss_status` enum('active','unverified','in-progress') NOT NULL,
  PRIMARY KEY (`staff_id`,`skill_id`),
  KEY `staff_skills_fk2` (`skill_id`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb3;

--
-- Dumping data for table `staff_skills`
--

INSERT INTO `staff_skills` (`staff_id`, `skill_id`, `ss_status`) VALUES
(1, 2, 'active'),
(1, 11, 'active'),
(1, 12, 'active'),
(1, 13, 'active'),
(2, 11, 'active'),
(2, 12, 'active'),
(3, 1, 'active'),
(3, 3, 'active'),
(4, 4, 'active'),
(4, 5, 'active'),
(5, 1, 'active'),
(5, 3, 'active'),
(5, 4, 'active'),
(5, 5, 'active');

--
-- Constraints for dumped tables
--

--
-- Constraints for table `login_details`
--
ALTER TABLE `login_details`
  ADD CONSTRAINT `login_details_fk` FOREIGN KEY (`sys_role`) REFERENCES `staff_details` (`sys_role`);

--
-- Constraints for table `role_applications`
--
ALTER TABLE `role_applications`
  ADD CONSTRAINT `role_applications_fk1` FOREIGN KEY (`role_listing_id`) REFERENCES `role_listings` (`role_listing_id`),
  ADD CONSTRAINT `role_applications_fk2` FOREIGN KEY (`staff_id`) REFERENCES `staff_details` (`staff_id`);

--
-- Constraints for table `role_listings`
--
ALTER TABLE `role_listings`
  ADD CONSTRAINT `role_listing_fk1` FOREIGN KEY (`role_id`) REFERENCES `role_details` (`role_id`),
  ADD CONSTRAINT `role_listing_fk2` FOREIGN KEY (`role_listing_source`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `role_listing_fk3` FOREIGN KEY (`role_listing_creator`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `role_listing_fk4` FOREIGN KEY (`role_listing_updater`) REFERENCES `staff_details` (`staff_id`);

--
-- Constraints for table `role_skills`
--
ALTER TABLE `role_skills`
  ADD CONSTRAINT `role_skills_fk1` FOREIGN KEY (`role_id`) REFERENCES `role_details` (`role_id`),
  ADD CONSTRAINT `role_skills_fk2` FOREIGN KEY (`skill_id`) REFERENCES `skill_details` (`skill_id`);

--
-- Constraints for table `staff_reporting_officer`
--
ALTER TABLE `staff_reporting_officer`
  ADD CONSTRAINT `staff_reporting_officer_fk` FOREIGN KEY (`staff_id`) REFERENCES `staff_details` (`staff_id`);

--
-- Constraints for table `staff_roles`
--
ALTER TABLE `staff_roles`
  ADD CONSTRAINT `staff_roles_fk` FOREIGN KEY (`staff_role`) REFERENCES `role_details` (`role_id`);

--
-- Constraints for table `staff_skills`
--
ALTER TABLE `staff_skills`
  ADD CONSTRAINT `staff_skills_fk1` FOREIGN KEY (`staff_id`) REFERENCES `staff_details` (`staff_id`),
  ADD CONSTRAINT `staff_skills_fk2` FOREIGN KEY (`skill_id`) REFERENCES `skill_details` (`skill_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
