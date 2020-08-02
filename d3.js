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

    var projection = d3.geoMercator()
        .fitSize([mapw, maph], featureCollection)

    console.log(projection)

    //preparo la función para crear paths
    var pathProjection = d3.geoPath().projection(projection);
    var features = featureCollection.features;

    var createdPath = map_svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', (d) => pathProjection(d))
        .attr("opacity", function(d, i) {
            d.opacity = 1
            return d.opacity
        });

/* 
    var scaleColor = d3.scaleOrdinal(d3.schemeTableau10);


    createdPath.on('click', handleClick)
        //Asignamos un color a cada path a traves de nuestra escala de colores
    createdPath.attr('fill', (d) => scaleColor(d.properties.name));

    //Creacion de una leyenda
    var nblegend = 10;
    var widthRect = (width / nblegend) - 2;
    var heightRect = 10;

    var scaleLegend = d3.scaleLinear()
        .domain([0, nblegend])
        .range([0, width]);
        
    var legend = svg.append("g")
        .selectAll("rect")
        .data(d3.schemeTableau10)
        .enter()
        .append("rect")
        .attr("width", widthRect)
        .attr("height", heightRect)
        .attr("x", (d, i) => scaleLegend(i)) // o (i * (widthRect + 2)) //No haria falta scaleLegend
        .attr("fill", (d) => d);

    var text_legend = svg.append("g")
        .selectAll("text")
        .data(d3.schemeTableau10)
        .enter()
        .append("text")
        .attr("x", (d, i) => scaleLegend(i)) // o (i * (widthRect + 2))
        .attr("y", heightRect * 2.5)
        .text((d) => d)
        .attr("font-size", 12)

    //Captura de eventos Click
    function handleClick(d) {
        d.opacity = d.opacity ? 0 : 1;
        d3.select(this).attr('opacity', d.opacity);
        console.log(d.properties.name);
    }
}*/

};

function pieMaker(featureCollection){
    console.log(featureCollection)
};

