document.addEventListener("DOMContentLoaded", function () {
    const nameInput = document.getElementById("nameInput");
    const addNameButton = document.getElementById("addName");
    const searchInput = document.getElementById("searchInput");
    const nameList = document.getElementById("nameList");

    function displayNames() {
        nameList.innerHTML = '';
        const names = JSON.parse(localStorage.getItem("names")) || [];

        names
            .filter(name => name.includes(searchInput.value))
            .forEach(function (name) {
                const li = document.createElement("li");
                li.textContent = name;

                const deleteButton = document.createElement("button");
                deleteButton.textContent = "Eliminar";
                deleteButton.addEventListener("click", function () {
                    if (confirm("¿Estás seguro de que quieres eliminar este nombre?")) {
                        deleteName(name);
                    }
                });

                li.appendChild(deleteButton);
                nameList.appendChild(li);
            });
    }

    function addName(name) {
        if (name.trim() === "") {
            alert("Por favor, ingresa un nombre válido.");
            return;
        }

        const names = JSON.parse(localStorage.getItem("names")) || [];
        names.push(name);
        localStorage.setItem("names", JSON.stringify(names));
        displayNames();
    }

    function deleteName(name) {
        const names = JSON.parse(localStorage.getItem("names")) || [];
        const updatedNames = names.filter(function (n) {
            return n !== name;
        });
        localStorage.setItem("names", JSON.stringify(updatedNames));
        displayNames();
    }

    addNameButton.addEventListener("click", function () {
        const name = nameInput.value.trim();
        addName(name);
        nameInput.value = "";
    });

    searchInput.addEventListener("input", function () {
        displayNames();
    });

    displayNames();
});
