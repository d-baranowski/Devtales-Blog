FROM mysql:8.0

ENV MYSQL_USER usr
ENV MYSQL_ROOT_PASSWORD passwd
ENV MYSQL_PASSWORD passwd
ENV MYSQL_DATABASE devtalesdb


ENTRYPOINT ["docker-entrypoint.sh"]
CMD ["mysqld"]