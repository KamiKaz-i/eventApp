# Use the official MySQL image as the foundation
FROM mysql:8.0

# Set required environment variables for the database
ENV MYSQL_ROOT_PASSWORD=root
ENV MYSQL_DATABASE=lockedin

# Copy the SQL backup file into the container's initialization directory.
# Any .sql file in this directory is automatically executed when the container starts for the first time.
COPY D.sql /docker-entrypoint-initdb.d/