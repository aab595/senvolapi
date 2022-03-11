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

| __METHODS__ | __URLS__              | __ACTIONS__       |
|-------------|-----------------------|-------------------|
| `GET`       | api/users             | Get All Users     |
| `GET`       | api/users/show/:id    | Get User By Id    |
| `PUT`       | api/users/edit/:id    | Update User By Id |
| `DELETE`    | api/users/delete/:id  | Delete User By Id |

<center>👇 FLIGHT ✈️</center><hr>

| __METHODS__ | __URLS__              | __ACTIONS__         |
|-------------|-----------------------|---------------------|
| `GET`       | api/flight            | Get All Flight      |
| `GET`       | api/flight/show/:id   | Get Flight By Id    |
| `POST`      | api/flight            | Add New Flight      |
| `PUT`       | api/flight/edit/:id   | Update Flight By Id |
| `DELETE`    | api/flight/delete/:id | Delete Flight By Id |

<center>👇 RESERVATION 📋</center><hr>

| __METHODS__ | __URLS__                   | __ACTIONS__              |
|-------------|----------------------------|--------------------------|
| `GET`       | api/reservation            | Get All Reservation      |
| `GET`       | api/reservation/show/:id   | Get Reservation By Id    |
| `POST`      | api/reservation            | Add New Reservation      |
| `PUT`       | api/reservation/edit/:id   | Update Reservation By Id |
| `DELETE`    | api/reservation/delete/:id | Delete Reservation By Id |
