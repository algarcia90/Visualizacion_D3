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
        .padding(0.2);

    var scaleY = d3.scaleLinear()
        .domain([0,ymax])
        .range([graphh - margin,margin]);

    //Creo también una escala de colores para darle mejor visualización al gráfico
    var escalaColores = d3.scaleOrdinal(d3.schemeTableau10);

    //Agrego los rectángulos
    var rect = graph_svg.append('g')
        .selectAll('rect')
        .data(data)
        .enter()
        .append('rect')
        .attr('x',(d) => scaleX(d.bedrooms))
        .attr('y',(d) => scaleY(d.total))
        .attr('width', scaleX.bandwidth())
        .attr('height', function(d) {
            return ((graphh - margin)-scaleY(d.total))
        })
        .attr('fill',(d) => escalaColores(d.bedrooms))
    /*
    var text = svg.append('g')
    .selectAll('text')
    .data(input)
    .enter()
    .append('text')
    .attr('x',(d)=> scaleX(d.platform) + scaleX.bandwidth()/2)
    .attr('y',(d)=> scaleY(d.value) - 5)
    .attr('visibility','hidden')
    .text((d) => d.value)


    console.log(input.map(function(d) {
        return scaleY(d.value);
    }))

    var raton = rect.on('mouseover',function(d){
        d3.select(this)
            .attr('class','')
            .attr('fill','orange')
        })
        .on('mouseout',function(d) {
            d3.select(this).attr('fill',(d) => d.color).attr('class',function(d) {return (d.value > 12)? 'rectwarning':''})
        });

    var animationG = rect.transition()
        .duration(2000)
        .ease(d3.easeBounce)
        .delay(1000)
        .attr('y',(d)=> scaleY(d.value))
        .attr('height', function(d) {
            return height/2 - scaleY(d.value)
        });

    var animationT = text.transition()
        .delay(3000)
        .attr('visibility','visible')
    svg.append('g').call(yaxis);*/
    var xaxis = d3.axisBottom(scaleX);
    var yaxis = d3.axisLeft(scaleY);
    graph_svg.append('g').attr("transform", "translate(0, " + (graphh - margin) + ")").call(xaxis);
    graph_svg.append('g').attr('transform','translate('+2*margin+',0)').call(yaxis);
};

