export default function SwitchTheme() {
  try {
    const theme = localStorage.getItem("theme");
    if (theme) {
      localStorage.setItem("theme", theme === "light" ? "dark" : "light");
    }
  } catch (error) {
    console.error(error);
  }
}
