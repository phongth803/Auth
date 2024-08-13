// login signup
if (!localStorage.getItem("users")) {
  localStorage.setItem("users", JSON.stringify([]));
}
function register() {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const repeatPassword = document.getElementById("repeatPassword").value;

  if (email !== "" && password !== "" && repeatPassword !== "") {
    if (password !== repeatPassword) {
      alert("Repeat password not match!");
      return;
    }
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const isUserExists = users.some((user) => user.email === email);

    if (isUserExists) {
      alert("Email is already registered!");
      return;
    }

    const newUser = {
      email: email,
      password: password,
      taskList: [],
    };
    users.push(newUser);

    localStorage.setItem("users", JSON.stringify(users));
    alert("Registration successful!");
    window.location.href = "login.html";
  } else {
    alert("Please fill in both email and password fields.");
    return;
  }
}

function login() {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const rememberMe = document.getElementById("rememberMe").checked;

  if (email !== "" && password !== "") {
    let users = JSON.parse(localStorage.getItem("users") || []);
    const user = users.find(
      (user) => user.email === email && user.password === password
    );

    if (user) {
      alert("Login successful!");

      if (rememberMe) {
        localStorage.setItem("rememberedUser", JSON.stringify(user));
      } else {
        sessionStorage.setItem("currentUser", JSON.stringify(user));
      }

      window.location.href = "../index.html";
    } else {
      alert("Invalid email or password.");
    }
  } else {
    alert("Please fill in both email and password fields.");
  }
}

window.onload = function () {
  const rememberedUser = JSON.parse(localStorage.getItem("rememberedUser"));
  const currentSessionUser = JSON.parse(sessionStorage.getItem("currentUser"));
  const currentPage = window.location.pathname.split("/").pop();

  if (rememberedUser || currentSessionUser) {
    if (currentPage === "login.html" || currentPage === "signup.html") {
      window.location.href = "../index.html";
    }
  } else if (currentPage === "index.html") {
    window.location.href = "/html/login.html";
  }
};
