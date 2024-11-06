//通常スライダー
class Slider1d{

    constructor(value = 0){

        this.option = {};
        
        this.mouseIsPressed = false;
        this.value = value;
        this.mx = -1;
        this.my = -1;
        this.func = () => {};
        
        this.container = document.createElement("div");
        this.container.style.position = "relative";
        this.container.style.touchAction = "none";

        //灰色バー
        this.bar1 = document.createElement("div");
        
        //水色バー
        this.bar2 = document.createElement("div");
        
        //つまみ
        this.circle1 = document.createElement("div");
        
        //つまみハイライト
        this.circle2 = document.createElement("div");
        
        this.container.appendChild(this.bar1);
        this.container.appendChild(this.bar2);
        this.container.appendChild(this.circle1);
        this.container.appendChild(this.circle2);
        


        this.container.addEventListener("pointerdown",()=>{
            this.mouseIsPressed = true; 
        });

        document.addEventListener("pointerup",()=>{
            this.mouseIsPressed = false;
            this.mx = -1;
            this.my = -1;
        });

        document.addEventListener("touchmove", (event)=>{
            this.moveevent(event);
        });

        document.addEventListener("pointermove", (event)=>{
            this.moveevent(event);
        });

    }


    moveevent(event){
        
        let x;

        if(event.touches){
            x = event.touches[0].clientX - this.container.getBoundingClientRect().left;
        }else{
            x = event.clientX - this.container.getBoundingClientRect().left;
        }
    
        if(this.mx!=-1 && this.mouseIsPressed){
            this.px += x - this.mx;
            this.px = Math.max(Math.min(this.option.width-this.margin, this.px), this.margin);
            this.value = (this.px - this.margin) / (this.option.width - this.margin*2);
            this.func();

            this.circle1.style.left = this.px - this.option.thumb_radius / 2;
            this.circle2.style.left = this.px - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
            this.bar2.style.width = this.px - ( this.option.width - this.option.bar_width ) / 2;

        }
        
        if(this.mouseIsPressed){
            this.mx = x;
        }
    }

    update(){
        this.px = ( this.option.width - this.option.bar_width ) / 2 + this.option.bar_width * this.value;
        this.circle1.style.left = this.px - this.option.thumb_radius / 2;
        this.circle2.style.left = this.px - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
        this.bar2.style.width = this.px - ( this.option.width - this.option.bar_width ) / 2;
    }

    
    addC(option){

        const defaultoption = {width:500, height:200, bar_width:440, bar_height:20, thumb_radius:30, background_color:"#eeeeee"}; 
        this.option = {...defaultoption, ...option};

        this.margin = ( this.option.width - this.option.bar_width ) / 2;
        this.px = ( this.option.width - this.option.bar_width ) / 2 + this.option.bar_width * this.value;

        this.container.style.width = this.option.width;
        this.container.style.height = this.option.height;
        this.container.style.backgroundColor = this.option.background_color;
        
        //灰色バー
        this.bar1.style.width = this.option.bar_width;
        this.bar1.style.height = this.option.bar_height;
        this.bar1.style.borderRadius = this.option.bar_height / 2 + "px";
        this.bar1.style.position = "absolute";
        this.bar1.style.top = this.option.height / 2 - this.option.bar_height / 2;
        this.bar1.style.left = ( this.option.width - this.option.bar_width ) / 2;
        this.bar1.style.backgroundColor = "#969696";
        this.bar1.style.pointerEvents = "none";
        this.bar1.style.boxShadow = "inset 0 0 "+ this.option.bar_height*0.4+"px rgba(54,54,54,0.8)";
        
        //水色バー
        this.bar2.style.width = this.px - ( this.option.width - this.option.bar_width ) / 2;
        this.bar2.style.height = this.option.bar_height;
        this.bar2.style.borderRadius = this.option.bar_height / 2 + "px";
        this.bar2.style.position = "absolute";
        this.bar2.style.top = this.option.height / 2 - this.option.bar_height / 2;
        this.bar2.style.left = ( this.option.width - this.option.bar_width ) / 2;
        this.bar2.style.backgroundColor = "#9FD0E9";
        this.bar2.style.pointerEvents = "none";
        this.bar2.style.boxShadow = "inset 0 0 "+ this.option.bar_height*0.4+"px rgba(0, 85, 151, 0.8)";
        
        //つまみ
        this.circle1.style.width = this.option.thumb_radius;
        this.circle1.style.height = this.option.thumb_radius;
        this.circle1.style.borderRadius = "50%";
        this.circle1.style.position = "absolute";
        this.circle1.style.top = this.option.height / 2 - this.option.thumb_radius / 2;
        this.circle1.style.left = this.px - this.option.thumb_radius / 2;
        this.circle1.style.pointerEvents = "none";
        this.circle1.style.backgroundColor = "#d4d4d4";
        this.circle1.style.boxShadow = "0px 0px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.4),inset 0 0px " + 1/30*this.option.thumb_radius + "px rgba(0,0,0,0.3),0 " + 1/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.6),0 " + 4/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.2),0 " + 9/30*this.option.thumb_radius + "px " + 4/30*this.option.thumb_radius + "px rgba(0,0,0,0.1),inset " + 1/30*this.option.thumb_radius + "px " + 4/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(255,255,255,1.0)"

