//inicio del programa.

//defino constantes con los precios basicos:

const mDerProf = 7000;
const mDerProfRd = mDerProf / 2;
const mSsociales = 15000;
const mSsocialesFam = 17000;
const mCps = 10000;
const mTxtSsOblig = "(Afiliación obligatoria por matricula plena) ";
const valores = {dep:mDerProf, depRd:mDerProfRd, ssociales: mSsociales, ssocialesFam : 17000, cps: 10000 };

function buscoValorObjetoSimpleNumerico(objeto, clave){
    return parseInt(objeto[clave]);
}

function iniciaCalculadora() {
    var iNom = undefined;
    var iTip = undefined;
    var iSsocOpc = undefined;
    var mTot = 0;
    //ahora, sumamos en un objeto.
    var mResumen = [];
    while (chkNull(iNom)) {
        iNom = prompt("Bienvenido al Consejo, por favor, ingrese su nombre para asesorarlo mejor.")
    }

    while ((iTip != "P") && (iTip != "RD")) {
        iTip = prompt("Muchas gracias " + iNom + ", por favor, ahora ingrese las letras P si desea una matricula plena, o RD si desea una matricula en relación de dependencia. Debe escribirlas en mayusculas.")
    }
    let mVal = 0;
    switch (iTip) {
        
        case "P":
            //sumo derecho prof pleno
            mVal = buscoValorObjetoSimpleNumerico(valores, "dep");
            mResumen.push({"Derecho por Ejercicio Profesional": mVal});
            mVal = 0;
            //sumo la obra social obligatoria
            mVal = buscoValorObjetoSimpleNumerico(valores, "ssociales");
            mResumen.push({"Cuota Servicios Sociales": mVal});
            mVal = 0;
            //vamos a la rutina que nos calcula servicios sociales... para los familiares..
            mVal = calculadoraServiciosSociales(true);
            if (mVal > 0) {
                mResumen.push({"Complemento S. Sociales - Familiares": mVal});    
            }
            mVal = 0
            //finalmente, sumamos la caja, que tambien es obligatoria
            mVal = buscoValorObjetoSimpleNumerico(valores, "cps");
            mResumen.push({"Aportes Caja de Prev. Social PCEC": mVal});    
            alert("Se sumaron $" + buscoValorObjetoSimpleNumerico(valores, "cps") + ", en concepto de la CPS, que es obligatoria por ser plena la matricula.")
            break;

        case "RD":
            mVal = buscoValorObjetoSimpleNumerico(valores, "depRd");
            mResumen.push({"Derecho por Ej. Prof. - Rel. de Dependencia": mVal});
            mVal = 0;

            iSsocOpc = prompt("Sr. Profesional, lo invitamos a afiliarse a Servicios Sociales, escriba NO para no afiliarse. Debe estar en mayúsculas, caso contrario lo afiliaremos!.");

            if (iSsocOpc != "NO") {
                mVal = buscoValorObjetoSimpleNumerico(valores, "ssociales");
                mResumen.push({"Cuota Servicios Sociales": mVal});
                mVal = 0;
                mVal = calculadoraServiciosSociales(false);
                if (mVal > 0) {
                    mResumen.push({"Complemento S. Sociales - Familiares": mVal});
                }
                
            }
            alert("Ud. Esta exento de la CPS por ser matriculado en Relación de Dependencia. Disfrute el ahorro, y no tener jubilación (igual no le ibamos a pagar tanto).");

            break;

        default:
            iniciaCalculadora();
            break;
            
    }
    presentoMontos(iNom, mResumen);
}


function calculadoraServiciosSociales(mSsOblig = false) {
    var txtExtra = "";
    var iFamiliares = undefined;
    if (mSsOblig) {
        txtExtra = mTxtSsOblig;
    }
    //Esta funcion devuelve el monto de servicios sociales
    //aca no uso chknull por que pueden responder 0...

    while (true) {
        iFamiliares = parseInt(prompt("Su monto de Servicios Sociales " + txtExtra + "es de: $ " + buscoValorObjetoSimpleNumerico(valores, "ssociales") + ", si desea sumar familiares opcionales, escriba la cantidad, caso contrario, escriba el numero 0 (cero)."));
        if (!isNaN(iFamiliares) && iFamiliares >= 0) {
            break;
        }
    }
    return parseInt(montoOptSsociales(iFamiliares));
}

function montoOptSsociales(qFamiliares = 0) {
    return qFamiliares * buscoValorObjetoSimpleNumerico(valores, "ssocialesFam");
}
function chkNull(value) {
    if (value === undefined) {
        return true;
    }
    if (value === null) {
        return true;
    }
    if (value === "") {
        return true;
    }
    if (value === 0) {
        return true;
    }

    return false;
}

function presentoMontos(iNom, mResumen) {
    var total = 0;
    var txtAlert = "Estimado profesional - "+iNom+": le acercamos como se conformará su cedulón de pago:\n";
    mResumen.forEach(item => {
        Object.entries(item).forEach(([clave, valor]) => {
            txtAlert += "$ " + valor + " - " + clave + ".- \n";
            total = total + valor;
        });
    });
    txtAlert += "==================\n";
    txtAlert += "Total: $ " + total + ".- Gracias por usar nuestra calculadora";
    alert(txtAlert);
    return;
}