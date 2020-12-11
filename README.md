# Blockly Backend

## Docker

To start the API build use `docker-compose build api` to build the api container. Afterwards start the mongo container with `docker-compose up -d mongo` and start the api container afterwards `docker-compose up`

The API will be accessabile on port `8080``

## Routes

- /tutorial
- /share
- /gallery

- GET all Tutorials (w/o User)
- GET Tutorial by ID (w/o User)
- GET all Gallery Projects (w/o User)
- GET Gallery Project by ID (w/o User)
- GET all Projects (user) (not implemented yet)
- GET Project by ID (user) (not implemented yet)
- GET Project from Share (w/o user)
- GET Boxes from openSenseMap (user) (not implemented yet)


- POST new Tutorial (creator)
- POST new Gallery Project (creator)
- POST new Project by user (user)
- POST Project to share (w/o user)

- PUT/DELETE Tutorial
- PUT/DELETE Gallery
- PUT/DELETE Project



### Tutorial

Stores the Tutorial and is read only if user is not logged in. 

### Share

Stores the shares and accesible for everybody. Shares can only be viewed with a correct ID

### Gallery

The Gallery stores all the examples. 
