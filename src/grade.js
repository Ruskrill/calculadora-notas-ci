const MIN_GRADE = 0;
const MAX_GRADE = 10;

export function calculateAverage(grades) {
  if (!Array.isArray(grades) || grades.length !== 3) {
    throw new Error("Informe exatamente tres notas.");
  }

  grades.forEach((grade) => {
    if (!Number.isFinite(grade) || grade < MIN_GRADE || grade > MAX_GRADE) {
      throw new Error("Cada nota deve estar entre 0 e 10.");
    }
  });

  const total = grades.reduce((sum, grade) => sum + grade, 0);
  return Number((total / grades.length).toFixed(2));
}

export function getStudentStatus(average) {
  if (average >= 7) return "Aprovado";
  if (average >= 5) return "Recuperacao";
  return "Reprovado";
}

export function evaluateStudent(grades) {
  const average = calculateAverage(grades);
  return { average, status: getStudentStatus(average) };
}
