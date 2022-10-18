function SCAN() {
    // initialise the inputs
    let requestSequenceScan = document.getElementById("Sequence").value;
    let headScan = document.getElementById("Head").value;
    let direction = document.getElementById("Direction").value;
    requestSequenceScan = requestSequenceScan

        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        });

    headScan = +headScan;
    requestSequenceScan = requestSequenceScan.toString()
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        }).map(function (a) { return +a; });

    requestFinalOrderScan = [headScan];

    tmp = 0;

    //Ascending Order
    tmpAry = [];

    for (let i = 0; i < requestSequenceScan.length; ++i) {
        tmpAry.push(requestSequenceScan[i]);
    }
    // It will sort array in ascending order
    requestSequenceScanSorted = tmpAry.sort(function (a, b) {
        return a - b;
    });

    //loop will break when headScan is less than ith element and tmp=i
    for (i = 0; i < requestSequenceScanSorted.length; ++i) {
        if (headScan < requestSequenceScanSorted[i]) {
            tmp = i;
            break;
        }
    }
    if (direction === "Left") {
        for (i = tmp - 1; i >= 0; --i) {
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);
        }

        if (requestFinalOrderScan[requestFinalOrderScan.length - 1] !== 0) {
            requestFinalOrderScan.push(0);
        }

        for (i = tmp; i < requestSequenceScanSorted.length; ++i) {
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);
        }

        totalSeekCountScan = Math.abs(headScan + requestFinalOrderScan[requestFinalOrderScan.length - 1]);
    }
    else {
        for (i = tmp; i < requestSequenceScanSorted.length; ++i)
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);

        if (requestFinalOrderScan[requestFinalOrderScan.length - 1] !== 0)
            requestFinalOrderScan.push(199);

        for (i = tmp - 1; i >= 0; --i)
            requestFinalOrderScan.push(requestSequenceScanSorted[i]);

        totalSeekCountScan = Math.abs((199 - headScan) + (199 - requestFinalOrderScan[requestFinalOrderScan.length - 1]));

    }

    // get result from sequence (array)
    let ele = document.getElementById('scan_totalSeekCount');
    ele.innerText = totalSeekCountScan;

    ele = document.getElementById('scan_finalOrder');
    ele.innerText = '';
    for (h = 0; h < requestFinalOrderScan.length - 1; ++h) {
        ele.innerText += requestFinalOrderScan[h] + ", ";
    }
    ele.innerText += requestFinalOrderScan[h];

    ele = document.getElementById('scan_averageSeekCount');
    ele.innerText = (totalSeekCountScan / (requestSequenceScan.length - 1)).toFixed(2);

    ele = document.getElementById('chartContainer');
    ele.style.display = 'block';

    //for graph using canvaJS
    const ary = [];
    requestFinalOrderScan.forEach(function (p) {
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