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

## Kubernetes no GitHub Codespaces

Este projeto pode ser executado em um cluster Minikube dentro do Codespace. A imagem e construida localmente no ambiente do Minikube, portanto nao e necessario publicar uma imagem no Docker Hub.

### 1. Instalar as ferramentas, se necessario

```bash
if ! command -v kubectl >/dev/null 2>&1; then
  curl -LO "https://dl.k8s.io/release/$(curl -L -s https://dl.k8s.io/release/stable.txt)/bin/linux/amd64/kubectl"
  sudo install -o root -g root -m 0755 kubectl /usr/local/bin/kubectl
fi

if ! command -v minikube >/dev/null 2>&1; then
  curl -LO https://storage.googleapis.com/minikube/releases/latest/minikube-linux-amd64
  sudo install minikube-linux-amd64 /usr/local/bin/minikube
fi
```

### 2. Preparar o cluster e a imagem

```bash
minikube start --driver=docker --memory=2048
minikube image build -t calculadora-notas:1.0 .
```

### 3. Implantar a aplicacao

```bash
kubectl apply -f k8s/deployment.yaml
kubectl apply -f k8s/service.yaml
kubectl rollout status deployment/calculadora-notas
kubectl get pods -o wide
kubectl get svc calculadora-notas-service
```

### 4. Acessar pelo Codespace

Em outro terminal, mantenha o encaminhamento ativo:

```bash
kubectl port-forward service/calculadora-notas-service 8080:80
```

Abra a porta `8080` na aba **Ports** do Codespace.

### 5. Escalar e atualizar

```bash
kubectl scale deployment calculadora-notas --replicas=4
kubectl get pods

# Para um rolling update, altere a imagem para calculadora-notas:1.1,
# construa essa nova tag e aplique o Deployment novamente.
minikube image build -t calculadora-notas:1.1 .
kubectl set image deployment/calculadora-notas calculadora-notas=calculadora-notas:1.1
kubectl rollout status deployment/calculadora-notas
```

Se precisar desfazer a atualizacao:

```bash
kubectl rollout undo deployment/calculadora-notas
```

### 6. Limpeza

```bash
kubectl delete -f k8s/service.yaml
kubectl delete -f k8s/deployment.yaml
minikube stop
```

### Evidencias para o AVA

Para os prints do terminal, execute os comandos abaixo em sequencia e capture a tela quando cada resultado aparecer:

```bash
kubectl get nodes
kubectl get pods -o wide
kubectl get svc calculadora-notas-service
kubectl scale deployment calculadora-notas --replicas=4
kubectl get pods
kubectl rollout status deployment/calculadora-notas
```
