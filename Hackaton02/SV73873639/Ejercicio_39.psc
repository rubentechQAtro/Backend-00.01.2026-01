Algoritmo Ejercicio_39
    Definir pi_aprox, den Como Real
    Definir i, iter Como Entero
    Escribir "Ingresa el número de iteraciones (recomiendo más de 1000):"
    Leer iter
    
    pi_aprox <- 0
    den <- 1
    
    Para i <- 1 Hasta iter Hacer
        // Si la posición es impar sumo, si es par resto
        Si i Mod 2 <> 0 Entonces
            pi_aprox <- pi_aprox + (4 / den)
        Sino
            pi_aprox <- pi_aprox - (4 / den)
        FinSi
        den <- den + 2 // El denominador siempre sube de 2 en 2 (1, 3, 5, 7...)
    FinPara
    
    Escribir "Valor aproximado de Pi: ", pi_aprox
FinAlgoritmo