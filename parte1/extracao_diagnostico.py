# -*- coding: utf-8 -*-
"""
CardioIA - Fase 2 - Parte 1: extração de sintomas e sugestão de diagnóstico
Autoria: Marina Clara

Sistema simples baseado em regras (não usa machine learning):
  1. Lê as frases dos pacientes em sintomas_pacientes.txt.
  2. Lê o mapa de conhecimento em mapa_conhecimento.csv, onde cada linha
     associa dois sintomas a uma doença.
  3. Procura cada sintoma do mapa dentro da frase.
  4. Cada sintoma encontrado soma um ponto para a doença da linha.
  5. A doença com mais pontos é a sugerida.

Uso: python extracao_diagnostico.py
"""

import csv
import unicodedata
from collections import defaultdict
from pathlib import Path

# Pasta do próprio script, para funcionar de qualquer diretório.
PASTA = Path(__file__).parent


def normalizar(texto: str) -> str:
    """Deixa o texto em minúsculas e sem acentos, para a busca não depender
    de como o paciente ou o mapa foram escritos ("Tórax" = "torax")."""
    decomposto = unicodedata.normalize("NFD", texto.lower())
    return "".join(c for c in decomposto if unicodedata.category(c) != "Mn")


def carregar_frases(caminho: Path) -> list[str]:
    """Lê o .txt (uma frase por linha) ignorando linhas vazias."""
    with open(caminho, encoding="utf-8") as f:
        return [linha.strip() for linha in f if linha.strip()]


def carregar_mapa(caminho: Path) -> list[tuple[str, str, str]]:
    """Lê o .csv e devolve uma lista de (sintoma1, sintoma2, doença).
    Os sintomas já ficam normalizados. Alguns são só o radical da palavra
    (ex.: "desmai" casa com desmaio, desmaiei, desmaiou)."""
    mapa = []
    with open(caminho, encoding="utf-8", newline="") as f:
        for linha in csv.DictReader(f):
            mapa.append((
                normalizar(linha["Sintoma 1"]),
                normalizar(linha["Sintoma 2"]),
                linha["Doença Associada"],
            ))
    return mapa


def extrair_sintomas(frase: str, mapa) -> set[str]:
    """Devolve os sintomas do mapa que aparecem na frase."""
    frase_norm = normalizar(frase)
    encontrados = set()
    for s1, s2, _ in mapa:
        for sintoma in (s1, s2):
            if sintoma in frase_norm:
                encontrados.add(sintoma)
    return encontrados


def sugerir_diagnostico(sintomas: set[str], mapa) -> list[tuple[str, int]]:
    """Soma um ponto por sintoma encontrado em cada linha do mapa e devolve
    as doenças ordenadas da maior pontuação para a menor."""
    pontos = defaultdict(int)
    for s1, s2, doenca in mapa:
        for sintoma in (s1, s2):
            if sintoma in sintomas:
                pontos[doenca] += 1
    return sorted(pontos.items(), key=lambda par: par[1], reverse=True)


def main():
    frases = carregar_frases(PASTA / "sintomas_pacientes.txt")
    mapa = carregar_mapa(PASTA / "mapa_conhecimento.csv")

    for i, frase in enumerate(frases, start=1):
        sintomas = extrair_sintomas(frase, mapa)
        ranking = sugerir_diagnostico(sintomas, mapa)

        print(f"\nPaciente {i}: {frase}")
        print(f"  Sintomas identificados: {sorted(sintomas) or 'nenhum'}")
        if not ranking:
            print("  Diagnóstico sugerido: nenhum (sintomas fora do mapa)")
            continue
        melhor = ranking[0][1]
        # Se houver empate no topo, mostra todas as doenças empatadas.
        topo = [d for d, p in ranking if p == melhor]
        print(f"  Diagnóstico sugerido: {', '.join(topo)} ({melhor} ponto(s))")
        outros = [f"{d} ({p})" for d, p in ranking if p < melhor]
        if outros:
            print(f"  Outras hipóteses: {', '.join(outros)}")

    print("\nAviso: protótipo acadêmico, não substitui avaliação médica.")


if __name__ == "__main__":
    main()
