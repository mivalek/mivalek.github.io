const urlParams = new URLSearchParams(window.location.search);
if (urlParams.get("cite") === "true") {
    document.getElementById("cite").classList.add("show");
}

const data = [
        { x: -1.7819, y: -6.9813, dist1: 2.5997, dist2: 4.3816 },
        { x: 4.4673, y: 2.2873, dist1: 1.09, dist2: 3.3773 },
        { x: 1.634, y: -0.2744, dist1: 0.9542, dist2: 0.6798 },
        { x: -2.5277, y: -2.0806, dist1: 0.2235, dist2: 2.3041 },
        { x: -1.0441, y: -1.0926, dist1: 0.0243, dist2: 1.0683 },
        { x: -5.0584, y: -0.9212, dist1: 2.0686, dist2: 2.9898 },
        { x: -6.4792, y: -2.0056, dist1: 2.2368, dist2: 4.2424 },
        { x: -4.3071, y: -1.8643, dist1: 1.2214, dist2: 3.0857 },
        { x: -0.2749, y: 1.5192, dist1: 0.8971, dist2: 0.6222 },
        { x: -3.6237, y: 0.2076, dist1: 1.9157, dist2: 1.708 },
        { x: -1.7928, y: -3.2226, dist1: 0.7149, dist2: 2.5077 },
        { x: -2.7475, y: -1.908, dist1: 0.4198, dist2: 2.3277 },
        { x: 3.3324, y: 0.1529, dist1: 1.5897, dist2: 1.7427 },
        { x: 2.6464, y: -0.4777, dist1: 1.5621, dist2: 1.0843 },
        { x: -1.4328, y: -1.0133, dist1: 0.2098, dist2: 1.223 },
        { x: 2.707, y: -5.459, dist1: 4.083, dist2: 1.376 },
        { x: -1.2024, y: 2.1876, dist1: 1.695, dist2: 0.4926 },
        { x: -2.269, y: -0.1153, dist1: 1.0768, dist2: 1.1921 },
        { x: -0.2957, y: 5.4242, dist1: 2.86, dist2: 2.5643 },
        { x: 7.6394, y: 5.161, dist1: 1.2392, dist2: 6.4002 },
        { x: -0.3645, y: 0.6749, dist1: 0.5197, dist2: 0.1552 },
        { x: -4.0498, y: -1.2876, dist1: 1.3811, dist2: 2.6687 },
        { x: -0.3466, y: 0.0752, dist1: 0.2109, dist2: 0.1357 },
        { x: 1.3099, y: -0.2567, dist1: 0.7833, dist2: 0.5266 },
        { x: 7.8944, y: -5.0639, dist1: 6.4792, dist2: 1.4153 },
        { x: -2.7548, y: 1.1373, dist1: 1.9461, dist2: 0.8087 },
        { x: -4.9697, y: 4.1168, dist1: 4.5432, dist2: 0.4264 },
        { x: 4.2003, y: 3.0465, dist1: 0.5769, dist2: 3.6234 },
        { x: -4.7269, y: 3.3435, dist1: 4.0352, dist2: 0.6917 },
        { x: -1.4999, y: 3.1819, dist1: 2.3409, dist2: 0.841 },
        { x: -2.9488, y: 0.1654, dist1: 1.5571, dist2: 1.3917 },
        { x: -0.0911, y: -1.5972, dist1: 0.753, dist2: 0.8441 },
        { x: 3.1282, y: 0.3478, dist1: 1.3902, dist2: 1.738 },
        { x: 6.8727, y: -4.2708, dist1: 5.5717, dist2: 1.3009 },
        { x: 5.4595, y: 4.6491, dist1: 0.4052, dist2: 5.0543 },
        { x: 7.8837, y: -1.8775, dist1: 4.8806, dist2: 3.0031 },
        { x: 4.8759, y: -1.242, dist1: 3.059, dist2: 1.817 },
        { x: -3.1551, y: -2.7686, dist1: 0.1933, dist2: 2.9619 },
        { x: 2.3278, y: 6.3117, dist1: 1.992, dist2: 4.3197 },
        { x: 6.6545, y: -2.3521, dist1: 4.5033, dist2: 2.1512 },
        { x: 6.0116, y: -1.9404, dist1: 3.976, dist2: 2.0356 },
        { x: 7.0845, y: 0.227, dist1: 3.4288, dist2: 3.6558 },
        { x: 3.4759, y: 0.4716, dist1: 1.5022, dist2: 1.9737 },
        { x: -9.5, y: 3.9727, dist1: 6.7364, dist2: 2.7636 },
        { x: -1.2928, y: -0.9587, dist1: 0.167, dist2: 1.1257 },
        { x: 1.9894, y: 0.9741, dist1: 0.5077, dist2: 1.4818 },
        { x: -5.7639, y: 3.2592, dist1: 4.5115, dist2: 1.2523 },
        { x: -4.4362, y: 3.3376, dist1: 3.8869, dist2: 0.5493 },
        { x: -1.3133, y: -0.2817, dist1: 0.5158, dist2: 0.7975 },
        { x: 8.3384, y: 3.5252, dist1: 2.4066, dist2: 5.9318 },
        { x: -3.6987, y: -0.2366, dist1: 1.7311, dist2: 1.9676 },
        { x: 2.6972, y: 7.5, dist1: 2.4014, dist2: 5.0986 },
        { x: 0.3839, y: -0.5438, dist1: 0.4639, dist2: 0.08 },
        { x: -8.1297, y: -0.3619, dist1: 3.8839, dist2: 4.2458 },
        { x: 1.3207, y: 0.2545, dist1: 0.5331, dist2: 0.7876 },
        { x: 1.0486, y: 2.8082, dist1: 0.8798, dist2: 1.9284 },
        { x: 5.8791, y: -0.4646, dist1: 3.1719, dist2: 2.7073 },
        { x: 3.3648, y: -7.2333, dist1: 5.299, dist2: 1.9342 },
        { x: -0.6647, y: 2.7145, dist1: 1.6896, dist2: 1.0249 },
        { x: -0.2943, y: 2.2864, dist1: 1.2904, dist2: 0.9961 },
        { x: -4.9358, y: -0.0055, dist1: 2.4651, dist2: 2.4707 },
        { x: 4.4533, y: 1.4992, dist1: 1.4771, dist2: 2.9763 },
        { x: 7.1901, y: 5.104, dist1: 1.0431, dist2: 6.147 },
        { x: -0.3886, y: -2.2451, dist1: 0.9283, dist2: 1.3169 },
        { x: 1.1102, y: -2.5628, dist1: 1.8365, dist2: 0.7263 },
        { x: -4.465, y: -5.0691, dist1: 0.302, dist2: 4.7671 },
        { x: 1.2707, y: -1.2633, dist1: 1.267, dist2: 0.0037 },
        { x: -3.5862, y: 1.6866, dist1: 2.6364, dist2: 0.9498 },
        { x: -5.7068, y: -1.5029, dist1: 2.102, dist2: 3.6049 },
        { x: 1.0907, y: -0.0615, dist1: 0.5761, dist2: 0.5146 },
        { x: -9.1588, y: 3.4923, dist1: 6.3255, dist2: 2.8332 },
        { x: 2.1617, y: 1.5852, dist1: 0.2883, dist2: 1.8735 },
        { x: -6.3836, y: -0.2282, dist1: 3.0777, dist2: 3.3059 },
        { x: 7.3879, y: 2.0765, dist1: 2.6557, dist2: 4.7322 },
        { x: -3.1021, y: 4.0039, dist1: 3.553, dist2: 0.4509 },
        { x: -3.1652, y: -3.1658, dist1: 0.0003, dist2: 3.1655 },
        { x: 3.5484, y: -0.1157, dist1: 1.832, dist2: 1.7163 },
        { x: -2.7712, y: -3.8737, dist1: 0.5513, dist2: 3.3225 },
        { x: 3.6964, y: -2.5745, dist1: 3.1355, dist2: 0.561 },
        { x: -3.9965, y: -2.8466, dist1: 0.575, dist2: 3.4215 },
        { x: -0.1769, y: 0.6325, dist1: 0.4047, dist2: 0.2278 },
        { x: -0.4813, y: -0.513, dist1: 0.0158, dist2: 0.4972 },
        { x: -4.9907, y: -2.4012, dist1: 1.2947, dist2: 3.696 },
        { x: 4.6402, y: -1.3181, dist1: 2.9791, dist2: 1.661 },
        { x: -1.0697, y: 1.8535, dist1: 1.4616, dist2: 0.3919 },
        { x: -1.3031, y: -3.0451, dist1: 0.871, dist2: 2.1741 },
        { x: -3.2163, y: -1.1545, dist1: 1.0309, dist2: 2.1854 },
        { x: -2.5716, y: 5.4749, dist1: 4.0232, dist2: 1.4516 },
        { x: -0.0163, y: -0.5785, dist1: 0.2811, dist2: 0.2974 },
        { x: -3.5463, y: -0.6104, dist1: 1.4679, dist2: 2.0783 },
        { x: 6.6451, y: -3.0404, dist1: 4.8428, dist2: 1.8023 },
        { x: -1.3259, y: -4.3018, dist1: 1.4879, dist2: 2.8138 },
        { x: -3.1068, y: -0.2352, dist1: 1.4358, dist2: 1.671 },
        { x: 0.0715, y: -0.2591, dist1: 0.1653, dist2: 0.0938 },
        { x: -3.1193, y: 2.115, dist1: 2.6172, dist2: 0.5021 },
        { x: 1.6132, y: -1.4801, dist1: 1.5467, dist2: 0.0666 },
        { x: 1.9199, y: 1.7574, dist1: 0.0812, dist2: 1.8387 },
        { x: 8.6291, y: 0.2829, dist1: 4.1731, dist2: 4.456 },
        { x: -2.4665, y: -0.2646, dist1: 1.1009, dist2: 1.3655 },
        { x: -0.1676, y: -2.0148, dist1: 0.9236, dist2: 1.0912 },
    ],
    margin = { top: 8, right: 10, bottom: 40, left: 50 },
    w = 500,
    h = 400,
    width = w - margin.left - margin.right,
    height = h - margin.top - margin.bottom,
    x = d3
        .scaleLinear()
        .domain([-10, 10])
        .range([margin.left, width + margin.left]),
    // Y axis: scale and draw:
    y = d3
        .scaleLinear()
        .domain([-8, 8]) // d3.hist has to be called before the Y axis obviously
        .range([h - margin.bottom, margin.top]),
    sum = (x) => {
        if (x.length > 1) {
            return x.reduce((a, b) => a + b);
        } else {
            return x[0];
        }
    },
    mean = (x) => sum(x) / x.length;

