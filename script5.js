func1 = function(x,y){
    return [x, y, x / sqrt(x*x + y*y)];
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
let meshcolor = 0x00ff88;
let detail1 = 81;   //曲面のポリゴンの分割数
let detail2 = 41;   //チューブの分割数
let detail3 = 10;   //グリッドの分割数
let bottom_height = -1; //底辺の高さ
let xrange1 = [-1, 1];   //xの定義域
let yrange1 = [-1, 1];   //yの定義域
let scale1 = 2.2; //オブジェクトのスケール
let tubethick = 0.015;  //チューブの太さ
let opacity1 = 0.6;

func1_bottom = function(x, y){return [x, y, bottom_height]};

let list1a = [];
for(let i=0; i<=detail3; i++) list1a.push((yrange1[1]-yrange1[0])/detail3*i + yrange1[0]);
let list1b = [];
for(let i=0; i<=detail3; i++)   list1b.push((xrange1[1]-xrange1[0])/detail3*i + xrange1[0]);

let utubes_vts_1 = tubeU_vtsC(func1, list1a, xrange1, detail2, tubethick, 6);
let vtubes_vts_1 = tubeV_vtsC(func1, list1b, yrange1, detail2, tubethick, 6);

let utubes_vts0_1 = tubeU_vtsC(func1_bottom, list1a, xrange1, 1, tubethick, 6);
let vtubes_vts0_1 = tubeV_vtsC(func1_bottom, list1b, yrange1, 1, tubethick, 6);

let uvtube_index_1 = tube_indexC(detail2, 6, list1a.length);
let uvtube_index0_1 = tube_indexC(1, 6, list1b.length);

let main_mesh_vts_1 = parametric_vtsC(func1, xrange1, yrange1, detail1, detail1);
let main_mesh_index_1 = parametric_indexC(detail1, detail1);


addMeshC("utubes_vts_1", uvtube_index_1, {color:tubecolor1, scale:scale1});
addMeshC("vtubes_vts_1", uvtube_index_1, {color:tubecolor2, scale:scale1});
addMeshC("utubes_vts0_1", uvtube_index0_1, {color:tubecolor1, scale:scale1});
addMeshC("vtubes_vts0_1", uvtube_index0_1, {color:tubecolor2, scale:scale1});

addMeshC("main_mesh_vts_1", main_mesh_index_1, {color:meshcolor, scale:scale1, opacity:opacity1});


animateC();




