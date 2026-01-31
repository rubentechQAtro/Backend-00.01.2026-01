// 8. Promedio de notas
Algoritmo Ejercicio_08
    Definir n1, n2, n3, prom Como Real
    Escribir "Ingresa tus 3 notas:"
    Leer n1, n2, n3
    prom <- (n1 + n2 + n3) / 3
    Escribir "Tu promedio es: ", prom
    // Aquí asumo que apruebas con 10 o más. ¿En tu país con cuánto se aprueba?
    Si prom >= 10 Entonces
        Escribir "¡Felicidades, aprobaste!"
    Sino
        Escribir "Lo siento, nos vemos en el examen de recuperación."
    FinSi
FinAlgoritmo
