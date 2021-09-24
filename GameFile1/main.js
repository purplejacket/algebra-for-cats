const SPEED = 90;
const JUMP_FORCE = 300;
const FALL_DEATH = 600;
const SCALE = 1;

scene ('main', () => {
  // camIgnore("ui");
  layers (['ui', 'game']);

  let score = 0;

  const decorations = addLevel(
    [
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                 ↓                                                      ',
      '                                    ↓                                        1   2      ',
      '      >               ^               ↓          ^                                      ',
      '                 ^                              ^                                       ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
    ], {
      width:16,
      height: 16,
      '>': () => [sprite ('left-arrow'), origin ('top')],
      '^': () => [sprite ('up-arrow'), origin ('top')],
      '↓': () => [sprite ('down-arrow'), origin ('top')],
      "1": () => [sprite("enviroment1"), origin("top")],
      "2": () => [sprite("enviroment2"), origin("top")],
    }
  )

  const map = addLevel(
    [
      '                                                                                        ',
      '                                                                                      ¢ ',
      '                                                                                      = ',
      '                                                                                   =    ',
      '                             $   ↓                       $$$$                   =       ',
      '                             =====  ↓             $      b  b                           ',
      '      >               ^ ====       == ↓   $$$    ^=  = ========  ==   f  == ≠------≈    ',
      '=========        ^  ===               = $ ===   ^=                 ======               ',
      '          ========                      =     ===                                       ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
      '                                                                                        ',
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
    pos (1000 , 20),
  ]);

  player.action (() => {
    camPos (player.pos);
    if (player.pos.y > FALL_DEATH) {
      go ('gameover', score);
    }
  });

  player.collides ('collectable', (o) => {
    play(o.sound);
    score += o.v;
    destroy (o);
    coinsLabel.text = "SCORE: " + score;
  });
  player.collides('monster', () => {
    go("gameover", score);
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

  keyPress ('space', () => {
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

  // CRAB PART
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
});

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
    go ('main');
  });
});

go ('main');
