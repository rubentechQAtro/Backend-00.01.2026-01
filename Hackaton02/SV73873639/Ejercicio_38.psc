Algoritmo Ejercicio_38
    Definir n, i, suma Como Entero
    Escribir "Dime un número y te diré si es perfecto:"
    Leer n
    
    suma <- 0
    // Busco divisores desde 1 hasta antes de llegar al número
    Para i <- 1 Hasta n - 1 Hacer
        Si n Mod i = 0 Entonces
            suma <- suma + i // Si lo divide exacto, lo sumo
        FinSi
    FinPara
    
    // Si la suma de divisores es igual al número, ¡es perfecto!
    Si suma = n Entonces
        Escribir n, " es un número perfecto. ¡Qué elegancia!"
    Sino
        Escribir n, " no es perfecto."
    FinSi
FinAlgoritmo