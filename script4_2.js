//##################################
//　　　　要素の生成
//##################################

//スライダー(オブジェクトの形状を変化させるのに使用する), 第1引数はスライダーの初期値（myslider_b.jsでSlider1dというクラスを定義している。慣習として関数と区別するためにクラス名は大文字から始める）
let slider1 = new Slider1d(0);  

//スライダー（透明度を調整するのに使用する）
let slider_opacity = new Slider1d(0);  

//キャンバス
let mycanvas = document.createElement("canvas");  
let subcanvas = document.createElement("canvas");  

//チェックボックス（曲面の一部を非表示にするか否かを切り替えるのに使用する）
let check_kirinuki = checkboxC(true);   


//##################################
//　　　　色　
//##################################

let mesh_omote_color = 0xff9900, mesh_ura_color = 0x0055ff; //曲面の色
let tubeA_color = 0xffffff, tubeB_color = 0xffffff;   //チューブの色
let ribbonA_color = 0x00ff00, ribbonB_color = 0xff5500; //帯の色
let sphere_color = 0xffffff;    //球の色



//##################################
//　　　　形状
//##################################

let tube_radius = 0.01; //チューブの半径
let ribbon_width = 0.05;    //帯の幅
let ribbon_osidashi = 0.01;  //帯の押出量（絶対値）
let sphere_radius = 0.06;   //球の半径
let spherecut_radius = 3.8; //カット球面の半径

let detail = 128;    //分割数



//##################################
//　レンダラ・カメラ・シーン・ライト
//##################################

//レンダラー
let renderer1 = new THREE.WebGLRenderer({
    canvas:mycanvas,  //描画先のキャンバス
    antialias: true,    //trueの時:境界線のスムージングを有効にする
    alpha:false, //trueの時:キャンバスを透過させる（下のレイヤーが見える）
    preserveDrawingBuffer: false    //trueの時:キャンバスの内容を画像データとして保持する。toDataURLを使った画像保存が可能になる
});

//キャンバスの背景色を設定する。第1引数：色, 第2引数：透明度（alphaがfalseの場合、キャンバスのデフォルト背景色は黒なので、透明度を下げると暗い色になる。alphaがtrueの場合は透明度を下げると下のレイヤーが透けて見える）
renderer1.setClearColor(0xffffff, 1);   



//レンダラー
let renderer2 = new THREE.WebGLRenderer({
    canvas:subcanvas,  //描画先のキャンバス
    antialias: true,    //trueの時:境界線のスムージングを有効にする
    alpha:false, //trueの時:キャンバスを透過させる（下のレイヤーが見える）
    preserveDrawingBuffer: false    //trueの時:キャンバスの内容を画像データとして保持する。toDataURLを使った画像保存が可能になる
});

//キャンバスの背景色を設定する。第1引数：色, 第2引数：透明度（alphaがfalseの場合、キャンバスのデフォルト背景色は黒なので、透明度を下げると暗い色になる。alphaがtrueの場合は透明度を下げると下のレイヤーが透けて見える）
renderer2.setClearColor(0xeeeeee, 1);   




//カメラ
let camera1 = createPerspectiveCameraC({fov:40, near:0.01, far:500, zoom:1}); //透視投影カメラ（オブションは省略可能）
let camera2 = camera1.clone();

//シーン
let scene1 = new THREE.Scene();
let scene2 = new THREE.Scene();


//ライト
let lighta1 = new THREE.AmbientLight(0xffffff, 0.5); //環境ライト
let lightd1 = new THREE.DirectionalLight(0xffffff, 0.6);    //指向性ライト
lightd1.position.set(0, 1, 1);
scene1.add(lighta1);
scene1.add(lightd1);



//##################################
//　オブジェクト(変数・関数の用意)
//##################################

