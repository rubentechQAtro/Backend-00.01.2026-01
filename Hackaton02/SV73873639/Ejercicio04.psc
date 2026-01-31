// 4. Ordenar tres números de menor a mayor
Algoritmo Ejercicio_04
    Definir a, b, c Como Entero
    Escribir "Dame tres números separados por espacio:"
    Leer a, b, c
    // Aquí me toca comparar todos contra todos. ¿Te imaginas hacerlo con 100 números? ¡Sería una locura!
    Si a <= b Y a <= c Entonces
        Si b <= c Entonces
            Escribir a, ", ", b, ", ", c
        Sino
            Escribir a, ", ", c, ", ", b
        FinSi
    Sino
        Si b <= a Y b <= c Entonces
            Si a <= c Entonces
                Escribir b, ", ", a, ", ", c
            Sino
                Escribir b, ", ", c, ", ", a
            FinSi
        Sino
            Si a <= b Entonces
                Escribir c, ", ", a, ", ", b
            Sino
                Escribir c, ", ", b, ", ", a
            FinSi
        FinSi
    FinSi
FinAlgoritmo