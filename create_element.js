//文字の要素を生成する
function pelementC(str){
    let newelement = document.createElement("p");
    newelement.textContent = str;
    return newelement;
}


//チェックボックスを生成する
function checkboxC(checked=false){
    let newelement = document.createElement("input");
    newelement.type = "checkbox";
    newelement.id = randomstrC();
    newelement.checked = checked;
    return newelement;
}


//チェックボックスのラベルを生成する
function labelC(str, checkbox){
    let newelement = document.createElement("label");
    newelement.textContent = str;
    newelement.htmlFor = checkbox.id;
    return newelement;
}


//ボタンを生成する
function buttonC(str){
    let newelement = document.createElement("button");
    newelement.textContent = str;
    return newelement;
}


//入力ボックスを生成する
function inputboxC(){
    let newelement = document.createElement("input");
    return newelement;
}


//要素を横並びにするための空の親要素を生成する
function wrapperC(){
    let newelement = document.createElement("div");
    newelement.style.display = "flex";
    newelement.style.alignItems = "center";
    return newelement;
}


//要素のスタイル設定をしてページに追加する
function addElementC(element, option){

    const defaultoption = {parent:document.body ,width:null, height:null, fontSize:null, marginLeft:null, marginRight:null, marginTop:null, marginBottom:null};
    option = {...defaultoption, ...option};

    //スタイル設定
    if(option.width != null)    element.style.width = option.width + "px";
    if(option.height != null)   element.style.height = option.height + "px";

    if(option.fontSize != null) element.style.fontSize = option.fontSize + "px";

    if(option.marginLeft != null) element.style.marginLeft = option.marginLeft + "px";
    if(option.marginRight != null) element.style.marginRight = option.marginRight + "px";
    if(option.marginTop != null) element.style.marginTop = option.marginTop + "px";
    if(option.marginBottom != null) element.style.marginBottom = option.marginBottom + "px";

    //追加
    option.parent.appendChild(element);
}


//改行スペースを生成する
function newlineC(){
    let newelement = document.createElement("div");
    return newelement;
}


//ランダムな10文字の文字列を返す
function randomstrC(){
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let randomString = '';
    for (let i = 0; i < 10; i++) {
        const randomIndex = Math.floor(Math.random() * characters.length);
        randomString += characters[randomIndex];
    }
    return randomString;
}


function addCanvasC(element, option){

    const defaultoption = {parent:document.body ,width:550, height:550, max_width:window.innerWidth, max_height:window.innerHeight, fontSize:null, marginLeft:null, marginRight:null, marginTop:null, marginBottom:null};
    option = {...defaultoption, ...option};
    
    element.width =  Math.min(option.width, option.max_width) * window.devicePixelRatio;
    // element.style.width = Math.min(option.width, option.max_width);
    
    element.height = Math.min(option.height, option.max_height) * window.devicePixelRatio;
    // element.style.height = Math.min(option.height, option.max_height);

    if(option.marginLeft != null) element.style.marginLeft = option.marginLeft + "px";
    if(option.marginRight != null) element.style.marginRight = option.marginRight + "px";
    if(option.marginTop != null) element.style.marginTop = option.marginTop + "px";
    if(option.marginBottom != null) element.style.marginBottom = option.marginBottom + "px";

    //追加
    option.parent.appendChild(element);
}