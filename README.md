# Calculadora de Notas

[![CI](https://github.com/Ruskrill/calculadora-notas-ci/actions/workflows/ci.yml/badge.svg)](https://github.com/Ruskrill/calculadora-notas-ci/actions/workflows/ci.yml)

Aplicacao web simples para calcular a media de tres notas e indicar a situacao do aluno:

- Aprovado: media a partir de 7
- Recuperacao: media entre 5 e 6.99
- Reprovado: media abaixo de 5

## Executar localmente

```bash
npm install
npm test
npm run build
```

O build e gerado na pasta `dist`.

## CI

O GitHub Actions instala as dependencias, executa os testes unitarios e gera o build a cada push ou pull request na branch `main`.
