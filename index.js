const app = require('express')();
const util = require('util');
const config = require('./config');
const connections = require('./connections');

const { db } = connections;
const query = util.promisify(db.query).bind(db);
app.get('/', async (req, res) => {
  const sql = 'show databases;';

  try {
    const data = await query(sql);
    console.log(data);
    res.send(data);
  } catch (error) {
    console.error(error);
  }
});

app.listen(config.port, () => {
  console.log(`Server is listening at ${config.port}`);
});