const init = () => {
    svg = d3
        .select("#plot")
        .append("svg")
        .attr("preserveAspectRatio", "xMinYMin meet")
        .attr("viewBox", "0 0 " + w + " " + h)
        .classed("svg-content", true);
    // .attr("width", w)
    // .attr("height", h)

    svg.append("g")
        .attr("transform", `translate(0, ${h - margin.bottom})`)
        .attr("class", "axis")
        .call(d3.axisBottom(x).ticks(10));

    svg.append("g")
        .attr("id", "y-axis")
        .attr("class", "axis")
        .attr("transform", `translate(${margin.left - 5}, 0)`)
        .call(d3.axisLeft(y));

    // text label for the x axis
    svg.append("text")
        .attr("class", "axis lab")
        .attr("x", x(0))
        .attr("y", y(-9.83))
        .style("text-anchor", "middle")
        .text("x");

    // text label for the y axis
    svg.append("text")
        .attr("class", "axis lab")
        .attr("y", y(0))
        .attr("x", x(-12))
        .style("text-anchor", "middle")
        .text("y");

    svg.append("clipPath") // define a clip path
        .attr("id", "rect-clip") // give the clipPath an ID
        .append("rect") //Append the shape for clipping
        .attr("x", x(-10))
        .attr("y", 10)
        .attr("width", x(20))
        .attr("height", height - 5);
};

