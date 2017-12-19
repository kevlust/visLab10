const statistics = {"header": ["Program Description" , "Number"],
                    "values": [{"program": "College of Liberal Arts", "number": 22},
                               {"program": "Graduate Engineering", "number": 7},
                               {"program": "School of Engineering", "number": 8}]};

// console.log(statistics);
for (var i = 0 ; i < statistics.values.length; i++) {
  console.log(statistics.values[i].program + ", " + statistics.values[i].number);
}

let container = document.getElementById("container");

const svgns = "http://www.w3.org/2000/svg";

let svg = document.createElementNS(svgns, "svg");
svg.setAttribute("width", 500);
svg.setAttribute("height", 500);
container.appendChild(svg);

let chart = document.createElementNS(svgns, "g");
chart.setAttribute("id", "pie-chart");
svg.appendChild(chart);

fractions = [];
total = 0;

for (var i = 0; i < statistics.values.length; i++) {
  total += statistics.values[i].number;
}

for (var i = 0; i < statistics.values.length; i++) {
  fractions.push(statistics.values[i].number / total);
}

function getCoordinatesForFraction(f) {
  const x = Math.cos(2 * Math.PI * f);
  const y = Math.sin(2 * Math.PI * f);
  
  return {"x": x, "y": y};
}


let pathDescriptions = [];
var radius = 200, center = 250;
var percent = 0.0

for (var i = 0; i < fractions.length; i++) {
  var xy = getCoordinatesForFraction(percent);
  var line = "L" + (center + xy.x * radius)
           + "," + (center + xy.y * radius);
  var prevPercent = percent;
  percent += fractions[i];
  xy = getCoordinatesForFraction(percent);

  var arc;
  if (percent - prevPercent < 0.5) {
    arc = "A200,200 0 0,1 "
        + (center + (xy.x * radius)) + ","
        + (center + (xy.y * radius)) + " z";
  } else {
    arc = "A200,200 0 1,1 "
        + (center + (xy.x * radius)) + ","
        + (center + (xy.y * radius)) + " z";
  }

  var path = "M250,250 " + line + " " + arc;
  pathDescriptions.push(path);
}

for(var i = 0; i < pathDescriptions.length; i++){
  let path = document.createElementNS(svgns, "path");
  path.setAttribute("d", pathDescriptions[i]);
  path.setAttribute("stroke", "white");
  path.setAttribute("hue", +(i * 360 / fractions.length));

  path.setAttribute("fill", 'hsl('
                + path.getAttribute("hue")
                + ', 100%, 50%)');

  path.addEventListener("mouseover", function(event){
    console.log("mouseover");
    path.setAttribute("fill", 'hsl('
                + path.getAttribute("hue")
                + ', 100%, 65%)');
  });

  path.addEventListener("mouseleave", function(event){
    console.log("mouseleave");
    path.setAttribute("fill", 'hsl('
                + path.getAttribute("hue")
                + ', 100%, 50%)');
  });

  chart.appendChild(path);
}


console.log(container);
