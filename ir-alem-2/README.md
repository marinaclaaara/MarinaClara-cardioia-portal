# CardioIA – Ir Além 2: Diagnóstico visual de ECG com MLP (Keras)

**Autoria:** Marina Clara  |  **Integrante:** Marina Clara Constantino Ribeiro – RM 568576

Notebook `diagnostico_ecg_mlp.ipynb`: classifica batimentos de ECG como **normal** ou **anormal**.

## Dataset
[Heartbeat – Kaggle](https://www.kaggle.com/datasets/shayanfazeli/heartbeat) (arquivos `ptbdb_normal.csv` e `ptbdb_abnormal.csv`). Ele fornece o ECG como sinal numérico; o notebook **converte cada sinal em imagem 64×64 em tons de cinza** (redimensionamento + escala de cinza + normalização) antes do MLP.

## Como executar
1. Baixe o dataset e coloque os dois CSVs em `data/` (ou configure o `kagglehub`).
2. `pip install numpy pandas matplotlib scikit-learn tensorflow jupyter`
3. Rode o notebook inteiro. Ele salva exemplos em `exemplos/` e imprime acurácia, relatório e matriz de confusão.

## Resultados
No conjunto de teste (2183 batimentos), o MLP chegou a **96,01% de acurácia** (perda de 0,1118).

| Classe | Precisão | Recall | Batimentos no teste |
|---|---|---|---|
| normal | 0,91 | 0,95 | 607 |
| anormal | 0,98 | 0,97 | 1576 |

Da classe anormal, 1522 batimentos foram detectados e 54 passaram como normais (falsos negativos). Na classe normal, 33 foram classificados como anormais (falsos positivos).
