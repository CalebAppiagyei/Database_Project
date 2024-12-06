#!/bin/sh
VERSION=front
docker build -t container.cs.vt.edu/pryan22/databaseproj:$VERSION .
if [ $? -ne 0 ]; then
    echo "ERROR: docker image build failed"
    read -n 1 -s
    exit
fi
docker push container.cs.vt.edu/pryan22/databaseproj:$VERSION
read -n 1 -s