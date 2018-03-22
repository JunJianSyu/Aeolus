/**
 * Author: JunJianSyu
 * Email: junjian1992@gmail.com
 * Date: 2017/11/12
 */
import React, { Component } from 'react'
import { connect } from 'react-redux'
import * as d3 from 'd3'
import '../static/styles/Dashboard.css'

class Home extends Component {
    static Spiral(d3_Spiral) {
        let width = 500,
            height = 500,
            start = 0,
            end = 2.25,
            numSpirals = 3,
            margin = {top:50,bottom:50,left:50,right:50};

        let theta = function(r) {
            return numSpirals * Math.PI * r
        }

        // used to assign nodes color by group
        let color = d3.scaleOrdinal(d3.schemeCategory10)
        let r = d3.min([width, height]) / 2 - 40

        let radius = d3.scaleLinear()
            .domain([start, end])
            .range([40, r]);

        let svg = d3.select(d3_Spiral).append("svg")
            .attr("width", width + margin.right + margin.left)
            .attr("height", height + margin.left + margin.right)
            .append("g")
            .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")")

        let points = d3.range(start, end + 0.001, (end - start) / 1000)

        let spiral = d3.radialLine()
            .curve(d3.curveCardinal)
            .angle(theta)
            .radius(radius);

        let path = svg.append("path")
            .datum(points)
            .attr("id", "spiral")
            .attr("d", spiral)
            .style("fill", "none")
            .style("stroke", "steelblue");

        let spiralLength = path.node().getTotalLength(),
            N = 365,
            barWidth = (spiralLength / N) - 1;
        let someData = [];
        for (let i = 0; i < N; i++) {
            let currentDate = new Date();
            currentDate.setDate(currentDate.getDate() + i);
            someData.push({
                date: currentDate,
                value: Math.random(),
                group: currentDate.getMonth()
            });
        }

        let timeScale = d3.scaleTime()
            .domain(d3.extent(someData, function(d){
                return d.date
            }))
        .range([0, spiralLength])

        // yScale for the bar height
        let yScale = d3.scaleLinear()
            .domain([0, d3.max(someData, function(d){
                return d.value
            })])
            .range([0, (r / numSpirals) - 30])

        svg.selectAll("rect")
            .data(someData)
            .enter()
            .append("rect")
            .attr("x", function(d, i){
                let linePer = timeScale(d.date),
                    posOnLine = path.node().getPointAtLength(linePer),
                    angleOnLine = path.node().getPointAtLength(linePer - barWidth);

                d.linePer = linePer; // % distance are on the spiral
                d.x = posOnLine.x; // x postion on the spiral
                d.y = posOnLine.y; // y position on the spiral

                d.a = (Math.atan2(angleOnLine.y, angleOnLine.x) * 180 / Math.PI) - 90; //angle at the spiral position

                return d.x
            })
            .attr("y", function(d){
                return d.y
            })
            .attr("width", function(d){
                return barWidth;
            })
            .attr("height", function(d){
                return yScale(d.value);
            })
            .style("fill", function(d){return color(d.group)})
            .style("stroke", "none")
            .attr("transform", function(d){
                return "rotate(" + d.a + "," + d.x  + "," + d.y + ")" // rotate the bar
            })

        // add date labels
        let tF = d3.timeFormat("%b %Y"),
            firstInMonth = {};

        svg.selectAll("text")
            .data(someData)
            .enter()
            .append("text")
            .attr("dy", 10)
            .style("text-anchor", "start")
            .style("font", "10px arial")
            .append("textPath")
            // only add for the first of each month
            .filter(function(d) {
                let sd = tF(d.date)
                if (!firstInMonth[sd]){
                    firstInMonth[sd] = 1;
                    return true;
                }
                return false;
            })
            .text(function(d){
                return tF(d.date);
            })
            // place text along spiral
            .attr("xlink:href", "#spiral")
            .style("fill", "grey")
            .attr("startOffset", function(d){
                return ((d.linePer / spiralLength) * 100) + "%"
            })


        let tooltip = d3.select(d3_Spiral)
                .append('div')
                .attr('class', 'tooltip');
            tooltip.append('div')
                .attr('class', 'date');
            tooltip.append('div')
                .attr('class', 'value');

        svg.selectAll("rect")
            .on('mouseover', function(d) {

                tooltip.select('.date').html("Date: <b>" + d.date.toDateString() + "</b>");
                tooltip.select('.value').html("Value: <b>" + Math.round(d.value*100)/100 + "<b>");

                d3.select(this)
                    .style("fill","#FFFFFF")
                    .style("stroke","#000000")
                    .style("stroke-width","2px");

                tooltip.style('display', 'block');
                tooltip.style('opacity',2);

            })
            .on('mousemove', function(d) {
                tooltip.style('top', (d3.event.layerY + 10) + 'px')
                .style('left', (d3.event.layerX - 25) + 'px');
            })
            .on('mouseout', function(d) {
                d3.selectAll("rect")
                .style("fill", function(d){return color(d.group);})
                .style("stroke", "none")

                tooltip.style('display', 'none');
                tooltip.style('opacity',0);
            });
    }
    componentDidMount() {
        // Spiral
        Home.Spiral(this.Spiral)
    }
    render() {
        return (
            <div className='main-dashboard'>
                <div className='d3-item Spiral' ref={(Spiral) => {this.Spiral = Spiral}}></div>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {}
}
const mapDispatchToProps = (dispatch) => {
    return {}
}

export default connect(mapStateToProps, mapDispatchToProps)(Home)