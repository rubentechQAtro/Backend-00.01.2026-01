let $table = $("#table");
let $tableDespachos = $('#tableDespachos');
let $tableCaja = $('#tableCaja');
let arrClientes = [];
let arrDespachos = [];
let arrCaja = [];


const Heladeria = function () {
    console.log("Inicio de la aplicacion");
    let Nombre, Sucursal;
    function configurar() {
        document.getElementById("txtNombre").innerText = Nombre;
        $("#txtSucursal").text(Sucursal);
        $table.bootstrapTable({ data: arrClientes });
        $tableDespachos.bootstrapTable({ data: arrDespachos });
        $tableCaja.bootstrapTable({ data: arrCaja });
    }
    function eventos() {
        // document.getElementById('btnOrdenar').addEventListener("click",()=>{
        //     console.log("Hizo clic")
        // })
        $("#crearCliente").on("click", crearCliente);
        $("#cerrarVentana").on("click", (e) => {
            e.preventDefault();
            $("#tblOrdenes").show();
            $("#infoCliente").css('display', 'none');
        })
        $("#verDespachos").on("click", (e) => {
            e.preventDefault();
            $("#tblDespachos").show();
        })
        $("#verCaja").on("click", (e) => {
            e.preventDefault();
            $("#tblCaja").show();
        })
    }

    async function crearCliente(e) {
        e.preventDefault();
        // console.log("Hizo clic");
        const { value: formValues } = await Swal.fire({
            title: "Registro",
            html: `
            <input id="txtnombreCliente" class="swal2-input" placeholder="Dame tu nombre">
            <input id="txttelefonoCliente" class="swal2-input" placeholder="Dame tu telefono">
            <select id="txtsaborHelado" class="swal2-input" placeholder="Sabor de Helado">
             <input id="txttamañoHelado" class="swal2-input" placeholder="El tamaño">
              <input id="txttoppinsHelado" class="swal2-input" placeholder="Dame el topping">`,
            icon: "info",
            confirmButtonText: "Registrar",
            showCancelButton: true,
            didOpen: () => {
                const selectElement = document.getElementById('txtsaborHelado');

                // Dynamically add options
                const optionsData = [
                    { "value": "Vainilla", "text": "Vainilla" },
                    { "value": "Chocolate", "text": "Chocolate" },
                    { "value": "Fresa", "text": "Fresa" },
                    { "value": "Lucuma", "text": "Lucuma" },
                ];

                optionsData.forEach(optionData => {
                    const option = document.createElement('option');
                    option.value = optionData.value;
                    option.textContent = optionData.text;
                    selectElement.appendChild(option);
                });
            },
            preConfirm: () => {
                const nombreCliente = $("#txtnombreCliente").val();
                const telefonoCliente = document.getElementById("txttelefonoCliente").value;
                const saborHelado = $("#txtsaborHelado").val();
                const tamañoHelado = document.getElementById("txttamañoHelado").value;
                const toppinsHelado = document.getElementById("txttoppinsHelado").value;
                return {
                    nombreCliente, telefonoCliente, saborHelado, tamañoHelado, toppinsHelado, valor: 0, cobrado: false, estado: true
                }
            }
        });

        if (formValues) {
            arrClientes.push(formValues);
            mostrarCliente(formValues);
            $table.bootstrapTable("load", arrClientes);
        }
        console.log(arrClientes)
    }




    function mostrarCliente(obj) {
        $("#nombreCliente").val(obj.nombreCliente);
        $("#telefonoCliente").val(obj.telefonoCliente);
        $("#saborHelado").val(obj.saborHelado);
        $("#tamañoHelado").val(obj.tamañoHelado);
        $("#toppinsHelado").val(obj.toppinsHelado);
        $("#infoCliente").show();

    }
    return {
        init: function (parametros) {
            console.log(parametros);
            Nombre = parametros.nombre;
            Sucursal = parametros.sucursal;
            configurar();
            eventos();
        }
    }
}();



function ordenesFormatter(value, row, index) {
    if (row.estado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-brands fa-jedi-order">Despachar</i>',
            '</a>  ',
            '<a class="edit" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-solid fa-download">Editar</i>',
            '</a>  ',
            '<a class="remove" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-solid fa-download">Borrar</i>',
            '</a>  '
        ].join('')
    }
}

window.ordenesEvents = {
    'click .like': function (e, value, row, index) {
        despacharHelado(row)
        //  alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .edit': function (e, value, row, index) {
        editarSabor(row)
        // alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

function despacharHelado(obj) {
    console.log(arrClientes);
    arrDespachos.push(obj);
    const index = arrClientes.indexOf(obj);
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrClientes.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(arrClientes);
    $table.bootstrapTable('load', arrClientes);
    $tableDespachos.bootstrapTable('load', arrDespachos);
    console.log(obj);
}

function despachoFormatter(value, row, index) {
    if (row.estado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa fa-heart">Entregar</i>',
            '</a>  '
        ].join('')
    }
}

window.despachoEvents = {
    'click .like': function (e, value, row, index) {
        entregarHelado(row)
        //alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}
let entregarHelado = (obj) => {
    console.log(arrCaja);
    arrCaja.push(obj);
    const index = arrDespachos.indexOf(obj);
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrDespachos.splice(index, 1); // 2nd parameter means remove one item only
    }
    console.log(arrDespachos);
    $tableDespachos.bootstrapTable('load', arrDespachos);
    $tableCaja.bootstrapTable('load', arrCaja);
    console.log(obj);
}

function priceFormatter(data) {
    var field = this.field
    return '$' + data.map(function (row) {
        return +row[field]
    }).reduce(function (sum, i) {
        return sum + i
    }, 0)
}

function cobradoFormatter(value, row, index) {
    if (row.cobrado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-regular fa-sack-dollar">Cobrado</i>',
            '</a>  '
        ].join('')
    } else {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa-solid fa-circle-dollar-to-slot">Por Cobrar</i>',
            '</a>  '
        ].join('')
    }
}

function cajaFormatter(value, row, index) {
    if (row.estado) {
        return [
            '<a class="like" href="javascript:void(0)" id="btnDespachar" title="Like">',
            '<i class="fa fa-heart">Cobrar</i>',
            '</a>  '
        ].join('')
    }
}

window.cajaEvents = {
    'click .like': function (e, value, row, index) {
        cobrarHelado(row)
        //alert('You click like action, row: ' + JSON.stringify(row))
    },
    'click .remove': function (e, value, row, index) {
        $table.bootstrapTable('remove', {
            field: 'id',
            values: [row.id]
        })
    }
}

function cobrarHelado(obj) {
    console.log(arrCaja);
    const index = arrCaja.indexOf(obj);
    let precio = prompt("Pon el precio cobrado")
    console.log(index);
    if (index > -1) { // only splice array when item is found
        arrCaja[index].cobrado = true;
        arrCaja[index].precio = precio;
    }
    console.log(arrCaja);
    $tableCaja.bootstrapTable('load', arrCaja);
    console.log(obj);
}

function idFormatter() {
    return 'Total'
}

function nameFormatter(data) {
    return data.length
}


