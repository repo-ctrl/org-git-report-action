const core = require('@actions/core');
const github = require('@actions/github');
const axios = require('axios');
let converter = require('json-2-csv');
const fs = require('fs')


//INPUTS
const githubToken = core.getInput('token');
const githubOrg = core.getInput('githuborg');
//END INPUTS


var data ='';
var config = {
    method: 'get',
    url: 'https://api.github.com/orgs/'+githubOrg+'/audit-log?include=git',
    headers: { 
        'Accept': 'application/vnd.github.v3+json', 
        'Authorization': 'token '+githubToken, 
    },
    date: data
};
axios(config)
.then(function (response) {
    console.log("Test");
    let json2csvCallback = function (err, csv) {
        if (err) throw err;
        console.log(csv);
        fs.writeFile('git-events-report.csv', csv, (err) => {
      
            // In case of a error throw err.
            if (err) throw err;
        })
    };
    
    converter.json2csv(response.data, json2csvCallback);
})
.catch(function (error) {
    console.log(error);
    core.setOutput("result",false);
    core.setFailed("Error updating your worklog");
});