import React, { useEffect, useState } from "react";

const API = "http://localhost:5000";

function App() {
  const [form, setForm] = useState({
    name: "",
    age: "",
    bloodGroup: "O+",
    location: "",
    phone: ""
  });

  const [donors, setDonors] = useState([]);
  const [bloodGroup, setBloodGroup] = useState("");
  const [location, setLocation] = useState("");
  const [total, setTotal] = useState(0);
  const [message, setMessage] = useState("");

  async function loadDonors() {
    try {
      const response = await fetch(`${API}/donors`);
      if (!response.ok) throw new Error("Unable to load donors");
      const data = await response.json();
      setDonors(data);
      setTotal(data.length);
    } catch (error) {
      setMessage("Backend is not running. Please start the server.");
    }
  }

  useEffect(() => {
    loadDonors();
  }, []);

  function handleChange(e) {
    setForm({ ...form, [e.target.name]: e.target.value });
  }

  async function registerDonor(e) {
    e.preventDefault();

    try {
      const response = await fetch(`${API}/register`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form)
      });

      const data = await response.json();

      if (!response.ok) {
        setMessage(data.message);
        return;
      }

      setMessage(data.message);
      setForm({
        name: "",
        age: "",
        bloodGroup: "O+",
        location: "",
        phone: ""
      });

      loadDonors();
    } catch {
      setMessage("Backend connection failed!");
    }
  }

  async function searchDonors() {
    try {
      const params = new URLSearchParams();

      if (bloodGroup) params.append("bloodGroup", bloodGroup);
      if (location) params.append("location", location);

      const response = await fetch(`${API}/donors?${params.toString()}`);
      if (!response.ok) throw new Error();

      const data = await response.json();
      setDonors(data);
      setMessage(`${data.length} donor(s) found`);
    } catch {
      setMessage("Search failed. Check backend.");
    }
  }

  async function deleteDonor(id) {
    if (!window.confirm("Are you sure you want to delete this donor?")) return;

    try {
      const response = await fetch(`${API}/donors/${id}`, {
        method: "DELETE"
      });

      const data = await response.json();
      setMessage(data.message);
      loadDonors();
    } catch {
      setMessage("Delete failed!");
    }
  }

  return (
    <div className="app">
      <header>
        <h1>🩸 Blood Donor Finder</h1>
        <p>Donate Blood, Save Lives</p>
      </header>

      <div className="stats">
        <h2>Total Registered Donors: {total}</h2>
      </div>

      <section className="card">
        <h2>Register as a Donor</h2>

        <form onSubmit={registerDonor}>
          <input
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />

          <input
            name="age"
            type="number"
            placeholder="Age"
            min="18"
            value={form.age}
            onChange={handleChange}
            required
          />

          <select
            name="bloodGroup"
            value={form.bloodGroup}
            onChange={handleChange}
          >
            {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(group => (
              <option key={group}>{group}</option>
            ))}
          </select>

          <input
            name="location"
            placeholder="City / Location"
            value={form.location}
            onChange={handleChange}
            required
          />

          <input
            name="phone"
            placeholder="10 Digit Phone Number"
            maxLength="10"
            value={form.phone}
            onChange={handleChange}
            required
          />

          <button type="submit">Register Donor</button>
        </form>
      </section>

      <section className="card">
        <h2>Search Blood Donors</h2>

        <select
          value={bloodGroup}
          onChange={e => setBloodGroup(e.target.value)}
        >
          <option value="">All Blood Groups</option>
          {["A+", "A-", "B+", "B-", "O+", "O-", "AB+", "AB-"].map(group => (
            <option key={group}>{group}</option>
          ))}
        </select>

        <input
          placeholder="Enter Location"
          value={location}
          onChange={e => setLocation(e.target.value)}
        />

        <button onClick={searchDonors}>Search Donors</button>
        <button onClick={() => {
          setBloodGroup("");
          setLocation("");
          loadDonors();
          setMessage("Showing all donors");
        }}>
          View All Donors
        </button>
      </section>

      {message && <p className="message">{message}</p>}

      <section className="donor-section">
        <h2>Available Donors</h2>

        {donors.length === 0 ? (
          <p>No donors found.</p>
        ) : (
          <div className="donor-list">
            {donors.map(donor => (
              <div className="donor-card" key={donor.id}>
                <h3>{donor.name}</h3>
                <p>Age: {donor.age}</p>
                <p>Blood Group: <b>{donor.bloodGroup}</b></p>
                <p>Location: {donor.location}</p>
                <p>Phone: {donor.phone}</p>

                <a href={`tel:${donor.phone}`}>
                  <button>Call Donor</button>
                </a>

                <button
                  className="delete"
                  onClick={() => deleteDonor(donor.id)}
                >
                  Delete
                </button>
              </div>
            ))}
          </div>
        )}
      </section>

      <footer>
        <p>Blood Donor Finder | Every Drop Counts ❤️</p>
      </footer>
    </div>
  );
}

export default App;
