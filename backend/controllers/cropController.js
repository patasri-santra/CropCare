const CropIssue = require("../models/CropIssue");

exports.reportIssue = async (req, res) => {

try {

const { cropName, problem } = req.body;

let solution = "";

if(problem === "Yellow Leaves")
solution = "Possible nitrogen deficiency. Add urea fertilizer.";

else if(problem === "Dry Leaves")
solution = "Water stress detected. Increase irrigation.";

else if(problem === "Spots on Leaves")
solution = "Possible fungal infection. Use fungicide spray.";

else
solution = "Consult agriculture officer.";

const issue = await CropIssue.create({
userId: req.user.id,
cropName,
problem,
solution
});

res.json(issue);

}

catch(error){

res.status(500).json({
message: "Server error"
});

}

};

exports.getMyIssues = async (req, res) => {

try {

const issues = await CropIssue.find({
userId: req.user.id
}).sort({ createdAt: -1 });

res.json(issues);

}

catch(error){

res.status(500).json({
message: "Server error"
});

}

};