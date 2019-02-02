class generators{
    get colour(){
        return this.createRandomColour();
    }
    createNewProportions(size, variance){
        return size += Math.floor(Math.random() * variance) - variance;
    }
    createRandomColour(){
        let c = {
            r: Math.floor(Math.random() * 255),
            g: Math.floor(Math.random() * 255),
            b: Math.floor(Math.random() * 255)
        }
        return "rgb("+c.r+","+c.g+","+c.b+")"
    }
}

class particle{
    constructor(canvas, container, settings){
        this.ctx = canvas;
        this.ctn = container;
        this.initPos();
        this.settings = {
            size: settings.size || 20,
            variance: settings.variance || 2,
            force: settings.force || {speed, speed},
            colour: this.selectColour(settings.colour) || generator.colour
        }
        
        let sharedSize = generator.createNewProportions(this.settings.size, this.settings.variance);
        this.width = sharedSize;
        this.height = sharedSize;
    }

    initPos(){
        this.x = Math.floor(Math.random() * this.ctn.width);
        this.y = Math.floor(Math.random() * this.ctn.height);
    }

    setCTN(ctn){
        this.ctn = {
            width: ctn.width,
            height: ctn.height
        }
        this.initPos();
    }
    
    render(){
        if(this.settings.colour){
            this.ctx.fillStyle = this.settings.colour;
            this.ctx.fillRect(this.x, this.y, this.width, this.height);
        }
    }

    selectColour(items){
        try {
            return(items[Math.floor(Math.random() * items.length)]);
        } catch (error) {
            return false
        }
    }

    checkSettings(){
        if(this.x > this.ctn.width){
            this.x = -this.width;
            this.y = Math.floor(Math.random() * this.ctn.height) - 10 - this.width;
        }
        if(this.y > this.ctn.height){
            this.y = -this.height;
            this.x = Math.floor(Math.random() * this.ctn.width) - 10 - this.height;
        }
    }

    nextStep(){
        this.x += this.settings.force.x;
        this.y += this.settings.force.y;
        this.render();

        this.checkSettings();
    }
}

class particle_circle extends particle{
    render(){
        this.ctx.fillStyle = this.settings.colour;
        this.ctx.beginPath();
        this.ctx.arc(this.x, this.y, this.width / 2, 0, 2 * Math.PI);
        this.ctx.fill();
    }
    checkSettings(){
        if(this.x - this.width  > this.ctn.width){
            this.x = -this.width;
            this.y = Math.floor(Math.random() * this.ctn.height) - 10 - this.width;
        }
        if(this.y - this.width > this.ctn.height){
            this.y = -this.height;
            this.x = Math.floor(Math.random() * this.ctn.width) - 10 - this.height;
        }
    }
}

class particleArea{
    constructor(settings){
        this.parent = {
            dom: document.getElementById(settings.root),
            box: document.getElementById(settings.root).getBoundingClientRect()
        }
        this.width = this.parent.box.width;
        this.height = this.parent.box.height;
        this.settings = settings;
        this.particles = [];

        window.onresize = () => {
            this.resizeCanvas();
        }

        this.createSelf();
        this.createParticles(settings.amount || 20);
    }

    createSelf(){
        let n = document.createElement("canvas");
        n.height = this.height;
        n.width = this.width
        this.parent.dom.appendChild(n);
        this.ctx = n.getContext("2d");
        this.can = n;
    }

    createParticles(particlesAmount){
        switch(this.settings.type){
            case "circle":{
                for (let i = 0; i < particlesAmount; i++) {
                    this.particles.push(
                        new particle_circle(
                            this.ctx, {
                                width: this.parent.box.width, 
                                height: this.parent.box.height,
                            },
                            this.settings
                        )
                    );
                }
                break;
            }
            default:{
                for (let i = 0; i < particlesAmount; i++) {
                    this.particles.push(
                        new particle(
                            this.ctx, {
                                width: this.parent.box.width, 
                                height: this.parent.box.height,
                            },
                            this.settings
                        )
                    );
                }
                break;
            }
        }
        
        this.startAnimation();
    }

    startAnimation(){
        this.updateCanvas = () => {
            this.drawBG();
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].nextStep();
            }
        }
        this.canvasLoop = setInterval(this.updateCanvas, this.settings.msPerUpdate || 10);
    }

    pauseAnimation(){
        clearInterval(this.canvasLoop);
    }

    drawBG(){
        this.ctx.clearRect(0, 0, this.width, this.height);
        this.ctx.fillStyle = this.settings.background
        this.ctx.fillRect(0,0, this.width, this.height);
    }

    resetSize(){
        this.parent.box = this.parent.dom.getBoundingClientRect();
        this.width = this.parent.box.width;
        this.height = this.parent.box.height;
        this.can.width = this.width;
        this.can.height = this.height;
    }

    resizeCanvas(){
        this.pauseAnimation();
        this.resetSize();
        this.drawBG();
        if(this.resizeEnd) clearTimeout(this.resizeEnd);
        this.resizeEnd = setTimeout(()=>{
            for (let i = 0; i < this.particles.length; i++) {
                this.particles[i].setCTN({
                    width: this.parent.box.width, 
                    height: this.parent.box.height,
                });
            }
            this.startAnimation();
        }, 50);
    }
}

const generator = new generators();