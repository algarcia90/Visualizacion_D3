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

    //defino el ToolTip para luego
    var tooltip = d3.select('div').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute') //Para obtener la posicion correcta sobre los circulos
        .style('pointer-events', 'none') //Para evitar el flicker
        .style('visibility', 'hidden')
        .style('background-color', '#FFF2BA')
        .style('border', 'solid')
        .style('border-width', '1px')
        .style('border-radius', '5px');

    //creacion de la proyeccion
    var projection = d3.geoMercator()
        .fitSize([mapw, maph], featureCollection)

    console.log(projection)

    //preparo la función para crear paths
    var pathProjection = d3.geoPath().projection(projection);
    var features = featureCollection.features;
    var avgmax = d3.max(features,(d) => d.properties.avgprice)

    console.log(avgmax)

    //Agrego un titulo al mapa    
    var title = map_svg.append('text')
    .attr('y',20)
    .style('background-color', 'white')
    .text('Precio medio del alquiler por Barrios (Madrid)');

    //creo los barrios en el mapa
    var createdPath = map_svg.selectAll('path')
        .data(features)
        .enter()
        .append('path')
        .attr('d', (d) => pathProjection(d))
        .attr('opacity', function(d, i) {
            d.opacity = (d.properties.avgprice) ? 0.7:0.2
            return d.opacity
        })
        .attr('fill',(d) => d3.interpolateRdYlGn((1 - d.properties.avgprice/avgmax)**3))
        .on('mouseover',handleMouseOver)
        .on('mouseout',handleMouseOut);

    //gestion del mouse
    function handleMouseOver(d, i) {
        d3.select(this)
            .transition()
            .duration(1000)
            .attr('opacity', 1)
            .style('border','solid')
            .style('border-width', '2px')
            .style('border-color','black')

        tooltip.transition()
            .duration(400)
            .style('visibility', 'visible')
            .style('left', (d3.event.pageX + 20) + 'px')
            .style('top', (d3.event.pageY - 30) + 'px')
            .text(` Barrio: ${d.properties.name}, Precio Medio: ${d.properties.avgprice} Eur `)
    
    }
    
    function handleMouseOut(d, i) {
        d3.select(this)
            .transition()
            .duration(200)
            .attr('opacity', function(d, i) {
                d.opacity = (d.properties.avgprice) ? 0.7:0.1
                return d.opacity
            })
    
        tooltip.transition()
            .duration(200)
            .style('visibility', 'hidden')
    }
};

function pieMaker(featureCollection){
    console.log(featureCollection)
};

