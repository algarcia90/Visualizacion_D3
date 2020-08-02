//Declaracion de variables globales
var maph = 500
var mapw = 500
var graphh = 500
var graphw = 500

//creación de lienzos

var map_svg = d3.select('div')
    .append('svg')
    .attr('id','map')
    .attr('width', mapw)
    .attr('height', maph)
    .append('g');

var graph_svg = d3.select('div')
    .append('svg')
    .attr('id','graph')
    .attr('width', graphw)
    .attr('height', graphh)
    .append('g');

//Importación de datos
d3.json('practica_airbnb.json').then((featureCollection) => {
    console.log(featureCollection);
    mapMaker(featureCollection);
    pieMaker(featureCollection);
});

function mapMaker(featureCollection){
    console.log(featureCollection)
};

function pieMaker(featureCollection){
    console.log(featureCollection)
};

