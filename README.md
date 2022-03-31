<h1 style="color: #1371C3; text-align: center; padding: 10px 0; border: 3px solid; text-transform: uppercase;">✈️ Senvol Project 🛠️</h1>

<br><br>

---

This is the `API` implementation for **Senvol** project. ___`Enjoy with the following lines`___ 😇

---
<br><br>

<h2 style="color: #1371C3; text-align: center; padding: 10px 0; border: 3px solid; text-transform: uppercase;">🛠️ MEAN Stack Architecture</h2>

---

We've built our application with following architecture:

<img src="./design_doc/mean-architecture.png">

**NodeJS Express** exports `REST APIs` and interacts with **MongoDB** Database using `Mongoose ODM`.

Angular Client sends `HTTP Requests` and retrieves `HTTP Responses` using `HTTPClient`, consume data on the **components**. Angular Router is used for navigating to pages.

<h2 style="color: #1371C3; text-align: center; padding: 10px 0; border: 3px solid; text-transform: uppercase;">🛠️ Backend Overview</h2>

---

These are APIs that Node.js Express App will export:

<center>👇 AUTHENTICATION 🔐</center><hr>

| __METHODS__ | __URLS__              | __ACTIONS__      |
|-------------|-----------------------|------------------|
| `POST`      | api/auth/register     | Registration     |
| `POST`      | api/auth/register     | Login            |

<center>👇 USER 👨‍⚖️</center><hr>

| __METHODS__ | __URLS__       | __ACTIONS__       |
|-------------|----------------|-------------------|
| `GET`       | api/users      | Get All Users     |
| `GET`       | api/users/:id  | Get User By Id    |
| `PUT`       | api/users/:id  | Update User By Id |
| `DELETE`    | api/users/:id  | Delete User By Id |

<center>👇 FLIGHT ✈️</center><hr>

| __METHODS__ | __URLS__        | __ACTIONS__         |
|-------------|-----------------|---------------------|
| `GET`       | api/flights     | Get All Flight      |
| `GET`       | api/flights/:id | Get Flight By Id    |
| `POST`      | api/flights     | Add New Flight      |
| `PUT`       | api/flights/:id | Update Flight By Id |
| `DELETE`    | api/flights/:id | Delete Flight By Id |

<center>👇 RESERVATION 📋</center><hr>

| __METHODS__ | __URLS__                    | __ACTIONS__              |
|-------------|-----------------------------|--------------------------|
| `GET`       | api/reservations            | Get All Reservation      |
| `GET`       | api/reservations/show/:id   | Get Reservation By Id    |
| `POST`      | api/reservations            | Add New Reservation      |
| `PUT`       | api/reservations/edit/:id   | Update Reservation By Id |
| `DELETE`    | api/reservations/delete/:id | Delete Reservation By Id |

<center>👇 DESTINATION ✈️</center><hr>

| __METHODS__ | __URLS__             | __ACTIONS__              |
|-------------|----------------------|--------------------------|
| `GET`       | api/destinations     | Get All Destination      |
| `GET`       | api/destinations/:id | Get Destination By Id    |
| `POST`      | api/destinations     | Add New Destination      |
| `PUT`       | api/destinations/:id | Update Destination By Id |
| `DELETE`    | api/destinations/:id | Delete Destination By Id |

<h2 style="color: #1371C3; text-align: center; padding: 10px 0; border: 3px solid; text-transform: uppercase;">📦 Deployment Processing</h2>

---

We've heroku for the deployment processing by following the following steps :

__LOGIN TO HEROKU WITH THE CLI__

```bash
heroku login
```

__CREATE THE APP__

```bash
heroku create senvolapi
```

We ensure that our repository is already deployed on github by doing :

```bash
git add .
git commit -m "Last commit"
git push
```

__PUSH THE APP ON HEROKU__

```bash
git push heroku master
```

__ADDING Procfile__

It is the file which content the main command (from `package.json` => `npm start`) able to launch our `api`.
In our case the content is `web: npm start`

```bash
touch Procfile
```

After that, we must push all modifications to heroku (first to github!)

__ADDING ENVIRONMENT VARIABLES__

We define our environment variables to `.env` file in the main folder. Without the lattest, we can't communicate with the backend correctly, we couldn't get information from database.

As database, we've use `MongoDB` and `MongoDB Atlas`.

```bash
heroku config:set MONGODB_URI="OUR_DB_ACCESS"
```

```bash
heroku config:set JWT_SEC_KEY="OUR_JWT_KEY"
```

```bash
heroku config:set JWT_EXPIRE_TIME="OUR_JWT_EXPIRE_TIME"
```

And finally we can use as we want our backend services with client services 😇
