# calling-app
Demonstrate about calling feature using plivo library. This project contains client(React App) and server(Node App) in this codebase.

# How to Setup Project In Local Development Environment 
- clone this repo, open client, and server code in visual studio code
- go to server folder and install node modules using npm install command. 
- for server you need to setup env file. create a new .env file in the root. Place below mentioned keys in the .env file.

```` 
DATABASE_HOST="your db host"
DATABASE_PORT=3306
DATABASE_NAME="your database name"
DATABASE_USERNAME="your database username"
DATABASE_PASSWORD="your database password"
PORT=3001
AUTHID=plivo library authId
AUTHTOKEN=plivo library authToken

```` 
- if you don't have plivo authId and authToken, create a account and get it by following this article https://support.plivo.com/hc/en-us/articles/360041203772-How-can-I-create-a-Plivo-account-
- Server code supports mysql db. configure your database and define connection strings in env file

- After setting up environment file and node modules installation hit npm start
- Server code will start at port 3001 (if you configured App port in env file as 3001).
- Navigate to http://localhost:3001/ here you can see your Server App

- After setting up environment for server. Go to client folder and install node modules using npm install 
- In app/config.js is the configuration file for client code. If your server is running at 3001 port then no need to change here.
- Hit npm start. Project will start at 3000 port in the browser. Navigate to http://localhost:3000/ here you can see your App.
- Congratulation you have setup the environment happily. Now start making calls.

```` 
For any query ping me at send2abhishek@live.com

````


