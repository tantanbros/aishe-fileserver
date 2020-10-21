let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let RecordSchema = new Schema({
  dataType: {
    type: Schema.Types.String,
    required: true,
  },
  sensorType: {
    type: Schema.Types.String,
    required: true,
  },
  extension: {
    type: Schema.Types.String,
    required: true,
  },
  originalName: {
    type: Schema.Types.String,
    required: true,
  },
  filename: {
    type: Schema.Types.String,
    required: true,
  },
  destination: {
    type: Schema.Types.String,
    required: true,
  },
  path: {
    type: Schema.Types.String,
    required: true,
  }
});

module.exports = mongoose.model("Record", RecordSchema);
