DROP DATABASE IF EXISTS Lib_express ;
CREATE DATABASE Lib_express ;
USE Lib_express ;

DROP TABLE IF EXISTS Roles ;
CREATE TABLE Roles (
    id int UNSIGNED AUTO_INCREMENT NOT NULL, 
    role VARCHAR(50) UNIQUE, 
    PRIMARY KEY (id) 
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Users ;
CREATE TABLE Users (
    id int UNSIGNED AUTO_INCREMENT NOT NULL, 
    login VARCHAR(50) UNIQUE, 
    password VARCHAR(50), 
    id_role INT UNSIGNED NOT NULL, 
    PRIMARY KEY (id) 
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Articles ;
CREATE TABLE Articles (
    id int UNSIGNED AUTO_INCREMENT NOT NULL, 
    title VARCHAR(150) UNIQUE, 
    content TEXT, 
    createdAt DATE, 
    updatedAt DATE, 
    id_user INT UNSIGNED NOT NULL, 
    PRIMARY KEY (id) 
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Tags ;
CREATE TABLE Tags (
    id int UNSIGNED AUTO_INCREMENT NOT NULL, 
    tag VARCHAR(50) UNIQUE, 
    PRIMARY KEY (id) 
) ENGINE=InnoDB;

DROP TABLE IF EXISTS Comments ;
CREATE TABLE Comments (
    id int UNSIGNED AUTO_INCREMENT NOT NULL, 
    comment TEXT, 
    createdAt DATE, 
    id_article int UNSIGNED NOT NULL, 
    id_user int UNSIGNED NOT NULL,
    PRIMARY KEY (id) 
) ENGINE=InnoDB;

DROP TABLE IF EXISTS TagsArticles ;  
CREATE TABLE TagsArticles (
    id_article int UNSIGNED AUTO_INCREMENT NOT NULL, 
    id_tag int UNSIGNED NOT NULL, 
    PRIMARY KEY (id_article, id_tag) 
) ENGINE=InnoDB;

ALTER TABLE Users ADD CONSTRAINT FK_Users_id_role FOREIGN KEY (id_role) REFERENCES Roles (id);
ALTER TABLE Articles ADD CONSTRAINT FK_Articles_id_user FOREIGN KEY (id_user) REFERENCES Users (id) ON DELETE CASCADE;
ALTER TABLE Comments ADD CONSTRAINT FK_Comments_id_article FOREIGN KEY (id_article) REFERENCES Articles (id) ON DELETE CASCADE;
ALTER TABLE Comments ADD CONSTRAINT FK_Comments_id_user FOREIGN KEY (id_user) REFERENCES Users (id) ON DELETE CASCADE;
ALTER TABLE TagsArticles ADD CONSTRAINT FK_TagsArticles_id_article FOREIGN KEY (id_article) REFERENCES Articles (id) ON DELETE CASCADE;
ALTER TABLE TagsArticles ADD CONSTRAINT FK_TagsArticles_id_tag FOREIGN KEY (id_tag) REFERENCES Tags (id) ON DELETE CASCADE;

INSERT INTO Roles(role) VALUES ('Admin'), ('Editor'), ('User');
