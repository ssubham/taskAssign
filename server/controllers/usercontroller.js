const userdetails = require('../models/user-details');

createUser = (req, res) => {
    const body = req.body;
    if (!body) {
        return res.status(400).json({
            success: false,
            error: 'You must provide a user Details',
        })
    }

    const checkBody = {name:body.name, email: body.email};

    userdetails.find(checkBody, (err, result) => {
        
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        if (result.length>0) {
            return res
                .status(404)
                .json({ success: false, error: `User already exists` })
        } else {
            const userProfile = new userdetails(body);
            if (!userProfile) {
                return res.status(400).json({ success: false, error: err })
            }
            userProfile
                .save()
                .then(() => {
                    return res.status(201).json({
                        success: true,
                        id: userProfile._id,
                        message: 'New User created!',
                    })
                })
                .catch(error => {
                    return res.status(400).json({
                        error,
                        message: 'New User not created!',
                    })
                })
        }




    }).catch(err => console.log(err))

console.log("yyya");
    
}

getUserById = async (req, res) => {
    await userdetails.findOne({ _id: req.params.id }, (err, user) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }

        return res.status(200).json({ success: true, data: user })
    }).catch(err => console.log(err))
}

getUserDetails = async(req, res) => {
    const body = req.body;
    //console.log(Object.keys(body).length);
    if(!body){
        return res.status(200).json({ success: false, error: "User Details can not be left blank." })
    }
    //console.log('sassa');
    //await userdetails.findOne(body, "").exec();
    await userdetails.findOne(body, (err, result) => {
        if (err) {
            return res.status(400).json({ success: false, error: err })
        }
        if (result === null) {
            return res
                .status(404)
                .json({ success: false, error: `User not found` })
        }
        //console.log("results ", result)
        return res.status(200).json({ success: true, data: result })
    }).catch(err => console.log(err))
}


module.exports = {
    createUser,
    getUserDetails,
    getUserById,
}