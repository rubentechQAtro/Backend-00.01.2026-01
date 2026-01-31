Algoritmo Ejercicio_32
    Definir prov, ciu, poblacion, maxPoblacion Como Entero
    Definir nombreCiudad, ciudadMasPoblada Como Caracter
    maxPoblacion <- 0
    
    // Usamos ciclos anidados: 3 provincias
    Para prov <- 1 Hasta 3 Hacer
        Escribir "--- Provincia ", prov, " ---"
        // 11 ciudades por provincia (según el enunciado)
        Para ciu <- 1 Hasta 11 Hacer
            Escribir "Nombre de la ciudad ", ciu, ":"
            Leer nombreCiudad
            Escribir "Población de ", nombreCiudad, ":"
            Leer poblacion
            
            // Si la población actual es mayor a la que tenemos guardada
            Si poblacion > maxPoblacion Entonces
                maxPoblacion <- poblacion
                ciudadMasPoblada <- nombreCiudad
            FinSi
        FinPara
    FinPara
    
    Escribir "La ciudad con más población es ", ciudadMasPoblada, " con ", maxPoblacion, " habitantes."
FinAlgoritmo