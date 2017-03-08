
$(document).ready(function() {

});

let graph_dimensions = {width:175, height:175};

let training_graph_arr = [];
let testing_graph_arr = [];

function testing_graph_click(graph_index, data_index){

    console.log(graph_index + ", " + data_index);

    let graph = testing_graph_arr[graph_index];

    if (graph.selected_point == data_index) {

        if (graph.class == 2) {
            graph.class = 1;
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-1")
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-2")
        }
        else if (graph.class == 1) {
            graph.class = 2;
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-1")
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-2")
        }
    }
    else {

        if (graph.selected_point != -1){
            $(graph.svg_g.children()[graph.selected_point + graph.data.length]).removeClass("selected-class-2")
            $(graph.svg_g.children()[graph.selected_point + graph.data.length]).removeClass("selected-class-1")
        }

        graph.selected_point = data_index;
        graph.class = 1;

        $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-1")
    }

    ($($("#graph-space-testing").children()[graph_index]).children()[data_index + graph.data.length]);
}

function training_graph_click(graph_index, data_index){

    console.log(graph_index + ", " + data_index);

    let graph = training_graph_arr[graph_index];

    if (graph.selected_point == data_index) {

        if (graph.class == 2) {
            graph.class = 1;
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-1")
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-2")
        }
        else if (graph.class == 1) {
            graph.class = 2;
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-1")
            $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-2")
        }
    }
    else {

        if (graph.selected_point != -1){
            $(graph.svg_g.children()[graph.selected_point + graph.data.length]).removeClass("selected-class-2")
            $(graph.svg_g.children()[graph.selected_point + graph.data.length]).removeClass("selected-class-1")
        }

        graph.selected_point = data_index;
        graph.class = 1;

        $(graph.svg_g.children()[data_index + graph.data.length]).toggleClass("selected-class-1")
    }

    ($($("#graph-space-training").children()[graph_index]).children()[data_index + graph.data.length]);
}


graph_context = {TRAINING:0, TESTING:1, NOP:2};
graph_type = {STAR:0, LINEAR:1};

function build(container, context, type, data){

    // Due to poor decisions I have to now call a for loop for each style of graph which inflates
    // this function unnecessarily, but oh well.

    $(container).empty();

    testing_graph_arr = [];
    training_graph_arr = [];

    if (context != graph_context.TRAINING &&
        context != graph_context.TESTING &&
        context != graph_context.NOP){
        console.log("context not supported");
        return;
    }

    if (type != graph_type.LINEAR &&
        type != graph_type.STAR){
        console.log("graph type not supported");
        return;
    }


    // Initialize and add all of the class 1 children
    data.class_1_child.forEach(function(value, index){

        // Get the star instance and set its values
        let graph = null;

        if (type == graph_type.STAR)
            graph = build_star(context, value);
        else if (type == graph_type.LINEAR)
            graph = build_linear(context, value);

        graph.class = 1;

        if (context == graph_context.TRAINING)
            training_graph_arr.push(graph);
        else if (context == graph_context.TESTING)
            testing_graph_arr.push(graph);

        // insert in a random position
        // JQuery sucks
        if ($(container).children().length == 0)
            $(container).append(graph.svg_g);
        else
            $(container).children().eq(Math.floor(Math.random() * $(container).children().length)).after(graph.svg_g);
    });

    // Init and add the class 1 parent
    let parent_graph = null;

    if (type == graph_type.STAR)
        parent_graph = build_star(graph_context.NOP, data.class_1_parent);
    else if (type == graph_type.LINEAR)
        parent_graph = build_linear(graph_context.NOP, data.class_2_parent);

    parent_graph.svg_g.children().each(function(){
        $(this).toggleClass("parent-class-1")
    });

    if ($(container).children().length == 0)
        $(container).append(parent_graph.svg_g);
    else
        $(container).children().eq(Math.floor(Math.random() * $(container).children().length)).after(parent_graph.svg_g);


    // Init and add all the class 2 children
    data.class_2_child.forEach(function(value, index){

        // Get the star instance and set its values
        let graph = null;

        if (type == graph_type.STAR)
            graph = build_star(context, value);
        else if (type == graph_type.LINEAR)
            graph = build_linear(context, value);

        graph.class = 2;

        if (context == graph_context.TRAINING)
            training_graph_arr.push(graph);
        else if (context == graph_context.TESTING)
            testing_graph_arr.push(graph);

        // insert in a random position
        // Jquery sucks and requires you to do it pretty much by hand
        if ($(container).children().length == 0)
            $(container).append(graph.svg_g);
        else
            // In the most disgusting way possible
            $(container).children().eq(Math.floor(Math.random() * $(container).children().length)).after(graph.svg_g);

    });

    // Init and add the class 2 parent
   parent_graph = null;

    if (type == graph_type.STAR)
        parent_graph = build_star(graph_context.NOP, data.class_2_parent);
    else if (type == graph_type.LINEAR)
        parent_graph = build_linear(graph_context.NOP, data.class_2_parent);

    parent_graph.svg_g.children().each(function(){
        $(this).toggleClass("parent-class-2")
    });

    if ($(container).children().length == 0)
        $(container).append(parent_graph.svg_g);
    else
        $(container).children().eq(Math.floor(Math.random() * $(container).children().length)).after(parent_graph.svg_g);

}

