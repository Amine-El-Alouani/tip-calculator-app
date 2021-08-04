//Vars

const bill = document.querySelector(".bill-inp");
const tipBtns = document.querySelectorAll(".btn");
const num = document.querySelector(".num-inp");
const errorMsg = document.querySelector(".msg");
const custom = document.querySelector(".custom");
const result = document.querySelectorAll(".result");
const resetBtn = document.querySelector(".reset-btn");

bill.addEventListener("input", setBillVal);
tipBtns.forEach((btn) => {
  btn.addEventListener("click", handleClick);
});
custom.addEventListener("input", setCustomTip);
num.addEventListener("input", setNumVal);
resetBtn.addEventListener("click", reset);

//Default Values

let billVal = 0.0;
let tipVal = 0.05;
let numVal = 1;

//Regex

function validateFloat(s) {
  var rgx = /^[0-9]*\.?[0-9]*$/;
  return s.match(rgx);
}

function validateInt(s) {
  var rgx = /^[0-9]*$/;
  return s.match(rgx);
}

//Set Bill Value Function

function setBillVal() {
  if (bill.value.includes(",")) {
    bill.value = bill.value.replace(",", ".");
  }

  if (!validateFloat(bill.value)) {
    bill.value = bill.value.substring(0, bill.value.length - 1);
  }

  billVal = parseFloat(bill.value);
  resetClass();
  calcTip();
}

//Handle Click Function

function handleClick(event) {
  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");

    if (event.target.innerHTML == btn.innerHTML) {
      btn.classList.add("btn-active");
      tipVal = parseFloat(btn.innerHTML) / 100;
    }
  });

  //Clear Custom Tip

  custom.value = "";
  calcTip();
}

// Set Custom Tip Function

function setCustomTip() {
  if (!validateInt(custom.value)) {
    custom.value = custom.value.substring(0, custom.value.length - 1);
  }

  tipBtns.forEach((btn) => {
    btn.classList.remove("btn-active");
  });

  tipVal = parseFloat(custom.value / 100);

  if (custom.value !== "") {
    calcTip();
  }
}

// Set Num Val Function

function setNumVal() {
  if (!validateInt(num.value)) {
    num.value = num.value.substring(0, num.value.length - 1);
  }

  numVal = parseFloat(num.value);

  if (numVal <= 0) {
    errorMsg.classList.add("error-msg");
  } else {
    errorMsg.classList.remove("error-msg");
  }
  calcTip();
}

function calcTip() {
  if (numVal >= 1) {
    tipAmount = (billVal * tipVal) / numVal;
    total = billVal / numVal + tipAmount;
    result[0].innerHTML = "$" + tipAmount.toFixed(2);
    result[1].innerHTML = "$" + total.toFixed(2);
  }

  if (bill.value === "") {
    result[0].innerHTML = "$0.00";
    result[1].innerHTML = "$0.00";
  }
}

// Reset Btn

function reset() {
  billVal = 0.0;
  bill.value = "";
  numVal = 1;
  num.value = 1;
  tipBtns[0].click();
  resetBtn.classList.add("reset-off");
}

// Reset Class

function resetClass() {
  if (bill.value != "") {
    resetBtn.classList.remove("reset-off");
  } else {
    resetBtn.classList.add("reset-off");
  }
}
