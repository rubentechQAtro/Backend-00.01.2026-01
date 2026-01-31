Algoritmo Ejercicio_36
    Definir n, a, b, c, i Como Entero
    Escribir "¿Cuántos términos de Fibonacci quieres ver?"
    Leer n
    
    // Los dos primeros números de la serie siempre son 0 y 1
    a <- 0
    b <- 1
    
    Para i <- 1 Hasta n Hacer
        Escribir a // Muestro el número actual
        c <- a + b // Calculo el siguiente sumando los dos anteriores
        a <- b     // Muevo el valor de 'b' a 'a' para la siguiente vuelta
        b <- c     // El resultado nuevo ahora es mi 'b'
    FinPara
FinAlgoritmo