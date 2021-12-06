CREATE SCHEMA 'CRUDDatabase';
CREATE TABLE 'CRUDDatabase'.'movie_reviews'(
    'id' INT NOT NULL AUTO_INCREMENT,
    'movieName' VARCHAR(200) NOT NULL,
    'movieReview' TEXT(200) NOT NULL,
    PRIMARY KEY ('id')
);