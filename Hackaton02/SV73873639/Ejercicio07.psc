Algoritmo Ejercicio07
    Definir tipo Como Caracter
    Definir monto, desc, total Como Real
	
    Escribir "Ingrese monto de compra:"
    Leer monto
    Escribir "Ingrese tipo de membresía (A, B, C):"
    Leer tipo
	
    tipo <- Mayusculas(tipo)
	
    Segun tipo Hacer
        "A":
            desc <- 0.10
        "B":
            desc <- 0.15
        "C":
            desc <- 0.20
        De Otro Modo:
            desc <- 0
            Escribir "Tipo inválido (sin descuento)."
    FinSegun
	
    total <- monto * (1 - desc)
    Escribir "Descuento: ", desc * 100, "%"
    Escribir "Total: $", total
FinAlgoritmo
