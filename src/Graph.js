import React, { Component } from "react";
import * as d3 from "d3";
import {event as currentEvent} from "d3";
import axios from "axios";
import {icons, getIconList} from "./GraphData";
import { fullRestURL, fullURL } from "./App";

class Graph extends Component {
    d3Ref = null;
    current = null;
    icons = icons;
    iconList = getIconList(this.props.category);
    current = "Digiroad";

    componentDidMount() {
        this.cleanHierarchy();
        if (this.props.data.nodes.length > 0)
            this.hierarchy(this.icons, this.props.data, this.current);
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.data !== this.props.data) {
            this.cleanHierarchy();
            if (nextProps.data.nodes.length > 0)
                this.hierarchy(this.icons, nextProps.data, this.current);
        }
    }

    componentWillUnmount() {
        this.cleanHierarchy();
    }

    cleanHierarchy() {
        d3
            .select("body")
            .selectAll(".d3-tooltip")
            .remove();
        d3
            .select("#d3-hierarchy")
            .selectAll("svg")
            .remove();
    }

    render() {
        let iconEls = [];
        if (this.props.data.nodes.length > 0) {
            this.iconList.forEach(icon => {
                iconEls.push(
                    <div key={icon.label} className="icon-container">
                        <div className="icon">
                            <svg width="24" height="24">
                                <path
                                    d={icon.path}
                                    style={{ fill: icon.fill }}
                                    transform="scale(0.75)"
                                />
                            </svg>
                        </div>
                        <div className="icon-label">{icon.label}</div>
                    </div>
                );
            });
        }
        return (
            <div>
                <div
                    id="d3-hierarchy"
                    className="item-container hierarchy"
                    ref={d3Ref => (this.d3Ref = d3Ref)}
                />
                <div className="icon-info">{iconEls}</div>
            </div>
        );
    }

    hierarchy(icons, graph, current) {
        // FIX for IE bug (affects versions to at least IE11)
        // https://connect.microsoft.com/IE/feedback/details/801938/dynamically-updated-svg-path-with-a-marker-end-does-not-update
        //var isIE = (/MSIE/i).test($window.navigator.userAgent);

        let width = 960,
            height = 500;

        width = this.d3Ref.offsetWidth;

        let isClickSelected = false;

        const colorByContentType = function(contentType) {
            return icons[contentType].fill;
        };

        const getIcon = function(contentType) {
            return icons[contentType].path;
        };

        let tooltip = d3
            .select("body")
            .append("div")
            .attr("class", "d3-tooltip")
            .style("position", "absolute")
            .style("z-index", "10")
            .style("visibility", "hidden");

        /* eslint-disable quotes */
        const renderTooltip = function(d) {
            return '<span id="close-tooltip"></span><div id="tooltip-content"></div>';
        };

        const renderTooltipContent = function(data, group) {
            const url = fullURL(`#/${group}/tunnus`, data.tunnus);
            var htmlString = `<div><h4><a href="${url}">${data.nimi}</a></h4>`;

            function checkProtocol(url) {
                return url.indexOf("http") === -1 ? "http://" + url : url;
            }
            
            function replacer(match) {
                return (
                    '<a href="' +
                    checkProtocol(match) +
                    '" target="_blank">' +
                    match +
                    "</a>"
                );
            }
            /* eslint-enable quotes */

            function replaceLinks(text) {
                if (text && typeof text === "string") {
                    // eslint-disable-next-line
                    var exp = /\b((?:https?:\/\/|www\d{0,3}[.]|[a-zåäöA-ZÅÄÖ0-9.\-]+[.][a-z]{2,4}\/)(?:[^\s()<>]+|\(([^\s()<>]+|(\([^\s()<>]+\)))*\))+(?:\(([^\s()<>]+|(\([^\s()<>]+\)))*\)|[^\s`!()\[\]{};:'".,<>?«»“”‘’]))/gi;
                    return text.replace(exp, replacer);
                } else {
                    return text;
                }
            }

            for (var key in data) {
                if (
                    data[key] &&
                    showData(group, key) &&
                    typeof data[key] !== "object"
                ) {
                    htmlString +=
                        "<span><strong>" +
                        key +
                        ":</strong> " +
                        replaceLinks(data[key]) +
                        "</span></div>";
                }
            }
            return htmlString;
        };

        function showData(group, key) {
            let includeKeyList = ["kuvaus"];

            if (group === "tietolaji") {
                includeKeyList.push("omistaja");
                includeKeyList.push("lahde");
            } else if (group === "fyysinen") {
                includeKeyList.push("omistaja");
                includeKeyList.push("palvelutaso");
                includeKeyList.push("sijainti");
                includeKeyList.push("teknologia");
            } else if (group === "looginen") {
                includeKeyList.push("omistaja");
                includeKeyList.push("paivitystiheys");
            }

            return includeKeyList.includes(key);
        }

        const getTooltipData = function(d) {
            axios
                .get(`${fullRestURL()}/${d.content}/${d.code}`)
                .then(response => {
                    let outData = {};
                    if (response.data === "") {
                        // Defensive hack: make sure name and entity id go right, even if we do not get any data.
                        console.log(
                            "Did not receive any data from the backend, constructing minimal data for front to handle the situation a bit more gracefully."
                        );
                        outData.tunnus = d.code;
                        outData.nimi = d.name;
                    } else {
                        outData = response.data;
                        tooltipContent.html(
                            renderTooltipContent(outData, d.content)
                        );
                    }
                })
                .catch(function(error) {
                    console.log("Error while fetching data:", error);
                    let outData = {};
                    outData.tunnus = d.code;
                    outData.nimi = d.name;
                    tooltipContent.html(
                        renderTooltipContent(outData, d.content)
                    );
                });
        };

        tooltip.html(renderTooltip());

        const tooltipContent = d3.select("#tooltip-content");
        const closeTooltip = d3.select("#close-tooltip");

        const zoom = d3.behavior
            .zoom()
            .scaleExtent([0.4, 3])
            .on("zoom", zoomed);

        let svg = d3
            .select("#d3-hierarchy")
            .append("svg")
            .attr("width", width)
            .attr("height", height)
            .call(zoom);

        let container = svg.append("g");

        const force = d3.layout
            .force()
            .size([width, height])
            .charge(-500)
            .linkDistance(function(d) {
                return 60;
            });

        force
            .nodes(graph.nodes)
            .links(graph.links)
            .on("tick", tick)
            .start();

        // Define arrow marker
        svg
            .append("defs")
            .selectAll("marker")
            .data(["arrow"])
            .enter()
            .append("marker")
            .attr("id", function(d) {
                return d;
            })
            .attr("viewBox", "0 -5 10 10")
            .attr("refX", 20)
            .attr("refY", -0.3)
            .attr("markerWidth", 6)
            .attr("markerHeight", 6)
            .attr("orient", "auto")
            .append("path")
            .attr("d", "M0,-5L10,0L0,5");

        const link = container
            .selectAll("path")
            .data(force.links())
            .enter()
            .append("path")
            .attr("class", function(d) {
                return "link arrow";
            });

        // For IE add marker attribute after every tick, because IE does not support markers on dynamically updated paths
        // if (!isIE && scope.showDirections) {
        link.attr("marker-end", function(d) {
            return "url(#arrow)";
        });
        // }

        const node = container
            .selectAll(".node")
            .data(graph.nodes)
            .enter()
            .append("g")
            .attr("class", "node")
            .classed("current", function(d) {
                return d.name === current;
            });

        const linkedByIndex = {};
        graph.links.forEach(function(d) {
            linkedByIndex[d.source.index + "," + d.target.index] = 1;
        });

        function isConnected(a, b) {
            return (
                linkedByIndex[a.index + "," + b.index] ||
                linkedByIndex[b.index + "," + a.index] ||
                a.index === b.index
            );
        }

        function fade(d, opacity) {
            node.style("opacity", function(o) {
                const thisOpacity = isConnected(d, o) ? 1 : opacity;
                this.setAttribute("opacity", thisOpacity);

                return thisOpacity;
            });

            link.style("opacity", function(o) {
                return o.source === d || o.target === d ? 1 : opacity;
            });
        }

        function alignCenter(bBox) {
            return {
                x: -1 * bBox.width / 2,
                y: -1 * bBox.height / 2
            };
        }

        // Use a circle under the icon to prevent flickering on hover
        node
            .append("circle")
            .attr("r", "10px")
            .style("fill", "rgba(255,255,255,1)");

        node
            .append("path")
            .attr("d", function(d) {
                return getIcon(d.content);
            })
            .attr("transform", function() {
                var align = alignCenter(this.getBBox());
                return "translate(" + align.x + "," + align.y + ") scale(1)";
            })
            .style("fill", function(d) {
                return colorByContentType(d.content);
            });

        node
            .append("text")
            .text(function(d) {
                return d.name;
            })
            .attr("x", 20)
            .attr("y", 5);

        node
            .on("mouseover", function(d) {
                if (!isClickSelected) {
                    fade(d, 0.1);
                    d3
                        .select(this)
                        .select("path")
                        .transition()
                        .duration(300)
                        .attr("transform", function() {
                            var align = alignCenter(this.getBBox());
                            var alignFixed = {
                                x: align.x * 1.2,
                                y: align.y * 1.2
                            };

                            return (
                                "translate(" +
                                alignFixed.x +
                                "," +
                                alignFixed.y +
                                ") scale(1.2)"
                            );
                        });
                }
            })
            .on("mouseout", function(d) {
                if (!isClickSelected) {
                    fade(d, 1);
                    d3
                        .select(this)
                        .select("path")
                        .classed("active", false)
                        .transition()
                        .duration(300)
                        .attr("transform", function() {
                            var align = alignCenter(this.getBBox());
                            return (
                                "translate(" +
                                align.x +
                                "," +
                                align.y +
                                ") scale(1)"
                            );
                        });
                }
            })
            .on("click", function(d) {
                if (d.content !== "sovellus") {
                    getTooltipData(d);

                    return tooltip
                        .style("visibility", "visible")
                        .style("top", currentEvent.pageY - 10 + "px")
                        .style("left", currentEvent.pageX + 10 + "px");
                }
            });

        closeTooltip.on("click", function() {
            return tooltip.style("visibility", "hidden");
        });

        function tick(e) {
            link.attr("d", function(d) {
                var dx = d.target.x - d.source.x,
                    dy = d.target.y - d.source.y,
                    dr = Math.sqrt(dx * dx + dy * dy) * 2;

                return (
                    "M" +
                    d.source.x +
                    "," +
                    d.source.y +
                    "A" +
                    dr +
                    "," +
                    dr +
                    " 0 0,1 " +
                    d.target.x +
                    "," +
                    d.target.y
                );
            });

            // For IE add marker attribute after every tick, because IE does not support markers on dynamically updated paths
            // if (isIE && scope.showDirections) {
            // link.attr("marker-end", function(d) {
            //     return "url(#arrow)";
            // });

            node.attr("transform", function(d) {
                return "translate(" + d.x + "," + d.y + ")";
            });
        }

        function zoomed() {
            container.attr(
                "transform",
                "translate(" +
                    currentEvent.translate +
                    ")scale(" +
                    currentEvent.scale +
                    ")"
            );
        }

        function getCurrentNode() {
            var curIndex = null;

            for (var i = 0; i < graph.nodes.length; i++) {
                if (graph.nodes[i].name === current) {
                    curIndex = i;
                    break;
                }
            }
            runTick(curIndex);
        }

        getCurrentNode();

        function runTick(centeredIndex) {
            var n = 100;

            for (var i = n; i > 0; --i) {
                force.tick();

                if (centeredIndex !== null) {
                    graph.nodes[centeredIndex].x = width / 2;
                    graph.nodes[centeredIndex].y = height / 2;
                }
            }
            force.stop();
        }
    }
}

export default Graph;
