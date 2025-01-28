# LangxChange

LangXchange is a community-driven platform where language enthusiasts review books in various languages, sharing insights on their effectiveness for learning grammar and their entertainment value. Discover the best resources to elevate your language journey!

# Live Link

https://langxchange.onrender.com

## Tech Stack

### Frameworks and Libraries
<div style="display: flex; align-items: center; gap: 10px;">
  <img src="https://img.shields.io/badge/-Python-3776ab?logo=python&logoColor=FFFF66&logoWidth=20" alt="Python" height="25">
  <img src="https://img.shields.io/badge/-Flask-000000?logo=flask&logoColor=white&logoWidth=20" alt="Flask" height="25">
  <img src="https://img.shields.io/badge/-Javascript-41454A?logo=javascript&logoColor=F7DF1E&logoWidth=20" alt="Javascript" height="25">
  <img src="https://img.shields.io/badge/-React-263238?logo=react&logoColor=61DAFB&logoWidth=20" alt="React" height="25">
  <img src="https://img.shields.io/badge/-Redux-764ABC?logo=redux&logoColor=white&logoWidth=20" alt="Redux" height="25">
  <img src="https://img.shields.io/badge/-CSS3-1572B6?logo=css3&logoColor=white&logoWidth=20" alt="CSS3" height="25">
  <img src="https://img.shields.io/badge/-HTML5-E34F26?logo=HTML5&logoColor=white&logoWidth=20" alt="HTML5" height="25">
</div>

### Database:

<img src="https://img.shields.io/badge/-PostgreSQL-4169E1?logo=postgresql&logoColor=white&logoWidth=20" alt="PostgreSQL" height="25">

### Hosting:

<img src="https://img.shields.io/badge/-Render-23c43e?logo=render&logoColor=white&logoWidth=20" alt="Render" height="25">

### Index

[Feature List](https://github.com/zrdominguez/LangxChange/wiki/Feature-List) | [Database Schema](https://github.com/zrdominguez/LangxChange/wiki/Database-Schema) | [User Stories](https://github.com/zrdominguez/LangxChange/wiki/User-Stories)

### Landing Page

<img src="https://github.com/user-attachments/assets/1da32ace-1f4a-487b-8985-3196b9cfa946" alt="Demo Animation" width="830">

### Book List

<img src="https://github.com/user-attachments/assets/bf9532fb-c5ba-4bdf-a56b-ef965e949684" alt="Demo Animation" width="830">

### Collection Page

<img src="https://github.com/Savsou/BopStop/blob/dev/assets/ezgif-7-5d1373d8c7.gif" alt="Demo Animation" width="830">

### Book Details
<img src="https://github.com/Savsou/BopStop/blob/dev/assets/ezgif-7-705fde165c.gif" alt="Demo Animation" width="830">

## Getting started

1. Clone this repository (only this branch).

2. Install dependencies.

   ```bash
   pipenv install -r requirements.txt
   ```

3. Create a __.env__ file based on the example with proper settings for your
   development environment.

4. Make sure the SQLite3 database connection URL is in the __.env__ file.

5. This starter organizes all tables inside the `flask_schema` schema, defined
   by the `SCHEMA` environment variable.  Replace the value for
   `SCHEMA` with a unique name, **making sure you use the snake_case
   convention.**

6. Get into your pipenv, migrate your database, seed your database, and run your
   Flask app:

   ```bash
   pipenv shell
   ```

   ```bash
   flask db upgrade
   ```

   ```bash
   flask seed all
   ```

   ```bash
   flask run
   ```

7. To run the React frontend in development, `cd` into the __react-vite__
   directory and run `npm i` to install dependencies. Next, run `npm run build`
   to create the `dist` folder. The starter has modified the `npm run build`
   command to include the `--watch` flag. This flag will rebuild the __dist__
   folder whenever you change your code, keeping the production version up to
   date.

# Feature List
   1. Users
   2. Products
   3. Reviews
   4. Cart
   5. Wishlist

## Future Features

### Search Functionality
* Users can search for books using book titles and author names for results.

### Add Flash Cards
* Users can create flash cards to review words seen on their language journey.

### Make a community blog
* Have a section for user to discuss topics on language with each other to help themselves and others with meaningful discussions.

# Endpoints

## Users

### User Login

Users can log in using their email or username.

- **Require authentication**: False
- **Request**

  - **Method**: POST
  - **Route path**: /api/auth/login
  - **Body**:
    ```json
    {
      "email_or_username": "user@example.com or username",
      "password": "your_password"
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "username": "username",
      "email": "user@example.com",
      "profileImageUrl": "exampleprofile.url",
      "createdAt": "2024-10-30 23:51:27",
      "updatedAt": "2024-10-30 23:51:27",
      "collections": [list of collections],
    }
    ```

- **Error Response: Couldn't find user with given credentials**
  - **Status Code**: 404
  - **Body**:

```json
{
  "credentials": "Login failed. Please check your credentials and try again.",
  "password": ["Password was incorrect.", "No such user exists."]
}
```

### User Logout

Users should be able to logout if they are currently logged in

- **Require authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/auth/logout
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "User logged out"
    }
    ```

### User Signup

Users can create a new account by signing up.

- **Require authentication**: False
- **Request**

  - **Method**: POST
  - **Route path**: /api/auth/signup
  - **Body**:
    ```json
    {
      "artistname": "desired_artistName",
      "username": "desired_username",
      "email": "user@example.com",
      "password": "your_password",
      "confirm_password": "your_password"
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "id": 21,
      "artistName": "desired_artistName",
      "username": "desired_username",
      "email": "user@example.com",
      "profileImageUrl": "",
      "createdAt": "2024-11-01 02:12:32",
      "updatedAt": "2024-11-01 02:12:32",
      "collections": []
    }
    ```

- **Error Response: User already exists**
  - **Status Code**: 409
  - **Body**:
    ```json
    {
      "email": "Email address is already in use.",
      "username":"Username is already in use."
    }
    ```

### Get Current User

Users can retrieve their own user information.

- **Require authentication**: True
- **Request**

  - **Method**: GET
  - **Route path**: /api/users/session
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "id": 1,
      "username": "current_username",
      "email": "current_user@example.com",
      "profileImageUrl": "currentprofile.url",
      "createdAt": "2024-10-30 23:51:27",
      "updatedAt": "2024-10-30 23:51:27",
      "collections": [collections here]
    }
    ```