        //つまみハイライト
        this.circle2.style.width = this.option.thumb_radius;
        this.circle2.style.height = this.option.thumb_radius;
        this.circle2.style.borderRadius = "50%";
        this.circle2.style.position = "absolute";
        this.circle2.style.top = this.option.height / 2 - this.option.thumb_radius / 2 - 8/30*this.option.thumb_radius;
        this.circle2.style.left = this.px - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
        this.circle2.style.pointerEvents = "none";
        this.circle2.style.backgroundColor = "none";
        this.circle2.style.backgroundImage = "radial-gradient(rgba(255,255,255,1.0), rgba(255,255,255,0.05), rgba(255,255,255,0.0))";


        document.body.appendChild(this.container);
    }
}


//通常スライダー（つまみ2個）
class Slider1d_2{

    constructor(value1 = 0, value2 = 1, type="normal"){

        this.option = {};
        
        this.mouseIsPressed = false;
        this.value1 = value1;
        this.value2 = value2;
        this.type = type;
        this.mx = -1;
        this.my = -1;
        this.px1;
        this.px2;
        this.switch = 1;
        this.func = () => {};
        
        this.container = document.createElement("div");
        this.container.style.position = "relative";
        this.container.style.touchAction = "none";

        //灰色バー
        this.bar1 = document.createElement("div");
        
        //水色バー
        this.bar2 = document.createElement("div");
        
        //つまみ1
        this.circle1a = document.createElement("div");
        
        //つまみ1ハイライト
        this.circle1b = document.createElement("div");

        //つまみ2
        this.circle2a = document.createElement("div");

        //つまみ2ハイライト
        this.circle2b = document.createElement("div");
                
        
        this.container.appendChild(this.bar1);
        this.container.appendChild(this.bar2);
        this.container.appendChild(this.circle1a);
        this.container.appendChild(this.circle1b);
        this.container.appendChild(this.circle2a);
        this.container.appendChild(this.circle2b);


        this.container.addEventListener("pointerdown",(event)=>{
            this.mouseIsPressed = true; 

            let x = event.clientX - this.container.getBoundingClientRect().left;
            if(Math.abs(x-this.px1) < Math.abs(x-this.px2)) this.switch = 1;
            else    this.switch = 2;
        });

        document.addEventListener("pointerup",()=>{
            this.mouseIsPressed = false;
            this.mx = -1;
            this.my = -1;
        });

        document.addEventListener("touchdown", (event)=>{
            let x = event.touches[0].clientX - this.container.getBoundingClientRect().left;
            if(Math.abs(x-this.px1) < Math.abs(x-this.px2)) this.switch = 1;
            else    this.switch = 2;
        });

        document.addEventListener("touchmove", (event)=>{
            this.moveevent(event);
        });

        document.addEventListener("pointermove", (event)=>{
            this.moveevent(event);
        });

    }


