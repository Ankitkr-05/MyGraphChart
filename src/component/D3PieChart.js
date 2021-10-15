import * as d3 from "d3";

const WIDTH = 960;
const HEIGHT = 450;
var radius = Math.min(WIDTH, HEIGHT) / 2.5;


var colorDynamic = d3.scaleOrdinal(d3.schemeDark2);


export default class D3Chart{
    constructor(element, wholeVal){
        console.log("Hello Report Component Start From here:::")
        console.log("And also Pie chart:::")

        const dataSets = wholeVal;

        const vis = this;

        vis.svg = d3.select(element)
                        .append("svg")
                        .attr("width", WIDTH)
                        .attr("height", HEIGHT + 50)
                                      

        vis.statusData = dataSets[0];
        vis.failData = dataSets[1];
        vis.blockData = dataSets[2];
        vis.AdminData = dataSets[3];

        vis.updates("Status")
    }


    updates = (Assignee) => {

        const vis = this;

        vis.filteredData = (Assignee == "Status") ? vis.statusData :
                           (Assignee == "Fail") ? vis.failData :
                           (Assignee == "Block") ? vis.blockData :
                           (Assignee == "Admin") ? vis.AdminData : ""


        vis.dataValue = d3.pie()
                            .sort(null)
                            .value((d) => {return d.value})
                            (vis.filteredData)

        vis.segments = d3.arc()
                            .outerRadius(radius)
                            .innerRadius(radius * 0.6)
                            
        vis.outersegments = d3.arc()
                             .innerRadius(radius * 1.1)
                             .outerRadius(radius * 1.1)

        
    
        vis.sections = vis.svg.append("g")
                                .attr("transform", `translate(${250}, ${250})`)
                                .selectAll("path").data(vis.dataValue)


        vis.sections.enter().append("path")
                                .attr("d", vis.segments)
                                .attr("fill", (d) => {return colorDynamic(d.data.value)})
                                .attr("stroke", "white")
                                .style("stroke-width", "2px")
                                .style("opacity", 1)
    

        vis.sections.transition().duration(1000)
                                        .attrTween("d", function(d) {
                                                this._current = this._current || d;
                                                var interpolate = d3.interpolate(this._current, d);
                                                this._current = interpolate(0);
                                            return function(t) {
                                            return vis.segments(interpolate(t));
                                            };
                                        })

        vis.sections.exit()
                        .remove()



        vis.content = vis.svg.select("g").selectAll("text").data(vis.dataValue);



        vis.content.enter().append("text")
                            .text((d) => { 
                                return d.data.value})
                            // .transition().duration(1000)
                            .attr("transform", (d) => { return "translate(" + vis.segments.centroid(d) + ")";  })
                            // .attr("fill", "white")
                            // .style("text-anchor", "middle")
                            // .style("font-size", 17)

        vis.content.transition().duration(1000)
                                        .text((d) => { 
                                            return d.data.value})
                                        .attr("transform", (d) => { return "translate(" + vis.outersegments.centroid(d) + ")"; })
                                    


        vis.content.exit()
                    .remove();




        vis.legend = vis.svg.append("g")
                            .attr("class", "legend")
                            .attr("transform", "translate(-290, 200)")
                            .attr("height", 100)
                            .attr("width", 200)
                            // .selectAll(".legend").data(vis.dataValue)

        vis.legend = vis.svg.select("g.legend")
                                // .attr("transform", (d, i) => {return `translate(0,  ${i*30})`})

        vis.legendBox = vis.legend.selectAll("rect")
                                    .data(vis.dataValue)

                                            
        vis.legendBox.enter()
                //  .append("rect")
                    .append("circle")               
                    .attr("cx", WIDTH - 170)
                        .attr("cy", function (d, i) {
                        return i * 32;
                    })
                    // .attr("width", 20)
                    // .attr("height", 20)
                    .attr("r", 10)
                    .style("fill", (d) => {return colorDynamic(d.data.value)});
                            
        vis.legendBox.exit()
                    .remove();



        vis.legendBox.attr("cx", WIDTH - 170)
                        .attr("cy", function (d, i) {
                        return i * 32;
                    })
                    // .attr("width", 20)
                    // .attr("height", 20)
                    .attr("r", 10)
                    .style("fill", (d) => {return colorDynamic(d.data.value)});


        vis.legendText = vis.legend.selectAll("text")
                                        .data(vis.dataValue)
            
        vis.legendText.enter()
                    .append("text")
                    .attr("x", WIDTH - 150)
                            .attr("y", function (d, i) {
                                return i * 32 + 6;
                            })
                            .text((d) => {return d.data.name})
                            .attr("fill", (d) => {return colorDynamic(d.data.value)})
                            .style("font-weight", 500)
                            .style("font-size", 15)
            
        vis.legendText.exit()
                    .remove();
            
        vis.legendText.attr("x", WIDTH - 150)
                            .attr("y", function (d, i) {
                                return i * 32 + 6;
                            })
                            .text((d) => {return d.data.name})
                            .attr("fill", (d) => {return colorDynamic(d.data.value)})
                            .style("font-weight", 500)
                            .style("font-size", 15)     

    }
}