Algoritmo Ejercicio_23
    Definir n, i, suma_impares Como Entero
    Escribir "Ingrese el número límite (n):"
    Leer n
    
    suma_impares <- 0
    
    Para i <- 1 Hasta n Hacer
        // Un número es impar si el residuo de dividirlo entre 2 no es 0
        Si i Mod 2 <> 0 Entonces
            suma_impares <- suma_impares + i
        FinSi
    FinPara
    
    Escribir "La suma de los impares hasta ", n, " es: ", suma_impares
FinAlgoritmo