const draw = () => {
    const sliderValue = +document.getElementById("rValue").value,
        Gen = d3
            .area()
            .x((p) => x(p.x))
            .y0((p) => y(0))
            .y1((p) => y(p.y));
    if (sliderValue < 0) {
        currentData = data.map((el) => {
            let prop = { x: 0, y: 0 };
            if (-el.x < el.y) {
                prop.x = el.x + el.dist2 * sliderValue;
                prop.y = el.y + el.dist2 * sliderValue;
            } else {
                prop.x = el.x - el.dist2 * sliderValue;
                prop.y = el.y - el.dist2 * sliderValue;
            }
            return prop;
        });
    } else {
        currentData = data.map((el) => {
            let prop = { x: 0, y: 0 };
            if (el.x > el.y) {
                prop.x = el.x - el.dist1 * sliderValue;
                prop.y = el.y + el.dist1 * sliderValue;
            } else {
                prop.x = el.x + el.dist1 * sliderValue;
                prop.y = el.y - el.dist1 * sliderValue;
            }
            return prop;
        });
    }
    const numerator = sum(currentData.map((el) => el.x * el.y)),
        sumSq = sum(currentData.map((el) => el.x ** 2)),
        b = numerator / sumSq,
        clipArea = [
            { x: 0, y: 0 },
            { x: 10 * b, y: 10 },
            { x: 10, y: 10 },
            { x: 10, y: 10 * b },
            { x: 0, y: 0 },
        ],
        alpha = Math.atan2(1, b) - Math.atan2(b, 1);
    let r;
    if (sliderValue == 1) {
        r = 1;
    } else {
        r = Math.floor(Math.cos(alpha) * 1000) / 1000;
        if (r != -1 && r != 0) {
            r = r.toFixed(3).replace(/0\./, ".");
        }
    }
    r = r.toString().replace("-", "\u2212");

    // document.getElementById("df").innerHTML = df
    // document.getElementById("critValue").innerHTML = critOut + ", " + critOut
    // document.getElementById("inner2").innerHTML = pt[df-1]
    // document.querySelectorAll("#dfIn").forEach((el) => el.innerHTML = df)
    // document.querySelectorAll("#quantile").forEach((el) => el.innerHTML = crit)
    svg.select(".graph").remove();

    graphLayer = svg.append("g").attr("class", "graph");
    graphLayer
        .append("clipPath")
        .attr("id", "clip-path")
        .append("path")
        .attr("d", Gen(clipArea));
    graphLayer
        .append("circle")
        .attr("id", "angle")
        .attr("cx", x(0))
        .attr("cy", y(0))
        .attr("r", 50)
        .attr("clip-path", "url(#clip-path)");
    // graphLayer
    lines = graphLayer.append("g");
    scatter = graphLayer.append("g");
    scatter
        .selectAll("dot")
        .data(currentData)
        .enter()
        .append("circle")
        .attr("cx", function (d) {
            return x(d.x);
        })
        .attr("cy", function (d) {
            return y(d.y);
        })
        .attr("r", 6);

    lines
        .append("line")
        .attr("id", "yHat")
        .attr("x1", x(-10))
        .attr("y1", y(-10 * b))
        .attr("x2", x(10))
        .attr("y2", y(10 * b))
        .attr("clip-path", "url(#rect-clip)");
    lines
        .append("line")
        .attr("id", "xHat")
        .attr("x1", x(-10 * b))
        .attr("y1", y(-10))
        .attr("x2", x(10 * b))
        .attr("y2", y(10))
        .attr("clip-path", "url(#rect-clip)");

    // Features of the annotation
    let annotDY = null;
    if (sliderValue < 0) {
        annotDY = -1;
    } else {
        annotDY = 1;
    }
    let bStr = null;
    if (sliderValue == 0) {
        bStr = "0";
    } else if (Math.abs(sliderValue) == 1) {
        bStr = b.toFixed().replace("1", "x");
    } else {
        bStr = b.toFixed(2) + " \u00d7 x";
    }
    bStr = bStr.replace("-", "\u2212");
    const angleAnnot = [
            {
                note: {
                    label: "cos(\u03B1) = " + r,
                    title:
                        "\u03B1 = " +
                        Math.ceil((alpha / Math.PI) * 180) +
                        "\u00B0",
                    wrap: 300,
                },
                connector: {
                    end: "dot",
                    endScale: 1, // dot size
                },
                color: ["#00979f"],
                x: x(0.5),
                y: y(0.5),
                dy: 50 * annotDY,
                dx: 50,
            },
        ],
        yHatAnnot = [
            {
                note: {
                    label: "y = " + bStr,
                    wrap: 300,
                },
                connector: {
                    end: "dot",
                    endScale: 1, // dot size
                },
                className: "show-bg",
                color: ["#f4c300"],
                x: x(-6),
                y: y(-6 * b),
                dy: 10 * annotDY,
                dx: 10,
            },
        ],
        xHatAnnot = [
            {
                note: {
                    label: "x = " + bStr.replace("x", "y"),
                    wrap: 300,
                },
                connector: {
                    end: "dot",
                    endScale: 1, // dot size
                },
                className: "show-bg",
                color: ["#52006f"],
                x: x(6 * b),
                y: y(6),
                dy: -10,
                dx: 10 * -annotDY,
            },
        ];

    // Add annotation to the chart
    const makeAngleAnnot = d3.annotation().annotations(angleAnnot),
        makeYHatAnnot = d3.annotation().annotations(yHatAnnot),
        makeXHatAnnot = d3.annotation().annotations(xHatAnnot);

    graphLayer.append("g").call(makeAngleAnnot);
    if (sliderValue > -1) {
        graphLayer.append("g").call(makeXHatAnnot);
    }
    graphLayer.append("g").call(makeYHatAnnot);

    d3.select(".graph")
        .selectAll(".annotation-note-bg")
        .attr("fill-opacity", "0.7");
    document.getElementById("r").innerHTML = r;
};

const reset = () => {
    d3.selectAll("#plot > svg").remove();
    document.getElementById("rValue").value = "0";
    init();
    draw();
};

// listen in on the sliders
document.getElementById("rValue").addEventListener("input", draw);
document.getElementById("rValue").addEventListener("touchmove", draw);

init();
draw();
