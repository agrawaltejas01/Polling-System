
-- USERS
insert into users (name)
values ("Tejas");

insert into users (name)
values ("Arpit");

insert into users (name)
values ("Shubham");

insert into users (name)
values ("Suhani");

insert into users (name)
values ("Sagar");

-- POLLS
insert into polls (userId, question, startsAt, duration)
values (1, "What is your favourite programming language", 1470762668, 300);

insert into polls (userId, question, startsAt, duration)
values (2, "What is your favourite database", 1225886400, 600);

insert into polls (userId, question, startsAt, duration)
values (3, "What do you like", 1225540800, 900);

insert into polls (userId, question, startsAt, duration)
values (1, "Which option", 1470762668, 30);

insert into polls (userId, question, startsAt, duration)
values (2, "Who are you", 1228132800, 60);

-- OPTIONS
insert into options (optionText, pollId)
values ("JS", 1);

insert into options (optionText, pollId)
values ("Python", 1);

insert into options (optionText, pollId)
values ("C", 1);

insert into options (optionText, pollId)
values ("Ruby", 1);

insert into options (optionText, pollId)
values ("eating", 2);

insert into options (optionText, pollId)
values ("sleeping", 2);

insert into options (optionText, pollId)
values ("reading", 2);

insert into options (optionText, pollId)
values ("running", 2);

insert into options (optionText, pollId)
values ("A", 3);

insert into options (optionText, pollId)
values ("B", 3);

insert into options (optionText, pollId)
values ("C", 3);

insert into options (optionText, pollId)
values ("D", 3);

insert into options (optionText, pollId)
values ("man", 4);

insert into options (optionText, pollId)
values ("woman", 4);

insert into options (optionText, pollId)
values ("would rather not say", 4);

-- RESPONSES
insert into responses (pollId, userId, optionId)
values (1, 1, 1);

insert into responses (pollId, userId, optionId)
values (1, 2, 1);

insert into responses (pollId, userId, optionId)
values (1, 3, 2);

insert into responses (pollId, userId, optionId)
values (1, 4, 2);

insert into responses (pollId, userId, optionId)
values (1, 5, 4);

insert into responses (pollId, userId, optionId)
values (2, 1, 1);

insert into responses (pollId, userId, optionId)
values (2, 2, 3);

insert into responses (pollId, userId, optionId)
values (2, 3, 2);

insert into responses (pollId, userId, optionId)
values (2, 4, 1);

insert into responses (pollId, userId, optionId)
values (2, 5, 4);