<img src="https://ia601506.us.archive.org/22/items/emblem_logo/Pasted%20image%20at%202016_08_22%2007_45%20PM.png" height="60"> Emblem
=========================================
Hold up a looking glass to the world, and transform the view! Emblem presents an augmented reality window, displaying geocached two- and three- dimensional models onto users' surroundings.

[TODO: video of mobile app in action](https://github.com/rubensousa/ViewPagerCards)

TODO: Update travis-ci build status links (below)

#### Server and Web Client
[![Build Status](https://api.travis-ci.org/hadashco/emblem-web.svg?branch=master)](https://api.travis-ci.org/hadashco/emblem-web.svg?branch=master)
[![Stories in Ready](https://badge.waffle.io/Hadashco/emblem-web.png?label=ready&title=Ready)](https://waffle.io/Hadashco/emblem-web)

#### [Mobile Client](https://github.com/Hadashco/emblem-mobile)
[![Build Status](https://api.travis-ci.org/hadashco/emblem-mobile.svg?branch=master)](https://api.travis-ci.org/hadashco/emblem-mobile.svg?branch=master)
[![Stories in Ready](https://badge.waffle.io/Hadashco/emblem-mobile.png?label=ready&title=Ready)](https://waffle.io/Hadashco/emblem-mobile)


Table of Contents
--------------------------
- [Getting Started](#getting-started)
 - [Prerequisites](#prerequisites)
 - [Installation](#installation)
 - [Starting the Server](#starting-the-server)
- [Usage](#usage)
- [Built With](#built-with)
- [Obtaining API Keys](#obtaining-api-keys)
- [Run Without AWS](#run-without-aws)
- [Contributions](#contributions)
- [History](#history)
- [Authors](#authors)
- [License](#license)
- [Acknowledgements](#acknowledgements)

Getting Started
--------------------------
Web client is available for use at [TODO](https://www.heroku.com/).

### Prerequisites
- <img src="https://nodejs.org/static/images/logos/nodejs-new-pantone-black.png" height="17">&nbsp;[Node.js 6.0+](http://nodejs.org)
- <img src="https://cdn.captora.com/media/docker.com/media/Icon-Cloud-Blue.png-1456879454393" height="17">&nbsp;[Docker](https://www.docker.com/)
- Command Line Tools
 - <img src="http://deluge-torrent.org/images/apple-logo.gif" height="17">&nbsp;**Mac OS X:** [Xcode](https://itunes.apple.com/us/app/xcode/id497799835?mt=12) (or **OS X 10.9+**: `xcode-select --install`)
- Developer Account / API Key
 - <img src="https://www.facebookbrand.com/img/fb-art.jpg" height="17">&nbsp;**Facebook Developer** account for OAuth 2.0
 - <img src="https://www.yuvid.com/wp-content/uploads/2015/02/amazon-s3-logo.png" height="17">&nbsp;**Amazon Web Services (AWS)** account for storage
 - To avoid using Amazon, see [Run Without AWS](#run-without-aws) below

### Installation
1. Clone the source code `git clone https://github.com/Hadashco/emblem`

### Starting the Server:
1. Setup `.config.sh` according to `.configEx.sh`
2. Run `bash start.dev.sh`

Usage
--------------------------
TODO

Built With
--------------------------
* **Web Client:** React, Redux, Webpack
* **Mobile Client:** Swift
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
TODO

Run Without AWS
--------------------------
Navigate to `server/test/addToAwsFreeArtRoute.md` and follow the enclosed instructions.


Contributions
--------------------------
If you have any problems or major improvements, please consult the known issues. If you do not see your problem captured, please file a new issue. Pull requests adhering to the 
[Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript) are always welcome.

Authors
--------------------------
* Conor Casey
* Dane Jordan
* Hannah Henderson
* Shea Hawkins

License
--------------------------
The MIT License (MIT)

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.

Acknowledgements
--------------------------
* Special thanks to the [Vuforia](https://vuforia.com/) team for the open-source availability of their library
