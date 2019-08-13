

# mulli

<br>

## Description

This is an app for illustrators who want to prove themselves. 
The goal is to create a community for all artists, fostering an environment of healthy competitiveness and with which to improve your skills and portfolio.

El objetivo es crear un lugar virtual de reunión para todos los artistas, fomentando un ambiente de competitividad sana y con la que poder mejorar tus skills y portfolio.

## User Stories

- **Landing Page:** As an anon I can see the landing page with an intro, active match/es, how to and sign up/login form.
-  **Signup:** As an anon I can sign up in the platform so that I can start joining matches and manage my work.
-  **Login:** As a user/admin I can login to the platform so that I can start joining matches and manage my work.
-  **404:** As an anon/user/admin I can see a 404 page if I try to reach a page that does not exist so that I know it's my fault.

-  **Landing Page:** As a user/admin I can see the landing page with active match/es (and join them), and how to.
- **User Dashboard:** As a user/admin I can access my dashboard to see all matches I'm joining/ have joined and update/edit images.
- **User Profile:** As a user/admin I can edit/update my profile and add an avatar.
-  **User Profile/Logout:** As a user/admin I can logout from the platform so no one else can use it.
-  **Matches List:** As a user/admin I can see a list of all matches.
-  **Matches Detail:** As a user/admin I can see the datil of a Matches with dynamic information based on its status (active, joined, voting,closed).

- **User Dashboard:** as an admin I can access to the matches manager
- **Matches Manager:** as an admin I can create, edit and delete matches


### Matches Status

-  **Draft:** These matches that I don't want to show anywhere
-  **Active:** These matches that are "joinable" and "submitable" for the users
-  **Voting:** Status for the matches that are closed for submissions (it allows to vote the arts you like)
-  **Closed:** Status for closed matches (it only allows to see the arts)

## Backlog

Matches:
- add a featured section for the top 3
- add start and end date to update the status automatically.
- add categories to matches.
- matches search.
- matches multi-images.
- Add background images and dark/light option.
- Add a preview for matches creator.

User profile:
- add notifications for matches status changes, ranking...
- add points and rank system based on participation, votes...
- convert users to admin based on their rank.
- Users search.
- Limit to 3 votes per user on each match


Tournament:
- create periodic tournaments: pack of thematic matches with a winner based on the likes of all the matches.


<br>


# Client / Frontend

## Routes
| Path                            | Component            | Permissions | Behavior                                                     |
| -------------------------       | -------------------- | ----------- | ------------------------------------------------------------ |
| `/`                             | LandingPage          | public      | Home page, signup form, login form,                          |
| `/not-found`                    | NotFoundPage         | public      | Not found page                                               |
| `/matches`                      | MatchListPage        | user only   | Shows all matches in a list                                  |
| `/matches/:matchId`             | MatchDetailPage      | user only   | Shows the details of a Match                                 |
| `/dashboard/:userId`            | DashboardPage        | user only   | Shows the details of a user and all user's matches           |
| `/profile/:id`                  | ProfilePage          | user only   | Profile form for update                                      |
| `/matches/manager`              | MatchesManagerPage   | admin only  | Shows all matches in lists based on their status             |
| `/matches/:matchId/add`         | AddMatchPage         | admin only  | Form for add a new Match                                     |
| `/matches/:matchId/edit`        | AddMatchPage         | admin only  | Form for edit a Match                                        |



## Components

### Pages
  - LandingPage
  - NotFoundPage
  - MatchListPage
  - MatchDetailPage
  - DashboardPage
  - ProfilePage
  - MatchsManagerPage
  - AddMatchPage
  - EditMatchPage 

### Components
  - MatchCard
  - BurgerMenu
  - Wellcome
  - CurrentMatchSection
    - MatchDetail
  - HowTo
  - RegisterForm
  - MatchForm
  - MatchTable
  - EditProfile

## Services

- Auth Service
  - auth.login(user)
  - auth.signup(user)
  - auth.logout()
  - auth.me()

- Matches Service
  - getAllMatches()
  - AddOneMatch(newMatch)
  - UpdateMatch(id, updateMatch)
  - DeleteOneMatch(id)
  
- Art Service 
  - getAllArts()
  - AddOneArt(newArt)
  - UpdateArt(id, updateArt)
  - DeleteOneArt(id)

<br>


# Server / Backend


## Models

User model

```javascript
{
  type:Enum, //(user / admin)
  name:String,
  username:String ,
  email:String, // required & unique
  password:String, // required
  instagram:String,
  website:String,
  avatar:String
  
}
```

Match model

```javascript
 {
   name:String,
   type:String,
   startDate:String,
   endDate: String,
   startVotingDate:String,
   endVotingDate: String,
   illustrators: Number,
   description: String,
   creator:  [{type: Schema.Types.ObjectId,ref:'User'}],
   totalVotes: Number
 }
```

Art model

```javascript
{
  user: [{type: Schema.Types.ObjectId,ref:'User'}],
  challenge: [{type: Schema.Types.ObjectId,ref:'Match'}],
  image: String,
  votes: [userIDs],
  rankingPosition: Number,
  uploadDate: String
}
```


<br>


## API Endpoints (backend routes)

| HTTP Method | URL                         | Request Body                 | Success status | Error Status | Description                                                  |
| ----------- | --------------------------- | ---------------------------- | -------------- | ------------ | ------------------------------------------------------------ |
| GET         | /auth/profile               | Saved session                | 200            | 404          | Check if user is logged in and return profile page           |
| POST        | /auth/signup                | {name, email, password}      | 201            | 404          | Checks if fields not empty (422) and user not exists (409), then create user with encrypted password, and store user in session |
| POST        | /auth/login                 | {username, password}         | 200            | 401          | Checks if fields not empty (422), if user exists (404), and if password matches (404), then stores user in session |
| POST        | /auth/logout                | (empty)                      | 204            | 400          | Logs out the user                                            |
| GET         | /matches                    |                              |                | 400          | Show all matches                                             |
| POST        | /matches/add                | {}                           | 201            | 400          | Create and save a new match                                  |
| GET         | /matches/:matchId           | {id}                         |                |              | Show specific match                                          |
| GET         | /matches/:matchId/edit/     |                              |                |              | get info and fill form                                       |
| PUT         | /matches/:matchId/edit/     | {matchUpdated}               | 200            | 400          | edit match                                                   |
| PUT         | /matches/:artId/edit        | {artId, artUpdated}          |                |              | edit art (add like)                                          |
| DELETE      | /matches/:matchId/delete    | {matchId}                    | 201            | 400          | delete match                                                 |
| GET         | /dashboard/:userId          | {userId}                     |                | 400          | show user data, his arts and the matches has played          |
| GET         | /profile/:userId            | {userId}                     |                |              | show a form filled with the user info                        |
| PUT         | /profile/:userId/edit       | {userId, userUpdated}        |                |              | edit user                                                    |
| PUT         | /profile/:artId/edit        | {artId, artUpdated}          |                |              | edit art (update image)                                      |



<br>


## Links

### Trello/Kanban

[Link to your trello board](https://trello.com/b/gpSU0hrj/mulli) 
or picture of your physical board

### Git

The url to your repository and to your deployed project

[Client repository Link](https://github.com/screeeen/project-client)

[Server repository Link](https://github.com/screeeen/project-server)

[Deployed App Link](http://heroku.com)

### Slides

The url to your presentation slides

[Slides Link](http://slides.com)








