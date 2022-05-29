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
