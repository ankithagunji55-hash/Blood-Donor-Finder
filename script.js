
let donors = JSON.parse(localStorage.getItem("donors")) || [];

const form = document.getElementById("donorForm");

form.addEventListener("submit", function(event) {
    event.preventDefault();

    const donor = {
        id: Date.now(),
        name: document.getElementById("name").value.trim(),
        phone: document.getElementById("phone").value.trim(),
        blood: document.getElementById("blood").value,
        city: document.getElementById("city").value.trim()
    };

    if (!donor.name || !donor.phone || !donor.blood || !donor.city) {
        alert("Please fill all fields");
        return;
    }

    donors.push(donor);
    saveDonors();

    document.getElementById("message").textContent =
        "Donor Registered Successfully!";

    form.reset();
    searchDonors();
});

function saveDonors() {
    localStorage.setItem("donors", JSON.stringify(donors));
}

function searchDonors() {
    const blood = document.getElementById("searchBlood").value;
    const city = document.getElementById("searchCity").value
        .trim().toLowerCase();

    const results = donors.filter(donor =>
        (!blood || donor.blood === blood) &&
        (!city || donor.city.toLowerCase().includes(city))
    );

    const list = document.getElementById("donorList");
    list.innerHTML = "";

    if (results.length === 0) {
        list.textContent = "No donors found.";
        return;
    }

    results.forEach(donor => {
        const card = document.createElement("div");
        card.className = "donor-card";

        const name = document.createElement("h3");
        name.textContent = donor.name;

        const details = document.createElement("p");
        details.textContent =
            "Blood Group: " + donor.blood + " | City: " + donor.city;

        const phone = document.createElement("p");
        phone.textContent = "Phone: " + donor.phone;

        const call = document.createElement("a");
        call.href = "tel:" + donor.phone;
        call.textContent = "Call Donor";

        const remove = document.createElement("button");
        remove.textContent = "Delete";
        remove.onclick = function() {
            deleteDonor(donor.id);
        };

        card.append(name, details, phone, call, remove);
        list.appendChild(card);
    });
}

function deleteDonor(id) {
    if (confirm("Delete this donor?")) {
        donors = donors.filter(donor => donor.id !== id);
        saveDonors();
        searchDonors();
    }
}

document.getElementById("searchBlood")
    .addEventListener("change", searchDonors);

document.getElementById("searchCity")
    .addEventListener("input", searchDonors);

searchDonors();




5. Git Bash commands – వరుసగా
Lab computer లో Git Bash open చేసి ఒక్కొక్క command run చేయి.

  cd ~/Desktop

git clone https://github.com/ankithagunji55-hash/Blood-Donor-Finder.git

cd Blood-Donor-Finder

code .

  VS Code లో పైన ఇచ్చిన మూడు files create చేసి, respective code paste చేసి Save చేయాలి.
తర్వాత Git Bash లో:

git add .

  
  git commit -m "Complete Blood Donor Finder"

git push origin main
