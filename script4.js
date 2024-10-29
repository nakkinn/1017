//3×3の穴あきバージョン

//##############################
//　　　　色　・　透明度
//##############################
let uribbon_omote_color, uribbon_ura_color, vribbon_omote_color, vribbon_ura_color, neji_color;
let surface_omote_color, surface_ura_color, utube_color, vtube_color;

//帯の色
uribbon_omote_color = 0xff6600, uribbon_ura_color = 0xffaa00, vribbon_omote_color = 0x0044ff, vribbon_ura_color = 0x00aaff;
// uribbon_omote_color = 0xff3b1d, uribbon_ura_color = 0xfe7f2d, vribbon_omote_color = 0x3e78b2, vribbon_ura_color = 0x233d4d;
// uribbon_omote_color = 0x375c95, uribbon_ura_color = 0x3e661a, vribbon_omote_color = 0xfeb900, vribbon_ura_color = 0xf96441;
// uribbon_omote_color = 0x1f45d0, uribbon_ura_color = 0x1f4590, vribbon_omote_color = 0xf8bd2e, vribbon_ura_color = 0xb88d2e;
// uribbon_omote_color = 0x6ad357, uribbon_ura_color = 0x9af387, vribbon_omote_color = 0x3648f1, vribbon_ura_color = 0x6678f1;
// uribbon_omote_color = 0xac308c, uribbon_ura_color = 0xcc60bc, vribbon_omote_color = 0x54d775, vribbon_ura_color = 0x84f7a5;
// uribbon_omote_color = 0x004182, uribbon_ura_color = 0x118df0, vribbon_omote_color = 0xfbffa3, vribbon_ura_color = 0xff4b69;
// uribbon_omote_color = 0xa52400, uribbon_ura_color = 0xa52480, vribbon_omote_color = 0x48ada6, vribbon_ura_color = 0x48adf6;

//球の色
neji_color = 0xdddddd;
// neji_color = 0x999999;
// neji_color = 0xf6ccff;

//曲面の色
// surface_omote_color = 0xff5500, surface_ura_color = 0x0055ff;
surface_omote_color = 0x2e09a6, surface_ura_color = 0xd9fd59;
// surface_omote_color = 0x205989, surface_ura_color = 0xf3a975;
// surface_omote_color = 0x1f45d0, surface_ura_color = 0xf8bd2e;
// surface_omote_color = 0xcab3a7, surface_ura_color = 0x364851;
// surface_omote_color = 0xac308c, surface_ura_color = 0x54d775;
// surface_omote_color = 0x2a2a2a, surface_ura_color = 0xd6334b;
// surface_omote_color = 0xa52400, surface_ura_color = 0x48adf6;

//チューブの色
utube_color = 0xeeeeee, vtube_color = 0xeeeeee;


//曲面の透明度
let mesh_opacity = 0.5;


//##############################
//　　サイズ　・　分割数
//##############################

//全てのオブジェクトのスケール
let scale_all = 1;

//cutting sphereの半径
let cutting_sphere_radius = 3.8;

//チューブの太さ
let tube_thick = 0.02;

//帯の太さ
let ribbon_thick = 0.08;

//帯の押し出し量
let ribbon_oshidashi = 0.01;

//球の半径
let sphere_radius = 0.045;

//曲面の分割数
let mesh_detail = 64;

//チューブの分割数
let tube_detail = 64;

//帯の分割数
let ribbon_detail = 128;


//##############################
//　　表示 / 非表示
//##############################

//非表示にする場合はfalseにする

//曲面の表示・非表示
let mesh_visible = true;

//チューブの表示・非表示
let tube_visible = true;

//帯の表示・非表示
let ribbon_visible = true;

//球の表示・非表示
let sphere_visible = true;






//キャンバスの背景色
setBackgroundColorC(0xeeeeee);   



//カメラ
addPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1}); //透視投影カメラ（オブションは省略可能）



//ライト
addAmbientLightC(0xffffff, 0.5); //環境ライト
addDirectionalLightC(0xffffff, 0.6, 0, 1, 1);    //指向性ライト




//オブジェクトの形状を変化させるパラメータ
let parameter1 = 0; 



