CREATE DATABASE IF NOT EXISTS sme_digi_final CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
USE sme_digi_final;

CREATE TABLE IF NOT EXISTS smes (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sme_name VARCHAR(150) NOT NULL,
  owner_name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  business_type ENUM('Retail','Manufacturing','Services','Agriculture') NOT NULL,
  location ENUM('Urban','Rural') NOT NULL,
  employees INT NOT NULL,
  years_operation INT NOT NULL,
  status ENUM('Active','Inactive') DEFAULT 'Active',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS admins (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  email VARCHAR(190) NOT NULL UNIQUE,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE IF NOT EXISTS assessment_questions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  assessment_type ENUM('Readiness','Barrier','Performance') NOT NULL,
  business_type VARCHAR(30) NOT NULL DEFAULT 'ALL',
  dimension VARCHAR(100) NOT NULL,
  question_text TEXT NOT NULL,
  is_common TINYINT(1) DEFAULT 1,
  display_order INT DEFAULT 0,
  active TINYINT(1) DEFAULT 1
);

CREATE TABLE IF NOT EXISTS assessment_sessions (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sme_id INT NOT NULL,
  assessment_type ENUM('Readiness','Barrier','Performance') NOT NULL,
  overall_score DECIMAL(5,2) NOT NULL,
  level ENUM('Low','Moderate','High') NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sme_id) REFERENCES smes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS assessment_responses (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  question_id INT NOT NULL,
  answer_value DECIMAL(5,2) NOT NULL,
  FOREIGN KEY (session_id) REFERENCES assessment_sessions(id) ON DELETE CASCADE,
  FOREIGN KEY (question_id) REFERENCES assessment_questions(id)
);

CREATE TABLE IF NOT EXISTS assessment_scores (
  id INT AUTO_INCREMENT PRIMARY KEY,
  session_id INT NOT NULL,
  dimension VARCHAR(100) NOT NULL,
  score DECIMAL(5,2) NOT NULL,
  level ENUM('Low','Moderate','High') NOT NULL,
  FOREIGN KEY (session_id) REFERENCES assessment_sessions(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS recommendation_rules (
  id INT AUTO_INCREMENT PRIMARY KEY,
  business_type VARCHAR(30) NOT NULL DEFAULT 'ALL',
  assessment_type ENUM('Readiness','Barrier','Performance') NOT NULL,
  dimension VARCHAR(100) NOT NULL,
  classification ENUM('Low','Moderate','High') NOT NULL,
  priority_area VARCHAR(120) NOT NULL,
  recommendation_text TEXT NOT NULL,
  priority INT DEFAULT 2
);

CREATE TABLE IF NOT EXISTS inventory (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sme_id INT NOT NULL,
  product_name VARCHAR(150) NOT NULL,
  quantity INT DEFAULT 0,
  reorder_level INT DEFAULT 0,
  unit_price DECIMAL(12,2) DEFAULT 0,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sme_id) REFERENCES smes(id) ON DELETE CASCADE
);

CREATE TABLE IF NOT EXISTS sales (
  id INT AUTO_INCREMENT PRIMARY KEY,
  sme_id INT NOT NULL,
  amount DECIMAL(12,2) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (sme_id) REFERENCES smes(id) ON DELETE CASCADE
);
