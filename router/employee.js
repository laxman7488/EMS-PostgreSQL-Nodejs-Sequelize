const express = require('express');

const router = express.Router();
const employeeController = require('./../controller/employee');
const employeeService = require('./../services/employee');

/**
 * Add Employee Details and Compensation
 */
router.post(
  '/:id',
  employeeService.addEmployeeValidate,
  employeeController.addEmployee,
);
/**
 * Update Employee Details
 */
router.put(
  '/:id',
  employeeService.addEmployeeValidate,
  employeeController.updateEmployee,
);

/**
 *Get Employee Details
 */
router.get(
  '/:id',
  employeeService.getEmployeeValid,
  employeeController.getEmployeInfo,
);

/**
 *  Change Employee Status
 */
router.patch(
  '/inactive/:id',
  employeeService.InActiveEmployee,
  employeeController.InActiveEmployee,
);


module.exports = router;

