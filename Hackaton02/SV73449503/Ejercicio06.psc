Proceso Ejercicio06
	
	Definir  sueldo, horast, horase, horas Como Entero 
	
	horast <- 20
	horase <- 25
	
	Escribir "Cuantas horas a trabajado"
	Leer horas
	
	Si horas <= 40 Entonces
		sueldo <- horas * horast
	SiNo
		sueldo <- (40 * horast) + ((horas - 40) * horase)
	FinSi
	
	Escribir "Sueldo es de ", sueldo
	
	
FinProceso


//Hacer un algoritmo en Pseint para ayudar a un trabajador a saber cuál será su sueldo semanal, 
//se sabe que si trabaja 40 horas o menos, se le pagará $20 por hora, 
//pero si trabaja más de 40 horas entonces las horas extras se le pagarán a $25 por hora.



