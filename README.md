# taskAssign

# Introduction
This is a task assign module with registered user like Admin, Manager and Customer. Where, Admin can create a task and assign to Manager. Admin can add/edit/delete the tasks.

#Required Modules 
ReactJS, NodeJS, Express, MongoDB and other modules like Axios, mongosh, redux.

#Steps to run the application.
+ cd taskAssign
 + npm i (for client to install supportive node modules)
 + npm start (run the front end application)
 + cd server -> npm i (for server to install supportive node modules)
 + nodemon index.js (for server to run).

#Structure of Project is as follow:
 + PracticalDemo
    + src
     + components
      + Navigation
      + NavigationItems
        - NavigationItems.js
        - NavigationItems.css
        + NavigationItem
          - NavigationItem.js
          - NavigationItem.css 
      + ToolBar
        - Toolbar.js
        - Toolbar.css 
     + container
      + Dashboard
        - Dashboard.js
        - Dashboard.css
      + Home
        - Home.js
        - Home.css
      + Layouts
       - Layout.js
       - Layout.css
      + RegisterLogin
        + Logout
        - Auth.js
        - Auth.css  
     + shared
      - Utility.js
     + store
      + Reducer
        - auth.js
        - userProfile.js
      + actions
        - actiontypes.js
        - auth.js
        - index.js
        - userprofile.js
     - App.js
     - App.css
     - index.js
     - index.css
     - reportWebVitals.js 
    + server
      + controllers
        - taskcontroller.js
        - usercontroller.js 
      + db
        - index.js  
      + models
        - task-details.js
        - user-details.js  
      + routes
        - task-routes.js
        - user-routes.js
      - index.js
      - package.json
    

