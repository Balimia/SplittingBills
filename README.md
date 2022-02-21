# Splitting Bills

#### **Video Demo:** https://youtu.be/rpv2Bc9hLs0

#### **Description:** This app was built using Next.js, React and Mongodb. Its purpose it to let you divide up the cost of things like group dinners and trips so that everyone can pay their fair share.

## Login/register route

_We can assume that this page will be visited first; The app redirects users to this route unless they are already logged in._

This page displays a form with two fields for the username and password, allowing users to either login (or register if the username doesn't already exist in the database).

Upon submitting the form, we check if the username already exists in the database and if the submitted password matches the hashed counterpart stored in the database:

- If the username already exists but the password doesn't match, display an error message.
- If everything matches, the user is then redirected to the index route.
- If the username doesn't exist, save the new information into the database and redirect the user to the index route.
  When they get redirected to the index route, we save their profile into local storage (so they can skip this step next time they visit the website).

## Index route

_This is the main page of the app, it contains three components: a navigation bar, an overview of each user's balance, and a form to submit new expenses._

#### **Navbar**

Displayed on the top of the page, this component contains links to the index and the history pages, making it easy for users to navigate the app. It also includes a logout button, which clears the user's local storage, effectively redirecting them to the `/login` route.

#### **Overview**

This table consolidates the data collected from the expense form and displays the balance of each user relative to the other users. Its values are updated every time a new expense is added to the database.

#### **Form**

Users can use this form to submit expenses in two different ways, equal or custom repartition. On form submission, a new entry is added to the database.

## History route

_This secondary page contains two components: a navbar (which is described in the index route) and a table with all past expenses._

#### **Table**

Users can review all the expenses that have been submitted through the form on the index page. In addition to the information received from the expenses form, it also displays the calculated split for each participant of any given expense.
