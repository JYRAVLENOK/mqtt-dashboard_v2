CREATE TABLE person
(
    id SERIAL PRIMARY KEY,
    username VARCHAR(255),
    password VARCHAR(255),
    root BIT
);

CREATE TABLE device
(
    id SERIAL PRIMARY KEY,
    settings VARCHAR(255),
    subscribe VARCHAR(255),
    publish VARCHAR(255)
);

CREATE TABLE room
(
    id SERIAL PRIMARY KEY,
    name VARCHAR(255)
);

CREATE TABLE card
(
    id SERIAL PRIMARY KEY,
    user_id INTEGER,
    device_id INTEGER,
    name VARCHAR(255),
    room_id INTEGER,
    type VARCHAR(255),
    FOREIGN KEY (user_id) REFERENCES person (id),
    FOREIGN KEY (device_id) REFERENCES device (id),
    FOREIGN KEY (room_id) REFERENCES room (id)
);