import * as d3 from "d3";

const MARGIN = { LEFT:80, RIGHT:30, TOP:20, BOTTOM:290 }
const WIDTH = 720 - MARGIN.LEFT - MARGIN.RIGHT;
const HEIGHT = 700 - MARGIN.TOP - MARGIN.BOTTOM;

var colorDynamic = d3.scaleSequential(d3.interpolateRainbow).domain([2, 10]);


export default class D3Chart{
    constructor(element, wholeVal){
        console.log("Hello Report Component Start From here:::")

        const dataSets = wholeVal;

        const vis = this;
        
        vis.svg = d3.select(element)
                        .append("svg")
                        .attr("width", WIDTH + MARGIN.LEFT + MARGIN.RIGHT)
                        .attr("height", HEIGHT + MARGIN.TOP + MARGIN.BOTTOM)
                        .append("g")
                        .attr("transform", `translate(${MARGIN.LEFT}, ${MARGIN.TOP})`)

        vis.xAxisGroup = vis.svg.append("g") 
                                .attr("transform", `translate(0, ${HEIGHT})`)


        vis.yAxisGroup = vis.svg.append("g")

        // vis.yAxisGroup.selectAll(".y.axis *").style({"font-size":15});

        vis.xLabel = vis.svg.append("text")
                                .attr("x", WIDTH / 2)
                                .attr("y", HEIGHT + 74)
                                .attr("text-anchor", "middle")
                                .style("font-size", 17)
    

        vis.svg.append("text")
            .attr("x", -(HEIGHT / 2))
            .attr("y", -60)
            .attr("text-anchor", "middle")
            .style("font-size", 17)
            .text("Value (in integer)")
            .attr("transform", "rotate(-90)")

                        
        vis.statusData = dataSets[0];
        vis.failData = dataSets[1];
        vis.blockData = dataSets[2];
        vis.AdminData = dataSets[3]

        vis.updates("Status")

}


    updates = (Assignee) => {

        const vis = this;

        vis.dataValue = (Assignee == "Status") ? vis.statusData :
                        (Assignee == "Fail") ? vis.failData :
                        (Assignee == "Block") ? vis.blockData :
                        (Assignee == "Admin") ? vis.AdminData : ""
        vis.xLabel.text(`${Assignee}`)
        
        const x = d3.scaleBand()
                          .domain(vis.dataValue.map((item) => {return (item.name)}))
                          .range([0, WIDTH])
                          .paddingInner(0.4)
                          .paddingOuter(0.5)

            const y = d3.scaleLinear()
                          .domain([0,  d3.max(vis.dataValue, d =>{ return (d.value)})])
                          .range([HEIGHT, 0]) 

                        console.log("y value max::", y(40))
                        console.log("y value mid::", y(22))
                        console.log("y value min::", y(0))


            const xAxisCreation = d3.axisBottom(x) 
                                        vis.xAxisGroup
                                        .transition().duration(500)
                                        .call(xAxisCreation)
                                        .selectAll(".tick text")
                                        .attr("x", -10)
                                        .attr("y", 6)
                                        .attr("text-anchor", "end")
                                        .attr("transform", "rotate(-40)")
                                        // .style("font-size", 15)

            const yAxisCreation = d3.axisLeft(y)
                                        vis.yAxisGroup
                                        .transition().duration(500)
                                        .call(yAxisCreation)
                                        .selectAll(".tick text")
                                        .attr("x", -20)
                                        .attr("y", 0)
                                        .attr("text-anchor", "middle")
                                        // .style("font-size", 15)


            const rects = vis.svg.selectAll("rect")
                                    .data(vis.dataValue)


            rects.exit()
                    .transition().duration(500)
                    .attr("y", HEIGHT)
                    .attr("height", 0)
                    .remove()
 

            rects.transition().duration(500)
                .attr("x", (d) =>{return (x(d.name))})
                .attr("y", (d) => {return y(d.value)})
                .attr("width", x.bandwidth)
                .attr("height", (d) => {return (HEIGHT - y(d.value))})


            rects.enter().append("rect")
            .attr("x", (d) =>{return (x(d.name))})
            .attr("width", x.bandwidth)
            .attr("fill", (d, i) => {return (colorDynamic(i))})
            .attr("y", HEIGHT)
            .transition().duration(500)
                .attr("y", (d) => {return y(d.value)})
                .attr("height", (d) => {return (HEIGHT - y(d.value))})



            vis.legend = vis.svg.append("g")
                                .attr("class", "legend")
                                .attr("transform", `translate(0, ${HEIGHT + 100})`)
                                .attr("height", 200)
                                .attr("width", 200)

                console.log("legends hai:::", vis.legend)


            vis.legendRow = vis.svg.select("g.legend")


            vis.legendBox = vis.legendRow.selectAll("rect")
                                            .data(vis.dataValue)



            vis.legendBox.enter()
                            .append("rect")
                            .transition().duration(500)
                            .attr("x", 0)
                            .attr("y", function (d, i) {
                                return i * 34;
                            })
                            .attr("width", 20)
                            .attr("height", 20)
                            .attr("fill", (data, i) => { return colorDynamic(i)})

            vis.legendBox.exit()
                            .transition().duration(500)
                            .remove();


            vis.legendBox.transition().duration(500)
                            .attr("x", 0)
                            .attr("y", function (d, i) {
                                return i * 34;
                            })
                            .attr("width", 20)
                            .attr("height", 20)
                            .attr("fill", (data, i) => { return colorDynamic(i)})



            vis.legendText = vis.legendRow.selectAll("text")
                                                .data(vis.dataValue)

            vis.legendText.enter()
                            .append("text")
                            .style("font-weight", 500)
                            .style("font-size", 15)
                            .transition().duration(500)
                            .attr("x", 30)
                            .attr("y", function (d, i) {
                                return i * 34 + 15;
                            })
                            .text((d) => {return d.name})
                            .attr("fill", (d) => {return colorDynamic(d.value)})

            vis.legendText.exit()
                            .transition().duration(500)
                            .remove();

            vis.legendText.transition().duration(500)
                            .attr("x", 30)
                            .attr("y", function (d, i) {
                                return i * 34 + 15;
                            })
                            .text((d) => {return d.name})
                            .attr("fill", (d) => {return colorDynamic(d.value)})    



    }
}