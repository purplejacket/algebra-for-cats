const SPEED = 90;
const JUMP_FORCE = 320;
const FALL_DEATH = 600;
const SCALE = 1;
const SPAWN_POS = {x: 20, y: 20};
var INIT_SCORE = 0;
const BONUS_SPAWN_POS = {door1: {x: 1448, y: 110}}

scene ('main', (playerpos, s) => {
  // camIgnore("ui");
  layers (['ui', 'game']);

  const decorations = addLevel(
    [         
      '                                                                                                 ',
      '                                                                                                 ',
      '                                                                                                 ',
      '                                                                                                 ',
      '                                 ↓                                                               ',
      '                                    ↓                                        1   2   3           ',
      '      >               ^               ↓          ^                                               ',
      '                 ^                              ^                                          32323 ',
      '                                                                                                 ',
      '                                                                                                 ',
      '                                                                                                 ',
      '                                                                                                 ',
      '                                                                                                 ',
      '                                                                                     k  d        ',
      '                                                                                                 ',
      '                                                                                                 ',
    ], {
      width:16,
      height: 16,
      '>': () => [sprite ('left-arrow'), origin ('top')],
      '^': () => [sprite ('up-arrow'), origin ('top')],
      '↓': () => [sprite ('down-arrow'), origin ('top')],
      "1": () => [sprite("enviroment1"), origin("topleft")],
      "2": () => [sprite("enviroment2"), origin("topleft")],
      "3": () => [sprite("enviroment3"), origin("topleft")],
      "d": () => [sprite("door", {anim: "closed"}), origin("top"), area(), "door", {unlocked: false, scene: "bonus1", name: "door1"}],
      "k": () => [sprite("key"), origin("top"), area(), 'key', {target: "door1"}]
    }
  )

  let score = s;

  const map = addLevel(
    [
      '                                                                                                     ',
      '                                                                                      ¢              ',
      '                                                                                      =              ',
      '                                                                                   =                 ',
      '                             $   ↓                       $$$$                   =                    ',
      '                             =====  ↓             $      b  b                           f            ',
      '      >               ^ ====       == ↓   $$$    ^=  = ========  ==   f  == ≠----------≈             ',
      '=========        ^  ===               = $ ===   ^=                 ======                            ',
      '          ========                      =     ===                                         ≠-----≈    ',
      '                                                                                                     ',
      '                                                                                                     ',
      '                                                                                                     ',
      '                                                                                                     ',
      '                                                                                                     ',
      '                                                                                     ====            ',
      '                                                                                                     ',
    ],
    {
      width: 16,
      height: 16,
      '=': () => [sprite ('tile'), area (), solid (), "tile"],
      '$': () => [sprite ('coin'), area (), 'collectable', {v: 1, sound: "coin"}],
      "≠": () => [sprite("ground-beg"), area(), solid()],
      "-": () => [sprite("ground-mid"), area(), solid()],
      "≈": () => [sprite("ground-end"), area(), solid()],
      "¢": () => [sprite("diamond"), area(), 'collectable', {v: 10, sound: "diamond"}],
      'b': () => [
        sprite ('bug', {
          anim: "idle",
          animSpeed: 0.3,
        }),
        origin ('top'),
        area({scale: 0.6}),
        'bug',
        'monster',
        {
          limitY: {max: 0, min: 0},
          reachesLimit: {x: false, y: false},
        },
      ],
      "c": () => [
        sprite ('crab'),
        origin ('center'),
        area(),
        body(),
        "movable-enemy",
        'monster',
        {
          dir: -1,
          speed: 80,
        }
      ],
      "f": () => [
        sprite("bug2", {
          anim: "idle",
          animSpeed: 0.2,
        }),
        origin("top"),
        area(),
        "bug",
        "monster",
        "movable-enemy", 
        {
          limitY: {max: 0, min: 0},
          limitX: {max: 0, min: 0},
          reachesLimit: {x: false, y: false},
          speed: 40,
        }
      ]
    }
  );

  camScale (vec2 (2.5, 2.5));
  camIgnore (['ui']);

  const player = add ([
    sprite ('player', {
      frame: 0,
      animSpeed: 0.1,
    }),
    area (),
    body (),
    scale (SCALE),
    origin ('center'),
    pos (playerpos.x , playerpos.y),
  ]);

  player.action (() => {
    camPos (player.pos);
    if (player.pos.y > FALL_DEATH) {
      go ('gameover', score);
    }
  });

  player.collides ('collectable', (o) => {
    play(o.sound, {
      volume: 0.05,
    });
    score += o.v;
    destroy (o);
    coinsLabel.text = "SCORE: " + score;
  });
  player.collides ('key', (k) => {
    play("key", {
      volume: 0.05,
    });
    const doors = get("door");
    for(const door of doors){
      if(door.name == k.target){
        door.unlocked = true;
      }
    }
    destroy (k);
  });
  player.collides('monster', () => {
    go("gameover", score);
  })
  player.collides('door', (d) => {
    if(d.unlocked){
      go(d.scene, BONUS_SPAWN_POS[d.name], score);
    }
  })

	const coinsLabel = add([
		text("SCORE: " + score, 20),
		pos(24, 24),
    layer("ui")
	]);

  keyDown("right", () => {
    player.move(SPEED, 0);
    console.log('right arrow is down :D')
  });

  keyDown('left', () => {
    player.move(-SPEED, 0);
    console.log('left arrow is down :D')
  });

  keyDown ('space', () => {
    if (player.grounded ()) {
      player.jump(JUMP_FORCE);
    }
  });
  keyDown ('w', () => {
    if (player.grounded ()) {
      player.jump(JUMP_FORCE);
    }
  });
  keyDown ('up', () => {
    if (player.grounded ()) {
      player.jump(JUMP_FORCE);
    }
  });

  keyPress('right', () => {
    player.scale.x = SCALE;
  });
  keyPress('left', () => {
    player.scale.x *= -SCALE;
  });

  // ANIMATION PART
  player.action (() => {
    if (!player.grounded ()) {
      player.play ('fall');
    }
    if (player.grounded () && (!keyIsDown ('left') && !keyIsDown ('right'))) {
      player.play ('idle');
    }
    if (
      player.grounded () &&
      (keyIsPressed ('left') || keyIsPressed ('right'))
    ) {
      player.play ('run');
    }

    if (keyIsDown(['left', 'right']) && curAnim () != 'run') {
      player.play ('run');
    }
  });

  //FLYING BUG PART
  const bugs = get("bug");
  for(const bug of bugs){
    bug.play("idle");
    bug.limitY = {max: bug.pos.y - 5, min: bug.pos.y};

    bug.action (() => {
      if (bug.limitY.max == Math.floor (bug.pos.y)) {
        bug.reachesLimit.y = true;
      }
      if (bug.limitY.min == Math.floor (bug.pos.y)) {
        bug.reachesLimit.y = false;
      }

      if (bug.reachesLimit.y) {
        bug.move (0, 5);
      } else {
        bug.move (0, -5);
      }
    });
  }

  // MOVABLE ENEMIES PART
  const movableMonsters = get("movable-enemy");
  for(const movMon of movableMonsters){
    movMon.limitX = {max: movMon.pos.x - 30, min: movMon.pos.x + 30};

    movMon.action(() => {
      if (movMon.limitX.max == Math.floor(movMon.pos.x)) {
        movMon.reachesLimit.x = true;
      }
      if (movMon.limitX.min == Math.floor(movMon.pos.x)) {
        movMon.reachesLimit.x = false;
      }

      if(movMon.reachesLimit.x){
        movMon.move(1 * movMon.speed, 0);
      }else {
        movMon.move(-1 * movMon.speed, 0);
      }
    })
  }

  // DOORS MECHANISM
  const doors = get("door");
  for(const door of doors){
    door.action(() => {
      if(door.unlocked == true){
        door.play("opened");
      }
    })
  }
});

