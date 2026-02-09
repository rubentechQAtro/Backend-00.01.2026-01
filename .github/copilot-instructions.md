# Copilot Instructions for Backend-00.01.2026-01

## Project Overview
This is an educational backend course repository containing PSeInt algorithm exercises organized by week/session and student ID. Each folder contains progressively complex algorithmic problems (40 exercises total in Hackaton02).

## Codebase Structure

### Directory Layout
- **Hackaton02/**: Main exercise set with 40 problems (Ejercicio01-40)
  - Each student ID folder (d19423, SV003007187, SV73873639) contains solutions
  - **SV73873639/** is the primary active folder with complete implementations
- **Semana02Sesion01/** & **Semana02Sesion02/**: Weekly session materials
  - Semana02Sesion02 contains calculator examples (Calculadora.psc variants)

## Language & Environment

### PSeInt Pseudocode
All algorithm files use **PSeInt** pseudocode language (.psc extension). Key syntax:
```
Algoritmo NombreAlgoritmo
    Definir variable Como TipoDato
    Leer variable
    Escribir "Output:", variable
FinAlgoritmo
```

**Language Constructs:**
- **Control Flow**: Si/Sino/FinSi, Para/FinPara, Mientras/FinMientras, Repetir/HastaQue
- **Data Types**: Entero, Real, Caracter, Lógico
- **Operators**: Mod (modulo), <- (assignment), Y/O (logical AND/OR)
- **Input/Output**: Leer (input), Escribir (output)

## Coding Conventions

### Naming & Comments
- Algorithm names follow exercise convention: `Algoritmo Ejercicio_XX` or `Algoritmo Ejercicio01`
- Code includes inline comments explaining logic (see [Ejercicio_21.psc](Hackaton02/SV73873639/Ejercicio_21.psc#L8) for comment examples)
- Spanish variable names are standard: `num`, `factorial`, `poblacion`, `maxPoblacion`

### Problem-Solving Patterns

**Simple Decision Logic** ([Ejercicio01.psc](Hackaton02/SV73873639/Ejercicio01.psc)):
- Use Si/Sino for conditional checks
- Include explanatory comments ("Pienso: ...")
- Example: Check three-digit numbers using range conditions with Y (AND) operator

**Loops with Accumulators** ([Ejercicio_21.psc](Hackaton02/SV73873639/Ejercicio_21.psc)):
- Initialize accumulator variables (factorial <- 1, maxPoblacion <- 0)
- Use Para loops for fixed iterations, Mientras for conditional loops
- Perform arithmetic in loop body

**Nested Loops** ([Ejercicio_32.psc](Hackaton02/SV73873639/Ejercicio_32.psc)):
- Structure as two-level loops (provinces/cities, provinces/years)
- Track maximum/minimum values across iterations
- Read input in nested structure matching the problem's logical grouping

## Key File Patterns

| Exercise Type | Example File | Key Concept |
|---|---|---|
| Conditionals | [Ejercicio01.psc](Hackaton02/SV73873639/Ejercicio01.psc) | Range checking with compound conditions |
| Modulo operations | [Ejercicio10.psc](Hackaton02/SV73873639/Ejercicio10.psc) | num Mod 2 = 0 for parity |
| Loops & accumulation | [Ejercicio_21.psc](Hackaton02/SV73873639/Ejercicio_21.psc) | Factorial: factorial <- factorial * i |
| Nested loops | [Ejercicio_32.psc](Hackaton02/SV73873639/Ejercicio_32.psc) | Multi-level iteration with state tracking |

## External Resources
- **Exercise specifications**: [Google Doc with all 40 problems and solutions](https://docs.google.com/document/d/1ZMb6nLeQR8Aye5SpzuOSXXYpRhPjLGu--l4mZslikvQ/edit?usp=sharing)
- Student: Daniela Cristina Sánchez Vargas (SV73873639)

## Common Tasks

**Solving a New Exercise:**
1. Read problem requirements from [Hackaton02/readme.md](Hackaton02/readme.md)
2. Implement using PSeInt syntax (Algoritmo → Definir → Input → Logic → Output → FinAlgoritmo)
3. Add explanatory comments above complex sections
4. Test variable initialization (accumulators must start at identity values: 1 for ×, 0 for +)

**Checking Logic Patterns:**
- Refer to existing solutions for similar problem types
- Modulo checks: use `num Mod X = 0` for divisibility
- Comparisons: use Y (AND) and O (OR) for compound conditions
- Loops: Para for counts, Mientras for conditions

## Development Workflow
- Save files with descriptive names: Ejercicio##.psc or Ejercicio_##.psc  
- Test pseudocode in PSeInt interpreter
- Sync with upstream using: `git fetch fuentes && git merge fuentes/main main`
