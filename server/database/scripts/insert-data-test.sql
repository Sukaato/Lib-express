INSERT INTO Users(login, password, id_role) 
    VALUES ("Sukaato", "pswd", "1"),
            ("Xen", "pswd", "2"),
            ("Akkoga", "pswd", "3");

INSERT INTO Articles(title, content, createdAt, updatedAt, id_user) 
    VALUES ("Titre n°1", "content 1", "CURDATE()", "CURDATE()", "1"),
            ("Titre n°2", "content 2", "CURDATE()", "CURDATE()", "2"),
            ("Titre n°3", "content 3", "CURDATE()", "CURDATE()", "3");

INSERT INTO Tags(tag) 
    VALUES ("tag 1"),
            ("test-api"),
            ("test,api2"),
            ("express is easy");

INSERT INTO TagsArticles(id_article, id_tag)
    VALUES ("1", "1"),
            ("1", "2"),
            ("2", "3"),
            ("3", "3");

INSERT INTO Comments(comment, createdAt, id_article, id_user)
    VALUES ("Comment 1", "CURDATE()", "2", "3"),
            ("Comment 2", "CURDATE()", "3", "1"),
            ("Comment 3", "CURDATE()", "3", "3");
