import assert from "node:assert/strict";
import test from "node:test";
import { calculateAverage, evaluateStudent, getStudentStatus } from "../src/grade.js";

test("calcula a media de tres notas", () => {
  assert.equal(calculateAverage([8, 7.5, 9]), 8.17);
});

test("define situacao aprovado para media a partir de 7", () => {
  assert.equal(getStudentStatus(7), "Aprovado");
});

test("define recuperacao para media entre 5 e 6.99", () => {
  assert.equal(getStudentStatus(6.2), "Recuperacao");
});

test("define reprovado para media menor que 5", () => {
  assert.equal(evaluateStudent([4, 3, 5]).status, "Reprovado");
});

test("rejeita uma quantidade diferente de tres notas", () => {
  assert.throws(() => calculateAverage([8, 7]), /exatamente tres notas/);
});

test("rejeita notas fora do intervalo permitido", () => {
  assert.throws(() => calculateAverage([11, 8, 7]), /entre 0 e 10/);
});
