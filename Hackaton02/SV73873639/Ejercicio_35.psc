Algoritmo Ejercicio_35
    Definir i, num, mayor, menor Como Entero
    
    Para i <- 1 Hasta 20 Hacer
        Escribir "Dame el número ", i, ":"
        Leer num
        
        // Si es el primer número, lo asigno como base para comparar
        Si i = 1 Entonces
            mayor <- num
            menor <- num
        Sino
            // Si el nuevo número le gana al que tengo, lo actualizo
            Si num > mayor Entonces
                mayor <- num
            FinSi
            // Si el nuevo número es más chico que mi menor, lo guardo
            Si num < menor Entonces
                menor <- num
            FinSi
        FinSi
    FinPara
    
    Escribir "El más grande que encontré fue: ", mayor
    Escribir "Y el más pequeño fue: ", menor
FinAlgoritmo