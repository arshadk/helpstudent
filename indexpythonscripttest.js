const { exec } = require('child_process');

const pythonScriptPath = 'rake.py';

exec(`python ${pythonScriptPath}`, (error, stdout, stderr) => {
  if (error) {
    console.error(`Error executing Python script: ${error}`);
    return;
  }

  console.log(`Python script output:\n${stdout}`);
  console.error(`Python script errors:\n${stderr}`);
});