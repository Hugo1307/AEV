FROM mariadb:10.6.11

ENV MARIADB_DATABASE=foodCoCTF
ENV MYSQL_ROOT_PASSWORD=admin

COPY init.sql /docker-entrypoint-initdb.d

EXPOSE 3306

CMD ["mysqld"]