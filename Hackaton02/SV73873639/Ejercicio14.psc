// 14. ¿Es primo? (del 1 al 10)
Algoritmo Ejercicio_14
    Definir n Como Entero
    Escribir "Ingresa un número del 1 al 10:"
    Leer n
    // Como el rango es pequeño, los marco directamente: 2, 3, 5, 7 son primos.
    Si n=2 O n=3 O n=5 O n=7 Entonces
        Escribir "Es un número primo."
    Sino
        Escribir "No es primo (o está fuera de rango)."
    FinSi
FinAlgoritmo