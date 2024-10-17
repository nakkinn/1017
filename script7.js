func1 = function(x,y){
    return [x, y, x * y / (x*x + y*y)];
}


//背景色
setBackgroundColorC(0xeeeeee);

//カメラ
addOrthographicCameraC({fov:40, near:0.01, far:500, zoom:1.5});

//ライト
addAmbientLightC(0xffffff, 0.4);
addDirectionalLightC(0xffffff, 0.7, 0, 1, 1);

//オブジェクト

let tubecolor1 = 0xffffff;
let tubecolor2 = 0x555555;
let meshcolor = 0x00aa00;
let detail1 = 81;   //曲面のポリゴンの分割数
let detail2 = 41;   //チューブの分割数
let detail3 = 10;   //グリッドの分割数
let bottom_height = -1; //底辺の高さ
let xrange1 = [-1, 1];   //xの定義域
let yrange1 = [-1, 1];   //yの定義域
let scale1 = 2.5; //オブジェクトのスケール
let tubethick = 0.02;  //チューブの太さ

func1_bottom = function(x, y){return [x, y, bottom_height]};



let xaxis = tube_vts1C([[1,0,0],[-1,0,0]], tubethick, 6);
let yaxis = tube_vts1C([[0,1,0],[0,-1,0]], tubethick, 6);


let main_mesh_vts_1 = parametric_vtsC(func1, xrange1, yrange1, detail1, detail1);
let main_mesh_index_1 = parametric_indexC(detail1, detail1);

let points,points2;
let parameter7 = 0;
points = [[cos(PI/4+parameter7), sin(PI/4+parameter7), sin(2*(PI/4+parameter7))/2], [cos(PI/4+parameter7+PI), sin(PI/4+parameter7+PI), sin(2*(PI/4+parameter7))/2]];
points2 = [[cos(PI/4-parameter7), sin(PI/4-parameter7), sin(2*(PI/4+parameter7))/2], [cos(PI/4-parameter7+PI), sin(PI/4-parameter7+PI), sin(2*(PI/4+parameter7))/2]];

let vts7b = tube_vts1C(points, tubethick, 6);
let index7b = tube_indexC(1, 6);
let vts7b2 = tube_vts1C(points2, tubethick, 6);



addMeshC(xaxis, index7b, {scale:scale1, color:0xff0000});    //赤チューブ
addMeshC(yaxis, index7b, {scale:scale1, color:0x0000ff});    //青チューブ
addMeshC("vts7b", index7b, {color:0xffff00, scale:scale1});
addMeshC("vts7b2", index7b, {color:0xffff00, scale:scale1});
addMeshC("main_mesh_vts_1", main_mesh_index_1, {color:meshcolor, scale:scale1, opacity:1});    //曲面


slider1.func = () =>{

    parameter7 = PI * slider1.value;
    vts7b = tube_vts1C(points, tubethick, 6);
    vts7b2 = tube_vts1C(points2, tubethick, 6);
    points = [[cos(PI/4+parameter7), sin(PI/4+parameter7), sin(2*(PI/4+parameter7))/2], [cos(PI/4+parameter7+PI), sin(PI/4+parameter7+PI), sin(2*(PI/4+parameter7))/2]];
    points2 = [[cos(PI/4-parameter7), sin(PI/4-parameter7), sin(2*(PI/4+parameter7))/2], [cos(PI/4-parameter7+PI), sin(PI/4-parameter7+PI), sin(2*(PI/4+parameter7))/2]];
    updateObjectC();
}


animateC();




