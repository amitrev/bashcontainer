#!/bin/sh

cd /project/frontend/
npm install

cd /project/backend/
composer install
php bin/console doctrine:migrations:migrate
