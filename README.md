# Terry-Crews-website
### Structure
This website was build using web components [x-tag](https://x-tag.github.io/), [sass](https://sass-lang.com/) and [pug](https://pugjs.org/).
Each section is a x-tag component pull the html content from a pug file in /views. Each section has a style sass file, that is imported on the main index.sass file. terry-crews.ts is the index file and contain all the other web components in its pug file. Content changes should be done on the pug file, and functionality changes in the typescript file of each component. 

### setup local environment for development

Clone the repository
```
git clone https://github.com/AugmentedIslandStudios/terry_crews_website.git
```

Install firebase tools
```
npm install -g firebase-tools
```

login into your ais google account
```
firebase login
```

run the server:
```
npm run start
```

Go to client
```
cd client
```

Finally watch files on client
```
npm run watch
```



### Commands for root:

Using firebase emulator, serves the site locally on http://localhost:8080
```
npm run start
```

Exposes port 8080 to localtunnel in case you see to show local enviroment to someone
```
npm run localtunnel
```

### Commands for client/:
install dependencies from package.json
```
npm install
```

builds a development bundle of the site and rebuilds when files change
```
npm run watch
```

builds a production bundle of the site
```
npm run build
```

builds prod bundle and deploys to firebase server
```
npm run deploy
```


### Firebase - server

The porject is hosted on google firebase:
```
https://console.firebase.google.com/project/terry-crews/overview
```

Handle domain: 
```
https://console.firebase.google.com/project/terry-crews/hosting/main
```


### Tools used for this project
* Firebase hosting
* Node v6.14.3
* Webpack
* PUG (Jade)
* SASS
* TypeScript
* x-tag 1.5.11