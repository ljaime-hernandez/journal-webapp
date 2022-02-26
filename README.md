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
been extensively documented for educational purposes. thanks for taking your time to review my code or 
notes and leave either a comment or a star if you found it useful.

Folders explained by alphabetical order

## actions 

### auth:
Contains all the functions related to the user login/logout logic, both the regular and google login 
functions will use an asynchronous function to retrieve the users information from our firebase db, some 
will have sweetalert2 methods to popup messages to either confirm the login interaction or an error popup 
displaying a wrong username information message. 
Every function has proper dispatch callings for the reducers to send the proper information on the store,
that way we can keep a track on every single action done on the webpage.

### notes:
Contains all the functions related to the notes/active-note logic. all the CRUD functions connect to 
our firebase DB collection and uses the authReducer to retrieve the user uid to make the proper requests on the database. 
The dispatch method uses functions which will lead towards the notesReducer updating every step on the store. The sweetalert2 popups will display uploading messages and 
will be removed only after the information has been properly saved and the promise is returned.

### ui:
Consist plainly on functions which will return a state, as the properties of our uiReducer are booleans
then those will be manipulated in each component where used, those are mainly used as flags for elements
to be displayed or not into the screen, alonfg with proper error messages when needed, such a wrong input 
for email, password and so on.

## components:

### auth:
Contain both the LoginScreen and the RegisterScreen components which share similar logic, they both are
forms which will dispatch the appropriate login/register methods in our firebase collection for authentication
and registration, both has additional functions which will validate each user input and will display
error messages based on the input box where the information was incorrect. both forms has default
information for testing purposes.

### journal:
The journal components are accessible after the user is logged into the account and its been authenticated
properly. At the left side of the screen we have the SideBar, journalEntries and JournalEntry component, 
along with component to the right called EmptySelect which will prompt the user to click on any note created
on the account, the sidebar will display all the notes saved on the users collection and will organize them
from the newest to the oldest based on its date creation. When clicking on any note the reducer will set that note as active, displaying it at the right part of the screen, described on the components below. 

### notes:


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
- cloudinary (file database)
- enzyme
- enzyme-to-json
- jest
- react-hooks (for hooks tests)
- redux-mock-store (for firestore tests)
- bootstrap (CDN)
- animate (CDN)