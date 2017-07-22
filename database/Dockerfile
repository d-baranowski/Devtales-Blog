FROM mysql/mysql-server:5.5

ENV MYSQL_USER usr
ENV MYSQL_ROOT_PASSWORD passwd
ENV MYSQL_PASSWORD passwd
ENV MYSQL_DATABASE devtalesdb

COPY init.sql /docker-entrypoint-initdb.d/