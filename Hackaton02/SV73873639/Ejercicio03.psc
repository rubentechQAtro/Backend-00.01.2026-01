// 3. ¿Termina en 4?
Algoritmo Ejercicio_03
    Definir num Como Entero
    Escribir "Dame un número:"
    Leer num
    // Aquí uso un truco: si lo divido entre 10, el resto (Mod) me da la última cifra.
    Si num Mod 10 = 4 O num Mod 10 = -4 Entonces
        Escribir "Sí, termina en 4."
    Sino
        Escribir "No termina en 4."
    FinSi
FinAlgoritmo