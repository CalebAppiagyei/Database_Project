#!/bin/sh
VERSION=front
docker build -t container.cs.vt.edu/pryan22/databaseproj:front ./Front/myapp
if [ $? -ne 0 ]; then
    echo "ERROR: docker image build failed"
    read -n 1 -s
    exit
fi
docker build -t container.cs.vt.edu/pryan22/databaseproj:back ./Back
if [ $? -ne 0 ]; then
    echo "ERROR: docker image build failed"
    read -n 1 -s
    exit
fi

docker push container.cs.vt.edu/pryan22/databaseproj:front
docker push container.cs.vt.edu/pryan22/databaseproj:back

read -n 1 -s