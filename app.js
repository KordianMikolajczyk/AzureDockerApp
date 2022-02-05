const config = require('./config');

const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Witam w aplikacji zaliczajacej Kordiana Mikolajczyka. Repozytorium dostepne jest pod wskazanym adresem: https://github.com/KordianMikolajczyk/AzureDockerApp.git');
});

app.listen(config.port, () => {
  console.log(`Port serwera to: ${config.port}`);
});
