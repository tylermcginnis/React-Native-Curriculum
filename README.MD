<img src="http://www.reactjsprogram.com/images/reactjsprogram-500.png" width="250" align="right">

React.js Program's "React Native" course Curriculum
========

####For more information on React.js Program, [click here](http://reactjsprogram.com)

##Objective
Build a functioning Polls app with React Native on Android and iOS.

<img src="http://www.reactjsprogram.com/images/PollsPreview.gif" width="480" height="433">

## Notes
The goal here is to give you just enough guidance for you to struggle without drowning. Note that the steps below are just suggestions. The ideal situation is you look at the completed project, then you build it. However, if you're not up for such things, feel free to follow the (vague by design) steps below. If you get stuck, all steps have coinciding branches for you to reference as a last case scenario.

##Step 0: Examine the Final Product
 * You'll be building the app in the GIF above. Get familiar with it's functionality, the different route transitions, how it differs on iOS and Android.

##Step 1: /HelloWorld
Before we dive into building the app, let's just make sure we have a Hello World app working on both Android and iOS.

 * Create a new project using react-native init
 * Create and configure your .babelrc file if you want babel-root-import
 * Create an app directory and in your app directory create and configure your index.js file
 * Have index.android.js and index.ios.js render your 'app/index.js' file
 * Verify your app works on both Android and iOS (if you're building for both platforms)

##Step 2: /FacebookSDK
We're going to use Facebook to Authenticate. Let's install the Facebook SDK into our React Native app so we can do that.

 * npm install --save react-native-fbsdk
 * Follow [this guide](https://medium.freecodecamp.com/installing-the-facebook-sdk-into-a-react-native-android-and-ios-app-69439bd97a99#.1njr8v2ye)
 * Add a LoginButton from react-native-fbsdk to your index.js view to verify you properly installed the SDK.

##Step 3: /FirstRoute
Let's have Navigator control our routes now.

 * Create a Splash view which just renders "Splash" for now.
 * Create a PollsNavigator component which is going to handle routing and route transitions. Have renderScene return the Splash view you just created.
 * Have configureScene render its default transitions for both android and iOS.
 * Create an AppContainer component which will be the main root file of your app and have it render your Navigator you just created.

## Step 4: /PreSplash
Let's create our PreSplash view that is going to be shown as the app checks that we're authenticated.

 * First create some universal styles for your app. Create a 'app/styles/index.js' file and export two objects from it, 'colors' and 'fontSizes'. Add appropriate properties to each.
 * Find a logo for your App and save it under 'app/images/logo.png'. You can use the one I use located [here](https://github.com/ReactjsProgram/React-Native-Curriculum/blob/progress/app/images/logo.png)
 * Create a PreSplash component which is going to just render your logo. Add some animations to it to give the user some feedback.
 * In AppContainer add a default prop of 'isAuthenticating' and set it to true. Now instead of rendering your Navigator, only render your Navigator if 'this.props.isAuthenticating' isn't true. If it is true, then render your PreSplash component you just created.

## Step 5: /Splash
Now create your Splash view which will render when the user isn't authenticating and they're not authed.

 * Update your Splash view so it renders some beautiful UI as well as a LoginButton from react-native-fbsdk and pass it a prop of onLoginFinished which accepts either 'error' or 'result'.
 * Remove the 'isAuthenticating' default prop from AppContainer.
 * Pass down a 'isAuthed' prop initially set to false to your Navigator then render your Splash view only if 'isAuthed' is false, otherwise render a <Text> component.

## Step 6: /AddRedux
Now we need to actually pass an 'isAuthenticating' and 'isAuthed' prop down to our AppContainer. Both of those properties will live in Redux.

 * npm install --save react-redux redux redux-thunk
 * Create a Redux 'authentication' module with has an initial state of ```isAuthed: false, isAuthenticating: false, authedId: ''``` as well as a reducer which just returns the default case of 'state'
 * In `app/index.js` create a store with all of your reducers as well as the Redux thunk middleware.
 * Wrap '<AppContainer />' inside of Provider passing provider your store as a prop.
 * Connect AppContainer to Redux and pass down 'isAuthenticating' and 'isAuthed' to AppContainer as props from the Redux authentication module.
 * Pass 'isAuthed' down to the 'PollsNavigator' component.
 * Play around with changing the default values of isAuthed and isAuthenticating in your Redux module to verify the proper views are being rendered on each change.

## Step 7: /FooterTabs
Now let's build out the UI for the main way to navigate throughout our app. On iOS this will be some Footer tabs on Android we'll have a drawer.

 * Before we add navigation, we need Views to navigate to. Create a Home view as well as a YourPolls view. These will be our two main views in our app.
 * Now we'll use React Native Vector Icons in order to render the icons in our footer, ```npm install --save react-native-vector-icons```
 * ```react-native link```
 * We'll keep the active footer tab state in a Redux module. Create an 'activeFooterTab' Redux module which handles that state as well as an action creator for changing the active footer.
 * Create a FooterTabs component for iOS which accepts the active footer tab and a onTabSelect function which changes the tab. Render either the Home view or the YourPolls view depending on the selected tab.
 * Create a container component (if you're following that pattern) which connects to FooterTabs and passes it the active footer tab from Redux as well as a function to change the active footer tab.
 * In PollsNavigator return FooterTabsContainer as the default return instead of the Text component we returned previously.
 * At this point transitioning between tabs on iOS should be working. Now, using 'DrawerLayoutAndroid', create a Drawer layout for Android.
 * Right now your App should look like this

<img src="http://www.reactjsprogram.com/images/react-native-footer-tabs.png" width="400">

## Step 8: /Navbars
Now let's create our navbar as well as our different navbar icons that will be present depending on which view we're on.

 * npm install --save react-native-navbar
 * Create your Navbar component which will accept a required title prop, an optional rightButton prop which is a React element, and an optional leftButton prop which is also a React element.
 * Create a HamburgerIcon component
 * Create a NewPollIcon component
 * Add a Navbar to both your Home view as well as your YourPolls view.
 * Add functionality to your hamburger icon component to navigate between Home and YourPolls on Android
 * Create the skeleton for your New Post view and have it rendered when someone clicks on the "New Poll" icon on the home view.
 * Add a Navbar with the appropriate Icons and functionality to your New Post view.
 * At this point you should be able to click on the New Poll icon on the Home view and you should get a new skeleton view which you can then "Close" or click "Submit"(which currently does nothing)

## Step 9: /Schemas
As always, I like to create the schemas for Firebase and Redux before I actually start implementing them. This way, I don't run into surprises down the line.

 * Create a schemas.js file and mock out both your Firebase schema as well as your Redux schema so you can refer to this file later on. To do this you'll have to think hard about your application and what state you will and won't need.

## Step 10: /Auth
Now before we get too far into our app, let's tie in authentication so when our user auths, we'll save that into Firebase.

 * npm install --save firebase
 * Create a `constants.js` file where you will initial your firebase app. Also export three properties from this file, ref, firebaseAuth, and facebookProvider just as we did in the videos.
 * Create an auth.js file which will be responsible for dealing with Firebase authentication.
 * Create and fill out these four functions, getAccessToken, authWithToken, updateUser, and logout. This pattern is the same pattern we did in the video.
 * Inside of redux/modules/authentication.js, create a onAuthChange thunk. For now it will be responsible for updating the user in Firebase as well as handling the local users state (isAuthed, isAuthenticating, authedId) in Redux.
 * Once onAuthChange (with the appropriate constants, action creators, and reducer) is finished, head over to AppContainer and when the component mounts, use `firebaseAuth.onAuthStateChanged` to dispatch your `onAuthChange` function whenever the firebase user state changes.
 * Now create a handleAuthWithFirebase thunk inside of authentication.js which is going to first, inform our authentication state that the user is currently authenticating, second, call `getAccessToken` and then call `authWith` once we have the access token.
 * Last step should be to dispatch our `handleAuthWithFirebase` function once we login, ie, inside of the `handleLoginFinished` function in our `SplashContainer` component.

## Step 11: /NewPoll
Now we're going to add the UI as well as the functionality to create a new poll.

 * Build out the UI for your New Poll view. Refer to the finished GIF above if you need inspiration.
 * Now when the user submits the new poll, persist it to Redux as well as Firebase. Refer to your schemas.js file in Step 9 if you need to.
 * Inside of polls.js create a `fetchAndSetPollsListener` function which is responsible for fetching the users polls and setting up a listener to Firebase to update Redux whenever a poll changes.
 * Update your `onAuthChange` function to set the users polls in Redux but also use the `fetchAndSetPollsListener` function you just created to set up that listener to Firebase.

## Step 12: /Devtools

 * npm install --save remote-redux-devtools
 * Add Redux DevTools to your app so you can inspect the state of your Redux store inside of Chrome.

## 13: /HomeView
Now we need to build out the UI for our Home view. Because we already fetched the polls in step 11 (using fetchAndSetPollsListener), this should mostly be a UI step.

 * Create a component called `PollPreview` which is going to render the UI for each individual poll. Keep in mind this is going to be clickable and will (eventually) take you to the individual poll.
 * Render the list of Polls using React Native's `ListView` component.
 * Once finished, your Home view should look like this,

<img src="http://www.reactjsprogram.com/images/react-native-home.png" width="400">

## 14: /YourPolls
Now let's finished the UI for the "Your Polls" view. Again since we already have the data needed, this will mostly be UI changes.

 * Build out the "Your Polls" view to generate a list of only the authenticated user's polls. You should be able to re-use the `PollPreview` component we implemented earlier.
 * Once finished, your Home view should look like this,

<img src="http://www.reactjsprogram.com/images/react-native-your-polls.png" width="400">



## Congrats!
If you got through this, great job. If you're reading this and you've made it this far, be proud. This was a pretty advanced project. Take a look at my code and compare to what we did differently.

<img src='http://www.reactjsprogram.com/images/tyler-mcginnis.png' width="100px" align="left"/> Suggestion or just want to say thanks? You can find me on Twitter at [@tylermcginnis33](http://twitter.com/tylermcginnis33)
