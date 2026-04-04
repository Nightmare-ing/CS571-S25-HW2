function buildStudents(studs) {
    // TODO This function is just a suggestion! I would suggest calling it after
    //      fetching the data or performing a search. It should populate the
    //      index.html with student data by using createElement and appendChild.
}

function handleSearch(e) {
    e?.preventDefault(); // You can ignore this; prevents the default form submission!

    // TODO Implement the search
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
        // Show number of students
        document.getElementById("num-results").innerText = data.length;

        // Display students
        const stusNode = document.getElementById("students");
        for (stu of data) {
            const nameNode = document.createElement("h2");
            nameNode.innerText = `${stu.name.first} ${stu.name.last}`;
            stusNode.appendChild(nameNode);

            const majorNode = document.createElement("p");
            const emMajorNode = document.createElement("strong");
            emMajorNode.innerText = stu.major;
            majorNode.appendChild(emMajorNode);
            stusNode.appendChild(majorNode);

            const numOfCredsAndHometownNode = document.createElement("p");
            const isOrNotFromWi = stu.fromWisconsin ? "is" : "is not";
            numOfCredsAndHometownNode.innerText = `${stu.name.first} is taking ${stu.numCredits} and ${isOrNotFromWi} from Wisconsin.`;
            stusNode.appendChild(numOfCredsAndHometownNode);

            const interestsNode = document.createElement("p");
            interestsNode.innerText = `They have ${stu.interests.length} including...`;
            stusNode.appendChild(interestsNode);

            const interestsListNode = document.createElement("ul");
            stu.interests.map((interest) => {
                const itemNode = document.createElement("li");
                itemNode.innerText = interest;
                interestsListNode.appendChild(itemNode);
            });
            stusNode.appendChild(interestsListNode);
        }
    });
