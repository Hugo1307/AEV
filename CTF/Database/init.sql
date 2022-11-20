CREATE TABLE IF NOT EXISTS users (
    email       varchar(128)    primary key,
    password    varchar(128)    null,
    admin       boolean         null,
    token       varchar(256)    null
);

CREATE TABLE IF NOT EXISTS categories (
    id          int             auto_increment  primary key,
    name        varchar(64)     null,
    description varchar(128)    null,
    image       varchar(1024)   null      
);

INSERT IGNORE INTO users VALUES ("admin@ua.pt", "50aebaef4ce5cddb67edf8f2172a6bdc", TRUE, null); -- MD5 hash for '$W239wC8' password

INSERT IGNORE INTO categories (name, description, image) VALUES ("Hamburger", 
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    "https://www.minervafoods.com/wp-content/uploads/2016/06/como_fazer_hamburguer_caseiro.jpg"); 

INSERT IGNORE INTO categories (name, description, image) VALUES ("Pizza", 
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", 
    "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2020/08/pizza-margherita.jpg");