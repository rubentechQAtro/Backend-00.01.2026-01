// 18. Venta de CDs y Ganancias
Algoritmo Ejercicio_18
    Definir cant Como Entero
    Definir precio, total, ganancia Como Real
    Escribir "¿Cuántos CDs quieres?"
    Leer cant
    // Determino el precio unitario según la escala del enunciado.
    Si cant >= 500 Entonces
        precio <- 6
    Sino
        Si cant >= 100 Entonces
            precio <- 7
        Sino
            Si cant >= 10 Entonces
                precio <- 8
            Sino
                precio <- 10
            FinSi
        FinSi
    FinSi
    total <- cant * precio
    ganancia <- total * 0.0825
    Escribir "Total para el cliente: $", total
    Escribir "Ganancia del vendedor (8.25%): $", ganancia
FinAlgoritmo