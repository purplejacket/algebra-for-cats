const SPEED = 90;
const JUMP_FORCE = 300;
const FALL_DEATH = 500;


scene('main', () => {

    // camIgnore("ui");
    layers([
        "ui",
        "game",
    ])

    var score = 0;
    const map = addLevel([
        "                               ",
        "                               ",
        "                               ",
        "                               ",
        "                             $ ",
        "                             = ",
        "                        ====   ",   
        "=========           ===        ",
        "          ========             ",
        "                               ",
        "                               ",
        "                               ",
        "                               ",
        "      =====       ==  ==       ",
        "           $$$$$$              ",
        "           ======              ",
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
    });
      
    camScale(vec2(2.5, 2.5));
    camIgnore(["ui"]);
    
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

    player.collides("collectable", (o) => {
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