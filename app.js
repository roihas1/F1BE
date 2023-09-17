const express = require('express');
var cors = require('cors')
const app = express();
var router = express.Router();
const bodyParser = require('body-parser');

const corsConfig = {
    origin: true,
    credentials: true
  };
  
app.use(cors(corsConfig));
app.options("*", cors(corsConfig));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

const drivers = require('./routes/drivers');
const circuits = require('./routes/circuits');

app.use("/drivers", drivers);
app.use("/circuits", circuits);

app.use(function (err, req, res, next) {
    console.error(err);
    res.status(err.status || 500).send({ message: err.message, success: false });
  });





const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