- **Error Response: User is not logged in**
  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

## Books

### Get Books by Language

Users should be able to view all Books.

- **Require authentication**: false
- **Request**
  - **Method**: GET
  - **Route path**: /api/books/:lang
  - **Body**: none
- **Successful Response**

  - **Status Code**: 200
  - **Body**:

    ```json
    {
      "books": [
        {
          "bookId": 1,
          "name": "BookName",
          "lang": "English",
          "rating": 3,
          "imageUrl": "image.url"
        }
        // more books...
      ]
    }
    ```

### Get details of a Book by id

Return details of a Book specified by its id.

- **Require Authentication**: False
- **Request**

  - **Method**: GET
  - **Route path**: /api/books/:bookId
  - **Body**: None

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "bookId": 1,
      "name": "BookName",
      "author": "Author",
      "publisher": "Publisher",
      "publishDate": "2024-10-29 18:38:09.043894",
      "lang": "English",
      "genre": "Mystery",
      "avgRating": 3,
      "difficulty": "Beginner",
      "summary": "Description Here",
      "imageUrl": "image.url",
      "createdAt": "2024-10-29 18:38:09.043894",
      "updatedAt": "2024-10-29 18:38:09.043894"
    }
    ```

- **Error Response**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Book not found!"
    }
    ```
## Collections

### Create a collection

Users should be able to create a Collection.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/collections
  - **Body**:
    ```json
    {
      "collectionName": "CollectionName",
      "lang": "English",
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "collection": {
        "collectionId": 1,
        "collectionName": "CollectionName",
        "userId": 1,
        "lang": "English",
        "count": 0,
        "books":[
        //where books will go
          {}
        ],
        "createdAt": "2024-10-29 18:38:09.043894"
      }
    }
    ```

- **Error Response: Body Validation Errors**
  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "collectionName": "Name is required",
        "lang": "Language is required"
      }
    }
    ```

### Update Collection Name

Users should be able to update their Collection(s) Name.

- **Require authentication**: True
- **Require proper Authentication: Collection must belong to the user**
- **Request**

  - **Method**: Put
  - **Route path**: /api/collections/:collectionId
  - **Body**:
    ```json
    {
      "collectionName": "CollectionName",
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Collection name has been updated!"
    }
    ```

- **Error Response: Body Validation Errors**
  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "collectionName": "Name is required"
      }
    }
    ```
- **Error Response: Couldn't find a collection by specified id**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Collection could not be found!"
    }
    ```

### Delete an existing collection.

Users should be able to delete their collection(s).

- **Require authentication**: True
- **Require proper Authentication: Collection must belong to the user**
- **Request**

  - **Method**: DELETE
  - **Route path**: /api/collections/:collectionId
  - **Body**: None

- **Successful Response**
  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Collection successfully deleted"
    }
    ```
