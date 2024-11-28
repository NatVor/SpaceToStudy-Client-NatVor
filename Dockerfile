# syntax=docker/dockerfile:1
######################################################
#            DOCKERFILE FOR S2S DEPLOYMENT           #
######################################################

# Define the version of NGINX to be used in the image
ARG NGINX_VERSION=1.19.6

# ARGs for Node.js and Alpine versions
ARG NODE_VERSION=18.14.2
ARG ALPINE_VERSION=3.14

# FIRST STAGE: Install Dependencies
FROM node:${NODE_VERSION}-alpine AS deps

# Set working directory
WORKDIR /usr/src/app

# Install git
RUN apk add --no-cache git

# Install Node.js dependencies
RUN --mount=type=bind,source=./package.json,target=package.json,ro \
    --mount=type=bind,source=./package-lock.json,target=package-lock.json,rw \
    --mount=type=cache,target=/root/.npm \
    npm install --legacy-peer-deps


# SECOND STAGE: Build the app
FROM deps AS build

# Set working directory
WORKDIR /usr/src/app

# Copy the application code
COPY . .

# Build the app
RUN npm run build


# THIRD STAGE: Copy the built app to a new image
FROM alpine:${ALPINE_VERSION} AS final

# Set working directory
WORKDIR /usr/src

# Copy the built app from the previous stage
COPY --from=build /usr/src/app/dist /usr/src


# Start from the nginx base image with the specified version and Alpine Linux
FROM nginx:${NGINX_VERSION}-alpine AS stage

# Create a volume for the cgroup filesystem
VOLUME /sys/fs/cgroup

# Install necessary packages and create files and directories
RUN apk update && apk add --no-cache \
    sudo \
    openrc \
    openssh \
    bash \
    && mkdir -p /run/openrc/ \
    && touch /run/openrc/softlevel

# Copy files to the image
COPY ./docker/files/default.conf.template /etc/nginx/templates/default.conf.template
COPY ./docker/files/sshd_config /etc/ssh/
COPY ./docker/files/ssh_setup.sh /tmp/
COPY --from=final /usr/src /usr/share/nginx/html

# Set the root password
ARG password
RUN echo "root:${password}" | chpasswd

# Make the ssh_setup.sh script executable
RUN chmod +x /tmp/ssh_setup.sh

# Configure SSH and nginx services
RUN /tmp/ssh_setup.sh \
    && rc-update add sshd \
    && rc-update add nginx \
    && rc-status \
    && rc-service sshd restart

# Expose ports 80 and 2222
EXPOSE 80 2222

# Start the sshd service and run nginx with the 'daemon off' option
CMD ["sh", "-c", "/usr/sbin/sshd && /docker-entrypoint.sh nginx && nginx -s quit 2>/dev/null || true && nginx -g 'daemon off;'"]
