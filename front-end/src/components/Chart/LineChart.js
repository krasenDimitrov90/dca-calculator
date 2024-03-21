import * as d3 from 'd3';
// import { data2 as data } from './data2';
import { useEffect, useRef } from 'react';
import { formatNumberWithSuffixAndCommas } from '../../utils/format-numbers';

export const LineChart = ({ data }) => {
  const svgRef = useRef(null);

  useEffect(() => {
    // Clear the SVG element before rendering the new chart
    d3.select(svgRef.current).selectAll("*").remove();

    // Declare the chart dimensions and margins.
    const width = 928;
    const height = 350;
    const marginTop = 20;
    const marginRight = 30;
    const marginBottom = 18;
    const marginLeft = 80;

    // Declare the x (horizontal position) scale.
    const x = d3.scaleUtc(d3.extent(data, d => d.date), [marginLeft, width - marginRight]);

    // Declare the y (vertical position) scale.
    const y = d3.scaleLinear([0, d3.max(data, d => d.balance)], [height - marginBottom, marginTop]);

    // Declare the line generator.
    const line = d3.line()
      .x(d => x(d.date))
      .y(d => y(d.balance));

    // Create the SVG container.
    const svg = d3.select(svgRef.current)
      .attr("viewBox", [0, 0, width, height])
      .attr("width", width)
      .attr("height", height)
      .attr("style", "max-width: 100%; height: auto; height: intrinsic; font: 10px sans-serif;")
      .style("-webkit-tap-highlight-color", "transparent")
      .style("overflow", "visible")
      .on("pointerenter pointermove", pointermoved)
      .on("pointerleave", pointerleft)
      .on("touchstart", event => event.preventDefault());

    // // Declare custom format function for y-axis ticks
    // const formatDate = (date) => {
    //   if (!date.includes(/[0-9]/)) return date.slice(0,3);
    //   return date;
    // };

    // Add the x-axis.
    svg.append("g")
      .attr("transform", `translate(0,${height - marginBottom})`)
      .style("font-size", 16)
      .call(d3.axisBottom(x).ticks(10).tickSizeOuter(0))
      .call(g => g.select('.domain')
        .attr("stroke", "#7477BC"))
      .call(g => g.selectAll("line").remove())
      .call(g => g.selectAll('text')
        .attr("fill", "#7477BC"))

    // Declare custom format function for y-axis ticks
    const formatBalance = (value) => {
      const absValue = Math.abs(value); // Get absolute value
      const formats = [
        { value: 1e9, suffix: "B" },
        { value: 1e6, suffix: "M" },
        { value: 1e3, suffix: "K" }
      ];

      // Find appropriate format
      const format = formats.find(format => absValue >= format.value);

      // If no appropriate format found, just return the original value
      if (!format) return value;

      // Apply formatting and return
      return (value / format.value).toFixed(2) + format.suffix;
    };

    // Add the y-axis, remove the domain line, add grid lines and a label.
    svg.append("g")
      .attr("transform", `translate(${marginLeft},0)`)
      .style("font-size", 16)
      .call(d3.axisLeft(y).ticks(height / 40).tickFormat(formatBalance))
      .call(g => g.select(".domain").remove())
      .call(g => g.selectAll(".tick line")
        .attr("stroke", "#7477BC")
        .attr("stroke-width", 0.8)
        .attr("x2", width - marginLeft - marginRight)
        .attr("stroke-opacity", 0.1))
      .call(g => g.selectAll('text')
        .attr("fill", "#7477BC"))

    // Append a path for the line.
    svg.append("path")
      .attr("fill", "none")
      .attr("stroke", "steelblue")
      .attr("stroke-width", 1.5)
      .attr("d", line(data));

    // Create the tooltip container.
    const tooltip = svg.append("g");

    function formatValue(value) {
      return value.toLocaleString("en", {
        style: "currency",
        currency: "USD"
      });
    }

    function formatDate(date) {
      return date.toLocaleString("en", {
        month: "short",
        day: "numeric",
        year: "numeric",
        timeZone: "UTC"
      });
    }

    // Add the event listeners that show or hide the tooltip.
    const bisect = d3.bisector(d => d.date).center;
    function pointermoved(event) {
      const i = bisect(data, x.invert(d3.pointer(event)[0]));
      tooltip.style("display", null);
      tooltip.attr("transform", `translate(${x(data[i].date)},${y(data[i].balance)})`);
      // tooltip.attr("transform", `translate(${marginLeft}, ${marginTop})`);

      const path = tooltip.selectAll("path")
        .data([,])
        .join("path")
        .attr("fill", "white")
        .attr("stroke", "black");

      const text = tooltip.selectAll("text")
        .data([,])
        .join("text")
        .call(text => text
          .selectAll("tspan")
          .data([formatDate(data[i].date), formatValue(data[i].balance)])
          .join("tspan")
          .attr("x", 0)
          .attr("y", (_, i) => `${i * 1.1}em`)
          .attr("font-weight", (_, i) => i ? null : "bold")
          .text(d => d)
        );

      size(text, path);

      // // Add a circle on the tooltip
      // tooltip.selectAll("circle").remove(); // Remove previous circles
      // tooltip.append("circle")
      //   .attr("cx", 0)
      //   .attr("cy", 0)
      //   .attr("r", 5) // Adjust the radius as needed
      //   .attr("fill", "steelblue")
      //   .attr("stroke", "black");
    }

    function pointerleft() {
      tooltip.style("display", "none");
    }

    // Wraps the text with a callout path of the correct size, as measured in the page.
    function size(text, path) {
      const { x, y, width: w, height: h } = text.node().getBBox();
      text.attr("transform", `translate(${-w / 2},${15 - y})`);
      path.attr("d", `M${-w / 2 - 10},5H-5l5,-5l5,5H${w / 2 + 10}v${h + 20}h-${w + 20}z`);
    }
  }, [data]);

  return <svg ref={svgRef} />;
}