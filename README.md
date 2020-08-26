# Add Firebase authentication to Ionic Apps
This repo is part of an Ionic Firebase Tutorial where you can learn how to add Firebase authentication to an Ionic Framework App.

As an example we are going to build a simple app that allows users to login and signup to your app using Firebase authentication services. Once they log in, they will see a home page with their basic profile info.

### *Important note*: this tutorial is for Ionic v1. [Get the updated tutorial and example app built with Ionic 5 and Firebase](https://ionicthemes.com/tutorials/about/firebase-authentication-in-ionic-framework-apps). 

Check all the details of this demo app in the step by step [Ionic 1 Firebase Auth Tutorial](https://ionicthemes.com/tutorials/about/add-firebase-authentication-to-your-ionic-app)

## Setup

### Install Ionic
You can find the **_Ionic_** official installation documentation [here](http://ionicframework.com/docs/guide/installation.html).

1. Make sure you have an up-to-date version of **_Node.js_** installed on your system. If you don't have **_Node.js_** installed, you can install it from [here](http://nodejs.org/).
2. Open a terminal (Mac) or a command interpreter (`cmd`, Windows), and install **_Cordova_** and **_Ionic_**:
	- `npm install -g cordova`
	- `npm install -g ionic`
	- On a Mac, you may have to use `sudo` depending on your system configuration: `sudo npm install -g cordova ionic`
3. If you already have **_Cordova_** and **_Ionic_** installed on your computer, make sure you update to the latest version:
	- `npm update -g cordova`
	- `npm update -g ionic`
	- Or `sudo npm update -g cordova ionic`

Follow these links if you want more information:
* [Ionic **_Getting started_** guide](http://ionicframework.com/getting-started)
* [Ionic **_Documentation_**](http://ionicframework.com/docs)
* [Visit the Ionic **_Community Forum_**](http://forum.ionicframework.com)

### Git & `ionic start`

First we need to link this new Ionic project with our reference repo on github. Clone this repo so we can start working on the app:
- `git clone https://github.com/ionicthemes/firebase-authentication-for-your-ionic-app.git`
- `cd firebase-authentication-for-your-ionic-app`

After this, we need to set up some stuff before starting working on the **_Ionic_** project. To do so, run these commands:
- `npm install`
- `bower install`

Finally, to see the current state of the project, run:
- `ionic serve`

### [Find lots of Ionic Tutorials and Starter Apps in IonicThemes](https://ionicthemes.com).
