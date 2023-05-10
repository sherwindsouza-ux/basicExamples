const express = require('express');  //Import the express dependency
require('dotenv').config();
const utils = require('./utils.js');

const app = express();              //Instantiate an express app, the main work horse of this server
const port = process.env.PORT;                  //Save the port number where your server will be listening
const gitRepoDirs = process.env.DIRECTORIES.split(",");
const jiraToken = process.env.JIRA_TOKEN;

app.get('/search/:searchRef', (req, res, next) => {
    const searchRef = req.params.searchRef;
    const commits = utils.getGitCommits(searchRef, gitRepoDirs);  
    const gitPromise = Promise.all(commits);
    gitPromise.then(gitResults => {
        const issues = utils.getJiraIssues(gitResults, searchRef, jiraToken);        
        issues.then((results) => {
            res.send(utils.getJson(gitResults, results));
        }).catch(error => {
            console.log(error);
            const err = new Error(error);
            err.status = 500;
            next(error);     
        });
    }).catch(error => {
        console.log(error);
        const err = new Error(error);
        err.status = 500;
        next(error);        
    });
});

app.get('/', (req, res) => {        
    res.sendFile('index.html', {root: __dirname});      //server responds by sending the index.html file to the client's browser
                                                        //the .sendFile method needs the absolute path to the file, see: https://expressjs.com/en/4x/api.html#res.sendFile 
});

app.get('/style.css', (req, res) => {
  res.sendFile('style.css', {root: __dirname});
});

app.listen(port, () => {            //server starts listening for any attempts from a client to connect at port: {port}
    console.log(`Now listening on port ${port}`); 
});

