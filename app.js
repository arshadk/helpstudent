const express = require('express');
const { exec } = require('child_process');
const path = require('path');
 
// Creating express object
const app = express();
console.log(path.join(__dirname,"public"));
app.use(express.static(path.join(__dirname,"public")));

app.use((req, res, next) => {
    res.setHeader('X-Content-Type-Options', 'nosniff');
    next();
  });
 
// Handling GET request
app.get('/testpythonconnect', (req, res) => { 
    const pythonScriptPath = 'rake.py';

exec(`python3 ${pythonScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script: ${error}`);
    return;
  }

  console.log(`Python script output:\n${stdout}`);
  console.error(`Python script errors:\n${stderr}`);
});


    res.send('I am after running the python script '
        + 'from the server ') 
    res.end() 
}) 

app.get('/about',(req, res) => {
    
    res.sendFile(path.join(__dirname, '/index.html'))
    //res.send("<html> <head>server Response</head><body><h1> This page was render direcly from the server <p>Hello there welcome to my website</p></h1></body></html>")
  });


app.get('/runcode', (req, res) => {
    // Execute your Python script here
    console.log("I am about to call python")
    exec('python3 rake.py', (err, stdout, stderr) => {
        if (err) {
            console.error(err);
            return res.status(500).send('Error executing Python script');
        }
        console.log(stdout);
        res.send('Python script executed successfully');
    });
});
 
// Port Number
const PORT = process.env.PORT||3000 ;
 
// Server Setup
app.listen(PORT,console.log(
  `Server started on port ${PORT}`));