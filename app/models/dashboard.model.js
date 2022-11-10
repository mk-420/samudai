module.exports = (sequelize, Sequelize, DataTypes) => {
  const Dashboard = sequelize.define(
    "dashboard", // Model name
    {
      // Attributes
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      },
      name: {
        type: DataTypes.STRING,
        
      },
      comment: {
        type: DataTypes.STRING
      },
      
    },
    {
      // Options
      timestamps: true,
      underscrored: true,
      createdAt: "created_at",
      updatedAt: "updated_at"
    }
  );

  return Dashboard;
};
