//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   


// カメラ（どちらかは必須）
addPerspectiveCameraC({fov:40});    //透視投影カメラ　第1引数：オプション（省略可）
//addOrthographicCameraC(); //平行投影カメラ　第1引数：オプション（省略可）


//環境光ライト
addAmbientLightC(0xffffff, 0.3);   //第1引数：光の色, 第2引数：光の強さ


//指向性ライト
addDirectionalLightC(0xffffff, 0.8, 1, 1, 1);   //第1引数：光の色, 第2引数：光の強さ, 第3,4,5引数：ライト位置(x,y,z), (x,y,z)から(0,0,0)に向かう方向にライトを当てる
addDirectionalLightC(0xffffff, 0.2, -1, -1, 1);


//レンダリング（必須）
animateC();


//スライダーの値を使用した関数
const func1C = function(u,v){
    let x, y, z, t;
    t = slider1.value * 0.8 - 0.4;
    x = u;
    y = (u**3 / 3 + t*u) * 2 - v**2 + 0.7;    //べき乗は**で記述する
    z = v;
    return [x,y,z];
}

const func2C = function(u,v){
    let x, y, z;
    x = u;
    y = -1;    //べき乗は**で記述する
    z = v;
    return [x,y,z];
}



//メッシュ
let vts1 = parametric_vtsC(func1C, [-1,1], [-1,1], 50, 50);  
let index1 = parametric_indexC(50, 50);

//チューブ
const tube_thick = 0.016;
let utubes_vts1 = tubeU_vtsC(func1C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 50, tube_thick, 6);
let vtubes_vts1 = tubeV_vtsC(func1C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 50, tube_thick, 6);
let utubes_vts2 = tubeU_vtsC(func2C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 1, tube_thick, 6);
let vtubes_vts2 = tubeV_vtsC(func2C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 1, tube_thick, 6);

let utubes_index1 = tube_indexC(50, 6, 11);
let vtubes_index1 = tube_indexC(50, 6, 11);
let utubes_index2 = tube_indexC(1, 6, 11);
let vtubes_index2 = tube_indexC(1, 6, 11);

//柱
let post1_vts, post2_vts, post3_vts, post4_vts, post5_vts;
post1_vts = tube_vts1C([func1C(-1,-1),func2C(-1,-1)], tube_thick, 6);
post2_vts = tube_vts1C([func1C(-1,1),func2C(-1,1)], tube_thick, 6);
post3_vts = tube_vts1C([func1C(1,-1),func2C(1,-1)], tube_thick, 6);
post4_vts = tube_vts1C([func1C(1,1),func2C(1,1)], tube_thick, 6);
let post_index = tube_indexC(1, 6);


//スライス
let slice1_vts, slice2_vts;
slice1_vts = uslice_vtsC(func1C, 2*slider2.value-1, [-1,1], 50, -1);
slice2_vts = vslice_vtsC(func1C, 2*slider3.value-1, [-1,1], 50, -1);
let slice_index = ribbon_indexC(50);


//チェックボックス
const check1 = document.getElementById("check1");   //メッシュの表示・非表示
const check2 = document.getElementById("check2");   //チューブの表示・非表示
const check3 = document.getElementById("check3");   
const check4 = document.getElementById("check4");   

check1.addEventListener("input", ()=>{  //チェックボックスの値が変更されたときの処理
    updateObjectC();    //オブジェクトの更新
});
check2.addEventListener("input", ()=>{
    updateObjectC();
});
check3.addEventListener("input", ()=>{
    updateObjectC();
});
check4.addEventListener("input", ()=>{
    updateObjectC();
});



//スライダー操作時に頂点座標を再計算してオブジェクトを更新する
slider1.func = () =>{
    vts1 = parametric_vtsC(func1C, [-1,1], [-1,1], 50, 50);  
    utubes_vts1 = tubeU_vtsC(func1C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 50, 0.02, 6);
    vtubes_vts1 = tubeV_vtsC(func1C, [-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1], [-1,1], 50, 0.02, 6);
    //柱
    post1_vts = tube_vts1C([func1C(-1,-1),func2C(-1,-1)], 0.02, 6);
    post2_vts = tube_vts1C([func1C(-1,1),func2C(-1,1)], 0.02, 6);
    post3_vts = tube_vts1C([func1C(1,-1),func2C(1,-1)], 0.02, 6);
    post4_vts = tube_vts1C([func1C(1,1),func2C(1,1)], 0.02, 6);
    //スライス
    slice1_vts = uslice_vtsC(func1C, 2*slider2.value-1, [-1,1], 50, -1);
    slice2_vts = vslice_vtsC(func1C, 2*slider3.value-1, [-1,1], 50, -1);
    updateObjectC();
}


