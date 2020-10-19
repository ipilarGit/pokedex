$(document).ready(function () {
  consumirAPI(pokkemon);
  canvasGenerarGrafico(nombre, stats);
});

function consumirAPI(nombrePokemon) {
  $.ajax({
    type: "GET",
    url: `https://pokeapi.co/api/v2/pokemon/${nombrePokemon}`,
    success: function (data) {
      let sprites = data.sprites.front_default;

      let imagenPokemon = `<img src="${sprites}" class="card-img-top" >`;
      $("#imagenPokemon").html(imagenPokemon);

      let nombre = data.name;
      let order = data.order;
      let weight = data.weight;

      let impresionLista = `
      <h5 class="card-title bg-yellow">Name: ${nombre}</h5>
      <h5 class="card-text bg-yellow">Order: ${order}</h5>
      <h5 class="card-text bg-yellow">Weight: ${weight}</h5>
      `;

      $("#lista").html(impresionLista);

      let stats = [];
      let datos = data.stats;

      datos.forEach(function (dato) {
        stats.push(dato.base_stat);
      });

      canvasGenerarGrafico(nombre, stats);
    },
    dataType: "json",
  });
}

// Gnerar grafico canvas
function canvasGenerarGrafico(nombre, stats) {
  let hp = stats[0];
  let attack = stats[1];
  let defense = stats[2];
  let specialAttack = stats[3];
  let specialDefense = stats[4];
  let speed = stats[5];

  //let titulo = "`Stats Base ${nombre}`";

  var chart = new CanvasJS.Chart("chartContainer", {
    theme: "dark2",
    exportFileName: "Doughnut Chart",
    exportEnabled: true,
    animationEnabled: true,
    title: {
      text: "Stats Base Pokemon",
    },
    legend: {
      cursor: "pointer",
      itemclick: explodePie,
    },
    data: [
      {
        type: "doughnut",
        innerRadius: 90,
        showInLegend: true,
        toolTipContent: "<b>{name}</b>: {y}",
        dataPoints: [
          { y: hp, name: "Puntos de Vida" },
          { y: attack, name: "Attack" },
          { y: defense, name: "Defense" },
          { y: specialAttack, name: "Special Attack" },
          { y: specialDefense, name: "Special Defense" },
          { y: speed, name: "speed" },
        ],
      },
    ],
  });
  chart.render();

  function explodePie(e) {
    if (
      typeof e.dataSeries.dataPoints[e.dataPointIndex].exploded ===
        "undefined" ||
      !e.dataSeries.dataPoints[e.dataPointIndex].exploded
    ) {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = true;
    } else {
      e.dataSeries.dataPoints[e.dataPointIndex].exploded = false;
    }
    e.chart.render();
  }
}

$("button").click(function () {
  let nombrePokemon = $("#nombre-pokemon").val();
  consumirAPI(nombrePokemon);
});
