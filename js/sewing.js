clearForm = () => {
    document.getElementById("circleform").reset();
} 

setMeasurementType = () => {
    let skirt_ln = document.getElementById('skirt_length');
    let waist_ln = document.getElementById('waist_measurement');
    let temp_measurement_preference = document.getElementsByName('measurement_pref');
    let measurement_preference = 'in';

    for (x = 0; x < temp_measurement_preference.length; x++) {
        if (temp_measurement_preference[x].checked) {
            measurement_preference = temp_measurement_preference[x].value;
        }
    }

    if (measurement_preference === 'in') {
        skirt_ln.innerHTML = 'Skirt Length (in)';
        waist_ln.innerHTML = 'Waist Measurement (in)';
    } else if (measurement_preference === 'cm') {
        skirt_ln.innerHTML = 'Skirt Length (cm)';
        waist_ln.innerHTML = 'Waist Measurement (cm)';
    }
}

convertMeasurement = () => {

    /* Let's get all of the input from the forms */
    let temp_measurement_preference = document.getElementsByName('measurement_pref');
    let measurement_preference = 'in';
    let measure_waist = parseInt(document.getElementById('waist_ln').value);
    let measure_skirtlength = parseInt(document.getElementById('skirt_ln').value);
    let temp_skirttype  = document.getElementsByName('skirt_type');
    let skirttype;
    let skirttype_cuttingimage = './images/';
    let skirttype_skirtimage = './images/';
    /* ========================================= */

    for (x = 0; x < temp_measurement_preference.length; x++) {
        if (temp_measurement_preference[x].checked) {
            measurement_preference = temp_measurement_preference[x].value;
        }
    }

    for (y = 0; y < temp_skirttype.length; y++) {
        if (temp_skirttype[y].checked) {
            skirttype = parseInt(temp_skirttype[y].value);
            switch (temp_skirttype[y].id) {
                case 'full':
                    skirttype_cuttingimage = skirttype_cuttingimage + 'full-circle-cutting.png';
                    skirttype_skirtimage = skirttype_skirtimage + 'full-skirt.png';
                    break;
                case 'half':
                    skirttype_cuttingimage = skirttype_cuttingimage + 'half-circle-cutting.png';
                    skirttype_skirtimage = skirttype_skirtimage + 'half-skirt.png';                
                    break;
                case 'quarter':
                    skirttype_cuttingimage = skirttype_cuttingimage + 'quarter-circle-cutting.png';
                    skirttype_skirtimage = skirttype_skirtimage + 'quarter-skirt.png';
                    break;
                default:
                    break;
            }
        }
    }

    /* Let's do some math */
    // calculate seam allowance and fabric measurement type depending on preference.
    let seamallowance = .625;
    let fabricmeasurement = 36;
    let fabricmeasurement_type = 'yd';
    if (measurement_preference === 'cm')  {
        seamallowance = 2;
        fabricmeasurement = 100;
        fabricmeasurement_type = 'm';
    }
    //first, we want to calculate the waist radius
    let a = ((skirttype * measure_waist) / (2 * Math.PI)) - seamallowance;
    let c = Math.round(100 * a) / 100;
    //second, let's figure out fabric width
    //waist radius + skirt length + 1/2" for hem + 1/2" for waist seam allowance
    let d = c + measure_skirtlength + (2 * seamallowance); 
    let fabric_length = Math.round(100 * (d / fabricmeasurement)) / 100;
    d = Math.round(d);
    /**********************/

    /**** Let's put it together ***/
    let divbox = document.getElementById('resultsbox');
    divbox.innerHTML = 
        `<div class="row">
        <div class="col-sm-12 text-center mb-3">
            <h3 class="results">Results</h3>
        </div>
    </div>
    <div class="row  mb-3">
        <div class="col-sm-12 col-md-12 col-lg-3">
            <div class="card text-center">
                <div class="card-header"> Waist Radius (${measurement_preference})</div>  
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${c}</li>
                </ul>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-3">
            <div class="card text-center">
                <div class="card-header"> Seam Allowance & Hem each (${measurement_preference})</div>  
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${seamallowance}</li>
                </ul>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-3">
            <div class="card text-center">
                <div class="card-header"> Fabric Length (${fabricmeasurement_type})</div>  
                <ul class="list-group list-group-flush">
                    <li class="list-group-item">${fabric_length}</li>
                </ul>
            </div>
        </div>
        <div class="col-sm-12 col-md-12 col-lg-3">
        <div class="card text-center">
            <div class="card-header"> Fabric Width (${fabricmeasurement_type})</div>  
            <ul class="list-group list-group-flush">
                <li class="list-group-item">${d}</li>
            </ul>
        </div>
    </div>
    </div>
    <div class="row">
        <div class="col-sm-12  col-md-12 col-lg-3 my-auto">
            <img class="my-auto" id="skirt_type" src="${skirttype_skirtimage}">
        </div>
        <div class="col-sm-12 col-md-12 col-lg-9">
            <img id="circleskirt" src="${skirttype_cuttingimage}">
        </div>
    </div>`;
}