    moveevent(event){
        
        let x;

        if(event.touches){
            x = event.touches[0].clientX - this.container.getBoundingClientRect().left;
        }else{
            x = event.clientX - this.container.getBoundingClientRect().left;
        }
    
        if(this.mx!=-1 && this.mouseIsPressed){

            if(this.switch==1){
                this.px1 += x - this.mx;
                this.px1 = Math.max(Math.min(this.option.width-this.margin, this.px1), this.margin);
                if(this.type=="normal") this.px1 = Math.min(this.px1, this.px2);
                this.value1 = (this.px1 - this.margin) / (this.option.width - this.margin*2);
                this.circle1a.style.left = this.px1 - this.option.thumb_radius / 2;
                this.circle1b.style.left = this.px1 - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
            }else{
                this.px2 += x - this.mx;
                this.px2 = Math.max(Math.min(this.option.width-this.margin, this.px2), this.margin);
                if(this.type=="normal") this.px2 = Math.max(this.px1, this.px2);
                this.value2 = (this.px2 - this.margin) / (this.option.width - this.margin*2);
                this.circle2a.style.left = this.px2 - this.option.thumb_radius / 2;
                this.circle2b.style.left = this.px2 - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
            }
            
            this.func();

            //this.bar2.style.width = this.px1 - ( this.option.width - this.option.bar_width ) / 2;

            if(this.px1 < this.px2){
                this.bar1.style.zIndex = 1;
                this.bar2.style.zIndex = 2;
                this.bar2.style.width = this.px2 - this.px1;
                this.bar2.style.left = this.px1;
                this.bar1.style.width = this.option.bar_width;
                this.bar1.style.left = ( this.option.width - this.option.bar_width ) / 2;
            }else{
                this.bar2.style.width = this.option.bar_width
                this.bar2.style.left = ( this.option.width - this.option.bar_width ) / 2;
                this.bar1.style.zIndex = 2;
                this.bar2.style.zIndex = 1;
                this.bar1.style.width = this.px1 - this.px2;
                this.bar1.style.left = this.px2;
            }
        
        }
        
        if(this.mouseIsPressed){
            this.mx = x;
        }

    }

    update(){
        this.px1 = ( this.option.width - this.option.bar_width ) / 2 + this.option.bar_width * this.value1;
        this.circle1a.style.left = this.px1 - this.option.thumb_radius / 2;
        this.circle1b.style.left = this.px1 - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
        this.bar2.style.width = this.px1 - ( this.option.width - this.option.bar_width ) / 2;
    }

    
    addC(option){

        const defaultoption = {width:500, height:200, bar_width:440, bar_height:20, thumb_radius:30, background_color:"#eeeeee"}; 
        this.option = {...defaultoption, ...option};

        this.margin = ( this.option.width - this.option.bar_width ) / 2;
        this.px1 = ( this.option.width - this.option.bar_width ) / 2 + this.option.bar_width * this.value1;
        this.px2 = ( this.option.width - this.option.bar_width ) / 2 + this.option.bar_width * this.value2;

        this.container.style.width = this.option.width;
        this.container.style.height = this.option.height;
        this.container.style.backgroundColor = this.option.background_color;
        
        //灰色バー
        this.bar1.style.width = this.option.bar_width;
        this.bar1.style.height = this.option.bar_height;
        this.bar1.style.borderRadius = this.option.bar_height / 2 + "px";
        this.bar1.style.position = "absolute";
        this.bar1.style.top = this.option.height / 2 - this.option.bar_height / 2;
        this.bar1.style.left = ( this.option.width - this.option.bar_width ) / 2;
        this.bar1.style.backgroundColor = "#969696";
        this.bar1.style.pointerEvents = "none";
        this.bar1.style.boxShadow = "inset 0 0 "+ this.option.bar_height*0.4+"px rgba(54,54,54,0.8)";
        
        //水色バー
        //this.bar2.style.width = this.px1 - ( this.option.width - this.option.bar_width ) / 2;
        this.bar2.style.width = this.px2 - this.px1;
        this.bar2.style.height = this.option.bar_height;
        this.bar2.style.borderRadius = this.option.bar_height / 2 + "px";
        this.bar2.style.position = "absolute";
        this.bar2.style.top = this.option.height / 2 - this.option.bar_height / 2;
        //this.bar2.style.left = ( this.option.width - this.option.bar_width ) / 2;
        this.bar2.style.left = this.px1;
        this.bar2.style.backgroundColor = "#9FD0E9";
        this.bar2.style.pointerEvents = "none";
        this.bar2.style.boxShadow = "inset 0 0 "+ this.option.bar_height*0.4+"px rgba(0, 85, 151, 0.8)";
        
        //つまみ1
        this.circle1a.style.width = this.option.thumb_radius;
        this.circle1a.style.height = this.option.thumb_radius;
        this.circle1a.style.borderRadius = "50%";
        this.circle1a.style.position = "absolute";
        this.circle1a.style.top = this.option.height / 2 - this.option.thumb_radius / 2;
        this.circle1a.style.left = this.px1 - this.option.thumb_radius / 2;
        this.circle1a.style.pointerEvents = "none";
        this.circle1a.style.backgroundColor = "#d4d4d4";
        this.circle1a.style.boxShadow = "0px 0px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.4),inset 0 0px " + 1/30*this.option.thumb_radius + "px rgba(0,0,0,0.3),0 " + 1/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.6),0 " + 4/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.2),0 " + 9/30*this.option.thumb_radius + "px " + 4/30*this.option.thumb_radius + "px rgba(0,0,0,0.1),inset " + 1/30*this.option.thumb_radius + "px " + 4/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(255,255,255,1.0)"
        this.circle1a.style.zIndex = 3;

