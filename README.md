# Full Stack

Express Server, React TypeScript & MySQL on Docker. 

## Prepare

For prod environment you need to set public IP or domain in react/package.json

```
"build": "REACT_APP_NODE_IP=nnn.nnn.nnn.nnn:3008 react-scripts build",
```

```sh
MYSQL_DATABASE=mydb
MYSQL_HOST=dbmysql
MYSQL_ROOT_PASSWORD=
```

and start docker stack

```sh
docker-compose up
```

## MySQL

Seed Daa is automatically inserted using start up seeding script

## Nodejs

To update

## React

Development

`npm start:dev`

`yarn start`

Production build is running on <http://localhost> after `docker-compose up` 

It calls Nodejs service to get data from the API endpoints.

Async / Await, Loader, Routes, Retry API calls, deal with error HTTP responses and axios timeout



