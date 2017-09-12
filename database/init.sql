CREATE TABLE T_Article (
	_id INT(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(_id),
	title VARCHAR(30),
	slug VARCHAR(50),
	html VARCHAR(20480),
	summary VARCHAR(1024),
	createdOn DATETIME,
	updatedOn DATETIME,
	jsonRepresentation VARCHAR(20480)
);

CREATE TABLE T_Tag (
	_id INT(11) NOT NULL AUTO_INCREMENT,
	PRIMARY KEY(_id),
	val VARCHAR(50)
);

CREATE TABLE T_Article_Tags (
	T_Article_Id INT(11),
	T_Tag_Id INT(11),
	FOREIGN KEY (T_Article_Id) REFERENCES T_Article(_id),
	FOREIGN KEY (T_Tag_Id) REFERENCES T_Tag(_id)
);