scene("bonus1", (playerpos, s) => {
  layers (['ui', 'game']); 

  const map = addLevel(
    [
      "          ",
      "          ",
      "          ",
      "d     ¢$¢$",
      "====  ====",
      "          ",
      "          ",
    ],
    {
      width: 16,
      height: 16,
      "=": () => [sprite("tile"), area(), solid()],
      "d": () => [sprite("door", {anim: "opened"}), area(), "door", {scene: "main", unlocked: true}],
      "¢": () => [sprite("diamond"), area(), 'collectable', {v: 10, sound: "diamond"}],
      '$': () => [sprite ('coin'), area (), 'collectable', {v: 1, sound: "coin"}],
    }
  )

  camScale(vec2 (3, 3));
  camIgnore(['ui']);

  var score = s;

  const player = add ([
    sprite ('player', {
      frame: 0,
      animSpeed: 0.1,
    }),
    area (),
    body (),
    scale (SCALE),
    origin ('center'),
    pos (30 , 50),
  ]);

  player.action (() => {
    camPos (player.pos);
    if (player.pos.y > FALL_DEATH) {
      go ('gameover', s);
    }
  });

  player.collides ('collectable', (o) => {
    play(o.sound, {
      volume: 0.05,
    });
    score += o.v;
    destroy (o);
    coinsLabel.text = "SCORE: " + score;
  })
  player.collides('monster', () => {
    go("gameover", score);
  })
  player.collides('door', (d) => {
    if(d.unlocked){
      go(d.scene, playerpos, score);
    }
  })

	const coinsLabel = add([
		text("SCORE: " + score, 20),
		pos(24, 24),
    layer(["ui", ]),
	]);

  keyDown("right", () => {
    player.move(SPEED, 0);
  });

  keyDown('left', () => {
    player.move(-SPEED, 0);
  });

  keyDown ('space', () => {
    if (player.grounded ()) {
      player.jump(JUMP_FORCE);
    }
  });
  keyDown ('w', () => {
    if (player.grounded ()) {
      player.jump(JUMP_FORCE);
    }
  });
  keyDown ('up', () => {
    if (player.grounded ()) {
      player.jump(JUMP_FORCE);
    }
  });

  keyPress('right', () => {
    player.scale.x = SCALE;
  });
  keyPress('left', () => {
    player.scale.x *= -SCALE;
  });

  // ANIMATION PART
  player.action (() => {
    if (!player.grounded ()) {
      player.play ('fall');
    }
    if (player.grounded () && (!keyIsDown ('left') && !keyIsDown ('right'))) {
      player.play ('idle');
    }
    if (
      player.grounded () &&
      (keyIsPressed ('left') || keyIsPressed ('right'))
    ) {
      player.play ('run');
    }

    if (keyIsDown(['left', 'right']) && curAnim () != 'run') {
      player.play ('run');
    }
  });
})

scene('gameover', (score) => {
  play ('game-over', {
    speed: 5,
  });
  add([
    text ("you died, SCORE: " + score, 30),
    color (255, 255, 255),
    origin ('center'),
    pos (width () / 2, height () / 2),
  ]);
  keyPress ('space', () => {
    go ('main', SPAWN_POS, INIT_SCORE);
  });
});

go ('main', SPAWN_POS, INIT_SCORE);
