insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                     1,
                                     1,
                                     'In this level we will try to execute a Tautology attack on the vulnerable database. The goal of this type of attacks
are to inject code in one or more conditional statement so that they always evaluate tot true.

On the page is an input box for searching the product table based on the name of the product (ex. Keyboard).

The challange is to get all the products in the database listen in the output.

For this challange you will have the constructed sql query shown:
SELECT * FROM Product WHERE product=''[USER_INPUT]''',
                                     'You can start by closing quotation marks('') on the product and writeing some SQL condition which will be allways true.
End the query with an inline comment(--) to close the SQL expression correctly.
',
                                     'The solution is: '' OR ''1''=''1''--',
                                     'Display all rows in a table'
                                     );

insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                                                                                        2,
                                                                                                        2,
                                                                                                        'In this level you need to find all the tables from the database.
To achieve that you will need to concatenate the result of the query from the product table to another one.
For this operation you will use the UNION keyword.
The information about all the database tables are in INFORMATION_SCHEMA.TABLES table, and the column name for the table names is "table_name".

The SQL query which is executed on the server side is the same as on the level1:
SELECT * FROM Product WHERE product=''[USER_INPUT]''',
                                                                                                        'To resolve this level you will need 2 SELECT statements united with the UNION keyword.
The first one is given and you need to make the second one.
For the union to work you need to match the number of returned columns on both of the SELECTs, as well as the column types.
To find out the number of columns, you can use "null" as column selector in the second query. When it doesn''t give an error, you found the correct number.

Tip. The Product table could have more columns than it is shown on the webpage
',
                                                                                                        'To find the number of columns you can use: UNION SELECT null,null... until it doesn''t return an error, then you have the number.
The actual solution query is: ''UNION SELECT null, table_name, null FROM INFORMATION_SCHEMA.TABLES--
',
                                                                                                        'Display other tables in the database'
                                                                                                    );

insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                                                                                        3,
                                                                                                        3,
                                                                                                        'In this level you will need to retrieve the columns of a hidden table(named: HIDDENTABLE...).
The information about the columns can be found in the INFORMATION_SCHEMA.COLUMNS table.
To pass the level you need to retrieve just the hidden tables columns.

The sql query is the same as the precious level:
SELECT * FROM Product WHERE product=''[USER_INPUT]''',
                                                                                                        'For this level you need to use the query from the previous level to find the complete name of the hidden table.
After this you need to search the columns in the INFORMATION_SCHEMA.COLUMNS of the hidden table, and to retrieve just those on the screen.
',
                                                                                                        'For this level first you need to find the hidden table with the following query:
''UNION SELECT null, table_name, null FROM INFORMATION_SCHEMA.TABLES--

And after this you need to find the names of the columns from the hidden table:
'' UNION SELECT null,column_name,null FROM INFORMATION_SCHEMA.COLUMNS WHERE table_name=''HIDDENTABLEXYM3G''--
',
                                                                                                        'Find the column names of a table'
                                                                                                    );


insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                                                                                        4,
                                                                                                        4,
                                                                                                        'On this level you will have to find informations about the vulnerable database.
All SQL databases have a database name, DBMS version, and
current user associated with it. The name of the database or current
user can help with creating an injection and knowing the DBMS
version helps with identifying known vulnerabilities.

In this case it is a H2 database and you are required to retrieve the database name, username and DBMS version.
The sql query is the same as the precious level:
SELECT * FROM Product WHERE product=''[USER_INPUT]''',
                                                                                                        'To accomplish this task you will need to call the functions for retrieveing these information using the SELECT command.
The functions are: DATABASE(), CURRENT_USER() and H2VERSION().',
                                                                                                        'The solution:
'' UNION SELECT null, DATABASE(), null UNION SELECT null, CURRENT_USER(), null UNION SELECT null, H2VERSION(), null--
',
                                                                                                        'Retrieve information about the database'
                                                                                                    );

insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                                                                                        5,
                                                                                                        5,
                                                                                                        'This level simulates a vulnerable login form, so we have 2 injectable fields.
The goal of the level is to log in as administrator.
The administrators username is ''admin'', but we do not have the password.
To complete the challange we need to bypass the password field.

The SQL query for this challange is:
SELECT username FROM UserTable WHERE username =''[USER_INPUT]'' AND password = ''[USER_INPUT]''
',
                                                                                                        'To complete this challange you need to bypass the password field
',
                                                                                                        'The solution for this level is to write on the username field:
admin''--',
                                                                                                        'Log in as admin'
                                                                                                    );

insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                                                                                        6,
                                                                                                        6,
                                                                                                        'Another vulnerability in login forms is that a malicious attacker can retrieve user passwords.
The query is again:
SELECT username FROM users_level7 WHERE username = ''[USER INPUT]'' AND password = ''[USER INPUT]''

This time the form will display the returned value of the query onto the website.
The goal is to find the admin''s password and return it.
',
                                                                                                        'In order to complete this level you need to return the password of the admin.
From the provided query you can see that there is a column name password in that table,
so you need to create a query in which you return the password field from the table.
',
                                                                                                        'The solution is:
'' UNION SELECT password FROM USERTABLE WHERE username = ''admin''',
                                                                                                        'Retrieve admin''s password'
                                                                                                    );


insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                                                                                        7,
                                                                                                        7,
                                                                                                        'In this level the challange is to fetch the admin passowrd. You can log in with bob/tequila credentials.
While in the previous level the query result was displayed on the screen, this time the site only tells if you logged in.
To complete the level you have to log in with the actual admin account credentials
',
                                                                                                        'To complete the level you need to brute force the admin password.
Use the LIKE operator on the password field and iterate trough the alphabet to find the first character of the password, then the 2nd and so on.
',
                                                                                                        'To try to solve this level you need to add to the username field the following query:
admin'' AND password LIKE ''a%''--

You need to iterate on the alphabet starting with ''a'' to find the first letter, and then the second and so on.

Solution:
username: admin
password: pass',
                                                                                                        'Boolean SQL injection'
                                                                                                    );

insert into levelinformation (id,level,levelDescription,levelHint,levelSolution, levelTitle) values (
                                                                                                        8,
                                                                                                        8,
                                                                                                        'This level is an extension of two previous levels, challanging the user to first find the table name and then the admin password.
In a table of the clients you need to find the admin accounts password.
An additional challange is that each query can only return one row of a table and one column. You will need additional commands to solve this challange
',
                                                                                                        'To accomplish this challange first you need to search the informatio schema of the database to find the tablename of the client table.
To achieve that you need to use additional SQL commands, such as the OFFSET operator or the GROUP_CONCAT.

After you find the name of the table you can use an injection from the previous levels to return the admin password.

The OFFSET operator skips the provided number of rows and show the rest:
eq. OFFSET 1 ROWS
The GROUP_CONCAT function returns a string with concatenated non-NULL value from a group.
eq. CONCAT(product ||''--''|| description) ',
                                                                                                        'First you need to fin the name of the clients table;
'' UNION SELECT GROUP_CONCAT(TABLE_NAME) FROM INFORMATION_SCHEMA.TABLES GROUP BY TABLE_SCHEMA OFFSET 1 ROWS--

Then with the new client table what you found you inject the following query ro get the admin password.
'' UNION SELECT password FROM NEWCLIENTTABLE WHERE username=''admin''--
',
                                                                                                        'Retrieve table name and then admin password'
                                                                                                    );


