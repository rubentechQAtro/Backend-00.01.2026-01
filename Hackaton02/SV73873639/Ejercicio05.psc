Algoritmo Ejercicio05
    Definir cantidad Como Entero
    Definir precioUnit, subtotal, desc, total Como Real
	
    precioUnit <- 80
    Escribir "Ingrese cantidad de zapatos:"
    Leer cantidad
	
    subtotal <- cantidad * precioUnit
	
    Si cantidad >= 30 Entonces
        desc <- 0.40
    SiNo
        Si cantidad > 20 Y cantidad < 30 Entonces
            desc <- 0.20
        SiNo
            Si cantidad > 10 Entonces
                desc <- 0.10
            SiNo
                desc <- 0
            FinSi
        FinSi
    FinSi
	
    total <- subtotal * (1 - desc)
	
    Escribir "Subtotal: $", subtotal
    Escribir "Descuento: ", desc * 100, "%"
    Escribir "Total: $", total
FinAlgoritmo
