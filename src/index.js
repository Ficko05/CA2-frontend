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

    const URL = "http://localhost:8084/CA2/api/person/complete"

    fetch(URL)
        .then(res => res.json())
        .then(data => callback(data))
    //.catch()
}

function populatePersonsTable(data) {
    let tbody = document.getElementById("table1");
    tbody.innerHTML = "";
    let columns = new Set(Object.keys(data[0]));
    columns.delete('id');
    data.forEach(row => {
        let tr = document.createElement("tr");
        columns.forEach(key => {
            let td = document.createElement("td");
            let value = row[key];
            if (value instanceof Object) {
                td.innerText = value.map(phoneRow => phoneRow['number']).join(", ");
            } else {
                td.innerText = value != undefined ? value : '';

            }
            tr.appendChild(td);

        });
        tbody.appendChild(tr);
    });


    //stuff///

    document.getElementById("delete-person").addEventListener('click', function (e) {


        const URL = "http://localhost:8080/CA2/api/person/";
        const id = document.getElementById("delete-person-input-id").value;

        // fetch(URL, makeOptions("POST", p))
        //fetch(URL+"/114", makeOptions("PUT",p))
        console.log(URL + id);
        fetch(URL + id, makeOptions("DELETE"))

            .then(res => handleHttpErrors(res))
            .then(data => console.log(data))
            .catch(err => {
                if (err.httpError) {
                    err.fullError.then(eJson => console.log(eJson))
                } else {
                    console.log("Netværks fejl")
                }
            })
    })

    function handleHttpErrors(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({ httpError: res.status, fullError: res.json() })
        }
    }

    function makeOptions(method, body) {
        var opt = {
            method: method,
            headers: {
                "Content-type": "application/json"
            }
        }
        if (body) {
            opt.body = JSON.stringify(body);
        }
        return opt;
    }
}


document.getElementById("submit-person").addEventListener("click", function (event) {
    event.preventDefault();
    let personInfo = document.getElementById("create-person-form");
    let firstName = personInfo.firstName.value;
    let lastName = personInfo.lastName.value;
    let phone = personInfo.phone.value;
    let street = personInfo.street.value;
    let additionalStreetInfo = personInfo.additionalStreetInfo.value;
    let zipcode = personInfo.zipcode.value;
    function Person(firstName, lastName, phone, street, additionalStreetInfo, zipcode) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.phone = phone;
        this.street = street;
        this.additionalStreetInfo = additionalStreetInfo;
        this.zipcode = zipcode;
    }
    let person = new Person(firstName, lastName, phone, street, additionalStreetInfo, zipcode);
    createPerson(person);

});
function createPerson(person) {
    console.log(person)
    const URL = "http://localhost:8084/CA2/api/person"




    fetch(URL, makeOptions("POST", person))

        .then(res => handleHttpErrors(res))
        .then(data => console.log(data))
        .catch(err => {
            if (err.httpError) {
                err.fullError.then(eJson => console.log(eJson))
            } else {
                console.log("Netværksfejl")
            }
        })



    function handleHttpErrors(res) {
        if (res.ok) {
            return res.json();
        } else {
            return Promise.reject({ httpError: res.status, fullError: res.json() })
        }
    }

    function makeOptions(method, body) {
        var opt = {
            method: method,
            headers: {
                "Content-type": "application/json"
            }
        }
        if (body) {
            opt.body = JSON.stringify(body);
        }
        return opt;
    }
}





