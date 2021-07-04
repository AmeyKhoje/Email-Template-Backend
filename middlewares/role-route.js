const { getUserRoleAndEmail } = require("../helpers/databaseFuctions");

const roleRoute = async (req, res, next) => {

    const userData = req.userData;

    if(userData) {

        const user = await getUserRoleAndEmail(userData.userId, userData.email);

        if(user) {

            switch(user.result.role_id){ 
                
                case 1 || "1":
                    res.cookie("userId", user.result.id)
                    res.cookie("userEmail", user.result.email)
                    res.redirect("/api/emails/student/received")
                    return;

                case 4 || "4":
                    res.cookie("userId", user.result.id)
                    res.cookie("userEmail", user.result.email)
                    res.redirect("/api/emails/admin/received")
                    return

                default:
                    next();

            }

        }

        return

    }

    res.json({ isError: true, message: "No user found." })
}

exports.roleRoute = roleRoute;