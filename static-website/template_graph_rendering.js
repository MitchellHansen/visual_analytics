
function reBuild_DatapointsLen(DatapointsLen, container){

    let graph_data = {};

    let svg_base = $(`<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200"></svg>`);

    let data_points = [];
    for (let i = 0; i < DatapointsLen; i++){
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
    graph_data.selected_point = -1;
    graph_data.class = -1;

    // Fun little hack to show the svg's because Jquery sucks
    svg_base.html(function(){return this.innerHTML});
    if($(container).length){
        $(container).empty();
        $(container).append(svg_base);
    }else{
        $(container).append(svg_base);
    }

    return graph_data;

}

// Test to see if I can add this function to an oninput event to change the html div body text.Works!
function oninput_pass(input){
    document.getElementById("template_Section_Length").innerHTML = input;
}
/////////////////////////////////////////////////////////////////////////////////////////////////////
function serialize_and_pass(){
    var str = $("#template_form").serializeArray();   
    var graphData;
    var name1, name2, name3, value1,value2,value3;
    name1 = str[0].name;
    value1 = str[0].value;
    name2 = str[1].name;
    value2 = str[1].value;
    name3 = str[2].name;
    value3 = str[2].value;
    graphData ={ "newGraphData" :[ {name1:value1},{name2:value2},{name3:value3}]};

    if(!str){
        alert("empty");
    }
    else{
        alert(str[0].value + " + " + str[0].name );
    }
    
    //for( s = 0; s < str.length; s++){
    //    alert(graphData[s].newGraphData.key + graphData[s].newGraphData.name);
    //}


}