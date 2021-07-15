module.exports = (sequelize, DataTypes) => {
  const Employee = sequelize.define('Employee', {
    firstName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false
    },
    age: {
      type: DataTypes.STRING,
      allowNull: false
    },
    address: {
      type: DataTypes.STRING,
      allowNull: false
    },
    status: {
      type: DataTypes.ENUM('ACTIVE', 'INACTIVE', 'QUIT'),
      allowNull: false,
      defaultValue:'INACTIVE'
    }
  }, {
    timestamps: false,
    freezeTableName: true
  });

  Employee.associate = models => {
    Employee.hasMany(models.Compensation, {
      foreignKey: 'employee_id',
      as: 'compensation',
      onDelete: 'cascade'
    });
  };

  return Employee;
};
