# poll-maker

Nodejs application for creating, reviewing and answring polls.

## Development environment

Nodejs 0.12 is assumed. A mongodb database is required.
While the tests and development server can be run using
a local installation of mongodb and node using environment
variables, it's recommended to use Docker and docker-compose.

Assuming you have (Docker)[https://docs.docker.com/installation/]
and `pip` installed on your system you can run:

```
$ pip install docker-compose
```

In order to check that everything works, simply run

```
$ docker-compose build
```

And it will install npm dependencies and download any missing
docker images.

### Running development server

Now that you have docker-compose installed, you can use:

```
$ docker-compose up web
```

And it will start the application on port 8080

### Running test suit

Simply run

```
$ docker-compose up test
```

## License

The MIT License

Copyright (c) 2015 dataquito.org
