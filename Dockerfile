# Using node.js v12.x running on Alpine Linux
from node:12-alpine

# Install Git
RUN ["apk", "add", "--update", "git"]

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

RUN ["npm", "install"]

# Bundle app source
COPY . .

# Generate build info
RUN ["/bin/sh", "generate-build-info.sh"]

# Expose ports outside of container
EXPOSE 8080 8443

# Build code
RUN ["npm", "run", "build"]

# Start app
CMD ["sh", "-c", "npm", "start", "--" "--NODE_ENV=${NODE_ENV}"]
