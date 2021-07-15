const express = require('express');
const router = express.Router();

const employee = require('./employee');

router.get('/', (req, res) => res.status(200).send({
  error: false,
  message: 'Welcome to EMS Services',
}));

router.use('/employee', employee);
module.exports = router;
