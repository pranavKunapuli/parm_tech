CREATE TABLE Country (
	cname 		varchar(50),
	continent	varchar(50),
	PRIMARY KEY (cname)
);

CREATE TABLE Has_Team (
	cname		varchar(50),
	year		int,
	PRIMARY KEY (cname, year),
	FOREIGN KEY (cname) REFERENCES Country (cname)
		ON DELETE CASCADE
);

CREATE TABLE Coach (
	coname		varchar(100),
	PRIMARY KEY (coname)
);

CREATE TABLE Coaches (
	coname		varchar(100),
	cname		varchar(50),
	year		int,
	PRIMARY KEY (coname, cname, year),
	FOREIGN KEY (coname) REFERENCES Coach (coname),
	FOREIGN KEY (cname, year) REFERENCES Has_Team (cname, year)
);

CREATE TABLE Player (
	pname		varchar(100),
	position	varchar(50),
	PRIMARY KEY (pname)
);

CREATE TABLE Plays_For (
	pname		varchar(100),
	cname		varchar(50),
	year		int,
	PRIMARY KEY (pname, cname, year),
	FOREIGN KEY (pname) REFERENCES Player (pname),
	FOREIGN KEY (cname, year) REFERENCES Has_Team (cname, year)
);

CREATE TABLE Tournament (
	tname		varchar(10),
	PRIMARY KEY (tname)
);

CREATE TABLE Hosts (
	cname		varchar(50),
	year		int,
	tname		varchar(10),
	PRIMARY KEY (cname, year, tname),
	FOREIGN KEY (cname) REFERENCES Country (cname),
	FOREIGN KEY (tname) REFERENCES Tournament (tname)
);

CREATE TABLE Competes_In (
	cname		varchar(50),
	year		int,
	tname		varchar(10),
	stage		varchar(50),
	score		varchar(10),
	result		varchar(1),
	PRIMARY KEY (cname, year, tname, stage),
	FOREIGN KEY (cname, year) REFERENCES Has_Team (cname, year),
	FOREIGN KEY (tname) REFERENCES Tournament (tname),
	CHECK (result IN ('W','L'))
);




