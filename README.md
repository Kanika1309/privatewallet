# Private Wallet

* Its a browser based web application using face recognition technology 
* It allow users to manage their financial details on daily basis and keep track of their income , bonus and expenditure 
* Tech Used - HTML , CSS , JS, NodeJS, MongoDB
* Api - Javascript face-api built on top of tensorflow.js core api 

Training models -  faceLandmark68Net, faceRecognitionNet, ssdMobilenetv1
* faceapi.nets.ssdMobilenetv1;
* faceapi.nets.faceLandmark68Net;
* faceapi.nets.faceRecognitionNet;

This application first uses face api to detect images used during registration and login , then compare how similar these 2 images are by calculating Euclidean distance. 
For face recognition, smaller values indicate more similar faces.
If the faces matches, user will be allowed to login, otherise he/she will be directed to signup 

---
## Requirements

For development, you will need Node.js and mongodb installed in your environement.

---
## Install

    $ git clone https://github.com/Kanika1309/privatewallet
    $ cd privatewallet

---
## Running the project
Please download all the node modules mentioned in package.json file to successfully run the application :- 
```
$ npm install <node_module> 
```    
once all the modules are succcessfully downloaded, run your project with 
```
$ nodemon app.js
```
Note :- Make sure that mongo is up and running by running **$ mongod**

application should be up at http://localhost:9000/
