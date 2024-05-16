const express = require('express')
const Userlogin = require('../CONTROLLER/Login')
const { createuser, getuser, getsingle, deleteuser, updateuser } = require('../CONTROLLER/ExpenseCrud')
const signup = require('../CONTROLLER/SignUp')
const { getlist, getsinglelist, deletelist, updatelist, createlist } = require('../CONTROLLER/ExpCrud1')
const protect = require('../MIDDLEWARE/Token')
const { Createcat, getcat, get_Labels, get_graph } = require('../CONTROLLER/CategoryCrud')


const router = express.Router()

router.route('/loginn').post(Userlogin)
router.route('/signup').post(signup)
router.route('/createuser').post(createuser)
router.route('/getuser').get(getuser);
router.route('/getsingle/:demo').get(getsingle);
router.route('/deleteuser/:id').delete(deleteuser);
router.route('/updateuser/:id').put(updateuser);


router.route('/createlist').post(createlist);
router.route('/getlist').get(getlist);
router.route('/getsinglelist/:demo').get(getsinglelist);
router.route('/deleteitem/:id').delete(deletelist);
router.route('/updateitem/:id').put(updatelist);


router.route('/createcat').post(Createcat);
router.route('/getcat').get(getcat);

router.route('/labels/:userId').get(get_Labels);
router.route('/graph').get(get_graph);







module.exports=router
