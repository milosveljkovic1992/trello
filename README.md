# Getting Started with Create React App

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Trello JS assignment summary

This project is meant to resemble Trello application, but not a clone per-se. The app design is at developer's discretion.

### Technologies

This project is built in React.  
Components are built using styled-components.  
Routing is handled by react-router.  
Global state is managed using Redux Toolkit.  
Icons are added via react-icons.  
Data fetching is done using Axios.

### Features

When you first open the app, you get prompted to login.  
When you click the login button, you get redirected to Trello's authorization page.  
After you've been authorized, landing page is loaded.  
Landing page consists of boards previously created, if there are any.  
Maximum number of boards per workplace is 10. If you have less than 10, you can create a board clicking on Add New card.  
Clicking on a board opens that board page.  
Board fetches the lists created and cards for each list.  
A new card can be added to each list.  
A new list can be added to the board by clicking the button and adding a name.  
A list can be removed by clicking on an icon next to it's name.  
A card can be edited by clicking on an icon next to it's name.  
Cards can be re-ordered within the same list or moved to another list by dragging and dropping the card.  
Each card will display under the card title, whether it contains a description, as well as number of comments if there are any.  
When you click on the edit icon, you are prompted with the edit modal. You can rename the card, open to see its details, move or delete it.  
When you click a card, a popup modal gets open.  
Card modal contains the card title, description and comments.  
You can edit card title from within modal, by clicking on it and modifying text.  
You can add, edit or remove card description by clicking on it and entering/deleting text.  
Comments can be added to the card.  
Comments are displayed by date in descending order, from latest to earliest and they can be deleted or edited.  
Board name can be edited by clicking on it and entering a new name.  
Next to board name is a Home button which redirects you to landing page where you can choose to open a different board.  
In the top right-hand corner is Log out button which deauthorizes and logs you out...
