# :musical_score: API_SingMeASong


## Project Description
SingMeASong is a web application which the user can recommend songs by its Youtube link. This recommendations can be ranked, gain relevance and reach the top of all songs!
This repository carries the API for this aplication. 

## Project Description
SingMeASong is a web application which the user can recommend songs by its Youtube link. This recommendations can be ranked, gain relevance and reach the top of all songs!


### Necessary Tools

This project uses many different libraries and packages, in order to build it an test it.
For you to install all this tools, $ npm i is needed.

### End Points

POST /recommendations<br>
GET /recommendations<br>
GET /recommendations/random<br>
GET /recommendations/top/:amount<br>
GET /recommendations/:id<br>
POST /recommendations/:id/upvote<br>
POST /recommendations/:id/downvote<br>
