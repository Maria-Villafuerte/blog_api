#513ae64f6e843fc3fb793d6c54086895f234d2a6b2bb886b3df19162df314116
FROM ubuntu:latest
RUN apt-get update && \
    apt-get install -y mysql-server

# Use the official MySQL image as the base image
FROM mysql:latest

# Set environment variables for MySQL
ENV MYSQL_DATABASE=recipes_db
ENV MYSQL_ROOT_PASSWORD=1234
ENV MYSQL_USER=MajoV
# Optionally, define the default user and password (if needed)
ENV MYSQL_PASSWORD=1234

# Add your schema SQL script to the docker-entrypoint-initdb.d directory
COPY schema.sql /docker-entrypoint-initdb.d/schema.sql

# Expose port 3306 to enable communication to/from the server
EXPOSE 3306

CMD ["mysqld"] 

# When the container starts, MySQL will automatically execute
# scripts in /docker-entrypoint-initdb.d/ to initialize the datab