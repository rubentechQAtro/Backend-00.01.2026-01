Algoritmo Ejercicio_33
    Definir respuesta Como Caracter
    // Empiezo asumiendo que el usuario sí quiere entrar al menos una vez
    respuesta <- "s"
    
    Mientras respuesta = "s" O respuesta = "S" Hacer
        Escribir "Estoy ejecutando la lógica principal del programa..."
        
        // Aquí le pregunto al usuario si quiere repetir el proceso
        Escribir "¿Quieres que continúe? (s/n):"
        Leer respuesta
    FinMientras
    
    Escribir "He terminado porque tú me lo pediste."
FinAlgoritmo