class Particle {

    constructor(x, y, speed, direction, color) {
    
    this.x = x; 
    this.y = y; 
    this.speed = speed; 
    this.direction = direction; 
    this.color = color; 
    this.alpha = 1; 
    }
    
    
    update(delta) {
    
    const dx = this.speed *  Math.cos(this.direction) * delta;
    const dy = this.speed * Math.sin(this.direction) * delta;
    
    this.x += dx;
    this.y += dy;
    this.alpha -= 0.0001;
    
    if (this.alpha <= 0) {
    
    const index = particles.indexOf(this);
    
    if (index > -1) {
    
    particles.splice(index, 1);
    }
    }
    }
    
    
    draw(context) {
    
    context.save();
    context.fillStyle = this.color;
    context.globalAlpha = this.alpha;
    context.beginPath();
    context.arc(this.x, this.y, this.size, 0.2, 0.5 * Math.PI); 
    context.fill();
    context.restore();
    }
    }
    const particles = [];
    
    
    class Lightline {
    
    constructor(x, y, speed, direction, color) {
    
    this.x = x; 
    this.y = y; 
    this.speed = speed; 
    this.direction = direction; 
    this.color = color; 
    this.alpha = 2; 
    }
    
    update(delta) {
    
    const dx1 = this.speed *  Math.cos(this.direction) * delta;
    const dy1 = this.speed * Math.sin(this.direction) * delta;
    
    this.x += dx1;
    this.y += dy1;
    this.alpha -= 0.0001;
    
    if (this.alpha <= 0) {
    
    const index = lines.indexOf(this);
    
    if (index > -1) {
    
    lines.splice(index, 1);
    }
    }
    }
    
    draw(context) {
    
    context.save();
    context.strokeStyle = this.color; 
    context.globalAlpha = this.alpha; 
    context.lineWidth = this.size; 
    context.beginPath();
    context.moveTo(this.x, this.y); 
    context.lineTo(this.x + this.size, this.y); 
    context.stroke(); 
    context.restore();
    }
    }
    const lines = [];
    
    function createFallout(x, y) { 
    
    const amount = 2000;
    
    for (let i = 0; i < amount; i++) {
    
    let speed = Math.random() * 0.002 + 0.0001;
    let direction = Math.random() * Math.PI / 3 - Math.PI / 4.5 ;  
    let factor = Math.random(); 
    let color = `color-mix(in lch, red ${factor * 100}%, orange ${(1 - factor) * 50}%)`;
    let size = 0.4;
    
    
    const particle = new Particle(x, y, speed, direction, color);
    particle.size = size; 
    
    particles.push(particle);
    }   
    }
    
    function createExplosion(x, y) { 
    
    const amount = 2000;
    
    for (let i = 0; i < amount; i++) {
    
    let speed = Math.random() * 0.0045 + 0.0001;
    let direction = Math.random() * Math.PI / 3 - Math.PI / 4.5; 
    let color = "rgba(255, 255, 255)";
    let size = 0.3; 
    
    const line = new Lightline(x, y, speed, direction, color);
    line.size = size; 
    
    lines.push(line);
    }
    }
    
    function createBubble(x, y) { 
    
    const amount = 500;
    
    for (let i = 0; i < amount; i++) {
    
    let speed = Math.random() * 0.000005 + 0.005;
    let direction = Math.random()  * Math.PI / 3 - Math.PI / 4.5; 
    let factor = Math.random(); 
    let color = `color-mix(in lch, red ${factor * 100}%, orange ${(1 - factor) * 100}%)`;
    let size = Math.random() * 0.5;
    
    const particle = new Particle(x, y, speed, direction, color);
    particle.size = size; 
    
    particles.push(particle);
    }
    }
    
    const canvas = document.querySelector("#canvas");
    const context = canvas.getContext("2d");
    const width = canvas.width;
    const height = canvas.height;
    let deltaTime = 0;
    let currentTime = Date.now();
    
    function animate() {
    
    const previousTime = currentTime;
    currentTime = Date.now();
    deltaTime = currentTime - previousTime;
    context.clearRect(0, 0, width, height);
    
    for (const particle of particles) {
    
    particle.update(deltaTime);
    particle.draw(context);
    }
    
    for (const line of lines) {
    
    line.update(deltaTime);
    line.draw(context);
    }
    
    requestAnimationFrame(animate);
    }
    animate();
    
    const bouton1 = document.querySelector("#action1-button");
    
    bouton1.addEventListener("click", (event) => {
    
    const x = width / 2;
    const y = height / 2;
    createBubble(x, y);
    createExplosion(x, y);
    createFallout(x, y);
    
    });
    
    const bouton2 = document.querySelector("#action2-button");
    
    bouton2.addEventListener("click", (event) => {
    
    const x = width / 12; 
    const y = height / 2;
    createBubble(x, y);
    createExplosion(x, y);
    createFallout(x, y);
    });