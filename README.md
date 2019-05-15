# Project-2

## Setup the project

**Install the project**:

``` bash
git clone https://github.com/devingprice/project-2.git
cd project-2
npm i
```

**Setup the database**:

Run the sql commands in models/schema.sql

``` bash
mysql -u root -p > source models/schema.sql
```

**Setup the environmental variables**: Replace the variables in example.env with your local mysql settings and rename the file to `.env`

**Run the server**:

``` bash
npm start
```