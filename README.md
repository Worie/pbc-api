# Backend for PBC project

## Config

### Requirements
Node.js and Redis server

### Set up the env file

0. Clone the repository

1. Copy the `.env-default` from root directory and create a file `.env` from it. Fill the required data.

2. Run `npm install` in the root directory

3. Run `npm run dev` to start a local server

### Endpoints

There's only one endpoint set up at this point: `/episodes`. It'll return schema containing all published episodes via simplecast (fetched from rss feed: https://rss.simplecast.com/podcasts/3985/rss). 
It has some basic caching implemented (default one day)

Those endpoints are used in [this project](https://github.com/Jakubem/pbc)


### Disable cors 

In `index.ts` file you can specify from which domains you want to allow the request to be accepted. By default, no restrictions are present.

MIT Licensed