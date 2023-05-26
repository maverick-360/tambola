const { connect } = require("mongoose");

const Connection = async (uri) => {
  try {
    connect(uri, {
      useUnifiedTopology: true,
      useNewUrlParser: true,
    });
    console.log("Database connection established.");
  } catch (error) {
    console.log(`Error: ${error.message}`);
  }
};

module.exports = Connection;
