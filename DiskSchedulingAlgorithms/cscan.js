function CSCAN() {
    // initialise the inputs
    let requestSequenceCscan = document.getElementById("Sequence").value;
    let headCScan = document.getElementById("Head").value;
    let direction = document.getElementById("Direction").value;
    requestSequenceCscan = requestSequenceCscan
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        });

    headCScan = +headCScan;
    requestSequenceCscan = requestSequenceCscan.toString()
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        }).map(function (a) { return +a; });

    requestFinalOrderCscan = [headCScan];
    tmp = 0;
    //Descending Order
    tmpAry = [];
    for (let i = 0; i < requestSequenceCscan.length; ++i) {
        tmpAry.push(requestSequenceCscan[i]);
    }
    requestSequenceCscanSorted = tmpAry.sort(function (a, b) {
        return b - a;
    });

    for (i = 0; i < requestSequenceCscanSorted.length; ++i) {
        if (headCScan > requestSequenceCscanSorted[i]) {
            tmp = i;
            break;
        }
    }

    if (direction === "Right") {
        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);

        if (requestFinalOrderCscan[requestFinalOrderCscan.length - 1] !== 199)
            requestFinalOrderCscan.push(199);

        for (i = requestSequenceCscanSorted.length - 1; i >= tmp; --i) {
            if (i === requestSequenceCscanSorted.length - 1 && requestSequenceCscanSorted[i] !== 0) {
                requestFinalOrderCscan.push(0);
            }
            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
        }
        totalSeekCountCscan = Math.abs(199 - headCScan + 199 + requestFinalOrderCscan[requestFinalOrderCscan.length - 1]);
    }

    else {

        for (i = tmp; i <= requestSequenceCscanSorted.length - 1; ++i) {
            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
        }

        if (requestFinalOrderCscan[requestFinalOrderCscan.length - 1] !== 0) {
            requestFinalOrderCscan.push(0);
        }

        for (i = 0; i < tmp; ++i) {
            if (i === 0 && requestSequenceCscanSorted[i] !== 199) {
                requestFinalOrderCscan.push(199);
            }
            requestFinalOrderCscan.push(requestSequenceCscanSorted[i]);
        }
        totalSeekCountCscan = Math.abs(headCScan + 199 + (199 - requestFinalOrderCscan[requestFinalOrderCscan.length - 1]));
    }


    // get result from sequence (array)
    let ele = document.getElementById('cscan_totalSeekCount');
    ele.innerText = totalSeekCountCscan;

    ele = document.getElementById('cscan_finalOrder');
    ele.innerText = '';
    for (h = 0; h < requestFinalOrderCscan.length - 1; ++h) {
        ele.innerText += requestFinalOrderCscan[h] + ", ";
    }
    ele.innerText += requestFinalOrderCscan[h];

    ele = document.getElementById('cscan_averageSeekCount');
    ele.innerText = (totalSeekCountCscan / (requestSequenceCscan.length - 1)).toFixed(2);

    ele = document.getElementById('chartContainer');
    ele.style.display = 'block';

    //for graph using canvaJS
    const ary = [];
    requestFinalOrderCscan.forEach(function (p) {
        ary.push({ y: p });
    });

    const chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        animationDuration: 300 * (ary.length - 1),
        theme: "light2",
        zoomEnabled: true,
        title: {
            text: ""
        },
        axisY: {
            title: "Disk Numbers",
            titleFontColor: "rgb(0,0,0)"
        },
        axisX: {
            title: "Request sequence",
            titleFontColor: "rgb(0,0,0)",
            minimum: 0,
            interval: 1
        },
        data: [{
            type: "line",
            indexLabelFontSize: 16,
            dataPoints: ary
        }]
    });
    chart.render();

    let modal = document.getElementById("myModal");

    let span = document.getElementsByClassName("close")[0];

    span.onclick = function () {
        modal.style.display = "none";
    }
}  