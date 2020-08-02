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
    graphMaker(featureCollection);
});

function mapMaker(featureCollection){
    console.log(featureCollection)
};

function graphMaker(featureCollection){
    var id_hood = 0
    var max_rents = 0
    
    //Busco el barrio con el mayor numero de alquileres para hacer la representacion
    var hoodSearch = function(){    
        featureCollection.features.forEach((d,i) => {
            total = 0
            d.properties.avgbedrooms.forEach((b) => {
                total = total + b.total
            })
            id_hood = (max_rents > total) ? id_hood : i
            max_rents = (max_rents > total) ? max_rents : total
            console.log(i + '  ' + d.properties.name + ': total habitaciones ' + total)
        });
    };
    //console.log(id_hood + '  ' + max_rents)
    //console.log(featureCollection.features[id_hood].properties.name)

    barrio = featureCollection.features[id_hood]
    console.log(barrio)
};

