// Javascript program to demonstrate
// FCFS Disk Scheduling algorithm

function FCFS() {

    // taking inputs through DOM
    let requestSequenceFcfs = document.getElementById("Sequence").value;
    let headFcfs = document.getElementById("Head").value;

    // slicing sequence through comma
    requestSequenceFcfs = requestSequenceFcfs
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        });
    headFcfs = +headFcfs;
    requestSequenceFcfs = requestSequenceFcfs.toString()
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        }).map(function (a) { return +a; });


    // total seek time
    var totalSeekCountFcfs = Math.abs(requestSequenceFcfs[0] - headFcfs);

    // initialize final sequence
    requestFinalOrderFcfs = [headFcfs];

    // main algorithm
    // pushing from request sequence -> final sequence
    for (i = 0; i < requestSequenceFcfs.length; ++i) {
        requestFinalOrderFcfs.push(requestSequenceFcfs[i]);
    }


    // calculate seek-time
    for (i = 1; i < requestSequenceFcfs.length; ++i) {
        totalSeekCountFcfs += Math.abs(
            requestSequenceFcfs[i] - requestSequenceFcfs[i - 1]
        );
    }


    // printing output
    let ele = document.getElementById('fcfs_totalSeekCount');
    ele.innerText = totalSeekCountFcfs;

    ele = document.getElementById('fcfs_finalOrder');
    ele.innerText = '';
    for (h = 0; h < requestFinalOrderFcfs.length - 1; ++h) {
        ele.innerText += requestFinalOrderFcfs[h] + ", ";
    }
    ele.innerText += requestFinalOrderFcfs[h];

    ele = document.getElementById('fcfs_averageSeekCount');
    ele.innerText = (totalSeekCountFcfs / (requestFinalOrderFcfs.length - 1)).toFixed(2);

    ele = document.getElementById('chartContainer');
    ele.style.display = 'block';

    //for graph using canvaJS
    const ary = [];
    requestFinalOrderFcfs.forEach(function (p) {
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