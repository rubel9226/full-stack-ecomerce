const express = require('express');
const router = express.Router();

const { getUsers, getUserById, deleteUserById, processRegister, activateUserAccount } = require('../controllers/user.controller');
const upload = require('../middlewares/upload');


// get api/users
router.post('/process-register', upload.single('image'), processRegister);
router.post('/verify', activateUserAccount);
router.get('/', getUsers);
router.get('/:id', getUserById);
router.delete('/:id', deleteUserById);

module.exports = router;