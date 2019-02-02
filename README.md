# particles-lw
Lightweight particles on a canvas

## How To Use
```js
new particleArea({
    root: "renderCanvas",
    type: "circle",
    amount: 80,
    size: 10,
    variance: 6,
    colour: ["purple", "white", "white"],
    background: "rgb(20,20,40)",
    force: {
        x: 0.7,
        y: 0.5
    }
});
```

#### Root
Root is the element you want the canvas to be rendered to, the canvas will automatically fill out the size of this element.  

#### Type
Available types are currently `"circle"` and `"square"`. It will change how the particle looks.  

#### Amount
The amount of particles you want on the screen, over 400 and the page will start to slow.  

#### Size
The size of your particles in px relative to the canvas.  

#### Variance
The maximum size difference from particle to particle (should not be larger than the size).  

#### Colour
An array of colours, if you just want one colour use `colour: ["rgb(YOUR COLOUR HERE)"]`.  

#### Background
The background colour of the particle canvas.  

#### Force
Takes an object with x and y, this is the distance the particles will move in that direction each frame.  

## To Do
* Add more particle types
* Add variance for direction
* Gradients of colour
