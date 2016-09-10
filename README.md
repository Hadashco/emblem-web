<img src="https://ia601506.us.archive.org/22/items/emblem_logo/Pasted%20image%20at%202016_08_22%2007_45%20PM.png" height="60"> Emblem
=========================================
Hold up a looking glass to the world, and transform the view! Emblem presents an augmented reality window, displaying geocached two- and three- dimensional models onto users' surroundings.

Web client is available for use at [emblemAR.com](https://www.emblemar.com/).
Mobile app availability on the Apple App store is pending, and can be [seen in action on YouTube](https://youtu.be/Gw2KtUhew-0) by clicking the images below.

<a href="https://youtu.be/Q1P4stbLsBw"><img src="https://ia601507.us.archive.org/17/items/raptor_20160830/raptor.png" 
alt="3D Raptor" width="250" /></a>     <a href="https://youtu.be/w3DlUGXR9hA"><img src="https://ia801502.us.archive.org/5/items/Library_20160830/Library.png" 
alt="Library & Statue of Liberty" width="250" /></a>     <a href="https://youtu.be/vXgujNcuYdU"><img src="https://ia601500.us.archive.org/30/items/dolphin_201608/dolphin.png" 
alt="Dolphins" width="250" /></a>

### [Server and Web Client](https://github.com/Hadashco/emblem-web)
Upload 3D models from a computer desktop, explore artwork posted around the world, and manage granular user settings from the web client.

[![Stories in Ready](https://badge.waffle.io/Hadashco/emblem-web.png?label=ready&title=Ready)](https://waffle.io/Hadashco/emblem-web)

### [Mobile App](https://github.com/Hadashco/emblem-mobile)
In addition to providing a dramatic visual experience, the mobile application offers a well-executed implementation of knitting
Vuforia's C++ library with Swift using Objective-C.

[![Stories in Ready](https://badge.waffle.io/Hadashco/emblem-mobile.png?label=ready&title=Ready)](https://waffle.io/Hadashco/emblem-mobile)


Table of Contents
--------------------------
- [Getting Started](#getting-started)
 - [Prerequisites](#prerequisites)
 - [Installation](#installation)
 - [Starting the Server](#starting-the-server)
 - [Starting the Mobile App](#starting-the-mobile-app)
- [Running Tests](#running-tests)
- [Built With](#built-with)
- [Obtaining API Keys](#obtaining-api-keys)
- [Run Without AWS](#run-without-aws)
- [Contributions](#contributions)
- [Authors](#authors)
- [License](#license)
- [Acknowledgements](#acknowledgements)


Getting Started
--------------------------
### Prerequisites
- <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" height="17">&nbsp;[Node.js 6.0+](http://nodejs.org)
- <img src="https://cdn.captora.com/media/docker.com/media/Icon-Cloud-Blue.png-1456879454393" height="17">&nbsp;[Docker](https://www.docker.com/)

- Developer Account / API Key
 - <img src="https://www.facebookbrand.com/img/fb-art.jpg" height="17">&nbsp;[Facebook Developer](#facebook) account for OAuth 2.0
 - <img src="https://www.yuvid.com/wp-content/uploads/2015/02/amazon-s3-logo.png" height="17">&nbsp;[Amazon Web Services (AWS)](#amazon) account for storage
 - To avoid using Amazon, see [Run Without AWS](#run-without-aws) below

- Mobile Dependencies (Mac OSX)
 - <img src="https://avatars3.githubusercontent.com/u/1189714?v=3&s=400" height="17">&nbsp;[CocoaPod](https://cocoapods.org/)
 - <img src="http://a2.mzstatic.com/us/r30/Purple30/v4/f3/d4/1f/f3d41fc1-0925-f078-c19e-ce00e6d724bf/icon128-2x.png" height="17">&nbsp;[Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) `xcode-select --install`
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;[Apple Provisioning Profile](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppStoreDistributionTutorial/CreatingYourTeamProvisioningProfile/CreatingYourTeamProvisioningProfile.html)

### Installation
1. Clone the web and server code `git clone https://github.com/Hadashco/emblem-web.git emblem-web`
2. Clone the mobile code `git clone https://github.com/Hadashco/emblem-mobile.git emblem-mobile`

### Starting the Server:
1. Setup `.config.sh` according to `.configEx.sh`
2. Navigate to `emblem-web` folder in the terminal
3. Run `bash start.dev.sh`
 - Initializes config file
 - Runs Docker compose
3. Navigate to `http://localhost:3000/` in browser

### Starting the Mobile App:
1. Navigate to `emblem-mobile` folder in the terminal
2. Run `pod install`
3. Open document in Xcode to modify
4. Test code functionality either with the built-in [simulator](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/iOS_Simulator_Guide/GettingStartedwithiOSSimulator/GettingStartedwithiOSSimulator.html) or by opening the application [on a device](https://developer.apple.com/library/ios/documentation/IDEs/Conceptual/AppDistributionGuide/LaunchingYourApponDevices/LaunchingYourApponDevices.html) (advised)


Running Tests
--------------------------
1. Navigate to `emblem-web` folder in the terminal
2. Run `npm run test:docker`


Built With
--------------------------
* **Web Client:** React, Redux, Webpack
* **Mobile App:** Swift 2.2
* **AR View:** C++
* **Server:** Node.js, Express, Sequelize
* **Build System:** Docker
* **Storage:** Postgres, AWS (S3)


Obtaining API Keys
--------------------------
<img src="http://www.doit.ba/img/facebook.jpg" width="200">
### Facebook
1. Sign up to be a [Facebook developer](https://developers.facebook.com/)
2. Click the "Create a New App" on your [apps page](https://developers.facebook.com/apps/)
3. Choose a "Website" app and give it a name
4. Add a contact email and a category when prompted
5. Complete the captcha and wait for the app to be created
6. Scroll down to the "Tell us about your website" portion of the next page, enter:  
     `http://localhost:3000/`
7. Click "Next" and scroll back to the top of the page. Click on the "Skip Quick Start" button
8. Click the "+ Add Product" button on the left side of the dashboard
9. Click the "Get Started" button next to "Facebook Login"
10. For "Valid OAuth redirect URIs", enter:  
     `http://localhost:3000/auth/facebook/callback`
11. Click "Save Changes" on the bottom right
12. Go back to the app dashboard by clicking the "Dashboard" menu item on the top left
13. Make a copy of `./server/config/.env.sample.js` as `./server/config/.env.js`. Notice that the `.env.js` file is a JavaScript file. The value for each property of the exported object in this file should be a string. Make sure there are single quotes around the pasted in values
14. Copy the "App ID" and replace `FACEBOOK_ID`'s value with the copied value
15. Click the "Show" button for "App Secret". Enter your Facebook password to display the value. Copy the shown value and into the `.env.js` file as the `FACEBOOK_SECRET`

With the dev server running, navigating to `http://localhost:3000/auth/facebook` redirects the browser to Facebook and ask for app authorization. Once authorized, the browser redirects to `http://localhost:3000/auth/facebook/callback` with a `code` query param (logged on the server). The browser then redirects to the application root.

<img src="http://awsmedia.s3.amazonaws.com/AWS_Logo_PoweredBy_127px.png" alt="Powered by AWS Cloud Computing" width="200">
### Amazon
1. Set up for an [AWS S3 Account](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSAccounts.html)
 - Consider securing account with [multi-factor authentication](https://aws.amazon.com/iam/details/mfa/)
2. Use the [Access Key ID and Secret Access Key](http://docs.aws.amazon.com/AWSSimpleQueueService/latest/SQSGettingStartedGuide/AWSCredentials.html) to populate the `.config.sh` file
3. Create a [new bucket](http://docs.aws.amazon.com/AmazonS3/latest/gsg/CreatingABucket.html) to store your files
4. Replace all references to the bucket `hadashco-emblem` with the new bucket name
 - The `artController.js` file has most of these references
 - **Pro Tip:** In the Sublime text editor, use `ctrl+shift+f` to search all open documents


Run Without AWS
--------------------------
Navigate to `server/test/addToAwsFreeArtRoute.md` and follow the enclosed instructions.


Contributions
--------------------------
If you have any problems or major improvements, please consult the known issues. If you do not see your problem captured, please file a new issue. Pull requests adhering to the 
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) are always welcome.


Authors
--------------------------
* [Conor Carey](https://www.linkedin.com/in/conor-carey-b2b34097) ([ccarey221](https://github.com/ccarey221))
* [Dane Jordan](https://www.linkedin.com/in/daneelijordan) ([Dane456](https://github.com/Dane456))
* [Hannah Henderson](https://www.linkedin.com/in/hahenderson) ([hannahhenderson](https://github.com/hannahhenderson))
* [Shea Hawkins](https://www.linkedin.com/in/shea-hawkins-6a6057a2) ([shea-hawkins](https://github.com/shea-hawkins))


License
--------------------------
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.


Acknowledgements
--------------------------
* Special thanks to the [Vuforia](https://vuforia.com/) team for the open-source availability of their library
