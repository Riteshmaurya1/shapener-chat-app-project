const bcrypt = require("bcrypt");
const User = require("../Model/user");
const { generateJwtToken } = require("../auth/jwt");

// ****************Sign Up Logic ****************//
const signup = async (req, res) => {
  try {
    //Step1: Extract Data from body.
    const { username, email, phoneNumber, password } = req.body;

    //Step2: Check all feilds.
    if (!username || !email || !phoneNumber || !password) {
      return res.status(401).json({
        message: "Invalid credentails.",
        success: false,
      });
    }

    //Step3: Check user is in DB or not
    const checkExistingUser = await User.findOne({
      where: { email },
    });
    if (checkExistingUser) {
      return res.status(409).json({
        message: "User is already registered!.",
        success: false,
      });
    }
    //Step4: Make password will be Hash
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    //Step5: If not create user on DB
    const user = await User.create({
      username,
      email,
      phoneNumber,
      password: hashedPassword,
    });

    //Step6: generate JWT Token.
    const userPayload = {
      id: user.id,
      username: user.username,
    };
    const token = generateJwtToken(userPayload);

    //Step7: return response
    return res.status(201).json({
      message: "Created successfully",
      user,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      success: false,
    });
  }
};

//*******************Sign In Logic *****************//
const signin = async (req, res) => {
  try {
    // step1: req data from body
    const { email, password } = req.body;

    // step2: check user is registered or not
    const user = await User.findOne({
      where: { email },
      attributes: ["id", "username", "email", "password"],
    });

    if (!user) {
      return res.status(404).json({
        message: "Invalid email or password",
        success: false,
      });
    }

    // step3: compare hashed Password.
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //Step4: generate JWT Token.
    const userPayload = {
      id: user.id,
      username: user.username,
    };
    const token = generateJwtToken(userPayload);

    // Step5: return response.
    return res.status(201).json({
      email,
      token,
    });
  } catch (err) {
    return res.status(500).json({
      error: err.message,
      success: false,
    });
  }
};

//*******************Get All Users *****************//
const getUsers = async (req, res) => {
  try {
    // step1: get user email from body.
    const { email } = req.body;
    if (!email) {
      return res.status(400).json({
        message: "Invalid email",
        success: false,
      });
    }

    // step2: check into the db
    const verifiedEmail = await User.findOne({
      where: { email },
      attributes: ["email"],
    });
    if (!verifiedEmail) {
      return res.status(404).json({
        message: "Not found",
        success: false,
      });
    }

    // step3: return verifiedEmail email
    return res.status(200).json({
      verifiedEmail,
      success: true,
    });
  } catch (er) {
    return res.status(500).json({
      error: err.message,
    });
  }
};

module.exports = {
  signup,
  signin,
  getUsers,
};
