-- phpMyAdmin SQL Dump
-- version 5.0.4
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Oct 10, 2021 at 08:24 PM
-- Server version: 10.4.17-MariaDB
-- PHP Version: 8.0.0

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `attendance-management-reactjs-nodejs`
--

-- --------------------------------------------------------

--
-- Table structure for table `attendance_sheet`
--

CREATE TABLE `attendance_sheet` (
  `id` int(11) NOT NULL,
  `course_code` varchar(191) NOT NULL,
  `class_num` varchar(191) NOT NULL,
  `attendance_data` text NOT NULL,
  `date` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `attendance_sheet`
--

INSERT INTO `attendance_sheet` (`id`, `course_code`, `class_num`, `attendance_data`, `date`) VALUES
(145, 'ICT-2206', '1', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-09'),
(146, 'ICT-2206', '2', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-09'),
(147, 'ICT-2206', '3', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-09'),
(148, 'ICT-2206', '4', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-09'),
(149, 'ICT-2206', '5', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-09'),
(150, 'ICT-2206', '6', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-10'),
(151, 'ICT-2206', '7', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(152, 'ICT-2206', '8', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(153, 'ICT-2206', '9', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(154, 'ICT-2206', '10', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(155, 'ICT-2206', '11', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(156, 'ICT-2206', '12', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-10'),
(157, 'ICT-2206', '13', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(158, 'ICT-2206', '14', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(159, 'ICT-2206', '15', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"absent\":\"absent\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-10'),
(160, 'ICT-2206', '16', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-10'),
(161, 'ICT-2206', '17', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(162, 'ICT-2206', '18', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-10'),
(163, 'ICT-2206', '19', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(164, 'ICT-2206', '20', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(165, 'ICT-2206', '21', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(166, 'ICT-2206', '22', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10'),
(167, 'ICT-2206', '23', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"present\":\"present\"}]', '2021-10-10'),
(168, 'ICT-2206', '24', '[{\"student_id\":\"IT-18003\",\"student_name\":\"Zafrul hasan nasim\",\"student_email\":\"nasimkhan18003@gmail.com\",\"present\":\"present\"},{\"student_id\":\"IT-18006\",\"student_name\":\"nader khan\",\"student_email\":\"nader@gmail.com\",\"absent\":\"absent\"}]', '2021-10-10');

-- --------------------------------------------------------

--
-- Table structure for table `course_list`
--

CREATE TABLE `course_list` (
  `id` int(11) NOT NULL,
  `course_code` varchar(191) NOT NULL,
  `course_name` varchar(191) NOT NULL,
  `course_pin` text NOT NULL,
  `email` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_list`
--

INSERT INTO `course_list` (`id`, `course_code`, `course_name`, `course_pin`, `email`) VALUES
(18, 'ICT-2206', 'operates sysytem', 'hfjstn', 'nasimkhan18003@gmail.com'),
(40, 'TYTYTY', 'tytyty', 'yspa9o', 'nasimkhan@gmail.com');

-- --------------------------------------------------------

--
-- Table structure for table `course_wise_student-list`
--

CREATE TABLE `course_wise_student-list` (
  `id` int(11) NOT NULL,
  `student_id` varchar(191) NOT NULL,
  `student_name` varchar(191) NOT NULL,
  `email` varchar(191) NOT NULL,
  `course_code` varchar(191) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `course_wise_student-list`
--

INSERT INTO `course_wise_student-list` (`id`, `student_id`, `student_name`, `email`, `course_code`) VALUES
(33, 'IT-18003', 'Zafrul hasan nasim', 'nasimkhan18003@gmail.com', 'ICT-2206'),
(34, 'IT-18006', 'Zafrul hasan nasim', 'nasimkhan18003@gmail.com', 'TYTYTY');

-- --------------------------------------------------------

--
-- Table structure for table `user`
--

CREATE TABLE `user` (
  `id` int(191) NOT NULL,
  `name` varchar(191) NOT NULL,
  `student_id` varchar(191) DEFAULT NULL,
  `email` varchar(191) NOT NULL,
  `profile_photo` text DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

--
-- Dumping data for table `user`
--

INSERT INTO `user` (`id`, `name`, `student_id`, `email`, `profile_photo`) VALUES
(19, 'Zafrul hasan nasim', NULL, 'nasimkhan18003@gmail.com', 'https://lh3.googleusercontent.com/a-/AOh14GjVJxVO6SujHWFgglBCM4x2iS-aCFwT1x8XmgLZ=s96-c'),
(21, 'Zafrul Hasan Khan (Nasim)', NULL, 'nasimkhan@gmail.com', 'https://avatars.githubusercontent.com/u/55837057?v=4');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `attendance_sheet`
--
ALTER TABLE `attendance_sheet`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_list`
--
ALTER TABLE `course_list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `course_wise_student-list`
--
ALTER TABLE `course_wise_student-list`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `user`
--
ALTER TABLE `user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `attendance_sheet`
--
ALTER TABLE `attendance_sheet`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=169;

--
-- AUTO_INCREMENT for table `course_list`
--
ALTER TABLE `course_list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=43;

--
-- AUTO_INCREMENT for table `course_wise_student-list`
--
ALTER TABLE `course_wise_student-list`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=35;

--
-- AUTO_INCREMENT for table `user`
--
ALTER TABLE `user`
  MODIFY `id` int(191) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=22;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