//ヴィラソートーラスの関数（入力：u,v　出力：[x,y,z]）
const vilaceau = function(u, v){

    v += PI/8*2;
    u += PI/8*3;

    let t1 = parameter1 * 2; //0<t1<4

    let a1 = PI / 4 * t1;    //4次元上での回転角 0<a1<2PI

    let u1 = u + v;
    let v1 = u - v;


    //係数補正 4を法としてt=0,4のとき2, t=1のとき1, t=2のとき1/2, t=3のとき1
    function f1(t){
        t = (t+40000) % 4;
        if(t<2) return -1/4 * t**4 + 11/8 * t**3 - 17/8 * t**2 + 2;
        else  return   -1/4 * t**4 + 21/8 * t**3 - 77/8 * t**2 + 15 * t - 8;
    }

    //スケール補正 t=0,2,4のとき1.4, t=1,3のとき1
    function f2(t){
        return 1.2 + 0.2 * cos(PI*t);
    }

    //4次元上での座標
    let x0 = f1(t1) * cos(u1);
    let y0 = f1(t1) * sin(u1);
    let z0 = cos(v1);
    let w0 = sin(v1);

    //4次元上で回転
    let x1 = x0 * cos(a1) + w0 * sin(a1);
    let y1 = y0;
    let z1 = z0;
    let w1 = - x0 * sin(a1) + w0 * cos(a1);

    //正規化
    let x2 = x1 / Math.sqrt(x1*x1+y1*y1+z1*z1+w1*w1);
    let y2 = y1 / Math.sqrt(x1*x1+y1*y1+z1*z1+w1*w1);
    let z2 = z1 / Math.sqrt(x1*x1+y1*y1+z1*z1+w1*w1);
    let w2 = w1 / Math.sqrt(x1*x1+y1*y1+z1*z1+w1*w1);

    //stereo graphic projection
    let x3 = f2(t1) * x2 / (1.0001 - w2);
    let y3 = f2(t1) * y2 / (1.0001 - w2);
    let z3 = f2(t1) * z2 / (1.0001 - w2);

    return [x3, y3, z3];    
}



let list1 = []; //各u(v)曲線の固定したv(u)の値のリスト
for(let i=0; i<8; i++)  list1.push(PI/8*i + PI/16); // PI/16からPI/8刻みに8本

let uribbon_vts, vribbon_vts, ribbon_index;
//u曲線の帯の頂点リスト（第1引数：u,v->[x,y,z]の関数, 第2引数：各u曲線の固定したvの値のリスト, 第3引数：uの範囲, 第4引数：分割数, 第5引数：帯の太さ, 第6引数：法線方向への押し出し量
uribbon_vts = ribbonU_vtsC(vilaceau, list1, [0, 2*PI], ribbon_detail, ribbon_thick, ribbon_oshidashi);   
//v曲線の帯の頂点リスト
vribbon_vts = ribbonV_vtsC(vilaceau, list1, [0, 2*PI], ribbon_detail, ribbon_thick, -ribbon_oshidashi); 
//u曲線の帯のポリゴンインデックスリスト（第1引数：帯の本数(list1の長さ), 第2引数：分割数）
ribbon_index = ribbon_indexC(ribbon_detail, list1.length);  


let plist;
plist = []; //球の位置の計算
for(let i=0; i<8; i++)   for(let j=0; j<16; j++){
    let u = PI/8*j + PI/16;
    let v = PI/8*i + PI/16;
    let tmp = vilaceau(u,v);
    //cutting sphere外の球は座標を極端に大きくし、描画しない（sphere cutのアルゴリズムを使うより処理が軽い）
    if(tmp[0]*tmp[0]+tmp[1]*tmp[1]+tmp[2]*tmp[2]<cutting_sphere_radius*cutting_sphere_radius)   plist.push(tmp);    
    else    plist.push([999999, 999999, 999999]);
}

//球の集合のメッシュの頂点リスト
let points_vts = points_vtsC(plist, sphere_radius);  
//球の集合のメッシュのポリゴンインデックスリスト
let points_index = points_indexC(plist.length); 


//曲面の頂点リスト　第1引数：(u,v)->(x,y,z)の関数, 第2引数：uの範囲, 第3引数：vの範囲, 第4引数：u方向の分割数, 第5引数：v方向の分割数 
let mesh_vts = parametric_vtsC(vilaceau, [PI/16,2*PI+PI/16], [PI/16*3,PI-PI/16*3], mesh_detail, mesh_detail);
//曲面のポリゴンインデックスリスト　第1引数：u方向の分割数, 第2引数：v方向の分割数
let mesh_index = parametric_indexC(mesh_detail, mesh_detail);

let mesh_vts2 = parametric_vtsC(vilaceau, [PI/16*9,2*PI+PI/16*9-PI/8*3], [-PI/16*3,PI/16*3], mesh_detail/16*13, mesh_detail/16*3);
let mesh_index2 = parametric_indexC(mesh_detail/16*13, mesh_detail/16*3);