//ヴィラソートーラスの関数（入力：[u,v,t]　出力：[x,y,z]）
let vilaceau2 = function([u, v, t=0]){

    u += PI/16 + PI/8 * 4;
    v += PI/16;

    let t1 = t * 2; //0<t1<4

    let a1 = PI / 4 * t1;    //4次元上での回転角 0<a1<2PI

    let u1 = u + v;
    let v1 = u - v;


    //係数補正 t=0,4のとき2, t=1のとき1, t=2のとき1/2, t=3のとき1になる4次関数　tは4を法とする
    function f1(t){
        t = (t+40000) % 4;
        if(t<2) return -1/4 * t**4 + 11/8 * t**3 - 17/8 * t**2 + 2;
        else  return   -1/4 * t**4 + 21/8 * t**3 - 77/8 * t**2 + 15 * t - 8;
    }

    //スケール補正 t=0,2,4のとき1.4, t=1,3のとき1になる三角関数
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

//トーラス
let torus = function([u, v, t=0]){

    let t1 = t * 2; //0<t1<4

    let a1 = PI / 4 * t1;    //4次元上での回転角 0<a1<2PI

    //係数補正 t=0,4のとき2, t=1のとき1, t=2のとき1/2, t=3のとき1になる4次関数　tは4を法とする
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
    let x0 = f1(t1) * cos(u);
    let y0 = f1(t1) * sin(u);
    let z0 = cos(v);
    let w0 = sin(v);

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


//【graphic complex】
let mesh_gc;    //曲面のgc
let tubeA_group_gc, tubeB_group_gc; //チューブのgc
let sphere_group_gc; //球のgc
let ribbonA_group_gc, ribbonB_group_gc; //帯のgc

//【オブジェクト】
let mesh_omote, mesh_ura;   //曲面
let tubeA_group, tubeB_group; //チューブ
let sphere_group;   //球
let ribbonA_group, ribbonB_group;   //帯


//オブジェクトの形状を変化させるパラメータ slider1によって変化させる
let parameter1 = slider1.value; 


//形状を変化させるスライダーを操作時の処理
slider1.func = () =>{
    parameter1 = slider1.value; //パラメータの更新

    //graphic complexを更新する（parameter1を使用して、mesh_gc, tubeA_group_gc, tubeB_group_gc, sphere_group_gc, ribbonA_group_gc, ribbonB_group_gcを更新）
    calculate_torus_gcC(parameter1, check_kirinuki.checked);  
    
    //オブジェクトを更新する（各種gcを使用して、mesh_omote, mesh_ura, tubeA_group, tubeB_group, sphere_group, ribbonA_group, ribbonB_groupを更新）
    update_torus_objectC(); 
}


//曲面の透明度を変化させるスライダー
slider_opacity.func = () =>{
    update_materialC(mesh_omote, {opacity:1-slider_opacity.value});   
    update_materialC(mesh_ura, {opacity:1-slider_opacity.value});
}


//チェックボックス操作時の処理（無限遠点にとぶ点付近を切り抜くか否かを切り替える）
check_kirinuki.addEventListener("input", ()=>{

    //graphic complexを更新する（mesh_gc, tubeA_group_gc, tubeB_group_gc, sphere_group_gc, ribbonA_group_gc, ribbonB_group_gcを更新）
    calculate_torus_gcC(parameter1, check_kirinuki.checked);  
    
    //オブジェクトを更新する（各種gcを使用して、mesh_omote, mesh_ura, tubeA_group, tubeB_group, sphere_group, ribbonA_group, ribbonB_groupを更新）
    update_torus_objectC(); 
});


//graphic complexを更新する（mesh_gc, tubeA_group_gc, tubeB_group_gc, sphere_group_gc, ribbonA_group_gc, ribbonB_group_gcを更新）
//第1引数：形状を変化させるパラメータ, 第2引数：無限遠点にとぶ点付近を切り抜くか否か
function calculate_torus_gcC(t1, kirinuki1=false){

    //曲面の頂点リスト（要素がvilaceau2([u,v,t1])の配列。uは0から2PIまで2PI/detail刻みに、vは0からPIまでPI/detail刻みに動かす。）
    let mesh_vts1 = arrayC({start:0, end:2*PI, step:2*PI/detail}).map( i =>
        arrayC({start:0, end:PI, step:PI/detail}).map( j => vilaceau2([i, j, t1]) )
    ).flat();   

    //曲面のポリゴンインデックスリスト parametric_index2C(第1引数：u配列, 第2引数:v配列, 第3引数：条件式)
    let mesh_index1;  

    //切り抜く場合の曲面のポリゴンインデックスリストを算出
    if(kirinuki1)  mesh_index1 = parametric_index2C( arrayC({start:0, end:2*PI, step:2*PI/detail}), arrayC({start:0, end:PI, step:PI/detail}), (i,j)=>{if(i>=PI*3/8 || j>=PI*3/8) return true;});
    //切り抜かない場合の曲面のポリゴンインデックスリストを算出
    else  mesh_index1 = parametric_index2C( arrayC({start:0, end:2*PI, step:2*PI/detail}), arrayC({start:0, end:PI, step:PI/detail}));
    
    //球面カットした曲面のgc
    mesh_gc = spherecutC( [mesh_vts1, mesh_index1], spherecut_radius ); 


    //要素がtorus([2*PI/8*i, 2*PI/detail*j, t1])の配列（jを0からdetailまで動かす）を8個集めた配列(iを0から7まで動かす)
    let listpA = arrayC({start:0,end:7}).map( i => 
        arrayC({start:0, end:detail}).map( j => torus([2*PI/8*i, 2*PI/detail*j, t1]) )
    );  

    //チューブ族Aのgc
    tubeA_group_gc = listpA.map( i => spherecutC( tube_gcC(i, tube_radius, 6), spherecut_radius) );    

    //要素がtorus([2*PI/detail*j, 2*PI/8*i, t1])の配列（jを0からdetailまで動かす）を8個集めた配列(iを0から7まで動かす)
    let listpB = arrayC({start:0,end:7}).map( i => 
        arrayC({start:0, end:detail}).map( j => torus([2*PI/detail*j, 2*PI/8*i, t1]) )
    );  

    //チューブ族Bのgc
    tubeB_group_gc = listpB.map( i => spherecutC( tube_gcC(i, tube_radius, 6), spherecut_radius) );


    //球の位置　（要素がvilaceau2([PI/8*j, PI/8*i, t1])の配列　iを0から7の範囲で、jを0から15の範囲で動かす）
    let sphere_pos = arrayC({start:0,end:7}).map( i => 
        arrayC({start:0, end:15}).map( j => vilaceau2([PI/8*j, PI/8*i, t1]) )
    ).flat();   

    //球面カットした球のgc
    sphere_group_gc = sphere_pos.map( i => spherecutC( sphere_gcC(i, sphere_radius), spherecut_radius) );   


    //要素が[PI/8*i, 2*PI/detail*j, t1]の配列（jを0からdetailまで動かす）を8個集めた配列(iを0から7まで動かす)
    let listu3 = arrayC({start:0,end:7}).map( i => 
        arrayC({start:0, end:detail}).map( j => [PI/8*i, 2*PI/detail*j, t1])
    );  

    //要素が[2*PI/detail*j, PI/8*i, t1]の配列（jを0からdetailまで動かす）を8個集めた配列(iを0から7まで動かす)
    let listu4 = arrayC({start:0,end:7}).map( i => 
        arrayC({start:0, end:detail}).map( j => [2*PI/detail*j, PI/8*i, t1])
        
    );


    if(t1 < 0.5){   //帯を表側に押し出す

        //帯の族Aのgc
        ribbonA_group_gc = listu3.map( i=> spherecutC( ribbon_gcC( vilaceau2, i, ribbon_width, ribbon_osidashi), spherecut_radius) );   //帯のgc
        
        //帯の族Bのgc
        ribbonB_group_gc = listu4.map( i=> spherecutC( ribbon_gcC( vilaceau2, i, ribbon_width, ribbon_osidashi), spherecut_radius) );

    }else{  //帯を裏側に押し出す

        ribbonA_group_gc = listu3.map( i=> spherecutC( ribbon_gcC( vilaceau2, i, ribbon_width, -ribbon_osidashi), spherecut_radius) );
        ribbonB_group_gc = listu4.map( i=> spherecutC( ribbon_gcC( vilaceau2, i, ribbon_width, -ribbon_osidashi), spherecut_radius) );
    
    }
    
}


//オブジェクトを更新する（各種gcを使用して、mesh_omote, mesh_ura, tubeA_group, tubeB_group, sphere_group, ribbonA_group, ribbonB_groupを更新）
function update_torus_objectC(){

    //曲面の更新
    update_gcC( mesh_omote, mesh_gc );
    update_gcC( mesh_ura, mesh_gc );

    //チューブの更新
    tubeA_group_gc.forEach( (value, index) => update_gcC(tubeA_group[index], value) );
    tubeB_group_gc.forEach( (value, index) => update_gcC(tubeB_group[index], value) );

    //球の更新
    sphere_group_gc.forEach( (value, index) => update_gcC(sphere_group[index], value) );

    //帯の更新
    ribbonA_group_gc.forEach( (value, index) => update_gcC(ribbonA_group[index], value) );
    ribbonB_group_gc.forEach( (value, index) => update_gcC(ribbonB_group[index], value) );

}



//##################################
//オブジェクト(初期状態の設定・追加)
//##################################

//graphic complexを更新する（mesh_gc, tubeA_group_gc, tubeB_group_gc, sphere_group_gc, ribbonA_group_gc, ribbonB_group_gcを更新）
calculate_torus_gcC(parameter1, check_kirinuki.checked);  


//チューブAのオブジェクトの生成
tubeA_group = tubeA_group_gc.map( i => createMeshC(i, {color:tubeA_color}) ); 

//シーンにチューブAを追加
tubeA_group.forEach( i => scene1.add(i) );  

//チューブBのオブジェクトの生成
tubeB_group = tubeB_group_gc.map( i => createMeshC(i, {color:tubeB_color}) );   

//シーンにチューブBを追加
tubeB_group.forEach( i => scene1.add(i) );  


//球のオブジェクトの生成
sphere_group = sphere_group_gc.map( i => createMeshC( i, {color:sphere_color} ) );  

//シーンに球を追加
sphere_group.forEach( i => scene1.add(i));  


//帯の族Aのオブジェクトの生成
ribbonA_group = ribbonA_group_gc.map( i => createMeshC( i, {color:ribbonA_color}) ); 

//シーンに帯の族Aを追加
ribbonA_group.forEach( i => scene1.add(i) );    


//帯の族Bのオブジェクトの生成
ribbonB_group = ribbonB_group_gc.map( i => createMeshC( i, {color:ribbonB_color}) ); 

//シーンに帯の族Bを追加
ribbonB_group.forEach( i => scene1.add(i) );  


//曲面（表）のオブジェクトの生成
mesh_omote = createMeshC(mesh_gc, {color:mesh_omote_color, side:"front"});   

//曲面（裏）のオブジェクトの生成
mesh_ura = createMeshC(mesh_gc, {color:mesh_ura_color, side:"back"}); 

//シーンに曲面（表）を追加
scene1.add( mesh_omote );   

//シーンに曲面（裏）を追加
scene1.add( mesh_ura ); 




let triangle_gc = [ [[1,1,1], [1,-1,1], [1,-1,-1]], [[0,1,2]] ]; 
let triangle = createMeshC(triangle_gc, {color:0xff0056});
scene2.add(lighta1.clone());
scene2.add(lightd1.clone());
scene2.add(triangle);

//レンダリング
rendering_startC(scene1, renderer1, camera1);
rendering_startC(scene2, renderer2, camera2);





// animateC();


// renderer1.render(scene1, camera1);

// console.log(scene1);


