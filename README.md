ExpressRest
===========

Experimenting with using Node.js and Express to create a rest API.


To get started:

1. npm install
2. node server/app.js
3. Open http://localhost:3000/addresses in your browser


To get heroku setup:

1. install the Heroku Toolbelt
2. Note that the Procfile has the line that tells Heroku how to run the app:

  web: node server/app.js

3. Run the following at the command line in the project directory:

  heroku login
  heroku create
  heroku addons:add mongolab:sandbox

4. Anytime you'd like to push your latest change to Heroku run:

  git push heroku master

5. To scale the app up to one web dyno (so Heroku will run it):

  heroku ps:scale web=1

6. A nice shortcut for opening the correct heroku url in your browser is:

  heroku open


To add a user to MongoDB to use for the app:

1. Log into https://dashboard.heroku.com/apps
2. Click the app you just created.
3. Click MongoLab Sandbox.
4. Click the users tab
5. Add a user with read and write access with credentials you don't mind putting in the code.
