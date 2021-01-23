


DROP TABLE usage;
CREATE TABLE usage (
    id        INTEGER       PRIMARY KEY
                            UNIQUE,
    user_name VARCHAR (128) NOT NULL
                            COLLATE NOCASE,
    word      VARCHAR (64)  NOT NULL
                            COLLATE NOCASE,
    frq       INTEGER       NOT NULL
                            DEFAULT (0),
    UNIQUE (
        user_name,
        word
    )
);


DROP TABLE user;
CREATE TABLE user (
    id   INTEGER       PRIMARY KEY AUTOINCREMENT
                       UNIQUE
                       NOT NULL,
    name VARCHAR (128) UNIQUE
                       NOT NULL
                       COLLATE NOCASE
);
