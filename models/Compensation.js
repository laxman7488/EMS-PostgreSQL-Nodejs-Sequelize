const moment = require('moment');

module.exports = (sequelize, DataTypes) => {
    const Compensation = sequelize.define('Compensation', {
      employee_id: { type: DataTypes.INTEGER },
      updated_time: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: Date.now()
      },
      salary_paid: {
        type: DataTypes.DECIMAL(10, 2),
        allowNull: false
      }
    },{
      timestamps: false,
      freezeTableName: true
    });
  

    
    Compensation.findSalaryByDuration = async (id, duration, Op) => {
      let args = await Compensation.findAll({
        where: {
          employee_id: id
        },
        attributes: [
          'employee_id',
          [sequelize.fn('sum', sequelize.col('salary_paid')), 'total_amount'],
        ],
        where: {
          updated_time: {
            [Op.gte]: moment().subtract(duration, 'Months').toDate()
          }
        },
        group: ['employee_id']
      });
      let data = args.map(el => el.get({ plain: true }))
      return data;
  
    }
  
   Compensation.associate = models => {
      Compensation.belongsTo(models.Employee, {
        foreignKey: 'employee_id',
        as: 'employee'
      });
      
    };
  
    return Compensation;
  }
