# CardioIA – Fase 2: Diagnóstico Automatizado – IA no Estetoscópio Digital

**Autoria:** Marina Clara Constantino Ribeiro e - Yasmin Kauane Silva Lima 
**Integrantes:** Marina Clara Constantino Ribeiro – RM 568576  Yasmin Kauane Silva Lima - RM566645

# FIAP - Faculdade de Informática e Administração Paulista

<p align="center">
    <a href= "https://www.fiap.com.br/"><img src="assets/logo-fiap.png" alt="FIAP - Faculdade de Informática e Admnistração Paulista" border="0" width=40% height=40%></a>
</p>

<br>

# CardioIA — Diagnóstico Automatizado com Inteligência Artificial

## 👨‍🎓 Integrantes: 

- Marina Clara Constantino Ribeiro - RM568576
- Yasmin Kauane Silva Lima - RM566645

## 👋 Visão Geral

O CardioIA é um projeto acadêmico desenvolvido na FIAP com o objetivo de simular o uso de Inteligência Artificial como ferramenta de apoio ao diagnóstico e à triagem de pacientes na área de cardiologia.

# 🎥 Demonstração

O vídeo apresenta o funcionamento da solução desenvolvida na Fase 2.


**Vídeo no YouTube:** [Assistir à demonstração](https://youtu.be/xVTydZK3dh4)

Protótipo acadêmico de apoio ao diagnóstico em cardiologia. **Não substitui avaliação médica.**

## Estrutura do repositório

```
parte1/                          # Parte 1 – frases + mapa de conhecimento + extração
  sintomas_pacientes.txt         # 10 frases de pacientes
  mapa_conhecimento.csv          # Sintoma 1 | Sintoma 2 | Doença Associada (28 linhas)
  extracao_diagnostico.py        # lê frases, identifica sintomas, sugere diagnóstico
parte2/                          # Parte 2 – classificador de risco
  dataset_risco.csv              # 64 frases rotuladas (32 alto risco / 32 baixo risco)
  classificador_risco.ipynb      # TF-IDF + Regressão Logística + Árvore de Decisão + avaliação
ir-alem-1/nome-do-grupo-cardioia-portal/   # Ir Além 1 – portal React + Vite
ir-alem-2/                       # Ir Além 2 – MLP (Keras) para ECG
  diagnostico_ecg_mlp.ipynb
  exemplos/                      # PNGs gerados ao executar o notebook
```

## Como executar

Requisitos: Python 3.10+.

**Parte 1**
```bash
cd parte1
python extracao_diagnostico.py   # só usa a biblioteca padrão do Python
```

**Parte 2**
```bash
pip install pandas numpy matplotlib scikit-learn jupyter
cd parte2
jupyter notebook classificador_risco.ipynb
```

## Resumo do que foi feito

### Parte 1 – Extração de informações
- `sintomas_pacientes.txt`: 10 frases com o que o paciente sente, desde quando e como afeta a rotina.
- `mapa_conhecimento.csv`: associa pares de sintomas a 10 doenças (Angina, Infarto, Insuficiência Cardíaca, Arritmia, Hipertensão, Pericardite, Endocardite, Embolia Pulmonar, Miocardite, Estenose Aórtica).
- `extracao_diagnostico.py`: normaliza o texto (minúsculas, sem acento), procura cada sintoma do mapa na frase e soma pontos por doença. A doença com mais pontos é sugerida; empates e hipóteses secundárias são mostrados. Nas 10 frases, o diagnóstico sugerido corresponde ao esperado em todas.

### Parte 2 – Classificador de risco
- Base simulada `frase,situacao` balanceada (64 frases).
- TF-IDF (unigramas + bigramas) → Regressão Logística e Árvore de Decisão.
- Resultado na execução do notebook (divisão 75/25, `random_state=42`): **acurácia de 87,5%** nos dois modelos; recall de alto risco de 75% (há falsos negativos).
- Análise de vieses: o modelo erra frases com **negação** ("sem dor no peito" → alto risco), pois TF-IDF só vê palavras. Também discutimos viés de vocabulário, base pequena/simulada e o custo maior dos falsos negativos em triagem.

### Ir Além 1 e 2
Veja os READMEs dentro de cada pasta.

## Governança de dados
Todos os dados são **fictícios** (frases escritas pelo grupo e usuários da API fake JSONPlaceholder). Nenhum dado real de paciente foi usado, respeitando LGPD e privacidade.
