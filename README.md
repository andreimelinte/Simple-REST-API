# Simple-REST-API
Simple REST API based on a node server

## Endpoints
### Movies
**endpoint: `/movies`**

#### Getting the full movies list
Call a *GET* method on the `/movies` endpoint

#### Getting a single movie
Call a *GET* method on the `/movies/movieId` endpoint

#### Adding a movie
Call a *POST* method on the `/movies` endpoint sending each movie parameter in the message body (eg. `{ name: 'movie-name', genre: 'movie-genre', actors: ['actor1', 'actor2']}`)

#### Updating a movie
Call a *PUT* method on the `/movies` endpoint sending each movie parameter in the message body (eg. `{ movieId: 'movie-id', name: 'movie-name', genre: 'movie-genre', actors: ['actor1', 'actor2']}`). Apart form the add method, this will also require a `movieId` sent. If the movie ID is not found in the movies list, a new movie with the `movieId` ID will be inserted.

#### Deleting a movie
Call a *DELETE* method on the `/movies` endpoint, sending the ID of the movie that should be deleted (eg. `{ movieId: 1 }`)


### Actors
**endpoint: `/actors`**

#### Getting the full actors list
Call a *GET* method on the `/actors` endpoint

#### Getting a single actor
Call a *GET* method on the `/actors/id` endpoint

#### Adding an actor
Call a *POST* method on the `/actors` endpoint sending each actor parameter in the message body (eg. `{ name: 'John Doe', age: 32 ...}`)

#### Updating an actor
Call a *PUT* method on the `/actors` endpoint sending each actor parameter in the message body (eg. `{ id: 'actor-id', name: 'actor-name', age: 32 ...}`). Apart form the add method, this will also require an `id` sent. If the actor ID is not found in the actors list, a new actor with the `id` ID will be inserted.

#### Deleting an actor
Call a *DELETE* method on the `/actors` endpoint, sending the ID of the actor that should be deleted (eg. `{ id: 1 }`)


### Auth
**endpoint: `/login`**

#### Login action
Call a *POST* method on the `/login` endpoint, sending as body message the username and password (eg. `{ username: 'admin', password: 'admin' }`). If the login is successfull, you will receive back the user data and a token that should be sent with each request in order to do all POST and PUT methods as an authenticated user.

#### Logout action
Call a *POST* method on the `/logout` endpoint, sending as body message the user token (eg. `{ token: 'cccc-ccc-ccc-cccccc' }`). If the login is successfull, you will receive back the user data and a token that should be sent with each request in order to do all POST and PUT methods as an authenticated user.


### Votes
**endpoint: `/votes`**

#### Getting all votes for a movie
Call a *GET* method on the `/votes/movieId` endpoint

#### Adding a vote
Call a *POST* method on the `/votes` endpoint sending the movie ID and the vote (eg. `{ movieId: 1, vote: 4 }`)

#### Updating a vote
N/A

#### Deleting a vote
N/A



### Contact
**endpoint: `/contact`**

#### Getting all contact messages
Call a *GET* method on the `/contact` endpoint

#### Adding a contact message
Call a *POST* method on the `/contact` endpoint sending the form values as data

#### Updating a vote
N/A

#### Deleting a vote
N/A

