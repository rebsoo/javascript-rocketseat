// exercício 1 -----------------------------
function checaIdade(idade) {
  return new Promise(function(resolve, reject) {
    setTimeout(() => {
      idade >= 18 ? resolve() : reject();
    }, 2000);
  });
}
checaIdade(20)
  .then(function() {
    console.log("Maior que 18");
  })
  .catch(function() {
    console.log("Menor que 18");
  });

// exercício 2 -----------------------------
var inputElement = document.querySelector("#app input");
var buttonElement = document.querySelector("#app button");
var listElement = document.querySelector("#app ul");

function addGitUser() {
  var user = inputElement.value;
  console.log(user);
  if (!user) {
    renderError();
    alert("Tell us your github username!");
  }
  renderLoading();
  axios
    .get("https://api.github.com/users/" + user + "/repos")
    .then(response => {
      showRepo(response.data);
    })
    .catch(error => {
      alert("We can't find this git repo x__x");
      renderError(error);
    });
}

buttonElement.onclick = addGitUser;

function renderLoading(loading) {
  // exercício 3 -----------------------------
  listElement.innerHTML = "";
  var textElement = document.createTextNode("Loading...");
  var loadingElement = document.createElement("li");
  loadingElement.appendChild(textElement);
  listElement.appendChild(loadingElement);
}

function renderError(loading) {
  listElement.innerHTML = "";
  var user = inputElement.value;
  var msgUserEmpty = !user
    ? "Tell us your github name!"
    : "We can't find this user repo x__x";
  var textElement = document.createTextNode(msgUserEmpty);
  var errorElement = document.createElement("li");
  errorElement.style.color = "#F00";
  errorElement.appendChild(textElement);
  listElement.appendChild(errorElement);
}

const showRepo = repositorios => {
  console.log("TCL: repositorios", repositorios);
  listElement.innerHTML = "";

  for (repo of repositorios) {
    const reponame = document.createTextNode(repo.name);
    const repoItem = document.createElement("li");

    repoItem.appendChild(reponame);
    listElement.appendChild(repoItem);
  }
};
