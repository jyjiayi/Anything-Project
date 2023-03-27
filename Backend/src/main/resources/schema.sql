CREATE TABLE If NOT EXISTS users (username CHAR(50) NOT null, PRIMARY KEY(username));

CREATE TABLE If NOT EXISTS questions (qns_id INT AUTO_INCREMENT, username CHAR(50), question VARCHAR(30000) NOT NULL, bookmark CHAR(1), selected_opt VARCHAR(30000),
PRIMARY KEY(qns_id), FOREIGN KEY (username) REFERENCES users(username));

CREATE TABLE if NOT EXISTS OPTIONS (option_id INT AUTO_INCREMENT, qns_id int, OPTION VARCHAR(30000) NOT NULL, weight INT NOT NULL,
PRIMARY KEY(option_id), FOREIGN KEY (qns_id) REFERENCES questions(qns_id));