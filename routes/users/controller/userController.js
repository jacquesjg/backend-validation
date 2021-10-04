const User = require('../model/User')

const checkForNumberAndSymbol = (target) => {
    if (target.match(/[!`\-=@#$%^&*()\[\],.?":;{}|<>1234567890]/g)) {
        return true;
    } else {
        return false;
    }
}

function checkPasswordStrength(target) {
    
}

async function createUser(req, res) {
    const { firstName, lastName, username, email, password } = req.body;

    // How would you validate firstName to make sure only alphabet is allowed?
    let errObj = {};

    if (checkForNumberAndSymbol(firstName)) {
        errObj.firstName = "First Name cannot have special characters or numbers"
    }

    if (checkForNumberAndSymbol(lastName)) {
        errObj.lastName = "First Name cannot have special characters or numbers"
    }

    if (Object.keys(errObj).length > 0) {
        return res
            .status(500)
            .json({
                message: "error",
                error: errObj,
            })
    }

    try {
        const createdUser = new User({
            firstName,
            lastName,
            username,
            email,
            password,
        });

        let savedUser = await createdUser.save()
        res.json({ message: "success", payload: savedUser })

    } catch (error) {
        res.status(500).json({ message: "error", error: error.message })
    }
}

module.exports = {
    createUser,
};