        //つまみ1ハイライト
        this.circle1b.style.width = this.option.thumb_radius;
        this.circle1b.style.height = this.option.thumb_radius;
        this.circle1b.style.borderRadius = "50%";
        this.circle1b.style.position = "absolute";
        this.circle1b.style.top = this.option.height / 2 - this.option.thumb_radius / 2 - 8/30*this.option.thumb_radius;
        this.circle1b.style.left = this.px1 - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
        this.circle1b.style.pointerEvents = "none";
        this.circle1b.style.backgroundColor = "none";
        this.circle1b.style.backgroundImage = "radial-gradient(rgba(255,255,255,1.0), rgba(255,255,255,0.05), rgba(255,255,255,0.0))";
        this.circle1b.style.zIndex = 3;

        //つまみ2
        this.circle2a.style.width = this.option.thumb_radius;
        this.circle2a.style.height = this.option.thumb_radius;
        this.circle2a.style.borderRadius = "50%";
        this.circle2a.style.position = "absolute";
        this.circle2a.style.top = this.option.height / 2 - this.option.thumb_radius / 2;
        this.circle2a.style.left = this.px2 - this.option.thumb_radius / 2;
        this.circle2a.style.pointerEvents = "none";
        this.circle2a.style.backgroundColor = "#d4d4d4";
        this.circle2a.style.boxShadow = "0px 0px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.4),inset 0 0px " + 1/30*this.option.thumb_radius + "px rgba(0,0,0,0.3),0 " + 1/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.6),0 " + 4/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(0,0,0,0.2),0 " + 9/30*this.option.thumb_radius + "px " + 4/30*this.option.thumb_radius + "px rgba(0,0,0,0.1),inset " + 1/30*this.option.thumb_radius + "px " + 4/30*this.option.thumb_radius + "px " + 2/30*this.option.thumb_radius + "px rgba(255,255,255,1.0)"
        this.circle2a.style.zIndex = 3;

        //つまみ2ハイライト
        this.circle2b.style.width = this.option.thumb_radius;
        this.circle2b.style.height = this.option.thumb_radius;
        this.circle2b.style.borderRadius = "50%";
        this.circle2b.style.position = "absolute";
        this.circle2b.style.top = this.option.height / 2 - this.option.thumb_radius / 2 - 8/30*this.option.thumb_radius;
        this.circle2b.style.left = this.px2 - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
        this.circle2b.style.pointerEvents = "none";
        this.circle2b.style.backgroundColor = "none";
        this.circle2b.style.backgroundImage = "radial-gradient(rgba(255,255,255,1.0), rgba(255,255,255,0.05), rgba(255,255,255,0.0))";
        this.circle2b.style.zIndex = 3;

        document.body.appendChild(this.container);
    }
}