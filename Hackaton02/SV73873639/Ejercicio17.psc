// 17. La hora dentro de un segundo
Algoritmo Ejercicio_17
    Definir h, m, s Como Entero
    Escribir "Dime la hora (H M S):"
    Leer h, m, s
    s <- s + 1 // Le sumo el segundo
    // Si los segundos llegan a 60, reinicio y sumo un minuto, y así con las horas.
    Si s = 60 Entonces
        s <- 0
        m <- m + 1
    FinSi
    Si m = 60 Entonces
        m <- 0
        h <- h + 1
    FinSi
    Si h = 24 Entonces
        h <- 0
    FinSi
    Escribir "La hora un segundo después será: ", h, ":", m, ":", s
FinAlgoritmo