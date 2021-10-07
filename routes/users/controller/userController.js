const bcrypt = require("bcryptjs");

const {
    isEmpty,
    isAlpha,
    isAlphanumeric,
    isEmail,
    isStrongPassword,
} = require("validator");

const User = require('../model/User')

async function createUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body;
    let body = req.body;
    let errObj = {};

    // console.log(errObj);

    // for (let key in body) {
    //     if (isEmpty(body[key])) {
    //         errObj[`${key}`] = `${key} cannot be empty`;
    //     }
    // }

    if (!isAlpha(firstName)) {
        errObj.firstName = "First Name cannot have special characters or numbers";
    }


    if (!isAlpha(lastName)) {
        errObj.lastName = "Last Name cannot have special characters or numbers";
    }


    if (!isAlphanumeric(username)) {
        errObj.username = "Username cannot have special characters";
    }


    if (!isEmail(email)) {
        errObj.email = "please enter a valid email";
    }


    if (!isStrongPassword(password)) {
        errObj.password =
            "Your password must contain 1 lowercase, 1 uppercase, 1 number, 1 special character and at least 8 characters long";
    }

    // if (Object.keys(errObj).length > 0) {
    //     return res.status(500).json({
    //         message: "error",
    //         error: errObj,
    //     });
    // }

    try {

        let salt = await bcrypt.genSalt(10);
        let hashedPassword = await bcrypt.hash(password, salt);

        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password: hashedPassword,
        });

        let savedUser = await createdUser.save()
        res.json({ message: "success", payload: savedUser })

    } catch (error) {
        res.status(500).json({ message: "error", error: error.message })
    }
}

async function login(req, res, next) {

    const { username, password } = req.body;

    User.findOne({ username: username }, function (err, user) {
        if (err) {
            res.json(err)
        }
        if (user) {
            bcrypt.compare(password, user.password, function (err, result) {
                if (err) throw err;
                if (result) {
                    res.json({ message: "success" })
                } else {
                    res.json({ message: "invalid login credentials" })
                }
            })
        }
    })

}

module.exports = {
    createUser, login
};