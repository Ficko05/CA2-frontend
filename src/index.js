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
}

/*<form id="create-person-form">
First name: <input type="text" name="firstName"><br>
Last name: <input type="text" name="lastName"><br>
Phone: <input type="text" name="phone"><br>
Street: <input type="text" name="street"><br>
AdditionalStreetInfo: <input type="number" name="additionalStreetInfo"><br>
Zipcode: <input type="text" name="zipcode"><br>
<input id="submit-person" type="submit" value="Create Person">
</form>*/

document.getElementById("submit-person").addEventListener("click", function () {
    let personInfo = document.getElementById("create-person-form");
    let firstName = personInfo.getAttribute("firstName");
    let lastName = personInfo.getAttribute("lastName");
    let phone = personInfo.getAttribute("phone");
    let street = personInfo.getAttribute("street");
    let additionalStreetInfo = personInfo.getAttribute("additionalStreetInfo");
    let zipcode = personInfo.getAttribute("zipcode");
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



