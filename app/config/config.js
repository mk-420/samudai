module.exports = {
  NODE_ENV: "development",
  PORT: process.env.PORT || 8080,

  // database
  db: {
    

    DB_HOST: "satao.db.elephantsql.com",
    DB_USER: "hfmrviqy",
    DB_PASS: "P0pjZhxENfqIHY6l5IlCcnv5XxnQPDRL",
    DB_NAME: "hfmrviqy",
    dialect: "postgres",
    

    // Sequelize connection pool configuration
    pool: {
      max: 5,
      min: 0,
      acquire: 30000,
      idle: 10000
    }
  },

// auth key
  auth: {
    secret: "top-secret-key"
  }
};