let utubes_vts, vtubes_vts, tubes_index;
//u曲線のチューブの集合の頂点
utubes_vts = tubeU_vtsC(vilaceau, list1, [PI/16, 2*PI+PI/16], tube_detail, tube_thick, 6);
//v曲線のチューブの集合の頂点
vtubes_vts = tubeV_vtsC(vilaceau, list1, [PI/16, 2*PI+PI/16], tube_detail, tube_thick, 6);
//u(v)曲線のチューブの集合のポリゴンインデックスリスト
tubes_index = tube_indexC(tube_detail, 6, list1.length);



//シーンにオブジェクトを追加　（半透明のオブジェクトは後に追加する）

//帯
addMeshC("uribbon_vts", ribbon_index, {scale:scale_all, color:uribbon_omote_color, spherecutradius:cutting_sphere_radius, side:2, visible:ribbon_visible});    
addMeshC("uribbon_vts", ribbon_index, {scale:scale_all, color:uribbon_ura_color, spherecutradius:cutting_sphere_radius, side:1, visible:ribbon_visible});
addMeshC("vribbon_vts", ribbon_index, {scale:scale_all, color:vribbon_omote_color, spherecutradius:cutting_sphere_radius, visible:ribbon_visible});
addMeshC("vribbon_vts", ribbon_index, {scale:scale_all, color:vribbon_ura_color, spherecutradius:cutting_sphere_radius, side:2, visible:ribbon_visible});

//球
addMeshC("points_vts", points_index, {scale:scale_all, color:neji_color, visible:sphere_visible});


// チューブ
addMeshC("utubes_vts", tubes_index, {scale:scale_all, color:utube_color, spherecutradius:cutting_sphere_radius, visible:tube_visible});
addMeshC("vtubes_vts", tubes_index, {scale:scale_all, color:vtube_color, spherecutradius:cutting_sphere_radius, visible:tube_visible});

//曲面
addMeshC("mesh_vts", mesh_index, {scale:scale_all, color:surface_omote_color, side:1, opacity:mesh_opacity, visible:mesh_visible});
addMeshC("mesh_vts", mesh_index, {scale:scale_all, color:surface_ura_color, side:2, opacity:mesh_opacity, visible:mesh_visible});

addMeshC("mesh_vts2", mesh_index2, {scale:scale_all, color:surface_omote_color, side:1, opacity:mesh_opacity, visible:mesh_visible});
addMeshC("mesh_vts2", mesh_index2, {scale:scale_all, color:surface_ura_color, side:2, opacity:mesh_opacity, visible:mesh_visible});




//スライダー1操作時の処理
slider1.func = () =>{

    parameter1 = slider1.value; //パラメータの更新

    if(ribbon_visible){   //帯の頂点座標の更新　visibleがfalseの場合は計算を省略する
        uribbon_vts = ribbonU_vtsC(vilaceau, list1, [0, 2*PI], ribbon_detail, ribbon_thick, ribbon_oshidashi);
        vribbon_vts = ribbonV_vtsC(vilaceau, list1, [0, 2*PI], ribbon_detail, ribbon_thick, -ribbon_oshidashi); 
    }

    if(sphere_visible){
        plist = []; //球の位置の再計算
        for(let i=0; i<8; i++)   for(let j=0; j<16; j++){
            let u = PI/8*j + PI/16;
            let v = PI/8*i + PI/16;
            let tmp = vilaceau(u,v);
            //cutting sphere外の球は座標を極端に大きくし、描画しない（sphere cutのアルゴリズムを使うより処理が軽い）
            if(tmp[0]*tmp[0]+tmp[1]*tmp[1]+tmp[2]*tmp[2]<cutting_sphere_radius*cutting_sphere_radius)   plist.push(tmp);    
            else    plist.push([999999, 999999, 999999]);
        }
        points_vts = points_vtsC(plist, sphere_radius);  //球のグループの頂点座標の再計算
    }

    if(mesh_visible){ //曲面の座標の更新
        mesh_vts = parametric_vtsC(vilaceau, [PI/16,2*PI+PI/16], [PI/16*3,PI-PI/16*3], mesh_detail, mesh_detail);
        mesh_vts2 = parametric_vtsC(vilaceau, [PI/16*9,2*PI+PI/16*9-PI/8*3], [-PI/16*3,PI/16*3], mesh_detail/16*13, mesh_detail/16*3);
    }

    if(tube_visible){ //チューブの頂点座標の更新
        utubes_vts = tubeU_vtsC(vilaceau, list1, [PI/16, 2*PI+PI/16], tube_detail, tube_thick, 6);
        vtubes_vts = tubeV_vtsC(vilaceau, list1, [PI/16, 2*PI+PI/16], tube_detail, tube_thick, 6);
    }

    updateObjectC();    //オブジェクトの更新

}




//レンダリング
animateC();