- **Error Response: Couldn't find a collection by specified id**
  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Collection could not be found!"
    }
    ```

### View all books in a collection.

Users should be able to view all Books added to their Collection.

- **Require authentication**: True
- **Request**
  - **Method**: GET
  - **Route path**: /api/collections/:collectionId
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "collection": {
        "id": 1,
        "collectionName": "CollectionName",
        "books": [
          {
            "bookId": 1,
            "name": "BookName",
            "avgRating": 4,
            "price": 2,
            "author": "AuthorName"
          }
          // more books in collection
        ]
      }
    }
    ```

### Add book to a collection

Users should be able to add Books to their Collection.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/collections/:collectionId/books
  - **Body**:
    ```json
    {
      "bookId": 1,
    }
    ```

- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Book has been added to collection!",
    }
    ```

- **Error Response: Body Validation Errors**

  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Book not found!"
    }
    ```

### Remove a book from a collection

Users should be able to remove Books from their Collection.

- **Require authentication**: True
- **Request**
  - **Method**: DELETE
  - **Route path**: /api/collections/:collectionId/books
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Book removed from Collection"
    }
    ```

- **Error Response: Can't find book**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Can't find Book in Collection"
    }
    ```

- **Error Response: User not logged in**

  - **Status Code**: 401
  - **Body**:
    ```json
    {
      "message": "Unauthorized"
    }
    ```

## Reviews

### Get all reviews by book's id

Users should be able to view all reviews on a book.

- **Require authentication**: False
- **Request**
  - **Method**: GET
  - **Route path**: /api/books/:bookId/reviews
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "reviews": [
        {
          "id": 1,
          "bookId": 1,
          "userId": 1,
          "review": "Random comment",
          "score": 5
        }
        // more reviews...
      ]
    }
    ```

- **Error Response: Couldn't find a collection by specified id**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "book could not be found!"
    }
    ```

### Create and return a review for a book by id

Users should be able to create a review for a Book.

- **Require authentication**: True
- **Request**

  - **Method**: POST
  - **Route path**: /api/books/:bookId/reviews
  - **Body**:
    ```json
    {
      "review": "Random comment",
      "score": 4
    }
    ```

- **Successful Response**

  - **Status Code**: 201
  - **Body**:
    ```json
    {
      "review": {
        "id": 1,
        "bookId": 1,
        "userId": 1,
        "review": "Random comment",
        "rating": 4
      }
    }
    ```

- **Error Response: Body Validation Errors**

  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review is required",
        "rating": "Rating is required"
      }
    }
    ```

- **Error Response: Couldn't find a book by specified id**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Book could not be found"
    }
    ```

- **Error Response: Review from the current user already exists for this Book**

  - **Status Code**: 500
  - **Body**:
    ```json
    {
      "message": "User already has a review for this book"
    }
    ```

### Update and return an existing review

Users should be able to update their Review for a Book.

- **Require authentication**: True
- **Request**

  - **Method**: Put
  - **Route path**: /api/reviews/:reviewId
  - **Body**:
    ```json
    {
      "review": "Random updated comment",
      "rating": 2
    }
    ```

- **Successful Response**
  - **Status Code**: 200
  - **Body**:

```json
{
  "review": {
    "id": 2,
    "bookId": 1,
    "userId": 1,
    "review": "Random updated comment",
    "rating":2
  }
}
```

- **Error Response: Body Validation Errors**

  - **Status Code**: 400
  - **Body**:
    ```json
    {
      "message": "Bad Request",
      "errors": {
        "review": "Review is required",
        "rating": "Rating is required"
      }
    }
    ```

- **Error Response: Couldn't find a book by specified id**

  - **Status Code**: 404
  - **Body**:

    ```json
    {
      "message": "Review could not be found!"
    }
    ```

  - **Error Response: Couldn't find a book by specified id**

  - **Status Code**: 403
  - **Body**:
    ```json
    {
      "message": "Requires proper authorization"
    }
    ```

### Delete an existing Review

Users should be able to delete their Review from a Book.

- **Require authentication**: True
- **Request**
  - **Method**: DELETE
  - **Route path**: /api/reviews/:reviewId
  - **Body**: None
- **Successful Response**

  - **Status Code**: 200
  - **Body**:
    ```json
    {
      "message": "Review successfully deleted"
    }
    ```

- **Error Response: Couldn't find a review by specified id**

  - **Status Code**: 404
  - **Body**:
    ```json
    {
      "message": "Review couldn't be found"
    }
    ```
