const menu = document.getElementById('menu');
menu.addEventListener('click', e => {
    if (e.target.tagName == "A") {
        const pageId = e.target.dataset.page;
        view(pageId);
    }
});

function view(id) {
    const page = document.getElementById(id);
    const allPages = document.getElementsByClassName("page");
    for (let i = 0; i < allPages.length; i++)
        allPages[i].style.display = 'none';

    page.style.display = 'block';
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
        Object.keys(row).forEach(key => {
            let td = document.createElement("td");
            let value = row[key];
            if(value instanceof Object){
                td.innerText = value.map(phoneRow => phoneRow['number']).join(", ");
            } else{
                td.innerText= value;
            }
            tr.appendChild(td);
            
        });
        tbody.appendChild(tr);
    });
}



