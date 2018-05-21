FROM anapsix/alpine-java

ADD build/libs/Devtales-Blog-0.0.1-SNAPSHOT.jar /app.jar
ADD entrypoint.sh /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]