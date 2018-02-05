# User Microservice

## Installation
    
    - Globally install Gulp
    - Clone the Git repo
    - npm start
    - http://localhost:3001/

## API Specification

### GET /users

    - /api/v1/users
    
    Returns a list of the saved users

### GET /users/:id

    - /api/v1/users/:id
    
    Returns a user 
    Returns null if the ID is not found
    
### POST /users
    
    - /api/v1/users
    
    Post a New or Existing User
    
    Can have the following fields:
    
    - id
    - name
    - address
    - customerType
    - phoneNumber
    - email
    - tags
    
    If the ID is not present in the request a new user with be created
    
### Delete /user/:id

    Delete a user
    
### Merge /user/merge/:id1/:id2

    - /api/v1/user/merge/:id1/:id2
    
    Will take 2 users and merge them into 1 record.  The orginal users are then deleted