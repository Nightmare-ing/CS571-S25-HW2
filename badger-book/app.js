let DATA = undefined;

function buildStudents(studs) {
    // TODO This function is just a suggestion! I would suggest calling it after
    //      fetching the data or performing a search. It should populate the
    //      index.html with student data by using createElement and appendChild.
}

function handleSearch(e) {
    e?.preventDefault(); // You can ignore this; prevents the default form submission!

    const searchName = document
        .getElementById("search-name")
        .value.toLowerCase()
        .trim();
    const searchMajor = document
        .getElementById("search-major")
        .value.toLowerCase()
        .trim();
    const searchInterest = document
        .getElementById("search-interest")
        .value.toLowerCase()
        .trim();

    let data = JSON.parse(JSON.stringify(DATA));
    if (searchName) {
        data = data.filter((item) =>
            `${item.name.first.toLowerCase()} ${item.name.last.toLowerCase()}`.includes(
                searchName,
            ),
        );
    }

    if (searchMajor) {
        data = data.filter((item) =>
            item.major.toLowerCase().includes(searchMajor),
        );
    }

    if (searchInterest) {
        data = data.filter((item) =>
            item.interests
                .map((interest) => interest.toLowerCase())
                .includes(searchInterest),
        );
    }

    displayData(data);
}

document.getElementById("search-btn").addEventListener("click", handleSearch);

fetch("https://cs571.org/rest/s25/hw2/students", {
    method: "GET",
    headers: {
        "X-CS571-ID": CS571.getBadgerId(),
    },
})
    .then((response) => response.json())
    .then((data) => {
        DATA = data;
        displayData(data);
    });

function displayData(data) {
    // Show number of students
    document.getElementById("num-results").innerText = data.length ?? "???";

    // Display students
    const stusNode = document.getElementById("students");
    // clear inner contents
    stusNode.innerHTML = "";
    for (stu of data) {
        const stuNode = document.createElement("div");
        stuNode.className = "col-xs-12 col-sm-12 col-md-6 col-lg-4 col-xl-3";
        const nameNode = document.createElement("h2");
        nameNode.innerText = `${stu.name.first} ${stu.name.last}`;
        stuNode.appendChild(nameNode);

        const majorNode = document.createElement("p");
        const emMajorNode = document.createElement("strong");
        emMajorNode.innerText = stu.major;
        majorNode.appendChild(emMajorNode);
        stuNode.appendChild(majorNode);

        const numOfCredsAndHometownNode = document.createElement("p");
        const isOrNotFromWi = stu.fromWisconsin ? "is" : "is not";
        numOfCredsAndHometownNode.innerText = `${stu.name.first} is taking ${stu.numCredits} and ${isOrNotFromWi} from Wisconsin.`;
        stuNode.appendChild(numOfCredsAndHometownNode);

        const interestsNode = document.createElement("p");
        interestsNode.innerText = `They have ${stu.interests.length} including...`;
        stuNode.appendChild(interestsNode);

        const interestsListNode = document.createElement("ul");
        stu.interests.map((interest) => {
            const itemNode = document.createElement("li");
            itemNode.innerText = interest;
            interestsListNode.appendChild(itemNode);
        });
        stuNode.appendChild(interestsListNode);

        stusNode.appendChild(stuNode);
    }
}
