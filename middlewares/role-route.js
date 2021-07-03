const { getUserRoleAndEmail } = require("../helpers/databaseFuctions");

const roleRoute = async (req, res, next) => {
    const userData = req.userData;

    // console.log(req.userData);

    if(userData) {
        const user = await getUserRoleAndEmail(userData.userId, userData.email);
        if(user) {
            // next()
            // console.log(res);
            console.log(user);
            switch(user.result.role_id){
                
                case 1 || "1":
                    console.log("Case 1");
                    res.redirect("/api/emails/student/received")
                    // next()
                case 4 || "4":
                    console.log("Case 2");
                    res.redirect("/api/emails/admin/received")
                    // next()
                default:
                    next()
            }
        }
        return

    }
    res.json({ isError: true, message: "No user found." })
}

exports.roleRoute = roleRoute;