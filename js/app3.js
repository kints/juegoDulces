var delayTime = 500;
var animaDesa = 0;
var animaDesaTope = 3;
var arregloFichas = [];
var dulcesCol1 = [];
var dulcesCol2 = [];
var dulcesCol3 = [];
var dulcesCol4 = [];
var dulcesCol5 = [];
var dulcesCol6 = [];
var dulcesCol7 = [];
var columnas = [];
var dulcesFil1 = [];
var dulcesFil2 = [];
var dulcesFil3 = [];
var dulcesFil4 = [];
var dulcesFil5 = [];
var dulcesFil6 = [];
var dulcesFil7 = [];
var filas = [];
var score = 0;
var movimientos = 0;
var comV = false;
var conH = false;
var estadoInicial = true;

$(document).ready(function(){
  cambiarColor($("#main-titulo"));
  ponerCaramelos();
  $("#JuegoTerm").fadeOut();
  $("#btn-reinicio").click(function(){
    iniciaJuego();
  })

})
function extenderScorePanel(extender)
{
  if (extender)
  {
      $(".panel-score").animate(
        {
          width: '100%'
        },
        "slow"
      );
  }
  else {
    $(".panel-score").animate(
      {
        width: '25%'
      },
      "show"
    );
  }
}
var Cronometro = new (function() {
    var $countdown,
        //$form, // Form used to change the countdown time
        incrementTime = 60,
        currentTime = 12000,
        updateTimer = function() {
            $countdown.html(formatTime(currentTime));
            if (currentTime == 0) {
                Cronometro.Timer.stop();
                timerComplete();
                Cronometro.resetCountdown();
                return;
            }
            currentTime -= incrementTime / 10;
            if (currentTime < 0) currentTime = 0;
        },
        timerComplete = function() {
            detenerJuego();
        },
        init = function() {
            $countdown = $('#timer');
            Cronometro.Timer = $.timer(updateTimer, incrementTime, false);
        };
    this.resetCountdown = function() {
        currentTime =  12000;
    };
    this.iniciaCrono = function(){
      this.Timer.toggle();
    }
    $(init);
});
function iniciaJuego()
{
  $("#btn-reinicio").text("Reiniciar");
  $("#JuegoTerm").fadeOut();
  if(estadoInicial == false)
  {
    extenderScorePanel(false);
    $(".panel-tablero").fadeIn();
    $('.col-1').empty();
    $('.col-2').empty();
    $('.col-3').empty();
    $('.col-4').empty();
    $('.col-5').empty();
    $('.col-6').empty();
    $('.col-7').empty();
    ponerCaramelos();
  }
  movimientos = 0;
  $("#movimientos-text").html(movimientos);
  score = 0;
  $("#score-text").html(score);
  estadoInicial = false;
  Cronometro.iniciaCrono();
  revisar();
}
function detenerJuego()
{
  $("#JuegoTerm").fadeIn();
  extenderScorePanel(true);
  $("#btn-reinicio").text("Iniciar");
  $(".panel-tablero").slideToggle();
  estadoInicial =  false;
  desactivarEventoDulces();
}
function revisar()
{
  comV = false;
  conH = false;
  crearArreglos();
  desactivarEventoDulces();
  checarCombinaciones();
  if(comV || conH)
  {
    borrarComb();
  }
  agregarEventoDulces()
}
function crearArreglos()
{
  dulcesCol1 = $('.col-1').children();
  dulcesCol2 = $('.col-2').children();
  dulcesCol3 = $('.col-3').children();
  dulcesCol4 = $('.col-4').children();
  dulcesCol5 = $('.col-5').children();
  dulcesCol6 = $('.col-6').children();
  dulcesCol7 = $('.col-7').children();
  columnas = $([dulcesCol1, dulcesCol2, dulcesCol3, dulcesCol4, dulcesCol5, dulcesCol6, dulcesCol7]);
  dulcesFil1 = $([dulcesCol1.eq(0),dulcesCol2.eq(0),dulcesCol3.eq(0),dulcesCol4.eq(0),dulcesCol5.eq(0),dulcesCol6.eq(0),dulcesCol7.eq(0)]);
  dulcesFil2 = $([dulcesCol1.eq(1),dulcesCol2.eq(1),dulcesCol3.eq(1),dulcesCol4.eq(1),dulcesCol5.eq(1),dulcesCol6.eq(1),dulcesCol7.eq(1)]);
  dulcesFil3 = $([dulcesCol1.eq(2),dulcesCol2.eq(2),dulcesCol3.eq(2),dulcesCol4.eq(2),dulcesCol5.eq(2),dulcesCol6.eq(2),dulcesCol7.eq(2)]);
  dulcesFil4 = $([dulcesCol1.eq(3),dulcesCol2.eq(3),dulcesCol3.eq(3),dulcesCol4.eq(3),dulcesCol5.eq(3),dulcesCol6.eq(3),dulcesCol7.eq(3)]);
  dulcesFil5 = $([dulcesCol1.eq(4),dulcesCol2.eq(4),dulcesCol3.eq(4),dulcesCol4.eq(4),dulcesCol5.eq(4),dulcesCol6.eq(4),dulcesCol7.eq(4)]);
  dulcesFil6 = $([dulcesCol1.eq(5),dulcesCol2.eq(5),dulcesCol3.eq(5),dulcesCol4.eq(5),dulcesCol5.eq(5),dulcesCol6.eq(5),dulcesCol7.eq(5)]);
  dulcesFil7 = $([dulcesCol1.eq(6),dulcesCol2.eq(6),dulcesCol3.eq(6),dulcesCol4.eq(6),dulcesCol5.eq(6),dulcesCol6.eq(6),dulcesCol7.eq(6)]);
  filas = $([dulcesFil1, dulcesFil2, dulcesFil3, dulcesFil4, dulcesFil5, dulcesFil6, dulcesFil7]);
}
function cambiarColor(elemento){
  $(elemento).animate(
    {
      color: 'yellow'
    },2000,function(){
      otroCambioColor(elemento)
    }
  )
}
function otroCambioColor(elemento)
{
  $(elemento).animate(
    {
      color: 'white'
    },2000,function(){
      cambiarColor(elemento)
    }
  )
}
function ponerCaramelos()
{
  var columna;
  for (var i = 1; i <= 7; i++) {
    columna = ".col-"+i;
    $(columna).append(ponerColumna(i,7));
  }
}
function ponerColumna(columna,hasta)
{
  var nuevoDiv ="";

  for (var i = 1; i <=hasta; i++)
  {
    var num = (Math.floor(Math.random()*4)+1);
    nuevoDiv += crearficha(columna, i, num);
  }
  return nuevoDiv;
}
function crearficha(columna, fila, num)
{
  var srcIma = "image/"+num+".png";
  var nuevoDiv = "<div class='dulce"+num+"' id='dulceC"+columna+"F"+fila+"'></div>";
  //<img src='"+srcIma+"' />
  return nuevoDiv;
}
function checarCombinaciones()
{
  checarComb();
  checarCombVert();
}
function checarComb()
{
  var fichasFilaIguales = [];
//  var dulcesArr = [];
  var filaAct = [];

  for (var i = 0; i < 7; i++) {
    fichasFilaIguales.length = 0;
    filaAct = filas[i];
    var fichaDuceAnt = null;
    var fichaDulceAnt = null;
    for (var j = 0; j <= 6 ; j++) {
       var fichaDulceAct = $(filaAct).eq(j).eq(0).get(0).get(0);
      // console.log(fichaDulceAct.className);
       if (fichaDulceAnt != null)
       {
         var dulceAct = fichaDulceAct.className.split(" ")[0];
         var dulceAnt = fichaDulceAnt.className.split(" ")[0];
         if (dulceAct == dulceAnt)
         {
           if (fichasFilaIguales.length == 0)
           {
             fichasFilaIguales.push(j-1);
             fichasFilaIguales.push(j);
           }
           else {
             fichasFilaIguales.push(j);
           }
         }
         else {
           if (fichasFilaIguales.length < 3)
           {
             fichasFilaIguales.length = 0;
           }
           else {
             fichasFilaSeleccion(i,fichasFilaIguales)
             conH = true;
             fichasFilaIguales.length = 0;
           }
         }
       }

      fichaDulceAnt = fichaDulceAct;
    }
    if (fichasFilaIguales.length < 3)
    {
      fichasFilaIguales.length = 0;
    }
    else {
      //console.log(""+i+" "+j);
      fichasFilaSeleccion(i,fichasFilaIguales)
      conH = true;
      fichasFilaIguales.length = 0;
    }
  }
}
function checarCombVert()
{
  var fichasFilaIguales = [];
//  var dulcesArr = [];
  var filaAct = [];

  for (var i = 0; i < 7; i++) {
    fichasFilaIguales.length = 0;
    filaAct = columnas[i];
    var fichaDuceAnt = null;
    var fichaDulceAnt = null;
    for (var j = 0; j <= 6 ; j++) {
       var fichaDulceAct = $(filaAct).eq(j).eq(0).get(0);
      // console.log(fichaDulceAct.className);
       if (fichaDulceAnt != null)
       {
         var dulceAct = fichaDulceAct.className.split(" ")[0];
         var dulceAnt = fichaDulceAnt.className.split(" ")[0];
         if (dulceAct == dulceAnt)
         {
           if (fichasFilaIguales.length == 0)
           {
             fichasFilaIguales.push(j-1);
             fichasFilaIguales.push(j);
           }
           else {
             fichasFilaIguales.push(j);
           }
         }
         else {
           if (fichasFilaIguales.length < 3)
           {
             fichasFilaIguales.length = 0;
           }
           else {
             //console.log(""+i+" "+j);
             fichasColumnaSeleccion(i,fichasFilaIguales)
             comV = true;
             fichasFilaIguales.length = 0;
           }
         }
       }

      fichaDulceAnt = fichaDulceAct;
    }
    if (fichasFilaIguales.length < 3)
    {
      fichasFilaIguales.length = 0;
    }
    else {
      //console.log(""+i+" "+j);
      fichasColumnaSeleccion(i,fichasFilaIguales)
      comV = true;
      fichasFilaIguales.length = 0;
    }
  }
}
function fichasFilaSeleccion(fila,fichas)
{
  var filaAct = filas[fila];
  for (var i = 0; i < fichas.length; i++)
  {
    var ficha =  filaAct[fichas[i]];
    $(ficha).addClass("borrar");
    incrementarScore();
    //console.log(ficha.eq(0).get(0));
  }
}
function fichasColumnaSeleccion(fila,fichas)
{
  var filaAct = columnas[fila];
  for (var i = 0; i < fichas.length; i++)
  {
    var ficha =  filaAct[fichas[i]];
    $(ficha).addClass("borrar");
    incrementarScore();
    //console.log(ficha);
  }
}
function borrarComb()
{
  var agregarAun = true;
  $(".borrar")
        .animate({opacity: '0'},delayTime)
        .animate({opacity: '1'},delayTime)
        .animate({opacity: '0'},delayTime)
        .animate({opacity: '1'},delayTime)
        .animate({opacity: '0'},delayTime,function(){
          //console.log($(this));
          //$(this).remove();
          if (agregarAun)
          {
            $(".borrar").remove();
            crearArreglos();
            llenarColumnas();
            agregarAun = false;
            crearArreglos();
            revisar();
          }

        })

}
function agregarEventoDulces()
{
	$('.dulce2, .dulce3, .dulce4').draggable({
		containment: '.panel-tablero',
    helper: "clone",
    axis: "x,y",
    zIndex: 10,
    grid: [100, 100]
//    revert: true
	});
  $('.dulce1').draggable({
		containment: '.panel-tablero',
    helper: "clone",
    axis: "x,y",
    zIndex: 10,
    grid: [0, 100]
//    revert: true
	});
	$('.dulce1, .dulce2, .dulce3, .dulce4').droppable({
		drop: cambiarPosDulce
	});
	activarEventoDulces();
}

