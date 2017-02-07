
var graph_arr = [];

function set_click(graph, data_point){
    graph_arr[graph]
}

$(document).ready(function() {
    build();
    build();
    build();
    build();
    build();
    build();
    build();
    build();
    build();
    build();
    build();
    build();
});

function build(){

    var svg_base = $(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">`);

    var string = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"></svg>`;

    var data = [];
    for (var i = 0; i < 20; i++){
        data.push(Math.floor((Math.random() * 100) + 1));
    }

    graph_arr.push(data);

    var point_list = "";
    var data_points = data.length;
    var center_point = [100, 100];
    var rectangle = {width:200, height:200};

    for (var i = 0; i < data_points; i++){

        var base_vector1 = [data[i], 0];

        if (i == data_points - 1)
            var base_vector2 = [data[0], 0];
        else
            var base_vector2 = [data[i+1], 0];

        var theta1 = (2 * Math.PI / data_points) * i;
        var theta2 = (2 * Math.PI / data_points) * (i + 1);

        var x1 = base_vector1[0] * Math.cos(theta1) - base_vector1[1] * Math.sin(theta1);
        var y1 = base_vector1[1] * Math.cos(theta1) + base_vector1[0] * Math.sin(theta1);

        var x2 = base_vector2[0] * Math.cos(theta2) - base_vector2[1] * Math.sin(theta2);
        var y2 = base_vector2[1] * Math.cos(theta2) + base_vector2[0] * Math.sin(theta2);

        var g = "";
        g += `<g class="svg_color"><polygon points="`;
        g += center_point[0] + "," + center_point[1] + " ";
        g += (x1 + center_point[0]) + "," + (y1 + center_point[1]) + " ";
        g += (x2 + center_point[0]) + "," + (y2 + center_point[1]) + " ";
        g += `" style="stroke-width:1"/></g>`;

        var jquery_g = $(g);

        svg_base.append(jquery_g);
        svg_base.children()[svg_base.children().length-1].onclick = function() {
           alert("asdasdfasfasfdf");
        };
    }

    for (var i = 0; i < data_points; i++) {

        var theta1 = (2 * Math.PI / data_points) * i;
        var theta2 = (2 * Math.PI / data_points) * (i + 1);

        var onclick_string = "onclick=\"set_click(" + graph_arr.length + "," + i + ")\"";

        var g = $(`<g class="hover_group"></g>`);

        var polygon = "";
        polygon += `<polygon points="`;
        polygon += center_point[0] + "," + center_point[1] + " ";
        polygon += (edgeOfView(rectangle, theta1).x) + "," + (edgeOfView(rectangle, theta1).y) + " ";
        polygon += (edgeOfView(rectangle, theta2).x) + "," + (edgeOfView(rectangle, theta2).y) + " ";
        polygon += `" style="stroke-width:1"/></polygon>`;

        var jquery_polygon = $(polygon);


        //$(jquery_polygon).click(

        g.append(jquery_polygon);

        //var jquery_g = $(g);
        // $(g).onclick = function() {
        //    alert("asdf");
        // };
        svg_base.append(g);
        svg_base.children()[svg_base.children().length-1].onclick = function() {
           alert("asdf");
        };
    }


    //$(svg_base).click(function() {
        //alert( "Handler for .click() called." );
    //});

    // Fun little hack because Jquery sucks
    svg_base.html(function(){return this.innerHTML});

    graph_arr[graph_arr.length-1].push(svg_base);
    $("#svg-row").append(svg_base);

}

// Thanks stackoverflow
function edgeOfView(rect, deg) {
    var twoPI = Math.PI*2;
    var theta = deg;//deg * Math.PI / 180;

    while (theta < -Math.PI) {
        theta += twoPI;
    }

    while (theta > Math.PI) {
        theta -= twoPI;
    }

    var rectAtan = Math.atan2(rect.height, rect.width);
    var tanTheta = Math.tan(theta);
    var region;

    if ((theta > -rectAtan) && (theta <= rectAtan)) {
        region = 1;
    } else if ((theta > rectAtan) && (theta <= (Math.PI - rectAtan))) {
        region = 2;
    } else if ((theta > (Math.PI - rectAtan)) || (theta <= -(Math.PI - rectAtan))) {
        region = 3;
    } else {
        region = 4;
    }

    var edgePoint = {x: rect.width/2, y: rect.height/2};
    var xFactor = 1;
    var yFactor = 1;

    switch (region) {
        case 1: yFactor = -1; break;
        case 2: yFactor = -1; break;
        case 3: xFactor = -1; break;
        case 4: xFactor = -1; break;
    }

    if ((region === 1) || (region === 3)) {
        edgePoint.x += xFactor * (rect.width / 2.);                                     // "Z0"
        edgePoint.y += yFactor * (rect.width / 2.) * tanTheta;
    } else {
        edgePoint.x += xFactor * (rect.height / (2. * tanTheta));                        // "Z1"
        edgePoint.y += yFactor * (rect.height /  2.);
    }

    return edgePoint;
};