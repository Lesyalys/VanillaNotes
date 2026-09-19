import switchTheme from "./src/class/switchTheme.js";

export default function Main() {
  const main = document.getElementById("section");
  document
    .getElementById("btnSwither")
    .addEventListener("click", () => switchTheme());
}

Main();
