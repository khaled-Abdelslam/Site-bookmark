var BookMarkName = document.getElementById("BookMarkName");
var WebsiteURL = document.getElementById("WebsiteURL");

var btnSubmit = document.getElementById("btnSubmit");
var btnUpdate = document.getElementById("btnUpdate");

var searchInput = document.getElementById("search");

var currentIndex = 0;

var sitelist = [];

if (localStorage.getItem("localSites") !== null) {
  sitelist = JSON.parse(localStorage.getItem("localSites"));
  display();
}

function addsite() {
  var sites = {
    name: BookMarkName.value,
    url: WebsiteURL.value,
  };

  sitelist.push(sites);

  localStorage.setItem("localSites", JSON.stringify(sitelist));

  display();

  clearInput();
}

function clearInput() {
  BookMarkName.value = null;
  WebsiteURL.value = null;
}

function contentCartona(i) {
  var regex = new RegExp(searchInput.value, "gi");

  return `<tr>
          <td>${i + 1}</td>
          <td>${sitelist[i].name.replace(
            regex,
            (match) => `<span class="bg-info">${match}</span>`
          )}</td>
          <td> <a href="${
            sitelist[i].url
          }"><button class="btn btn-success">Visit</button></a></td>
          <td><button onclick="deleteSite(${i})" class="btn btn-danger">Delete</button></td>
          <td><button onclick="updateInputs(${i})"class="btn btn-warning">Update</button></td>
        </tr>`;
}

function display() {
  var cartona = "";

  for (var i = 0; i < sitelist.length; i++) {
    cartona += contentCartona(i);
  }

  document.getElementById("data").innerHTML = cartona;
}

function deleteSite(index) {
  sitelist.splice(index, 1);

  localStorage.setItem("localSites", JSON.stringify(sitelist));

  display();
}

function updateInputs(index) {
  currentIndex = index;
  BookMarkName.value = sitelist[index].name;
  WebsiteURL.value = sitelist[index].url;

  btnSubmit.classList.add("d-none");
  btnUpdate.classList.remove("d-none");
}

function updateSites() {
  var sites = {
    name: BookMarkName.value,
    url: WebsiteURL.value,
  };

  sitelist.splice(currentIndex, 1, sites);

  localStorage.setItem("localSites", JSON.stringify(sitelist));

  display();

  btnSubmit.classList.remove("d-none");
  btnUpdate.classList.add("d-none");

  clearInput();
}

function searchByName() {
  var term = searchInput.value;

  var cartona = "";

  for (var i = 0; i < sitelist.length; i++) {
    if (sitelist[i].name.toLowerCase().includes(term.toLowerCase())) {
      cartona += contentCartona(i);
    }
  }

  document.getElementById("data").innerHTML = cartona;
}
