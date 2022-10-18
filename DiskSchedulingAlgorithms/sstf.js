//SSTF ALGORITHM
function SSTF() {

  // taking inputs through DOM
  let requestSequenceSstf = document.getElementById("Sequence").value;
  let headSstf = document.getElementById("Head").value;

  // slicing sequence through comma
  requestSequenceSstf = requestSequenceSstf
    .split(/ |,/)
    .filter(function (character) {
      return character !== "";
    });

    headSstf = +headSstf;
    requestSequenceSstf = requestSequenceSstf.toString()
        .split(/ |,/)
        .filter(function (character) {
            return character !== "";
        }).map(function (a) { return +a; });

  const len = requestSequenceSstf.length;

  // main algorithm
  // initialize final sequence
  requestFinalOrderSstf = [headSstf];

  // initialize total seek time
  totalSeekCountSstf = 0;

  for (i = 0; i < len; ++i) {

    // array of difference of sequence nummbers
    let tmp = [];
    for (j = 0; j < requestSequenceSstf.length; ++j) {
      tmp.push(
        Math.abs(
          requestFinalOrderSstf[requestFinalOrderSstf.length - 1] -
          requestSequenceSstf[j]
        )
      );
    }

    // gets the mininum value from tmp[]
    var minIndex = tmp.indexOf(Math.min.apply(null, tmp));

    // add minimum value -> final sequence
    totalSeekCountSstf += tmp[minIndex];
    requestFinalOrderSstf.push(requestSequenceSstf[minIndex]);

    // delete the value pushed to final sequence from request sequence
    requestSequenceSstf.splice(minIndex, 1);
  }


  // printing output
  let ele = document.getElementById("sstf_totalSeekCount");
  ele.innerText = totalSeekCountSstf;
  
  ele = document.getElementById("sstf_finalOrder");
  ele.innerText = "";
  for (h = 0; h < requestFinalOrderSstf.length - 1; ++h) {

    ele.innerText += requestFinalOrderSstf[h] + ", ";

  }
  ele.innerText += requestFinalOrderSstf[h];

  ele = document.getElementById("sstf_averageSeekCount");
  ele.innerText = (totalSeekCountSstf / (requestFinalOrderSstf.length - 1)).toFixed(2);

  ele = document.getElementById('chartContainer');
  ele.style.display = 'block';

  //for graph using canvaJS
  const ary = [];
  requestFinalOrderSstf.forEach(function (p) {
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

  // let span = document.getElementsByClassName("close")[0];

  // // span.onclick = function () {
  // //     modal.style.display = "none";
  // // }

  // span.addEventListener('click', function(){
  //    alert("Hi");
  //   });
}
