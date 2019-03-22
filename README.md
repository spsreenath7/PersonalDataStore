# Assignment 1 - ReactJS app.

Name: Sreenath S P

## Overview.

This app is developed to serve as a user interface for a personal data store. Here users can store, manage and control the usage of personal data. So this can help users manage their privacy of personal data.


 . . . . . List of user features  . . . . 
 
 + User SignUp/Login
 + Update user profile
 + Add create , update and delete activity
 + Apply filter and sort over transactions list
 + Create custom items
 + Control the data sharing with privacy dashboard  
 

## Installation requirements.

Note: All the required node modules are saved in package.json, so no seperate installation of modules required. To run the app first start the local JSON server and then start the npm.

json-server ./friends.json -p 3001
npm start

## Data Model Design.


![][model]

## App Component Design.

A screenshot showing the component stories from Storybook  

![][stories]

. . . . Explain any non-standard stories, if necessary . . . . . 

## UI Design.


![][image1]
![][image2]
![][image3]
![][image4]
![][image5]
![][image6]
![][image7]
![][image8]



## Routing.

public views

+ /foos - displays all published foos
+ /foos/:id - detail view of a particular foo (:id)
+ etc
+ etc

private views (require login)

+ /home/:userid/ - user home once logged in.
+ /home/:userid/profile - displays user profile also allowed to edit.
+ /home/:userid/pds - dispalyes the various personal data stored for the user, under three areas and allowed to add a custom item.
+ /home/:userid/privacy - 



## Extra features

. . . . . Briefly explain any non-standard features, functional or non-functional, developed for the app. This would include user registeration and authentication, improved re-rendering policies, etc . . . . . .  

+ New user registeration and authentication using Firebase.
+ All user and app data is stored and retrived using mock rest API, offered by JSON sever utility.
+ Used componentDidMount which is invoked to load the user profile and activity data  immediately after their respective component is mounted.
+ To enhance user experience, used third party components like antd and reactstrap. Also utilised the proptypes supported by those components to achieve the required fearture.


## Independent learning.

+ Learnt Fire base authentication and applied it in user login/signup
+ Used third party components, by refering their API docs.


[model]: ./images/data.jpg
[image]: ./screen.png
[stories]: ./storybook.png
[image1]: ./images/login.png
[image2]: ./images/signup.png
[image4]: ./images/profile.png
[image5]: ./images/profileEdit.png
[image6]: ./images/login.activityList.png
[image7]: ./images/login.finance.png
[image8]: ./images/login.createitem.png