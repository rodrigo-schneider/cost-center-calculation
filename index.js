let inputEl = document.getElementById("input-el");
let calculateBtn = document.getElementById("calculate-btn");
let clearBtn = document.getElementById("clear-btn");
let ulEl = document.getElementById("ul-el");

// Verificar se existe um valor salvo para o input
let savedInputValue = localStorage.getItem("inputValue");
if (savedInputValue) {
  inputEl.value = savedInputValue;
}

// Verificar se existem valores salvos para o percent80 e percent20
let percent80 = JSON.parse(localStorage.getItem("percent80"));
let percent20 = JSON.parse(localStorage.getItem("percent20"));

// Verificar se os valores são válidos
if (percent80 && percent20) {
  ulEl.innerHTML = `<li>R$${percent80}</li><li>R$${percent20}</li>`;
}

function copyToClipboard(value) {
  navigator.clipboard
    .writeText(value)
    .then(function () {
      // Criar elemento temporário para exibir a mensagem "copied"
      const messageEl = document.createElement("div");
      messageEl.innerText = "Copied";
      messageEl.className = "copy-message";
      document.body.appendChild(messageEl);

      // Remover o elemento temporário após 2 segundos
      setTimeout(function () {
        messageEl.remove();
      }, 2000);
    })
    .catch(function (error) {
      console.error("Erro ao copiar valor:", error);
    });
}

calculateBtn.addEventListener("click", function () {
  percent80 = inputEl.value * 0.8;
  percent20 = inputEl.value * 0.2;
  resultHTML = `<li>R$${percent80.toFixed(2)}</li><li>R$${percent20.toFixed(
    2
  )}</li>`;
  ulEl.innerHTML = resultHTML;
  localStorage.setItem("percent80", JSON.stringify(percent80.toFixed(2)));
  localStorage.setItem("percent20", JSON.stringify(percent20.toFixed(2)));
  localStorage.setItem("inputValue", inputEl.value);
});

ulEl.addEventListener("click", function (event) {
  const target = event.target;
  if (target.tagName === "LI") {
    const value = target.innerText;
    copyToClipboard(value);
  }
});

clearBtn.addEventListener("click", function () {
  inputEl.value = "";
  ulEl.innerHTML = "";
  localStorage.removeItem("percent80");
  localStorage.removeItem("percent20");
  localStorage.removeItem("inputValue");
});

inputEl.addEventListener("keydown", function (event) {
  if (event.key === "Enter") {
    calculateBtn.click();
  }
});