// Container = the $() jquery object which to append the svg's
// Returns the graph data container which the click methods interact with
function build_linear(context, data_array){

    let graph_data = {};

    let svg_base = $("<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width="
                     + graph_dimensions.width + " height=" + graph_dimensions.height + "></svg>");

    // The points that are either generated or queried from the server
    graph_data.data = data_array;

    let data_point_count = data_array.length;
    let rectangle = graph_dimensions;
    let spacing = rectangle.width / (data_point_count+1) ;

    for (let i = 0; i < data_point_count-1; i++){

        let dom_object = $("<g class=\"svg_color\"><polygon points=\"\" style=\"stroke-width:1\"/></g>");

        let coordinates = spacing * i + "," + // Bottom Left
                          rectangle.height + " " +

                          spacing * i + "," + // Top Left
                          (rectangle.height - data_array[i]) + " " +

                          spacing * (i+1) + "," + // Top Right
                          (rectangle.height - data_array[i+1]) + " " +

                          spacing * (i+1) + "," + // Bottom Right
                          rectangle.height + " ";

        dom_object.children().first().attr("points", coordinates);

        svg_base.append(dom_object);
    }

    // Because of the way we draw this graph and handle clicking we have to put
    // a dummy element at the end of the svg
    let dom_object = $("<g class=\"svg_color\"><polygon points=\"\" style=\"stroke-width:1\"/></g>");
    svg_base.append(dom_object);

    for (let i = 0; i < data_point_count-1; i++) {


        let dom_object = $(`<g class="hover_group"><polygon points=\"\" style=\"stroke-width:1\"/></polygon></g>`);

        let coordinates = (spacing * i) + "," + // Bottom Left
                          rectangle.height + " " +

                          (spacing * i) + "," + // Top Left
                          0 + " " +

                          (spacing * (i+1)) + "," + // Top Right
                          0 + " " +

                          (spacing * (i+1)) + "," + // Bottom Right
                          rectangle.height + " ";

        dom_object.children().first().attr("points", coordinates);

        let onclick_string = "";


        if (context == graph_context.TRAINING){
          onclick_string += "training_graph_click(" + training_graph_arr.length + "," + (i) + ")";

        } else if (context == graph_context.TESTING){
          onclick_string += "testing_graph_click(" + testing_graph_arr.length + "," + (i) + ")";

        } else if (context == graph_context.NOP){
          onclick_string += "console.log(\"CLICK\")";
        }

        dom_object.children().first().attr("onclick", onclick_string);

        dom_object.html(function(){return this.innerHTML});
        svg_base.append(dom_object);
    }




    graph_data.svg_g = svg_base;
    graph_data.selected_point = -1;
    graph_data.class = -1;

    // Fun little hack to show the svg's because Jquery sucks
    svg_base.html(function(){return this.innerHTML});

    return graph_data;
}

function build_star(context, data_array){

    let graph_data = {};

    let svg_base = $("<svg xmlns=\"http://www.w3.org/2000/svg\" xmlns:xlink=\"http://www.w3.org/1999/xlink\" width="
                     + graph_dimensions.width + " height=" + graph_dimensions.height + "></svg>");

    // The points that are either generated or queried from the server
    graph_data.data = data_array;

    let data_point_count = data_array.length;
    let rectangle = graph_dimensions
    let center    = {x:rectangle.width/2, y:rectangle.height/2};

    for (let i = 0; i < data_point_count; i++){

        // Initial vector that we'll rotate
        let base_vector1 = {x:data_array[i], y:0};
        let base_vector2 = {x:0, y:0};

        // On the last point wrap around
        if (i == data_point_count - 1)
            base_vector2 = {x:data_array[0], y:0};
        else
            base_vector2 = {x:data_array[i+1], y:0};

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

        let onclick_string = "";

      	if (context == graph_context.TRAINING){
      		onclick_string += "training_graph_click(" + training_graph_arr.length + "," + i + ")";
      	} else if (context == graph_context.TESTING){
      		onclick_string += "testing_graph_click(" + testing_graph_arr.length + "," + i + ")";
      	} else if (context == graph_context.NOP){
      		onclick_string += "console.log(\"CLICK\")";
      	}

        dom_object.children().first().attr("onclick", onclick_string);

        dom_object.html(function(){return this.innerHTML});
        svg_base.append(dom_object);
    }


    graph_data.svg_g = svg_base;
    graph_data.selected_point = -1;
    graph_data.class = -1;

    // Fun little hack to show the svg's because Jquery sucks
    svg_base.html(function(){return this.innerHTML});

    return graph_data;

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
}

function rand() {
  let min = 0;
  let max = 100;
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generate_class_data(data_point_count){

    let ret_data = {

        class_1_parent: [],
        class_2_parent: [],
        class_1_child: [],
        class_2_child: []
    };

    for (let i = 0; i < data_point_count; i++){

        ret_data.class_1_parent.push(rand());
        ret_data.class_2_parent.push(rand());
    }

    for (let i = 0; i < 9; i++){

        let array = [];

        ret_data.class_1_parent.forEach(function(value, index) {
            array.push(Math.floor( value * i/10 + rand() * (1 - (i/10))));
        });

        ret_data.class_1_child.push(array);
    }


    for (let i = 0; i < 9; i++){
        let array = [];

        ret_data.class_2_parent.forEach(function(value, index) {
            array.push(Math.floor( value * i/10 + rand() * (1 - (i/10))));
        });

        ret_data.class_2_child.push(array);
    }

    return ret_data;

}
function generate_class_data_viewTemplate_ed(data_point_count){

    let ret_data = {

        class_1_parent: [],
        class_2_parent: [],
        class_1_child: [],
        class_2_child: []
    };

    for (let i = 0; i < data_point_count; i++){

        ret_data.class_1_parent.push(rand());
        ret_data.class_2_parent.push(rand());
    }

    return ret_data;

}

function generate_parent_data(data_point_count){

    let ret_data = {

        class_1_parent: [],
        class_2_parent: [],
        class_1_child: [],
        class_2_child: []
    };

    for (let i = 0; i < data_point_count; i++){

        ret_data.class_1_parent.push(rand());
        ret_data.class_2_parent.push(rand());
    }


    return ret_data;

}