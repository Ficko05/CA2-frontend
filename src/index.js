getPersons(populatePersonsTable);

function getPersons(callback) {

    URL = "http://localhost:8080/CA2/api/person/complete"

    fetch(URL)
        .then(res => res.json())
        .then(data => callback(data))
        //.catch()
}

function populatePersonsTable(data) {
    let tbody = document.getElementById("table1");
    tbody.innerHTML = "";
    data.forEach(row => {
        let tr = document.createElement("tr");
        let td = document.createElement("td");
        td.innerText = row.firstName;
        tr.appendChild(td);
        tbody.appendChild(tr);
    });
}




