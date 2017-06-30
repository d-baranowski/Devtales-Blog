#!/bin/bash

set -e

JAVA_OPTS=${JAVA_OPTS:="-Xmx256m"}

exec java -jar $JAVA_OPTS /app.jar