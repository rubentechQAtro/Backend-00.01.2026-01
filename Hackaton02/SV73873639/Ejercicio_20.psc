Algoritmo Ejercicio_20
    Definir n1, n2, n3, n4, mayor, pares Como Entero
    Definir media Como Real
    
    Escribir "Ingrese 4 números enteros positivos:"
    Leer n1, n2, n3, n4
    
    // 1. Contar pares (Corregido: Usamos 'Mod' y bloques completos)
    pares <- 0
    Si n1 Mod 2 = 0 Entonces
        pares <- pares + 1
    FinSi
    
    Si n2 Mod 2 = 0 Entonces
        pares <- pares + 1
    FinSi
    
    Si n3 Mod 2 = 0 Entonces
        pares <- pares + 1
    FinSi
    
    Si n4 Mod 2 = 0 Entonces
        pares <- pares + 1
    FinSi
    
    Escribir "Cantidad de números pares: ", pares
    
    // 2. Determinar el mayor (Corregido: Bloques separados)
    mayor <- n1
    Si n2 > mayor Entonces
        mayor <- n2
    FinSi
    
    Si n3 > mayor Entonces
        mayor <- n3
    FinSi
    
    Si n4 > mayor Entonces
        mayor <- n4
    FinSi
    
    Escribir "El mayor de todos es: ", mayor
    
    // 3. Si el tercero es par, cuadrado del segundo
    Si n3 Mod 2 = 0 Entonces
        Escribir "El cuadrado del segundo es: ", n2 * n2
    FinSi
    
    // 4. Si el primero < cuarto, calcular media
    Si n1 < n4 Entonces
        media <- (n1 + n2 + n3 + n4) / 4
        Escribir "La media de los 4 números es: ", media
    FinSi
    
    // 5. Condición compuesta: n2 > n3 y n3 entre 50 y 700
    Si n2 > n3 Entonces
        Si n3 >= 50 Y n3 <= 700 Entonces
            Escribir "La suma total es: ", (n1 + n2 + n3 + n4)
        FinSi
    FinSi
    
FinAlgoritmo