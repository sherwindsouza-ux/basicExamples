require('dotenv').config();
const https = require('https');
const fetch = require('node-fetch');
const { execSync, exec } = require('child_process');

const browseURL = process.env.BROWSEURL;
const restAPI = process.env.RESTAPI;
const maxBufferLength = 1024 * 1024*10; // 10 MB
const httpsAgent = new https.Agent({
  rejectUnauthorized: false,
});

function getKeys(commits) {
    const set = new Set();
    const regex = /\b[A-Z0-9]+-\d+\b/;
    commits.forEach(function(commit) {
     const match = regex.exec(commit);
     if (match) 
       set.add(match[0]);
    });
    return [...set];
}
 
function makeRequest(url, token) {
    return fetch(url, {
      method: 'GET',
      headers: {
        'Authorization': 'Bearer ' + token,
        'Accept': 'application/json'
      },
      agent: httpsAgent,
    }).then(response => response.json())
      .catch(error => console.log(error));
}

function getJiraIssues(commits, searchRef, jiraToken) {
    var data = [];
    const keys = getKeys(commits);
    const promises = keys.map((key) => {
      return makeRequest(restAPI + key, jiraToken);
    });
    return Promise.all(promises);
}
  
function runCommand(command, dir) {
  return new Promise((resolve, reject) => {
    console.log(command);    
    exec(command, { cwd: dir }, (error, stdout, stderr) => {
      if (error) {
        //console.log(error);
        resolve("");
      } else {
        resolve(stdout.trim());
      }
    });
  });
}

function getGitCommits(commitRef, gitRepoDirs) {
  const ref = commitRef.trim();  
  const command_log_id = `git log ${ref} --max-count=1 --oneline --format="%h|%s|%an|%ad`;
  const command_log_text = `git log --grep="${ref}" --max-count=10 --oneline --format="%h|%s|%an|%ad`;
  const commands = [command_log_id, command_log_text];

  let results = [];
  commands.forEach( function(cmd) {    
      gitRepoDirs.forEach(function(gitRepoDir) {
        try {
          results.push(runCommand(cmd, gitRepoDir));
        } catch (error) {
          console.log(error);
        }  
      });      
  });
  return results;
}


function getTrimmedIssues(requests) {
    const issues = Array.isArray(requests) ? [...requests] : [requests];
    let results = [];
    for (var issue of issues) {
       const trimmedIssue = {
           "url" : browseURL + issue['key'],
           "self" : issue['self'],
           "description": issue.fields.issuetype.description
       }
       results.push(trimmedIssue);
    }
    return results;
}

function getJson(commits, issues) {
     const queryResult = {
         "gitTitle" : [...commits],
         "issues" : [...getTrimmedIssues(issues)]
     }
     return JSON.stringify(queryResult);
}

module.exports = { getJiraIssues, getGitCommits, getJson };