USE auth;
CREATE TABLE user(
    id INT NOT NULL AUTO_INCREMENT,
    usertype_id INT NOT NULL,
    `name` VARCHAR(50) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (usertype_id) REFERENCES usertype(id)
);
