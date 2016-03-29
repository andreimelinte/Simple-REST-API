var fs = require('fs');
var _ = require('lodash');
var uuid = require('uuid-v4');
var http = require('http');
var Router = require('router');
var finalhandler = require('finalhandler');
var bodyParser = require('body-parser');

var router = Router();

router.use(bodyParser.json());
router.use(bodyParser.urlencoded({ extended: true }));

var server = http.createServer(function(req, res) {
  router(req, res, finalhandler(req, res))
});

function readMovies () {
    var movies;

    try {
        movies = JSON.parse(fs.readFileSync('data/movies.js', { encoding: 'utf8' }));
    } catch(err) {
        movies = [];
    }

    return movies;
}

function readContact () {
    var contact;

    try {
        contact = JSON.parse(fs.readFileSync('data/contact.js', { encoding: 'utf8' }));
    } catch(err) {
        contact = [];
    }

    return contact;
}

function readActors () {
    var actors;

    try {
        actors = JSON.parse(fs.readFileSync('data/actors.js', { encoding: 'utf8' }));
    } catch(err) {
        actors = {};
    }

    return actors;
}

function readUsers () {
    var users;

    try {
        users = JSON.parse(fs.readFileSync('data/users.js', { encoding: 'utf8' }));
    } catch(err) {
        users = {};
    }

    return users;
}

function readVotes () {
    var users;

    try {
        users = JSON.parse(fs.readFileSync('data/votes.js', { encoding: 'utf8' }));
    } catch(err) {
        users = {};
    }

    return users;
}

function getLoggedInUserId(res) {
    var users = readUsers();
    var loggedInUser = _.find(users, function(user) {
        return user.token === res.token;
    });

    return loggedInUser;
}

server.listen(3000);

// Add headers
router.use(function (req, res, next) {

    // Website you wish to allow to connect
    res.setHeader('Access-Control-Allow-Origin', '*');

    // Request methods you wish to allow
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

    // Request headers you wish to allow
    res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

    // Set to true if you need the website to include cookies in the requests sent
    // to the API (e.g. in case you use sessions)
    res.setHeader('Access-Control-Allow-Credentials', true);

    // Pass to next layer of middleware
    next();
});


router.get('/movies/:id', function (req, res, next) {
	var movies = readMovies(),
		movie;

	res.setHeader('Content-Type', 'application/json');

	if (req.params.id) {
		movie = _.find(movies, function (_movie) {
			return _movie.id === req.params.id;
		}) || {};
		res.end(JSON.stringify(movie));
	} else {
		res.end(movies);
	}
});

// movies
router.get('/movies/', function (req, res, next) {
	var movies = readMovies();

    res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(movies));
});

router.post('/movies/', function (req, res, next) {
	var movies = readMovies(),
        movieId = uuid(),
        movieToAdd = req.body;

    movieToAdd.id = movieId;
    movies.push(movieToAdd);

    res.setHeader('Content-Type', 'application/json');
    fs.writeFile('data/movies.js', JSON.stringify(movies), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success',
            data: req.body
        }));
    });
});

router.put('/movies/', function (req, res, next) {
    var movies = readMovies(),
        movieId = req.body.id;

    var movieIndex = _.findIndex(movies, function (movie) {
        return movie.id === movieId;
    });

    res.setHeader('Content-Type', 'application/json');
    movies[movieIndex] = req.body;

    fs.writeFile('data/movies.js', JSON.stringify(movies), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success',
            data: req.body
        }));
    });
});

router.patch('/movies/', function (req, res, next) {
	var movies = readMovies(),
        movieId = req.body.id;

    res.setHeader('Content-Type', 'application/json');

    var movieIndex = _.findIndex(movies, function (movie) {
        return movie.id === movieId;
    });

    _.forEach(req.body, function (value, key) {
        if (key !== 'id') {
            movies[movieIndex][key] = value;
        }
    });

    fs.writeFile('data/movies.js', JSON.stringify(movies), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success',
            data: movies[movieIndex]
        }));
    });
});

router.delete('/movies/', function (req, res, next) {
	var movies = readMovies(),
        movieId = req.body.id;

    var movieIndex = _.findIndex(movies, function (movie, index) {
        return movie.id === movieId;
    });

    movies.splice(movieIndex, 1);

    res.setHeader('Content-Type', 'application/json');
    fs.writeFile('data/movies.js', JSON.stringify(movies), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success'
        }));
    });
});

// default
router.all('/', function (req, res, next) {
    res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify({ succes: true }));
});

// actors
router.get('/actors/', function (req, res, next) {
	var actors = readActors();

    res.setHeader('Content-Type', 'application/json');
	res.end(JSON.stringify(_.values(actors)));
});

