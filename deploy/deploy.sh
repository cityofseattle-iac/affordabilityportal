#!/bin/sh

## By default, determines if the local repo is in sync with the remote. If it
## is not, it:
## - pulls changes
## - builds new docker image
## - stops existing docker container
## - starts docker container with new image
##
## If any argument is provided at the command line, the sync check
## with the remote repo is skipped, and a git pull and docker build and
## deploy is performed.


cd /home/ubuntu/affordabilityportal
git checkout master

# if any argument is provided, skip sync check and just pull
if [ $# -eq 0 ]; then
	echo "Getting updates..."
	git remote update

	echo "Checking if up-to-date..."
	if [ $(git rev-parse @) = $(git rev-parse @{u}) ]; then
		echo "Local repo up-to-date"
		exit 0
	else
		echo "Not up-to-date."
	fi
fi

echo "Getting latest changes..."
git pull

echo "Building Docker image..."
docker build -t prod/affordabilityportal .

echo "Stopping old portal..."
docker stop portal

echo "Waiting for portal to stop..."
docker wait portal

echo "Deleting old portal container..."
docker rm portal

echo "Staring new portal..."
docker run -d -p 8080:8080 -p 8443:8443 -e NODE_ENV --restart unless-stopped --name portal prod/affordabilityportal
