// 1. iTiene tres digitos?
Algoritmo Ejercicio_01
    Definir num Como Entero
    Escribir "Dime un nÚmero y te diri si tiene 3 cifras:"
    Leer num
    // Pienso: un nÚmero de 3 digitos esti entre 100 y 999 (o -999 y -100)
    Si (num >= 100 Y num <= 999) O (num <= -100 Y num >= -999) Entonces
        Escribir "Efectivamente! Tiene tres digitos."
    Sino
        Escribir "Nop, ese no tiene tres digitos."
    FinSi
FinAlgoritmo