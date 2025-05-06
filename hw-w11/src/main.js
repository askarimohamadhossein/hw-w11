import "./style.css";

const input = document.getElementById("input");
const selectBox = document.getElementById("selectBox");
const POST = document.getElementById("POST");
let clicked = false;
let inputUrl = null;

input.addEventListener("input", function (event) {
  inputUrl = event.target.value;
  // console.log(inputUrl);
});

selectBox.addEventListener("click", () => {
  if (selectBox.value === "get" && clicked === true) {
    getMethod();
    selectBox.value = "";
  }
  if (selectBox.value === "post") {
    POST.classList.remove("hidden");
    document
      .getElementById("textareatContent2")
      .addEventListener("input", function (event) {
        const valueOfRequestBody = event.target.value;
        postMethod(valueOfRequestBody);
      });
    // selectBox.value = "";
  }
});

document.getElementById("button").addEventListener("click", function (event) {
  event.preventDefault();
  if (selectBox.value === "get") {
    getMethod();
    selectBox.value = "";
  }
  if (selectBox.value === "post") {
    postMethod(valueOfRequestBody);
  }
});

function getMethod() {
  const inputUrl = document.getElementById("input").value;

  if (!inputUrl) {
    console.error("URL وارد نشده است!");
    return;
  }
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    if (this.readyState === 4 && this.status === 200) {
      const response = req.responseText;
      const textareatContent1 = document.getElementById("textareatContent1");
      textareatContent1.textContent = response;
    } else {
      console.error(`خطا در دریافت داده: ${this.status}`);
    }
    renderFooter(this.status);
  };
  req.open("GET", inputUrl, false);
  req.send();
}

function postMethod(value) {
  // POST.classList.remove("hidden");
  const inputUrl = document.getElementById("input").value;

  if (!inputUrl) {
    console.error("URL وارد نشده است!");
    return;
  }
  const req = new XMLHttpRequest();
  req.onreadystatechange = function () {
    req.open("POST", inputUrl, false);
    if (this.readyState === 4 && this.status >= 200 && this.status <= 300) {
      // const response = req.responseText;
      const textareatContent2 =
        document.getElementById("textareatContent2").value;
      console.log(textareatContent2);

      const response = JSON.stringify({ value });

      req.send(response);
      renderFooter(this.status);

      const textareatContent1 = document.getElementById("textareatContent1");
      textareatContent1.textContent = req.responseText;
    } else {
      console.error(`خطا در دریافت داده: ${this.status}`);
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
