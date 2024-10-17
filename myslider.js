//通常スライダー
class Slider1d{

    constructor(option){

        const defaultoption = {width:500, height:200, bar_width:440, bar_height:20, thumb_radius:30, background_color:"#eeeeee", value:0.5};
        
        this.option = {...defaultoption, ...option};
        
        this.mouseIsPressed = false;
        this.margin = ( this.option.width - this.option.bar_width ) / 2;
        this.value = this.option.value;
        this.mx = -1;
        this.my = -1;
        this.px = ( this.option.width - this.option.bar_width ) / 2 + this.option.bar_width * this.value;
        this.func = () => {};
        
        this.container = document.createElement("div");
        this.container.style.position = "relative";
        this.container.style.width = this.option.width;
        this.container.style.height = this.option.height;
        this.container.style.backgroundColor = this.option.background_color;
        this.container.style.touchAction = "none";

        //灰色バー
        this.bar1 = document.createElement("div");
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
        this.bar2 = document.createElement("div");
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
        this.circle1 = document.createElement("div");
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
        this.circle2 = document.createElement("div");
        this.circle2.style.width = this.option.thumb_radius;
        this.circle2.style.height = this.option.thumb_radius;
        this.circle2.style.borderRadius = "50%";
        this.circle2.style.position = "absolute";
        this.circle2.style.top = this.option.height / 2 - this.option.thumb_radius / 2 - 8/30*this.option.thumb_radius;
        this.circle2.style.left = this.px - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
        this.circle2.style.pointerEvents = "none";
        this.circle2.style.backgroundColor = "none";
        this.circle2.style.backgroundImage = "radial-gradient(rgba(255,255,255,1.0), rgba(255,255,255,0.05), rgba(255,255,255,0.0))";

        this.container.appendChild(this.bar1);
        this.container.appendChild(this.bar2);
        this.container.appendChild(this.circle1);
        this.container.appendChild(this.circle2);
        document.body.appendChild(this.container);


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
        console.log(33);
        this.px = ( this.option.width - this.option.bar_width ) / 2 + this.option.bar_width * this.value;
        this.circle1.style.left = this.px - this.option.thumb_radius / 2;
        this.circle2.style.left = this.px - this.option.thumb_radius / 2 - 3/30*this.option.thumb_radius;
        this.bar2.style.width = this.px - ( this.option.width - this.option.bar_width ) / 2;
    }
}