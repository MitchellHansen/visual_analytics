
function build(){

    var string = `<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="200" height="200">`;

    var data = [];
    for (var i = 0; i < 20; i++){
        data.push(Math.floor((Math.random() * 100) + 1));
    }

    var point_list = "";
    var data_points = data.length;
    var center_point = [100, 100];

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

        string += `<g class="hover_group"><polygon points="`;
        string += center_point[0] + "," + center_point[1] + " ";
        string += (x1 + center_point[0]) + "," + (y1 + center_point[1]) + " ";
        string += (x2 + center_point[0]) + "," + (y2 + center_point[1]) + " ";
        string += `" style="stroke-width:1"/></g>`;

    }

$("#slider-panel").append(string);
//var newSvg = document.getElementById('slider-panel');
//newSvg.outerHTML += string;

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
