
$(document).ready(function () {
    $('#btnCalcular').click(function (event) {
        event.preventDefault();
        iniciaCalculadora()
    });
});

$(document).ready(function () {
    $('#btnContinuar').click(function (event) {
        event.preventDefault();
        finalizoCalculadora()
    });
});


const mTxtSsOblig = " - Obligatorio por ser matricula plena";
fetch('https://cpcecba.org.ar/servicios/val.json')
    .then(response => {
      
        return response.json();
    })
    .then(data => {
        
        
        valores = data; 
    })
  
    


function buscoValorObjetoSimpleNumerico(objeto, clave) {
    return parseInt(objeto[clave]);
}

function iniciaCalculadora() {
    var iNom = undefined;
    var iTip = undefined;
    var iSsocOpc = undefined;
    let mAportaCps = false;
    let lblCps = $("#lblCps");
    var mTot = 0;
    //ahora, sumamos en un objeto.
    var mResumen = [];

    iTip = $("#inputTipoMat").val();

    let mVal = 0;
    switch (iTip) {

        case "P":
            //sumo derecho prof pleno
            mVal = buscoValorObjetoSimpleNumerico(valores, "dep");
            mResumen.push({ "Derecho por Ejercicio Profesional": mVal });
            mVal = 0;
            //sumo la obra social obligatoria


            mVal = 0;
            //vamos a la rutina que nos calcula servicios sociales... para los familiares..
            inicioCalculadoraServiciosSociales(true);

            mAportaCps = true;
            mVal = buscoValorObjetoSimpleNumerico(valores, "cps");
            mResumen.push({ "Aportes Caja de Prev. Social PCEC": mVal });
            lblCps.text("Se sumaron conceptos en aporte a la Caja de Jubilaciones - obligatorio");
            lblCps.show();
            guardoLs(mResumen);

        case "RD":
            //sumo derecho prof pleno
            mVal = buscoValorObjetoSimpleNumerico(valores, "depRd");
            mResumen.push({ "Derecho por Ejercicio Profesional - Relacion de Dependencia": mVal });
            mVal = 0;
            //sumo la obra social obligatoria


            mVal = 0;
            //vamos a la rutina que nos calcula servicios sociales... para los familiares..
            inicioCalculadoraServiciosSociales(false);

            mAportaCps = false;
        
            lblCps.text("No se sumaron conceptos en aporte a la Caja de Jubilaciones ya que es afiliado en relacion de dependencia, de todas formas no le ibamos a pagar tanto...");
            lblCps.show();
            guardoLs(mResumen);

            break;



        default:

            break;

    }

}

function finalizoCalculadora() {
    let mResumen = buscoLs("CalculadoraW7");
    
    cmbSsoc = $("#inputAfilSSoc");
    qAfilSsoc = parseInt($("#inputSsocOpt").val());
    //Calculo los montos de SSOC nomas y ya estariamos...
    if (cmbSsoc.val() == "Y") {
        mVal = buscoValorObjetoSimpleNumerico(valores, "ssociales");
        mResumen.push({ "Cuota de Afiliacion Servicios Sociales": mVal });
        mVal = 0;
        if (qAfilSsoc > 0) {
            mVal = (buscoValorObjetoSimpleNumerico(valores, "ssocialesFam") * qAfilSsoc);
            mResumen.push({ "Complemento Prestacion Ssociales Familiares": mVal });
            mVal = 0;
        }
    }
    guardoLs(mResumen);
    $("#cntResultado").show();
    presentoMontos(mResumen);
}

function guardoLs(dato) {
    let mDatGuardar = JSON.stringify(dato)
    localStorage.setItem("CalculadoraW7", mDatGuardar);
}

function buscoLs(clave) {
    let mData = JSON.parse(localStorage.getItem(clave));
    return mData;
}

function inicioCalculadoraServiciosSociales(mSsOblig = false) {
    let txtExtra = "";
    let iFamiliares = undefined;
    let lbl = $("#lblAfiliacionSsoc");
    let selectorSsoc = $("#inputAfilSSoc");
    let cntSsoc = $("#cntSsoc");
    if (mSsOblig) {
        txtExtra = mTxtSsOblig;
        lbl.text("Servicios sociales:" + mTxtSsOblig);
        selectorSsoc.empty();
        selectorSsoc.append(`
            <option value="Y">Si</option>
          `);
    } else {
        selectorSsoc.empty();
        selectorSsoc.append(`
            <option value="Y">Si</option>
            <option value="N">No</option>
          `);
    }
    cntSsoc.show();
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

function presentoMontos(resumen) {
    $('#grdResultado tbody').empty();

    let total = 0;

    resumen.forEach(item => {
        const itemName = Object.keys(item)[0];
        const amount = item[itemName];
        total += amount;

        $('#grdResultado tbody').append(`
            <tr>
                <td>${itemName}</td>
                <td>${amount}</td>
            </tr>
        `);
    });

    $('#grdResultado tbody').append(`
        <tr>
            <td><strong>Total</strong></td>
            <td><strong>${total}</strong></td>
        </tr>
    `);

    $('#cntResultado').show();
}