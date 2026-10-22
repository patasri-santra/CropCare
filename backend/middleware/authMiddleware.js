const jwt = require("jsonwebtoken");
const response = require("./responseMiddleware");

module.exports = function(req, res, next){

const token = req.header("Authorization");

if(!token)
//return res.status(401).json({ message: "No token" });
return response.responseHandler(401, "No token");

try{

const decoded = jwt.verify(token, process.env.JWT_SECRET);

req.user = decoded;

next();

}

catch(error){

//res.status(401).json({ message: "Invalid token" });
return response.responseHandler(401, "Invalid token");

}

};