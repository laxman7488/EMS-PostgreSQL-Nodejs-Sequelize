const util = require('util');

exports.addEmployeeValidate = function addEmployeeValidate(req, res, next) {
  req.checkBody({
    firstName: {
      notEmpty: true,
      errorMessage: 'first name should not be empty',
    },
    lastName: {
      notEmpty: true,
      errorMessage: 'Last name should not be empty',
    },
    age: {
        notEmpty: true,
        isNumeric: {
          errorMessage: 'Age must be numeric digit',
        },
        errorMessage: 'Invalid Age',
      }
  });
  req.checkParams({
    id: {
      notEmpty: true,
      isNumeric: {
        errorMessage: 'Employee id must be numeric digit',
      },
      errorMessage: 'Invalid Employe id',
    }
  });

  const errors = req.validationErrors();
  if (errors) {
    return res.status(400).json({ error: true, message: util.inspect(errors) });
  }
  return next();
};

exports.InActiveEmployee = function InActiveEmployee(req, res, next) {
    req.checkParams({
      id: {
        notEmpty: true,
        isNumeric: {
          errorMessage: 'Employee id must be numeric digit',
        },
        errorMessage: 'Invalid Employe id',
      }
    });
  
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ error: true, message: util.inspect(errors) });
    }
    return next();
  };

  exports.getEmployeeValid = function getEmployeeValid(req, res, next) {
    req.checkParams({
      id: {
        notEmpty: true,
        isNumeric: {
          errorMessage: 'Employee id must be numeric digit',
        },
        errorMessage: 'Invalid Employe id',
      }
    });
  
    const errors = req.validationErrors();
    if (errors) {
      return res.status(400).json({ error: true, message: util.inspect(errors) });
    }
    return next();
  };
  
  