router.get('/actors/:id', function (req, res, next) {
	var actors = readActors(),
		actor;

	res.setHeader('Content-Type', 'application/json');

	if (req.params.id) {
		actor = _.find(actors, function (_actor) {
			return _actor.actorId === req.params.id;
		}) || {};
		res.end(JSON.stringify(actor));
	} else {
		res.end(actors);
	}
});

router.post('/actors/', function (req, res, next) {
	var actors = readActors(),
        actorId = uuid();

    actors[actorId] = req.body;
    actors[actorId].id = actorId;

    res.setHeader('Content-Type', 'application/json');
    fs.writeFile('data/actors.js', JSON.stringify(actors), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success',
            data: req.body
        }));
    });
});

router.put('/actors/', function (req, res, next) {
	var actors = readActors(),
        actorId = req.body.id;

    actors[actorId] = req.body;

    res.setHeader('Content-Type', 'application/json');
    fs.writeFile('data/actors.js', JSON.stringify(movies), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success',
            data: req.body
        }));
    });
});

router.delete('/actors/', function (req, res, next) {
	var actors = readActors(),
        actorId = req.body.id;

    delete actors[actorId];

    res.setHeader('Content-Type', 'application/json');
    fs.writeFile('data/actors.js', JSON.stringify(actors), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success'
        }));
    });
});

router.post('/login/', function (req, res, next) {
	var users = readUsers(),
        username = req.body.username,
        password = req.body.password;

    var loggedInUser = _.find(users, function(user) {
        return user.username === username
            && user.password === password;
    });

    var token = uuid();

    if (loggedInUser) {
        users[loggedInUser.id].token = token;

        res.setHeader('Content-Type', 'application/json');
        fs.writeFile('data/users.js', JSON.stringify(users), function (err) {
            if (err) {
                res.end(JSON.stringify({ status: 'error' }));
            }

            res.end(JSON.stringify({
                status: 'success',
                user: {
                    username: loggedInUser.username,
                    token: loggedInUser.token,
                    name: loggedInUser.name,
                    id: loggedInUser.id,
                    role: loggedInUser.role
                }
            }));
        });
    } else {
        res.end(JSON.stringify({ status: 'error', error: {
            message: 'Incorrect username or password',
            id: 'ER1'
        }}));
    }
});

router.all('/logout', function (req, res, next) {
	var users = readUsers();
    var token = req.body.token;

    var loggedInUser = getLoggedInUser(req.body);

    if (loggedInUser) {
        users[loggedInUser.id].token = '';

        res.setHeader('Content-Type', 'application/json');
        fs.writeFile('data/users.js', JSON.stringify(users), function (err) {
            if (err) {
                res.end(JSON.stringify({
                    status: 'error',
                    error: {
                        message: 'invalid token',
                        id: 'ER2'
                    }
                }));
            }

            res.end(JSON.stringify({
                status: 'success'
            }));
        });
    } else {
        res.end(JSON.stringify({ status: 'error', error: {
            message: 'Incorrect token',
            id: 'ER3'
        }}));
    }
});

// votes
router.get('/votes/:movieId', function (req, res) {
    var votes = readVotes();
    var votesList = [];

	res.setHeader('Content-Type', 'application/json');

	if (req.params.movieId) {
        votesList = _.filter(votes, function (vote) {
           return vote.movieId == req.params.movieId;
        });
    }

     res.end(JSON.stringify(votesList));
});

router.post('/votes', function (req, res) {
    var votes = readVotes();
    var computedVote = {};

    computedVote = {
        movieId: req.body.movieId,
        vote: req.body.vote,
        id: uuid()
    };

	res.setHeader('Content-Type', 'application/json');

    if (computedVote.movieId !== undefined && computedVote.vote !== undefined) {
        votes.push(computedVote);

        fs.writeFile('data/votes.js', JSON.stringify(votes), function (err) {
            if (err) {
                res.end(JSON.stringify({
                    status: 'error',
                    error: {
                        message: 'server error',
                        id: 'ER3'
                    }
                }));
            } else {
                res.end(JSON.stringify(computedVote));
            }
        });

    } else {
        res.end(JSON.stringify({
            status: 'error',
            error: {
                message: 'invalid vote data',
                id: 'ER4'
            }
        }));
    }
});

// contact
router.get('/contact/', function (req, res) {
    var contactData = readContact();

    res.setHeader('Content-Type', 'application/json');

    res.end(JSON.stringify(contactData));
});

router.post('/contact/', function (req, res, next) {
    var contactData = readContact(),
        contactId = uuid();

    var contactToAdd = req.body;

    contactToAdd.id = contactId;
    contactData.push(contactToAdd);

    res.setHeader('Content-Type', 'application/json');
    fs.writeFile('data/contact.js', JSON.stringify(contactData), function (err) {
        if (err) {
            res.end(JSON.stringify({ status: 'error' }));
        }

        res.end(JSON.stringify({
            status: 'success',
            data: contactToAdd
        }));
    });
});
