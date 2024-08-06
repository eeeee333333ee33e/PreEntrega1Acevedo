//inicio del programa.

//defino constantes con los precios basicos:

const mDerProf = 7000;
const mDerProfRd = mDerProf / 2;
const mSsociales = 15000;
const mSsocialesFam = 17000;
const mCps = 10000;
const mTxtSsOblig = "(Afiliación obligatoria por matricula plena) ";

function iniciaCalculadora() {
    var iNom = undefined;
    var iTip = undefined;
    var iSsocOpc = undefined;
    var mTot = 0;
    while (chkNull(iNom)) {
        iNom = prompt("Bienvenido al Consejo, por favor, ingrese su nombre para asesorarlo mejor.")
        console.log("mgBox")
    }

    while ((iTip != "P") && (iTip != "RD")) {
        iTip = prompt("Muchas gracias " + iNom + ", por favor, ahora ingrese las letras P si desea una matricula plena, o RD si desea una matricula en relación de dependencia. Debe escribirlas en mayusculas.")
    }

    switch (iTip) {
        case "P":
            //sumo derecho prof pleno
            mTot = mTot + mDerProf;
            //sumo la obra social obligatoria
            mTot = mTot + mSsociales;
            //vamos a la rutina que nos calcula servicios sociales... para los familiares..
            mTot = mTot + calculadoraServiciosSociales(true);
            //finalmente, sumamos la caja, que tambien es obligatoria
            mTot = mTot + mCps;
            alert("Se sumaron $" + mCps + ", en concepto de la CPS, que es obligatoria por ser plena la matricula.")
            break;

        case "RD":
            mTot = mTot + mDerProfRd;

            iSsocOpc = prompt("Sr. Profesional, lo invitamos a afiliarse a Servicios Sociales, escriba NO para no afiliarse. Debe estar en mayúsculas, caso contrario lo afiliaremos!.");

            if (iSsocOpc != "NO") {
                mTot = mTot + mSsociales;
                mTot = mTot + calculadoraServiciosSociales(false);
            }
            alert("Ud. Esta exento de la CPS por ser matriculado en Relación de Dependencia. Disfrute el ahorro, y no tener jubilación (igual no le ibamos a pagar tanto).");

            break;

        default:
            iniciaCalculadora();
            break;
            
    }
    presentoMontos(iNom, mTot);
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
        iFamiliares = parseInt(prompt("Su monto de Servicios Sociales " + txtExtra + "es de: $ " + mSsociales + ", si desea sumar familiares opcionales, escriba la cantidad, caso contrario, escriba el numero 0 (cero)."));
        if (!isNaN(iFamiliares) && iFamiliares >= 0) {
            break;
        }
    }
    return montoOptSsociales(iFamiliares);
}

function montoOptSsociales(qFamiliares = 0) {
    return qFamiliares * mSsocialesFam;
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

function presentoMontos(iNom, mTot) {
    alert("Estimado profesional: " + iNom + " , le informamos que debera abonar para el Consejo y la Caja : $ " + mTot + ". Muchas gracias por usar nuestra web.");
    return;
}