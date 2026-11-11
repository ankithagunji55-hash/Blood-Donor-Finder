const express = require("express");
const cors = require("cors");
const fs = require("fs");
const path = require("path");

const app = express();
app.use(cors());
app.use(express.json());

const file = path.join(__dirname, "donors.json");

function getDonors() {
  if (!fs.existsSync(file)) {
    fs.writeFileSync(file, "[]");
  }
  return JSON.parse(fs.readFileSync(file, "utf8"));
}

function saveDonors(donors) {
  fs.writeFileSync(file, JSON.stringify(donors, null, 2));
}

app.get("/", (req, res) => {
  res.send("Blood Donor Finder API is Running");
});

app.get("/donors", (req, res) => {
  let donors = getDonors();
  const { bloodGroup, location } = req.query;

  if (bloodGroup) {
    donors = donors.filter(d => d.bloodGroup === bloodGroup);
  }

  if (location) {
    donors = donors.filter(d =>
      d.location.toLowerCase().includes(location.toLowerCase())
    );
  }

  res.json(donors);
});

app.post("/register", (req, res) => {
  const { name, age, bloodGroup, location, phone } = req.body;

  if (!name || !age || !bloodGroup || !location || !phone) {
    return res.status(400).json({ message: "Please fill all fields" });
  }

  if (!/^[0-9]{10}$/.test(phone)) {
    return res.status(400).json({ message: "Enter valid 10 digit phone number" });
  }

  const donors = getDonors();

  const donor = {
    id: Date.now().toString(),
    name,
    age: Number(age),
    bloodGroup,
    location,
    phone
  };

  donors.push(donor);
  saveDonors(donors);

  res.json({ message: "Donor registered successfully!" });
});

app.get("/stats", (req, res) => {
  res.json({ totalDonors: getDonors().length });
});

app.delete("/donors/:id", (req, res) => {
  const donors = getDonors();
  const updated = donors.filter(d => d.id !== req.params.id);

  if (updated.length === donors.length) {
    return res.status(404).json({ message: "Donor not found" });
  }

  saveDonors(updated);
  res.json({ message: "Donor deleted successfully" });
});

app.listen(5000, () => {
  console.log("Backend running at http://localhost:5000");
});