function desactivarEventoDulces() {
	$('.dulce1, .dulce2, .dulce3, .dulce4').draggable({disabled:true});
	$('.dulce1, .dulce2, .dulce3, .dulce4').droppable({disabled:true});
}

function activarEventoDulces() {
	$('.dulce1, .dulce2, .dulce3, .dulce4').draggable('enable');
	$('.dulce1, .dulce2, .dulce3, .dulce4').droppable('enable');
}
function cambiarPosDulce(event, dulceDrag) {
  desactivarEventoDulces();
	var cloneDrag = $(dulceDrag.draggable).clone();
	var cloneDrop = $(this).clone();
  $(dulceDrag.draggable).replaceWith(cloneDrop);
  $(this).replaceWith(cloneDrag);
	setTimeout(function () {
    agregarEventoDulces();
    incrementarMovimientos();
	}, 500);
}
function incrementarScore(){
  score +=10;
  $("#score-text").html(score);
}
function incrementarMovimientos(){
  movimientos += 1;
  $("#movimientos-text").html(movimientos);
  revisar();
}
function llenarColumnas()
{
  var filaAct = [];
  var filaNuevos = "";
  var filaTotal = "";
  var colLocal =0 ;
  for (var i = 0; i < 7; i++) {
    colLocal = i +1;
    filaAct = columnas[i];
    var cuantosFaltan = 7 - filaAct.length;
    filaNuevos = ponerColumna(i,cuantosFaltan);
    filaTotal = filaNuevos + $('.col-'+colLocal).html();
    $('.col-'+colLocal).html(filaTotal)
  }
}
function pad(number, length) {
    var str = '' + number;
    while (str.length < length) {str = '0' + str;}
    return str;
}
function formatTime(time) {
    var min = parseInt(time / 6000),
        sec = parseInt(time / 100) - (min * 60),
        hundredths = pad(time - (sec * 100) - (min * 6000), 2);
    return (min > 0 ? pad(min, 2) : "00") + ":" + pad(sec, 2);// + ":" + hundredths;
}
