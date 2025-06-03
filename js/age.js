function updateAge() {
    const birthDate = new Date(2002, 1, 19);
    const today = new Date();
    let age = today.getFullYear() - birthDate.getFullYear();

    const birthdayThisYear = new Date(today.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    if (today < birthdayThisYear) {
        age--;
    }

    document.getElementById("age").textContent = age;
}

if (document.getElementById("age")) {
    updateAge();
}