# Remictus

Remictus is a pre-configured setup for Directus and Remix that makes it easy to get started with building your webapp. With Remictus, you'll have a complete development environment that you can run locally using Docker. This makes it easy to test and develop your webapp before deploying it to a production environment.

When you're ready to deploy the webapp on your own server, Remictus comes with a production environment that requires the use of Traefik as a reverse proxy. This setup provides a secure and scalable production environment for your webapp.

## Getting started

To get started with Remictus, you'll need to have Docker and NPM || Yarn || PNPM installed on your machine.

1. Clone this repository: `git clone https://github.com/mooxl/remictus.git`
2. Change into the repository directory: `cd remictus`
3. Start the containers: `yarn dev`
4. Migrate the data: `NODE_ENV=development yarn migrate`

This will start up the Directus, Database and Remix containers and make them available on your local machine. The site will be served at http://localhost:3000 and the Directus will be available at http://localhost:8055.

## Development

The `docker-compose.yml` file includes both the Directus and Remix containers and sets up everything to run the containers. The containers use the environment variables declared in the `.env.development` file and mounted volumes to store data persistently even after the containers are stopped and started.

## Production

When you're ready to deploy your webapp to a production environment, you'll should copy the `.env.development` and rename it into `.env.production`. The you modify the file to suit your needs. This file contains the configuration for the Traefik reverse proxy and Directus and Remix.

Once you've modified the `.env.production`, you can run the following command to deploy your webapp to a production environment: `yarn prod`

## Migrate data from dev to prod

This project has two commands for that in its package.json file:

- dump: creates a database dump of the existing database
- migrate: migrates the data from the created dump

Before using either of these commands, you must provide a `NODE_ENV`. This can either be `production` or `development`. For example, to create a database dump in production environment, you would run:

```bash
NODE_ENV=production yarn dump
```

To migrate the data in the development environment, you would run:

```bash
NODE_ENV=development npm run migrate
```

Make sure to replace production and development with the appropriate environment for your needs.
