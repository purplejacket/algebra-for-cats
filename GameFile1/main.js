const SPEED = 80;
const JUMP_FORCE = 300;
const FALL_DEATH = 500;

scene('main', () => {
    const map = addLevel([
        "                  ",
        "                  ",
        "                  ",
        "                  ",
        "                  ",
        "                  ",
        "                  ",   
        "$$$$$$$$$         ",
        "         $$$$$$$$$",
        "                  ",
        "                  ",
    ],
    {
        width:20,
        height:20,
        "$": () => [
            sprite("tile"),
            area(),
            solid()
        ]
        
    })
      
    camScale(vec2(2,2));
    
    const player = add([
        sprite("player"),
        area(),
        body(),
        pos(20,20)
    ]);
    
    player.action(() => {
        camPos(player.pos);
        if(player.pos.y > FALL_DEATH){
            go("gameover")
        }
    })
    
    keyDown("right", () => {
        player.move(SPEED, 0)
    })
    
    keyDown("left", () => {
        player.move(-SPEED, 0)
    })
    
    keyPress("space", () => {
        if(player.grounded()){
            player.jump(JUMP_FORCE);
        }
    })
})

scene("gameover", () => {
    add([
        text("you died", 50),
        color(1,1,1),
        origin("center"),
        pos(width()/2, height()/2)
    ])
    keyPress("space", () => {
        go("main")
    })
})

go("main")