# Node + EJS

This site is created using Node and added EJS templating for client side rendering. 

To run this site locally,
1) Clone this repository or download and unzip the repository.
2) Then, cd to the repository.
3) Use "npm install" to install the dependencies.
4) Once the dependencies are installed, use "nodemon app.js" if you have nodemon installed on your local computer (or) use "node app.js" to run this site.
5) Navigate to "localhost:3000" to view the site.

This site is created for viewing weather details alongside with next four days weather forecast.
If you just wanted to see the weather details,
1) Open app.js in any code editor and replace the word "forecast" with "weather" in the url const.
2) Now you are good to go and you can only view the current day weather details alone.

This site is definitely created using my weather api key in my free plan.
If you wanted to change that to any other api key,
1) Open app.js in any code editor and replace the word " + process.env.APP_ID " with "your api key" in the url const (or)
2) Install and require and config dotenv.
3) Once you are done configured. Touch a .env file and enter your APP_ID and save the file.
4) Now you can view your site with your very own api key.

Disclaimer : As this site is created using free openweathermap plan and have used forecast functionality, Some countried might have trouble viewing weather details.
If so, Feel free to change to forecast to weather functionality to view the weather alone at any country.
