const { Employee, Compensation } = require('../models');
const { Op } = Sequelize = require('sequelize');
const moment = require('moment')

exports.addEmployee = async function addEmployee(req, res) {
  
  try {
    const data = req.body;
    data.id=req.params.id;
    let options = {
      returning: true,
      include: [{
        model: Compensation,
        as: 'compensation'
      }],
    };

    if (!data.compensation) {
      options = {};
    }else{
      data.compensation[0].employee_id=req.params.id;
    }
    //  Removed create employee with include Model.Compensation as during Update Employee scenerio it was increasing 3 transctions to findOne Id => Update Employee => Insert Compensation
    //         return Employee.create(data, options)
    //         .then(result => res.status(200).json({ error: false, data: result }))
    //         .catch(err => { res.status(500).json({ error: true, message: err.message }) });

    Employee.upsert(data)
            .then(async([result, returns]) => {
              let employeeResult=result.get({ plain: true });
              if (data.compensation) {
                  let compense=await Compensation.create(data.compensation[0]);
                  compense=compense.get({ plain: true });
                  delete compense['id'];
                  employeeResult.compensation=compense;
                  res.status(200).json({ error: false, data: employeeResult });
              }else{
                res.status(200).json({ error: false, data: employeeResult });
              }
            })
            .catch(err => { res.status(500).json({ error: true, message: err.message }) });
    
  } catch (err) {
    console.log(err)
    return res.status(500).json({ error: true, message: err.message });
  }
};

exports.getEmployeInfo = async function getEmployeInfo(req, res) {
  const previousMonths = req.query.previousMonths ? parseInt(req.query.previousMonths) : 1;
  Employee.findOne(
    {
      returning: true,
      where: {
        id: req.params.id,

      },
      include: [{
        model: Compensation,
        as: 'compensation',
        attributes: [['salary_paid', 'Amount'], [Sequelize.literal('to_char("updated_time", \'FMMonth\')'), 'Month']],
       
        where: {
          updated_time: {
            [Op.gte]: moment().subtract(previousMonths, 'Months').toDate()
          }
        },

        
      }
    ],
    order: [['compensation','updated_time', 'asc']]
    },
  ).then((employee) => {
    if (!employee) {
      return res.status(404).send({
        message: 'Employe Not Found',
      });
    }
    return employee

  }).then(async (result) => {
    let value = await Compensation.findSalaryByDuration(result.id, previousMonths, Op)

    value = value[0].total_amount;

    res.status(200).json({ error: false, data: result, total: value })
  })
    .catch(err => { console.log(err); res.status(500).json({ error: true, message: err.message }) });



};

exports.updateEmployee = function updateEmployee(req, res) {
  const data = req.body;
  Employee.update(
    data,
    { returning: true, where: { id: req.params.id } },
  ).then(([rowsUpdate, [updatedEmployee]]) => {
    if (!rowsUpdate) {
      return res.status(404).send({
        message: 'Employee Not Found',
      });
    }
    return updatedEmployee;
  }).then(result => res.status(200).json({ error: false, message: "Successfully updated.", data: result }))
    .catch(err => res.status(500).json({ error: true, message: err.message }));
};



exports.InActiveEmployee = function InActiveEmployee(req, res) {
  Employee.update(
    { "status": "INACTIVE" },
    { returning: true, where: { id: req.params.id } },
  ).then(([rowsUpdate, [updatedEmployee]]) => {
    if (!rowsUpdate) {
      return res.status(404).send({
        message: 'Employee Not Found',
      });
    }
    return updatedEmployee;
  }).then(result => res.status(200).json({ error: false, message: "Successfully InActive.", data: result }))
    .catch(err => res.status(500).json({ error: true, message: err.message }));
};
