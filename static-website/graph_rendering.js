
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



var graph_arr = [];

// Holds the currently loaded graphs & their jquery DOM object
var training_graph_arr = [];
var testing_graph_arr = [];

let previous_testing_graph_slice;
let previous_training_graph_slice;

let selected_training_graph_slice = {};

function testing_graph_click(graph_index, data_index){
    console.log(graph_index + ", " + data_index);

}

function training_graph_click(graph_index, data_index){
    console.log(graph_index + ", " + data_index);

    if (selected_training_graph_slice[graph_index] != null){
        selected_training_graph_slice[graph_index].toggleClass("selected");
    }

    let point_count = training_graph_arr[0].data.length;

    selected_training_graph_slice[graph_index] = $($($("#svg-row").children()[graph_index]).children()[point_count + data_index]);

    previous_training_graph_slice.toggleClass("selected");
}

function build(){

    let graph_data = {}

    let svg_base = $(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"></svg>`);

    let data_points = [];
    for (let i = 0; i < 20; i++){
        data_points.push(Math.floor((Math.random() * 100) + 1));
    }
    graph_data.data = data_points;


    let data_point_count = data_points.length;
    let center    = {x:100, y:100};
    let rectangle = {width:200, height:200};

    for (let i = 0; i < data_point_count; i++){

        // Initial vector that we'll rotate
        let base_vector1 = {x:data_points[i], y:0};
        let base_vector2 = {x:0, y:0};

        // On the last point wrap around
        if (i == data_point_count - 1)
            base_vector2 = {x:data_points[0], y:0};
        else
            base_vector2 = {x:data_points[i+1], y:0};

        let theta1 = (2 * Math.PI / data_point_count) * i;
        let theta2 = (2 * Math.PI / data_point_count) * (i + 1);

        let x1 = base_vector1.x * Math.cos(theta1) - base_vector1.y * Math.sin(theta1);
        let y1 = base_vector1.y * Math.cos(theta1) + base_vector1.x * Math.sin(theta1);

        let x2 = base_vector2.x * Math.cos(theta2) - base_vector2.y * Math.sin(theta2);
        let y2 = base_vector2.y * Math.cos(theta2) + base_vector2.x * Math.sin(theta2);

        let dom_object = $("<g class=\"svg_color\"><polygon points=\"\" style=\"stroke-width:1\"/></g>");

        // The SVG polygon vertex coordinates
        let coordinates = center.x + "," + center.y + " " +
                          (x1 + center.x) + "," + (y1 + center.y) + " " +
                          (x2 + center.x) + "," + (y2 + center.y) + " ";

        dom_object.children().first().attr("points", coordinates);

        svg_base.append(dom_object);
    }

    for (let i = 0; i < data_point_count; i++) {

        let theta1 = (2 * Math.PI / data_point_count) * i;
        let theta2 = (2 * Math.PI / data_point_count) * (i + 1);

        let dom_object = $(`<g class="hover_group"><polygon points=\"\" style=\"stroke-width:1\"/></polygon></g>`);

        let coordinates = center.x + "," + center.y + " " +
                          (edgeOfView(rectangle, theta1).x) + "," + (edgeOfView(rectangle, theta1).y) + " " +
                          (edgeOfView(rectangle, theta2).x) + "," + (edgeOfView(rectangle, theta2).y) + " ";

        dom_object.children().first().attr("points", coordinates);

        let onclick_string = "training_graph_click(" + training_graph_arr.length + "," + i + ")";

        dom_object.children().first().attr("onclick", onclick_string);

        dom_object.html(function(){return this.innerHTML});
        svg_base.append(dom_object);
    }


    graph_data.svg_g = svg_base;

    // Fun little hack because Jquery sucks
    svg_base.html(function(){return this.innerHTML});

    training_graph_arr.push(graph_data);

    $("#svg-row").append(svg_base);


}

// Thanks stack overflow
function edgeOfView(rect, deg) {
    let twoPI = Math.PI*2;
    let theta = deg;//deg * Math.PI / 180;

    while (theta < -Math.PI) {
        theta += twoPI;
    }

    while (theta > Math.PI) {
        theta -= twoPI;
    }

    let rectAtan = Math.atan2(rect.height, rect.width);
    let tanTheta = Math.tan(theta);
    let region;

    if ((theta > -rectAtan) && (theta <= rectAtan)) {
        region = 1;
    } else if ((theta > rectAtan) && (theta <= (Math.PI - rectAtan))) {
        region = 2;
    } else if ((theta > (Math.PI - rectAtan)) || (theta <= -(Math.PI - rectAtan))) {
        region = 3;
    } else {
        region = 4;
    }

    let edgePoint = {x: rect.width/2, y: rect.height/2};
    let xFactor = 1;
    let yFactor = 1;

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