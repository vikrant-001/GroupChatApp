const express = require("express");
const {protect} = require("../middleWare/authMiddleWare");
const {accessChat,fetchChat,createGroupChat,renameGroup,addToGroup,removeFromgroup} = require("../controllers/chatController");
const router = express.Router();

router.route("/").post(protect,accessChat);
router.route("/").get(protect,fetchChat);
router.route("/group").post(protect,createGroupChat);
router.route("/rename").put(protect,renameGroup);
router.route("/groupadd").put(protect,addToGroup);
router.route("/groupremove").put(protect,removeFromgroup);


module.exports = router;
