# Journal Webapp

Webapp link: https://journal-webapp.netlify.app/

Webapp designed to practice several uses on React such as:

* use Redux store with ascynchronous actions, dispatch, states, and middlewares
* troubleshoot Redux by using Redux DevTools
* apply Google (could be Apple, Facebook, Twitter, GitHub) and regular registration or login methods 
* file and data storage with both firebase and cloudinary
* private and public routes with React Router V5
* CRUD towards Firestore
* functional use of SASS
* adding multiple reducers to firestore
* date formatting with moment.js
* popup displays with sweetalert2
* email validation with validator dependency 
* unit testing (more information on the test section and each test file in the source folder)

More information about the webapp functionality can be found in each file and this readme file which has 
been extensively documented for educational purposes. Thanks for taking your time to review my code or 
notes and leave either a comment or a star if you find it useful.

**Folders are explained by alphabetical order below**
**dependencies on this project are enlisted at the bottom of the readme file**

## actions 

### auth:
Contains all the functions related to the user login/logout logic, both the regular and google login 
functions will use an asynchronous function to retrieve the users information from our firebase db, some 
will have sweetalert2 methods to popup messages to either confirm the login interaction or an error popup 
displaying a wrong username information message. 
Every function has proper dispatch callings for the reducers to send the proper information on the store,
that way we can keep a track on every single action done on the webpage.

### notes:
Contains all the functions related to the notes/active-note logic. All the CRUD functions connect to 
our firebase DB collection and uses the authReducer to retrieve the user uid to make the proper requests 
on the database. The dispatch method uses functions which will lead towards the notesReducer updating 
every step on the store. The sweetalert2 popups will display uploading messages and will be removed only 
after the information has been properly saved and the promise is returned.

### ui:
Consist plainly on functions which will return a state, as the properties of our uiReducer are booleans
then those will be manipulated in each component where used, those are mainly used as flags for elements
to be displayed or not into the screen, along with proper error messages when needed, such a wrong input 
for email, password and so on.

## components:

### auth:
Contain both the LoginScreen and the RegisterScreen components which share similar logic, they both are
forms which will dispatch the appropriate login/register methods in our firebase collection for authentication
and registration, both has additional functions which will validate each user input and will display
error messages based on the input box where the information was incorrect. Both forms has default
information for testing purposes.

### journal:
The journal components are accessible after the user is logged into the account and its been authenticated
properly. At the left side of the screen we have the SideBar, journalEntries and JournalEntry component, 
along with component to the right called EmptySelect which will prompt the user to click on any note created
on the account, the sidebar will display all the notes saved on the users collection and will organize them
from the newest to the oldest based on its date creation. When clicking on any note the reducer will set that 
note as active, displaying it at the right part of the screen, described on the components below. 

### notes:
The notes components are the ones we will use to alter the note properties, the NoteAppBar will allow us to 
add a picture to our note and save it onto the users collection. It also has an element displaying todays 
date with a human readable format by using moment.js dependency. The NoteScreen with retrieve the state of 
our noteReducer and retrieve the note id to display its information, if the note is new then both
the form and the picture element will be empty, if the note contains information then it will display
it on the screen and if it is modified then it will be updated on the collection after clicking the save button
of the NoteAppBar component.

## firebase:
Our webapp will be initialized with specific environment variables for either test or development 
depending on how we run the code, this is so the database connection for both is different so they 
do not affect the actual data, we use the firebase dependency to create a store, where we will manage the 
state of the interaction with the webpage, we also export a variable which will allow us to do a proper
google authentication with firebase.

## helpers:

### fileUpload:
Asynchronous function used with a Cloudinary API which will require a personal key and a predefine 
upload preset where the files are going to be stored, the post request used on this function should return
a promise which will contain a random url which we will use on an active note to update its url property.

### loadNotes:
Asynchronous function which will use the user uid to retrieve all the documents on its collection, afterwards
we will use each element retrieved from the promise and push it to an array assigning an id to it, including
the rest of the data on it.

## form:

### useForm:
Previously used in my other projects, its helpful to retrieve the value on input boxes by using onChange 
events, it also has a reset function which will help us to reset its values when needed.

## reducers:
All reducers will manage the state on the store, for the users login/logout, the error messages and 
alerts displayed on the user interface, and the active note CRUD.

## routers:

### AppRouter:
Will handle the switch allowing the user to access either private or public routes, as soon as the webpage 
is called, a firebase authentication method will check on the store for user information, if the 
information is empty, it will lead the user to the public login and registration route, if the store contains
authenticated user information, it will lead it to the private route containing the user notes.

### AuthRouter:
Contains the routes to both the login and register components.

### PrivateRoute:
The PrivateRoute is going to receive several pieces of data which we will use as filter
to either render or not certain pages in our webapp, the isAuthenticated comes from the
AppRouter which is a boolean used for confirming if the user is logged into his account
or not, the component will be the private component the user will have access to when 
he is authenticated.

### PublicRoute:
The PrivateRoute is going to receive several pieces of data which we will use as filter
to either render or not certain pages in our webapp, the isAuthenticated comes from the
AppRouter which is a boolean used for confirming if the user is logged into his account
or not, the component will be the private component the user will have access to when 
he is authenticated.

## store:
Our store will combine all the reducers created for us to use them all at the same time if needed, 
the createStore method will contain all the reducers in our webpage, along with the
middleware from redux needed to execute asynchronous tasks.

## styles:
I used SASS as the styling method for this project, so the main styles file contain the imported files
of all components on the project, the base folder contain the files for the global variables and the 
global classes used on the project.

## types:
Used for all custom reducers, the string will help us have a brief description of what the action does
in the redux extension debugger.

## unit Testing:
This webapp test environment requires specific testing dependencies and variables which are explained
in each test file, please refer to each file for additional information. 

### actions:

#### auth:

* tests for proper actions being called when the user either logs in or out
* test on startLogout method
* test on login by using the user email and password

#### notes:

* tests on notes creation
* tests on notes loading
* tests on notes saving
* tests on file uploading

#### ui:

* tests on all ui actions

### components:

#### JournalEntry:

* tests on component render
* tests on note activation

#### LoginScreen:

* tests on component render
* tests on google login
* tests on normal login

#### NoteScreen:

* tests on component render
* tests on active note launching

#### RegisterScreen:

* tests on component render
* tests on actions dispatch
* tests on alert elements

#### SideBar:

* tests on component render
* tests on logout button
* tests on new note actions

### helpers:

#### fileUpload:

* tests on file loading and url return
* tests on message errors

### reducers:

#### authReducer:

* default return
* uid and name return
* empty state return

#### notesReducer:

* default return
* active note and values return
* tests on new note addition
* tests on notes loading
* tests on notes update
* tests on note deletion
* tests on notes removal from store

### routers:

#### AppRouter:

* tests on proper function calling when user is properly authenticated




### dependencies:

- react
- react-router-dom
- node-sass
- firebase
- redux
- redux-thunk (middleware)
- moment (for proper date formatting)
- Sweetalert2 (for alert and confirm popups)
- validator (to validate email)
- Cloudinary (file database)
- enzyme
- enzyme-to-json
- jest
- react-hooks (for hooks tests)
- redux-mock-store (for Firestore tests)
- bootstrap (CDN)
- animate (CDN)