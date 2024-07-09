# Cromwell API

## Link
https://cromwell-api.onrender.com

## Project summary
An API for the purpose of accessing application data programmatically, able to handle POST requests for login and register endpoints as well as a GET request to get a users info based on their id.

## Local setup
1. Fork or clone the repo from https://github.com/Ovenator27/Cromwell_API
2. Run npm install in the terminal
3. Create local database using npm run setup-dbs
4. Seed local database using npm run seed
5. Run tests using npm test

# Accessing environment variables:
You will need to create two `.env` files: `.env.test` and `.env.development`.

Into each, add PGDATABASE=, with the correct database name for that environment (see `/db/setup.sql` for the database names). Double check that these `.env` files are `.gitignored`.

## Minimum version requirements
Node.js : v21.6.1 PostgreSQL: v14.10