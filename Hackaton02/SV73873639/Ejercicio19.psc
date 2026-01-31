Algoritmo Ejercicio_19
	Definir id, dias Como Entero
	Definir salarioDia, pago Como Real
	
	Escribir "ID empleado: 1=Cajero, 2=Servidor, 3=Preparador, 4=Mantenimiento"
	Leer id
	Escribir "Días trabajados (0..6):"
	Leer dias
	
	// Primero me aseguro de que no me mientas con los días trabajados
	Si dias < 0 O dias > 6 Entonces
		Escribir "¡Oye! Nadie puede trabajar esos días en una semana."
	SiNo
		// Aquí busco cuánto gana cada quien según su ID
		Segun id Hacer
			1: salarioDia <- 56
			2: salarioDia <- 64
			3: salarioDia <- 80
			4: salarioDia <- 48
			De Otro Modo:
				salarioDia <- -1 // Uso el -1 para marcar que el ID no existe
		FinSegun
		
		// Si el ID fue malo, aviso. Si no, ¡a pagar!
		Si salarioDia < 0 Entonces
			Escribir "Ese ID de empleado no está en nuestra base de datos."
		SiNo
			pago <- salarioDia * dias
			Escribir "El pago que te corresponde es: $", pago
		FinSi
	FinSi
FinAlgoritmo