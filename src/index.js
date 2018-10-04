const menu = document.getElementById('menu');
menu.addEventListener('click', e => {
    if (e.target.tagName == "A") {
        const containerId = e.target.dataset.container;
        view(containerId);
    }
});

function view(id) {
    const container = document.getElementById(id);
    const all = document.getElementsByClassName("page");
    for (let i = 0; i < all.length; i++)
        all[i].style.display = 'none';

    container.style.display = 'block';
}


getPersons(populatePersonsTable);

function getPersons(callback) {

    const URL = "http://localhost:8080/CA2/api/person/complete"

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



