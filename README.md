# Full Stack
This documentation provides instructions for setting up a React and Node application with MySQL using Docker Compose.

Prerequisites
Docker
Docker Compose
Getting Started
To get started with this project, clone the repository to your local machine:

bash
git clone <url>
Running the Application
Navigate to root of the project directory and run the following command:

docker-compose up

This command will build and start the containers for the frontend, server, and MySQL database. The containers will be started in the foreground, so you will be able to see the logs from all containers in the same terminal window.


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



Once the containers are up and running, you can access the frontend of the application by navigating to http://localhost in your web browser.
Configuration
The Docker Compose configuration file defines the following services:

frontend
This service builds a container for running the frontend of the application. It uses the Dockerfile located in the 'frontend' directory to build the container. The service mounts the './frontend' directory as a volume to '/app' in the container. It also exposes port 80 and depends on the server service.

server
This service builds a container for running the backend server of the application. It uses the Dockerfile located in the 'server' directory to build the container. The service mounts the './server' directory as a volume to '/app' in the container and also mounts '/app/node_modules' as a volume. The service exposes port 3008 and depends on the dbmysql service. It also sets environment variables for the MySQL database name, root password, and host.

dbmysql
This service runs a MySQL database using the official MySQL 5.7 image. The service exposes port 3306 and sets environment variables for the MySQL database name and root password. It also mounts the 'my-db' volume to '/var/lib/mysql' in the container and mounts the './mysql' directory as a volume to '/docker-entrypoint-initdb.d/' in the container.

Volumes
The Docker Compose configuration file defines a volume named 'my-db' that is used by the dbmysql service to store the MySQL data.

Stopping the Application
To stop the application, run the following command:


docker-compose down