const app = require('express')();
const cors = require('cors');
const bodyParser = require('body-parser');
const config = require('./config');

const routes = require('./app/routes/index');

app.use(bodyParser.json());
app.use(cors());
app.use((req, res, next) => {
  // Website you wish to allow to connect
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Request methods you wish to allow
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');

  // Request headers you wish to allow
  res.setHeader('Access-Control-Allow-Headers', 'X-Requested-With,content-type');

  // Set to true if you need the website to include cookies in the requests sent
  // to the API (e.g. in case you use sessions)
  res.setHeader('Access-Control-Allow-Credentials', true);

  // Pass to next layer of middleware
  next();
});

// const db
app.use('/', routes);

app.listen(config.port, () => {
  console.log(`Server is listening at ${config.port}`);
});
