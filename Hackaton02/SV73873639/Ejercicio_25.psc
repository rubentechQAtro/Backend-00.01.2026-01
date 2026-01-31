Algoritmo Ejercicio_25
    Definir n, factorial, auxiliar Como Entero
    Escribir "Ingrese el número (Método descendente):"
    Leer n
    
    factorial <- 1
    auxiliar <- n // Usamos una variable auxiliar para no perder el número original
    
    // Mientras el número sea mayor que 0, multiplicamos y restamos
    Mientras auxiliar > 0 Hacer
        factorial <- factorial * auxiliar
        auxiliar <- auxiliar - 1
    FinMientras
    
    Escribir "Resultado del factorial: ", factorial
FinAlgoritmo