#!/usr/bin/env bash
./gradlew bootRepackage
docker build -t devtalesblog .