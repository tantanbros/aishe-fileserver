let mongoose = require("mongoose");

class Database {
  constructor() {
    this._connect();
  }

  // If db has username and password, use this connection string
  // connectionString = `mongodb://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`
  connectionString = `mongodb://${process.env.DB_HOST}:${process.env.DB_PORT}/${process.env.DB_NAME}`;

  _connect() {
    console.log(this.connectionString
    );
    mongoose
      .connect(this.connectionString,
        {
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useCreateIndex: true,
        }
      )
      .then(() => {
        console.log("Database connection successful");
      })
      .catch(err => {
        console.error("Database connection error");
        console.error(err);
      });
  }
}

module.exports = new Database();
