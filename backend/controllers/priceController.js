exports.getPrices = async (req, res) => {

const prices = [

{ crop: "Wheat", price: "₹2200 / quintal" },
{ crop: "Rice", price: "₹3000 / quintal" },
{ crop: "Maize", price: "₹1800 / quintal" },
{ crop: "Cotton", price: "₹6000 / quintal" }

];

res.json(prices);

};