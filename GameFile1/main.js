const SPEED = 90;
const JUMP_FORCE = 300;
const FALL_DEATH = 1000;
const FALL_DEATH = 500;
const SCALE = 1;


scene("main", () => {

    // camIgnore("ui");
    layers([
        "ui",
        "game",
    ])

    var score = 0;
    const map = addLevel([
        "                                                   ",
        "                                                   ",
        "                                                   ",
        "                                                   ",
        "                             $   ↓                 ",
        "                             =====  ↓             $",
        "      >               ^ ====       == ↓   $$$    ^=",   
        "=========        ^  ===               = $ ===   ^= ",
        "          ========                      =     ===  ",
        "                                                   ",
        "                                                   ",
    ],
    {
        width:20,
        height:20,
        "=": () => [
            sprite("tile"),
            area(),
            solid()
        ],
        "$": () => [
            sprite("coin"),
            area(),
            "collectable",
        ],
        ">": () => [
            sprite("left-arrow"),
            origin("top")
        ],
        "^": () => [
            sprite("up-arrow"),
            origin("top")
        ],
        "↓": () => [
            sprite("down-arrow"),
            origin("top")
        ],
    });
      
    camScale(vec2(2.5, 2.5));
    camIgnore(["ui"]);
    
    const player = add([
        sprite("player", {
            frame: 0,
            animSpeed: 0.1,
        }),
        area(),
        body(),
        scale(SCALE),
        origin("center"),
        pos(20,20)
    ]);
    
    player.action(() => {
        camPos(player.pos);
        if(player.pos.y > FALL_DEATH){
            go("gameover")
        }
    })

    player.collides("collectable", (o) => {
        play("coin");
        destroy(o);
        score++;
        coinsLabel.text = score;
    });

    const coinsLabel = add([
		text(score, 50),
        layer("ui"),
		pos(24, 24),
	]);
    
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

    keyPress("right", () => {
        player.scale.x = SCALE;
    })
    keyPress("left", () => {
        player.scale.x = -SCALE;
    })

    // ANIMATION PART
    player.action(() => {
        if(!player.grounded()){
            player.play("fall");
        }
        if(player.grounded() && (!keyIsDown("left") && !keyIsDown("right"))){
            player.play("idle");
        }
        if(player.grounded() && (keyIsPressed("left") || keyIsPressed("right"))){
            player.play("run");
        }
    });

})

scene("gameover", () => {
    play("game-over", {
        speed: 5
    });
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

go("main");