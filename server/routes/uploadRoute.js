const express = require("express");
const router = express.Router();
const controller = require("../controllers/file.controller");


  router.post("/upload", controller.upload);
  router.get("/files", controller.getListFiles);
  router.get("/files/:name", controller.download);

 

export default router;

