Algoritmo Ejercicio_40
    Definir pi_aprox, d1, d2, d3 Como Real
    Definir i, iter Como Entero
    Escribir "Ingresa el número de iteraciones para Nilakantha:"
    Leer iter
    
    pi_aprox <- 3 // Esta serie arranca desde el número 3
    
    Para i <- 1 Hasta iter Hacer
        // Calculo los tres números consecutivos: (2*i), (2*i+1), (2*i+2)
        d1 <- 2 * i
        d2 <- 2 * i + 1
        d3 <- 2 * i + 2
        
        Si i Mod 2 <> 0 Entonces
            pi_aprox <- pi_aprox + (4 / (d1 * d2 * d3))
        Sino
            pi_aprox <- pi_aprox - (4 / (d1 * d2 * d3))
        FinSi
    FinPara
    
    Escribir "Pi aproximado con Nilakantha es: ", pi_aprox
FinAlgoritmo