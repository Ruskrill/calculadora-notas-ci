import { evaluateStudent } from "./grade.js";

const form = document.querySelector("form");
const result = document.querySelector("#result");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const grades = ["grade1", "grade2", "grade3"].map((id) => Number(document.querySelector(`#${id}`).value));

  try {
    const { average, status } = evaluateStudent(grades);
    result.textContent = `Media final: ${average.toFixed(2)} | Situacao: ${status}`;
    result.className = status === "Aprovado" ? "approved" : "";
  } catch (error) {
    result.textContent = error.message;
    result.className = "error";
  }
});
