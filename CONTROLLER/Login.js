const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../MODEL/Usermodelschema");
const Usermodel = require("../MODEL/Usermodelschema");

const Userlogin = async (req, res) => {
  const { Email, Password } = req.body;
  const userdetails = await Usermodel.findOne({ Email });

  if (userdetails && (await bcrypt.compare(Password, userdetails.Password))) {
    res.json({
      messege: "Login Successfully",
      token: userdetails._id,
      user: userdetails,
    });
  } else {
    // res.json("Incorrect Email or Password")

    res.json({
      Id: userdetails._id,
      Email: userdetails.Email,
      Password: userdetails.Password,
      Token: tokengenerate(userdetails._id),
    });
  }
};

const tokengenerate = (id) => {
  return (
    jwt.sign({ id }),
    process.env.JWT_SECRET,
    {
      expiresIn: "100d",
    }
  );
};

module.exports = Userlogin;
