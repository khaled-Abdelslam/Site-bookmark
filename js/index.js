var BookMarkName = document.getElementById("BookMarkName");
var WebsiteURL = document.getElementById("WebsiteURL");
var btnSubmit = document.getElementById("btnSubmit");
var btnUpdate = document.getElementById("btnUpdate");
var searchInput = document.getElementById("search");

var currentIndex = 0;

var sitelist = [];

//local storage

if (localStorage.getItem("localSites") !== null) {
  sitelist = JSON.parse(localStorage.getItem("localSites"));
  display();
}

// add site

function addsite() {
  if (validation(BookMarkName, "msgName") && validation(WebsiteURL, "msgUrl")) {
    var sites = {
      name: BookMarkName.value,
      url: WebsiteURL.value,
    };

    sitelist.push(sites);

    localStorage.setItem("localSites", JSON.stringify(sitelist));

    display();

    clearInput();
  }
}

//clearing

function clearInput() {
  BookMarkName.value = null;
  WebsiteURL.value = null;

  BookMarkName.classList.remove("is-valid");
  WebsiteURL.classList.remove("is-valid");
}

//get content

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

//display content

function display() {
  var cartona = "";

  for (var i = 0; i < sitelist.length; i++) {
    cartona += contentCartona(i);
  }

  document.getElementById("data").innerHTML = cartona;
}

//delete site

function deleteSite(index) {
  sitelist.splice(index, 1);

  localStorage.setItem("localSites", JSON.stringify(sitelist));

  display();
}

//update site

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

//searching

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

//validation

function validation(element, msgId) {
  var regex = {
    BookMarkName: /^\w{1,}[ ]?(\w{1,})?$/gi,
    WebsiteURL:
      /[(http(s)?):\/\/(www\.)?a-zA-Z0-9@:%._\+~#=]{2,256}\.[a-z]{2,6}\b([-a-zA-Z0-9@:%_\+.~#?&//=]*)/gi,
  };

  var term = element.value;
  var msg = document.getElementById(msgId);

  if (regex[element.id].test(term)) {
    element.classList.add("is-valid");
    element.classList.remove("is-invalid");
    msg.classList.add("d-none");

    return true;
  } else {
    element.classList.add("is-invalid");
    element.classList.remove("is-valid");
    msg.classList.remove("d-none");

    return false;
  }
}
