FROM anapsix/alpine-java

ADD build/Devtales-Blob-.*\.jar
ADD entrypoint.sh /entrypoint.sh

EXPOSE 8080

ENTRYPOINT ["/entrypoint.sh"]