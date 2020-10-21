const mongoose = require("mongoose");
const express = require('express');
const router = express.Router();
const fs = require("fs");
const path = require("path");
const multer  = require('multer')
const upload = multer({ dest: process.env.RAW_DATA_DIRECTORY });
const Record = require("../models/Record");

/** GET all records */
router.get('/', async function(req, res) {
  try {
    const records = await Record.find();
    console.log({records});
    res.status(200).json(records);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "There was a problem in the database", error});
  }
});

/** GET record by id */
router.get("/:recordId", async function(req, res) {
  const {recordId} = req.params;
  if(!recordId || !mongoose.Types.ObjectId.isValid(recordId)) {
    return res.status(200).json(null);
  }

  try {
    const record = await Record.find({_id: recordId});
    console.log({record});
    res.status(200).json(record);
  } catch (error) {
    console.error(error);
    res.status(500).json({message: "There was a problem in the database", error});
  }
});

/** POST record with file */
router.post('/upload', upload.single("file"), async function(req, res) {
  const body = {
    ...req.body, file: req.file
  };
  const {dataType, sensorType, extension, file} = body;
  const {filename, destination, path, originalname: originalName} = file;

  // validate required fields
  const requiredFields = ["dataType", "sensorType", "extension", "file"];
  for(let field of requiredFields) {
    console.log({field, value: body[field]});
    if(!body[field]) {
      const message = `Missing field: ${field} in the body`;
      console.error(message);
      return res.status(400).json({message});
    }
  }

  // valid yung request
  // save to DB na
  const record = new Record({
    dataType, 
    sensorType,
    extension,
    originalName,
    filename, 
    destination, 
    path
  });
  console.log("Saving Record to database", {record});

  try {
    const doc = await record.save();
    console.log({doc});
    res.status(201).json({message: "Record created"});
  } catch (dberr) {
    console.error(dberr);
  }

  res.json(req.body);
});





module.exports = router;
