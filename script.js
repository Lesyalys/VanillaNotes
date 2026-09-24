import App from "./src/class/App.js";

export default function Main() {
  const consponent = document.getElementById("app");
  const app = new App(consponent.id);
  app.init();
}

Main();
