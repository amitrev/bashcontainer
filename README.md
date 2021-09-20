# Project docker containers

## Setup
0. Make sure you have [docker engine](https://www.docker.com/) with [docker-compose](https://docs.docker.com/compose/install/) installed and daemon running
1. Set up your `environment variables` in `.env` root dir or leave it defaults
2. `docker-compose build`

### Run project
1. Run docker containers: `docker-compose up` (background: `-d`)
2. Init project (fornt-end & back-end): `docker exec -it {PROJECT_NAME}-code /bin/sh -c "echo 'yes' | ./init.sh"`

### more
* Terminal for composer or/and npm stuff: `docker exec -it {PROJECT_NAME}-code sh`
* Website  `https://{PROJECT_NAME}.localhost:{HTTPS_PORT}`
* Proxy `http://{PROJECT_NAME}-proxy.localhost:{HTTP_PORT}`
* PhpMyAdmin `http://{PROJECT_NAME}-phpmyadmin.localhost:{HTTP_PORT}`
* Connect to redis via cli `redis-cli -h {PROJECT_NAME}-redis.localhost`

#### stranger things
* fix permission to vendor directory: `docker exec -it masterhacks-code /bin/sh -c "chown -R 1000:1000 /project/backend/vendor/"`
* fix permission to var directory: `docker exec -it masterhacks-code /bin/sh -c "chown -R 1000:1000 /project/backend/var/"`
