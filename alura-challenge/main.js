const input = document.getElementById("user-input");
const btnWrp = document.getElementById("btn-wrp");
const outputWrp = document.getElementById("output-wrp");
const outputWrpBlock = document.getElementById("output-wrp-block");
const outputReplaceable = document.getElementById("output-replaceable");
const output = document.getElementById("output");
const copyBtn = document.getElementById("copy-btn");
const desktopImg = document.getElementById("desktop-img");

// encryption logic on click event
document.getElementById("encrypt-btn").addEventListener("click", () => {
  if (input.value != "") {
    insertResultingContent(
      input.value
        .replaceAll("e", "enter")
        .replaceAll("i", "imes")
        .replaceAll("a", "ai")
        .replaceAll("o", "ober")
        .replaceAll("u", "ufat")
    );
  }
});

// decryption logic on click event
document.getElementById("decrypt-btn").addEventListener("click", () => {
  if (input.value != "") {
    insertResultingContent(
      input.value
        .replaceAll("enter", "e")
        .replaceAll("imes", "i")
        .replaceAll("ai", "a")
        .replaceAll("ober", "o")
        .replaceAll("ufat", "u")
    );
  }
});

function insertResultingContent(convertedTxt) {
  input.value = ""; /* clear input field */
  outputReplaceable.innerHTML = ""; /* remove placeholder content from div */
  output.innerHTML = convertedTxt;
  copyBtn.style.display = "block"; /* show copy btn */

  // change some styles on desktop view
  if (screen.availWidth >= 1440) {
    outputReplaceable.style.display = "none";
    outputWrpBlock.style.justifyContent = "space-between";
  }

  adjustOutputWrpPosition();
}

copyBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(output.textContent);

  // change colors for copy button, end then back to the original color
  const btnColors = {
    text: window.getComputedStyle(copyBtn).color,
    border: window.getComputedStyle(copyBtn).border,
  };

  copyBtn.innerText = "Copiado!";
  copyBtn.style.color = "green";
  copyBtn.style.border = "1px solid green";

  setTimeout(() => {
    copyBtn.innerText = "Copiar";
    copyBtn.style.color = btnColors.text;
    copyBtn.style.border = btnColors.border;
  }, 1500);
});

// change outputWrp position based on sceen width
// to fit intended design.
// listens for screen resizes to readjust if needed
adjustOutputWrpPosition();

addEventListener("resize", () => {
  adjustOutputWrpPosition();
});

function adjustOutputWrpPosition() {
  if (screen.width < 1440) {
    btnWrp.style.bottom = `${outputWrp.clientHeight + 60}px`;
  } else {
    btnWrp.style.bottom = `50px`;
  }
}

// deny invalid characters
input.addEventListener("input", (e) => {
  if (e.data != null) {
    if (
      e.data.match(
        new RegExp("[A-ZÁÀÃÂÉÈẼÊÍÌĨÎÓÒÕÔÚÙŨÛÇáàãâéèẽêíìĩîóòõôúùũûç]")
      )
    ) {
      input.value = e.target.value.slice(0, -1);

      wiggleInfoWrp();
    }
  }
});

function wiggleInfoWrp() {
  const infoWrp = document.getElementById("info-wrp");
  const animSteps = [10, 2, 5, 0];

  infoWrp.style.marginLeft = `${animSteps[0]}px`;

  setTimeout(() => {
    infoWrp.style.marginLeft = `${animSteps[1]}px`;
  }, 100);

  setTimeout(() => {
    infoWrp.style.marginLeft = `${animSteps[2]}px`;
  }, 200);

  setTimeout(() => {
    infoWrp.style.marginLeft = `${animSteps[3]}px`;
  }, 300);
}