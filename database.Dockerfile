# Use the specified pgvector image
FROM pgvector/pgvector:0.8.1-pg18-trixie

# Set PATH and other fixed environment variables
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/sbin:/bin:/usr/lib/postgresql/18/bin
ENV GOSU_VERSION=1.19
ENV LANG=en_US.utf8
ENV PG_MAJOR=18
ENV PG_VERSION=18.0-1.pgdg13+3
ENV PGDATA=/var/lib/postgresql/18/docker

# Copy SQL script to initialize the database
COPY create_db.sql /docker-entrypoint-initdb.d/

# Expose the PostgreSQL port
EXPOSE 5432

# Define the volume for PostgreSQL data
VOLUME /var/lib/postgresql

# Use the default PostgreSQL entrypoint and command
ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["postgres"]