var user = create table users (
    userId int NOT NULL AUTO_INCREMENT, 
    name varchar(15), 
    primary key (userId)
);

var poll = create table polls (
    pollId int NOT NULL AUTO_INCREMENT,
    userId int NOT NULL,
    question varchar(255) NOT NULL, 
    startsAt int(11),
    duration int(11),
    primary key (pollId),
    foreign key (userId) references users(userId)
);

var options = create table options (
    optionId int NOT NULL AUTO_INCREMENT,
    optionText varchar(50) NOT NULL,
    pollId int NOT NULL,
    primary key (optionId),
    foreign key (pollId) references polls(pollId)
);

var responses = create table responses (
    responseId int NOT NULL AUTO_INCREMENT,
    pollId int NOT NULL,
    userId int NOT NULL,
    optionId int NOT NULL,
    primary key (responseId),
    unique (pollId, userId),
    foreign key (pollId) references polls(pollId),
    foreign key (userId) references users(userId),
    foreign key (optionId) references options(optionId)
);