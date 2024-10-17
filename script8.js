func1 = function(r,t){
    return [r*cos(t), r*sin(t), sin(2*t)/2];
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
let scale1 = 2; //オブジェクトのスケール
let tubethick = 0.025;  //チューブの太さ

func1_bottom = function(x, y){return [x, y, bottom_height]};



let xaxis = tube_vts1C([[1,0,0],[-1,0,0]], tubethick, 6);
let yaxis = tube_vts1C([[0,1,0],[0,-1,0]], tubethick, 6);


let main_mesh_vts_1 = parametric_vtsC(func1, [0,1.5], [0,2*PI], detail1, detail1);
let main_mesh_index_1 = parametric_indexC(detail1, detail1);

let points;
let parameter7 = 0;
points = [[1.5*cos(PI/4+parameter7), 1.5*sin(PI/4+parameter7), sin(2*(PI/4+parameter7))/2], [1.5*cos(PI/4+parameter7+PI), 1.5*sin(PI/4+parameter7+PI), sin(2*(PI/4+parameter7))/2]];

let vts7b = tube_vts1C(points, tubethick, 6);
let index7b = tube_indexC(1, 6);



addMeshC("vts7b", index7b, {color:0xffff00, scale:scale1});
addMeshC("main_mesh_vts_1", main_mesh_index_1, {color:meshcolor, scale:scale1, opacity:0.8});   // 曲面


slider1.func = () =>{

    parameter7 = PI * slider1.value * 2;
    vts7b = tube_vts1C(points, tubethick, 6);
    points = [[1.5*cos(PI/4+parameter7), 1.5*sin(PI/4+parameter7), sin(2*(PI/4+parameter7))/2], [1.5*cos(PI/4+parameter7+PI), 1.5*sin(PI/4+parameter7+PI), sin(2*(PI/4+parameter7))/2]];
    updateObjectC();
}


animateC();




