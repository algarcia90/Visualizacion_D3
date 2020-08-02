//Declaracion de variables globales
var maph = 500
var mapw = 500
var graphh = 500
var graphw = 500
var margin = 20

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

    //creo un titulo para el grafico
    var title = graph_svg.append('text')
        .attr('y',15)
        .text('Total de alquileres por número de habitación')
        .attr('font-size','18px')

    //creo el tooltip para que aparezca despues
    var tooltip = d3.select('div').append('div')
        .attr('class', 'tooltip')
        .style('position', 'absolute') //Para obtener la posicion correcta sobre los circulos
        .style('pointer-events', 'none') //Para evitar el flicker
        .style('visibility', 'hidden')
        .style('background-color', '#FFF2BA')
        .style('border', 'solid')
        .style('border-width', '1px')
        .style('border-radius', '5px');
    
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

    //creacion de escalas
    var data = barrio.properties.avgbedrooms
    console.log(data)
    //var ymin = d3.min(data, (d)=> d.total);
    var ymax = d3.max(data, (d)=> d.total);

    var scaleX = d3.scaleBand()
        .domain(data.map(function(d){
            console.log(d.bedrooms)
            return d.bedrooms
        }))
        .range([2*margin,graphw])
        .padding(0.05);

    var scaleY = d3.scaleLinear()
        .domain([0,ymax])
        .range([graphh - margin,margin]);

    //creacion de ejes
    var xaxis = d3.axisBottom(scaleX);
    var yaxis = d3.axisLeft(scaleY);

    //Creo también una escala de colores para darle mejor visualización al gráfico
    var escalaColores = d3.scaleOrdinal(d3.schemeTableau10);

    //Agrego los rectángulos
    var rect = graph_svg.append('g')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x',(d) => scaleX(d.bedrooms))
        .attr('y',0)
        .attr('width', scaleX.bandwidth())
        .attr('height', function(d) {
            return ((graphh - margin)-scaleY(d.total))
        })
        .attr('fill',(d) => escalaColores(d.bedrooms))
        .on('mouseover', handleMouseOver)
        .on('mouseout',handleMouseOut)
    
    function handleMouseOver(d,i){
        d3.select(this)
            .transition()
            .duration(500)
            .attr('fill','black')
        
        tooltip.transition()
            .duration(400)
            .style('visibility', 'visible')
            .style('left', (d3.event.pageX + 20) + 'px')
            .style('top', (d3.event.pageY - 30) + 'px')
            .text(`Total de alquileres: ${d.total}`)
        };
        
    function handleMouseOut(d,i){
        d3.select(this)
            .transition()
            .duration(200)
            .attr('fill',(d) => escalaColores(d.bedrooms))

        tooltip.transition()
            .duration(100)
            .style('visibility', 'hidden')
    }

    //animacion de caida de los rectangulos
    var animation = rect.transition()
        .duration(3000)
        .ease(d3.easeElastic)
        .delay(0)
        .attr('y',(d) => scaleY(d.total));    

    //coloco los ejes
    graph_svg.append('g').attr('transform', 'translate(0, ' + (graphh - margin) + ')').call(xaxis);
    graph_svg.append('g').attr('transform','translate('+2*margin+',0)').call(yaxis);
};

