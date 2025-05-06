import "./style.css";

const input = document.getElementById("input");
const selectBox = document.getElementById("selectBox");
const POST = document.getElementById("POST");
const button = document.getElementById("button");

let inputUrl = null;
let valueOfRequestBody = "";

input.addEventListener("input", function (event) {
  inputUrl = event.target.value;
});

selectBox.addEventListener("click", () => {
  if (selectBox.value === "get") {
    POST.classList.add("hidden");
  }
  if (selectBox.value === "post") {
    POST.classList.remove("hidden");
    document
      .getElementById("textareatContent2")
      .addEventListener("input", function (event) {
        valueOfRequestBody = event.target.value;
      });
  }
});

button.addEventListener("click", function (event) {
  event.preventDefault();
  if (selectBox.value === "get") {
    getMethod();
  }
  if (selectBox.value === "post") {
    postMethod(valueOfRequestBody);
  }
});

function getMethod() {
  if (!inputUrl) {
    console.error("URL وارد نشده است!");
    return;
  }

  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      document.getElementById("textareatContent1").textContent =
        req.responseText;
    } else {
      console.error(`خطا در دریافت داده: ${this.status}`);
    }
    renderFooter(this.status);
  };

  req.open("GET", inputUrl, true);
  req.send();
}

function postMethod(value) {
  if (!inputUrl) {
    console.error("URL وارد نشده است!");
    return;
  }

  const req = new XMLHttpRequest();
  req.open("POST", inputUrl, true);
  req.send(JSON.stringify({ value }));

  req.onreadystatechange = function () {
    if (this.readyState === 4) {
      if (this.status === 200) {
        document.getElementById("textareatContent1").textContent =
          req.responseText;
      } else {
        console.error(`خطا در دریافت داده: ${this.status}`);
      }
      renderFooter(this.status);
    }
  };
}

function renderFooter(status) {
  document.getElementById(
    "footer"
  ).innerHTML = `<div class="mt-5 bg-amber-500 rounded-lg px-4 font-semibold py-1 ">
        <p>PlainText: JSON , Status: ${status}</p>
      </div>`;
}
