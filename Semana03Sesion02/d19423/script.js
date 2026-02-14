console.log("Inicio de la aplicacion");

let isPrendido = false;

console.log(typeof (isPrendido));

let arrHobies = ["Tocar el bajo", "Aeromodelismo", "Gunpla"];

for (let index = 0; index < arrHobies.length; index++) {
    const element = arrHobies[index];
    console.log(element)
}

for (let index = 0; index < 10; index++) {
    console.log(index)
}


let arrFormas = [true, "string", 44.99, [33, 55, 66]];

console.log(arrFormas[2])

console.log(arrFormas[3][2])

console.log(typeof (arrHobies));

let objPersona = {
    nombre: "Roberto",
    apellido: "Pineda",
    edad: 42,
    hobbies: [
        "Aeromodelismo",
        "Gunpla"
    ],
    padre: {
        nombre: "Rene",
        apellido: "Pineda"
    },
    madre: {
        nombre: "Miriam",
        apellido: "Lopez"
    }
};

console.log(objPersona.apellido)
console.log(objPersona.hobbies[1])

let edad = 52;

let terceraEdad = edad >= 50 ? "Estas viejo" : "Disfruta tu juventud";

console.log(edad >= 50 ? "Estas viejo" : "Disfruta tu juventud");

let fecha = new Date();

if (fecha.getDay() == 1) {
    console.log("Lunes")
}
if (fecha.getDay() == 2) {
    console.log("Martes")
}

switch (fecha.getDay()) {
    case 1:
        console.log("Lunes")
        break;
    case 2:
        console.log("Martes");
        break;
    case 3:
        console.log("miercoles");
        break;
    case 4:
        console.log("Jueves de clases");
        break;
    default:
        console.log("Cualquier otro dia")
        break;
}

let semaforo = "amarillo";

switch (semaforo) {
    case "rojo":
        console.log("Detente")
        break;
    case "amarillo":
        console.log("Mira a todos lados ten cuidado");
        break;
    case "verde":
        console.log("Pasa");
        break;
    default:
        break;
}


let bandera = true;
let inicio = 190;

while (bandera) {
    console.log(`Este es el numero actual: ${inicio}`);
    inicio++;
    if (inicio === 200) {
        bandera = false;
    }
}

inicio = 0
bandera = true;

do {
    console.log(`Este es el numero actual: ${inicio}`);
    inicio++;
    if (inicio === 200) {
        bandera = false;
    }
} while (bandera);