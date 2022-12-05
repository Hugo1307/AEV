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
    recipe      varchar(2048)   null,
    image       varchar(1024)   null      
);

INSERT IGNORE INTO users VALUES ("admin@ua.pt", "68196577a65c3f66cc0f4edd71765a89", TRUE, null); -- MD5 hash for '5W5m2' password

INSERT IGNORE INTO categories (name, description, recipe, image) VALUES ("Hamburger", "Hamburguer is originary from Germany",
    "Preheat an outdoor grill for high heat and lightly oil the grate.
Meanwhile, combine ground beef, onion, cheese, egg, onion soup mix, minced garlic, garlic powder, soy sauce, Worcestershire sauce, parsley, basil, oregano, rosemary, salt, and pepper in a large bowl. Use your hands to form the mixture into 4 patties.
Cook patties on the preheated grill until no longer pink in the center and the juices run clear, about 4 to 5 minutes per side. An instant-read thermometer inserted into the center should read at least 165 degrees F (74 degrees C).", 
    "https://www.minervafoods.com/wp-content/uploads/2016/06/como_fazer_hamburguer_caseiro.jpg"); 

INSERT IGNORE INTO categories (name, description, recipe, image) VALUES ("Pizza", "Pizza is an italian food.",
    "Make the dough: Mix the dough ingredients together by hand or use a hand-held or stand mixer. Do this in steps as described in the written recipe below.
Knead: Knead by hand or beat the dough with your mixer. I like doing this by hand and you can watch me in the video.
Rise: Place dough into a greased mixing bowl, cover tightly, and set aside to rise for about 90 minutes or overnight in the refrigerator.
Punch & shape: Punch down risen dough to release air bubbles. Divide in 2. Roll dough out into a 12-inch circle. Cover and rest as you prep the pizza toppings.
Top it: Top with favorite pizza toppings.
Bake: Bake pizza at a very high temperature for only about 15 minutes.", 
    "https://static.clubedaanamariabraga.com.br/wp-content/uploads/2020/08/pizza-margherita.jpg");