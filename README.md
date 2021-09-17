# MASTERHACKS docker container

## Setup
0. Make sure you have [docker engine](https://www.docker.com/) with [docker-compose](https://docs.docker.com/compose/install/) installed and daemon running
1. Set up your `environment variables` in `.env` root dir or leave it defaults
2. `docker-compose build`

### Run project
1. Run docker containers: `docker-compose up` (background: `-d`)
2. Init project (fornt-end & back-end): `docker exec -it masterhacks-code /bin/sh -c "echo 'yes' | ./init.sh"`

### more
* Terminal for composer or/and npm stuff: `docker exec -it masterhacks-code sh`
* PhpMyAdmin `http://masterhacks-phpmyadmin.localhost`
* Connect to redis via cli `redis-cli -h masterhacks-redis.localhost`