slider2.func = () =>{
    slice1_vts = uslice_vtsC(func1C, 2*slider2.value-1, [-1,1], 50, -1);
    updateObjectC();
}

slider3.func = () =>{
    slice2_vts = vslice_vtsC(func1C, 2*slider3.value-1, [-1,1], 50, -1);
    updateObjectC();
}


//グラフィックの追加
addMeshC("utubes_vts1", utubes_index1, {color:0xff3300, scale:2, visible:"check2.checked"});    //赤チューブ
addMeshC("vtubes_vts1", vtubes_index1, {color:0x0033ff, scale:2, visible:"check2.checked"});    //青チューブ
addMeshC(utubes_vts2, utubes_index2, {color:0xff3300, scale:2, visible:"check2.checked"});  //赤チューブ床
addMeshC(vtubes_vts2, vtubes_index2, {color:0x0033ff, scale:2, visible:"check2.checked"});  //青チューブ床

//4柱
let polecolor = 0x999999;
addMeshC("post1_vts", post_index, {scale:2, color:0xaaaaaa, visible:"check3.checked"});
addMeshC("post2_vts", post_index, {scale:2, color:0xaaaaaa, visible:"check3.checked"});
addMeshC("post3_vts", post_index, {scale:2, color:0xaaaaaa, visible:"check3.checked"});
addMeshC("post4_vts", post_index, {scale:2, color:0xaaaaaa, visible:"check3.checked"});


addMeshC("slice1_vts", slice_index, {scale:2, color:0xff00ff, opacity:0.5, visible:"check4.checked"});
addMeshC("slice2_vts", slice_index, {scale:2, color:0x00ff00, opacity:0.5, visible:"check4.checked"});
addMeshC("vts1", index1, {color:0xffcc00, scale:2, opacity:0.4, visible:"check1.checked"});   //メッシュ

/*
addMeshC 第1引数：頂点リスト名（""で囲う,スライダーを使わない場合は""を付けても付けなくてもよい）, 第2引数ポリゴンインデックスリスト名, 第3引数：オプション
parametric_vtsC 　第1引数：(u,v)->(x,y,z)の関数, 第2引数：uの範囲, 第3引数：vの範囲, 第4引数：u方向の分割数, 第5引数：v方向の分割数
parametric_indexC　第1引数：u方向の分割数, 第2引数：v方向の分割数

tubeU_vtsC() ：　媒介変数で表された曲面上のu曲線をチューブで表し、その集合の頂点リストを生成する
　第1引数：(u,v)->(x,y,z)の関数, 第2引数：各u曲線のvの値（リスト）, 第3引数：uの範囲, 第4引数：u方向の分割数, 第5引数：チューブの半径, 第6引数：チューブの断面の角数

tubeV_vtsC() ：　媒介変数で表された曲面上のv曲線をチューブで表し、その集合の頂点リストを生成する
　第1引数：(u,v)->(x,y,z)の関数, 第2引数：各v曲線のuの値（リスト）, 第3引数：vの範囲, 第4引数：v方向の分割数, 第5引数：チューブの半径, 第6引数：チューブの断面の角数

tube_indexC()　：　チューブ（の集合）のポリゴンインデックスリストを生成する。チューブが複数ある場合、それらの分割数、断面の角数は同じである必要がある
　第1引数：分割数, 第2引数：断面の角数, 第3引数：チューブの本数（チューブ1本の場合は省略してもよい）

[-1, -0.8, -0.6, -0.4, -0.2, 0, 0.2, 0.4, 0.6, 0.8, 1]
の代わりに for文を使って
let listv = new Array(8);   //長さ8の配列を生成
for(let i=-1; i<=1; i+=0.2)  listv[i] = i;  //iを-1から1まで0.2刻みに動かす
と記述して、listvを入れてもよい。
*/



function uslice_vtsC(func, v1, urange, m, soko){
    let result = [];
    for(let i=0; i<=m; i++){
        let t = urange[0] * i / m + urange[1] * (m-i) /m;
        result.push( func(t, v1) );
        result.push( t, soko, v1 );
    }
    return result;
}

function vslice_vtsC(func, u1, vrange, m, soko){
    let result = [];
    for(let i=0; i<=m; i++){
        let t = vrange[0] * i / m + vrange[1] * (m-i) /m;
        result.push( func(u1, t) );
        result.push( u1, soko, t );
    }
    return result;
}