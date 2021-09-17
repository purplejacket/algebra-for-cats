const music = play("music", {
  volume: 0.2,
})
scene("main", (levelInx) => {
  const SPEED = 80;
  const SCALE = 1;
  music.loop();

  const npc = {
    "f": {
      sprite: "npc1",
      msg: "the king must be furious with me... I LOST HIS ANIMALS!!",
      name: "farmer",
      textsize: 8,
    },
    "k": {
      sprite: "npc2",
      msg: "i can not have anything! I always lose everything!",
      name: "king",
      textsize: 8,
    },
    "q": {
      sprite: "npc3",
      msg: "oh no! someone stole my diamond necklace, can you help me?",
      name: "queen",
      textsize: 8,
    },
    "e": {
      sprite: "npc4",
      msg: "so,you're the new guy,huh? This castle has a secret, it has a hidden room. go to the armery but be careful with traps and puzzles",
      name: "elite",
      textsize: 8,
    },
    "s": {
      sprite: "npc5",
      msg: "someone released the ghosts captured by the mage, they terrify me",
      name: "servant",
      textsize: 8,
    },
    "m": {
      sprite: "npc6",
      msg: "For the chains of Utama! Who's the bandido who released my ghosts??!! Please be careful, they're dangerous!",
      name: "mage",
      textsize: 8,
    },
    "a": {
      sprite: "npc7",
      msg: "Agh!These ghosts are so annoying i was working and they interrupted me I had to escape from the armory be careful boy i activated the traps",
      name: "armorer",
      textsize: 8,
    },
    "l": {
      sprite: "npc8",
      msg: "Thank God you are here, look... someone stole all my alchemist kit, please, bring it back, brave knight",
      name: "alchemeister",
      textsize: 8,
    },
    "o": {
      sprite: "npc9",
      msg: "And like a flash of light, my salvation comes. Oh brave knight, some robber stole my pen find it for me, please",
      name: "playwright",
      textsize: 8,
    },
    "p": {
      sprite: "npc10",
      msg: "Nice to see you again, knight. I was here because of a rumor, you know, the thief i wanted to find him, but he's fast. be careful with ghouls, they can kill you in an instant",
      name: "specter knight",
      textsize: 6,
    },
    "g": {
      sprite: "npc11",
      msg: "And this is what you are fighting for. Those stairs are going to take you to the hidden room. But be careful with poison skulls. They induce a dose of venom that kills you instantly \n By the way, if you find my notes, please lemme know",
      name: "plague doctor",
      textsize: 6,
    },
    "n": {
      sprite: "npc12",
      msg: "From your surprised face I can assume that the king did not tell you that there was a dungeon, I'm enchantress, and i was captured by the king many years ago, oh! so, you're here because of the thief, go ahead and you'll find it",
      name: "enchantress",
      textsize: 6,
    },
    "r": {
      sprite: "npc13",
      msg: "I am the fire knight. And i was an old enemy of South kingdom, but not anymore... The king captured me, and took me here. Now, i just stay here. Go ahead, stop that varmint. But be carful with my blazorbs",
      name: "fire knight",
      textsize: 6,
    },
    "d": {
      sprite: "npc14",
      msg: "I can see it, you're here for the thief. You will not like the identity of the thief, but i will not tell you, it's a real surprise. HA HA HA",
      name: "red samurai",
      textsize: 6,
    },
    "w": {
      sprite: "npc15",
      msg: "Be careful, knight. Don't ask questions if you don't want to know the answer.",
      name: "skeleton king",
      textsize: 6,
      tag: "boss",
    },
  };

  const levels = [[
    "==========",
    "=      f =",
    "= @      =",
    "=        =",
    "=        |",
    "=        =",
    "=        =",
    "==========",
  ], [
    "==========",
    "=        =",
    "=        =",
    "=        =",
    "= @     k=",
    "=        =",
    "=        =",
    "=====|====",
  ],[
    "==========",
    "=q    @  =",
    "=        =",
    "=        =",
    "=        |",
    "=        =",
    "=$       =",
    "==========",
  ],[
    "=================",
    "=e        ^     =",
    "=         ^   $ =",
    "=     ^   ^     =",
    "=@    ^   ^     =",
    "=     ^         =",
    "=     ^         =",
    "========|========",
  ], [
    "==========",
    "=   @    =",
    "=        =",
    "=  ^^^^^^=",
    "|        =",
    "=        =",
    "=^^^^^^ $=",
    "==========",
  ], [
    "==========",
    "=    *   =",
    "=  *     =",
    "=        =",
    "|    *  @=",
    "=        =",
    "= *     s=",
    "=    *   =",
    "==========",
  ], [
    "================",
    "=m            @=",
    "=              =",
    "=              =",
    "= *    *     * =",
    "=              =",
    "=    *    *    =",
    "=^^^^^^^^^^^   =",
    "= *   *    *   =",
    "=              =",
    "=              =",
    "=^  ^   ^   ^  =",
    "=              =",
    "=              =",
    "========|=======",    
  ],[
    "==============",
    "=a    @      =",
    "=            =",
    "=    *       =",
    "|            =",
    "=       *   *=",
    "=   *        =",
    "=       $    =",
    "= *          =",
    "==============",
  ], [
    "===================",
    "=      ^  *   *   =",
    "=                 =",
    "=@     ^  $   *   |",
    "=                 =",
    "=         *       =",
    "=      ^      *   =",
    "===================",
  ], [
    "===================",
    "=l  ^       ^     |",
    "=   ^       ^ *   =",
    "=   ^   ^   ^    *=",
    "=@  ^   ^   ^ *   =",
    "=       ^        *=",
    "=       ^         =",
    "===================",    
  ], [
    "=====================",
    "=@   ^^^^^^^^^^^    =",
    "=              ^    =",
    "=    ^^^^^^^^^^^    =",
    "=              ^    =",
    "=    ^^^^^^^^^^^    =",
    "=         ^    ^    =",
    "=         ^    ^    =",
    "=    ^            $ =",
    "=    ^            o =",
    "===========|=========",
  ], [
    "-------------------",
    "-        @        -",
    "-                 -",
    "-     ~     ~     -",
    "-                 >",
    "-      ^ ! ^      -",
    "-     ^^^^^^^     -",
    "-------------------",
  ], [
    "-------------------------",
    "-p      #        #      >",
    "-           #           -",
    "-           #        ^^^-",
    "-@      #        #      -",
    "-           #           -",
    "-           #        ^^^-",
    "-       #        #      -",
    "-^^^^^^^^       ^^^^^^^^-",
    "-------------------------",
  ], [
    "----------------------",
    "-@       ^           -",
    "-        ^           -",
    "-        ^           -",
    "-^^^^^   !    ^^^^   -",
    "- ~~                 -",
    "-````       #        -",
    "------------------>---",
  ], [
    "----------------------",
    "-  @     #          !-",
    "-           #*****  ^-",
    "-^^^^^           *  ^-",
    "-    ^^^^^       *  ^-",
    ">                *   -",
    "-           #    *   -",
    "----------------------",
  ], [
    "-------------------------",
    "-g   ^         ^       `-",
    "-    ^    ~    ^       ~-",
    "-@   ^    #    ^   #   !-",
    "-    ^    ¡    ^   ¡    -",
    "-    ^    *    ^   *    -",
    "-    ^    ¡    ^   ¡    -",
    "-`   ^    #    ^   #    -",
    "-`   !~   ¡    `   ¡    -",
    "-`        *        *    -",
    "---------------------->--",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "≈  @        #        ≈",
    "≈           #        ≈",
    "≈•••••   ••••••••••••≈",
    "≈        •           ≈",
    "≈        •           ≈",
    "≈n       •           ≈",
    "≈≈≈≈/≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "≈  @    •   •        ≈",
    "≈           •        ≈",
    "≈•••••      •   ¡    ≈",
    "≈           •   ¡    ≈",
    "≈               ¡    ≈",
    "≈               ¡    /",
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "/     •        •    r≈",
    "≈     •        •     ≈",
    "≈ %       %          ≈",
    "≈ •       •          ≈",
    "≈•••••••••••••••     ≈",
    "≈                    ≈",
    "≈@                   ≈",
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "≈@  •        •    %           ≈",
    "≈   •    %        %       %%%%≈",
    "≈   •             %   •   %   ≈",
    "≈   •        •    %   •   %   /",
    "≈   •             %   •       ≈",
    "≈        %            •       ≈",
    "≈            •        •   %   ≈",
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "≈d               •    ≈",
    "≈@               •    ≈",
    "≈    ••••••••    •    ≈",
    "≈    •           •    ≈",
    "≈••••••••••••    •    ≈",
    "≈                     ≈",
    "≈                     ≈",
    "≈%%%%%%%     •••••••••≈",
    "≈                     ≈",
    "≈                     ≈",
    "≈≈/≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "≈ @            •        •       /",
    "≈              •        •       ≈",
    "≈•••••••••••   ••  •••  •   ••••≈",
    "≈              •   •    •       ≈",
    "≈              •   •    •       ≈",
    "≈   ••••••••••••  ••  •••       ≈",
    "≈              •   •            ≈",
    "≈                  •            ≈",
    "≈ •••••••••••     ••••••••      ≈",
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "≈@            ¡           ¡    ≈",
    "≈w  ¡                     ¡    ≈",
    "≈        %         %      ¡    ≈",
    "≈        %         %           ≈",
    "≈   ¡         ¡                /",
    "≈        %         %           ≈",
    "≈        %         %      ¡    ≈",
    "≈   ¡                     ¡    ≈",
    "≈             ¡           ¡    ≈",
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈≈",
    "≈                ≈",
    "≈                ≈",
    "≈     •••••••    ≈",
    "≈     •          ≈",
    "≈@    •          ≈",
    "≈     •    ••••••≈",
    "≈     •    •     ≈",
    "≈     •    •     ≈",
    "≈     •    •     ≈",
    "≈≈≈≈≈≈≈≈≈/≈≈≈≈≈≈≈≈",
  ], [
    "≈≈≈≈≈",
    "≈ @ ≈",
    "≈   ≈",
    "≈ æ ≈",
    "≈≈≈≈≈",
  ],
  ];

  const map = addLevel(levels[levelInx], {
    width: 20,
    height: 20,
    pos: vec2(20, 20),
    "=": [
      sprite("wall"),
      area(),
      solid(),
    ],
    "|": [
      sprite("door"),
      area(),
      solid(),
      "door",
    ],
    "@": [
      sprite("char"),
      scale(SCALE),
      origin("center"),
      area(vec2(2), vec2(2)),
      "player",
    ],
    "$": [
      sprite("key"),
      area(),
      "key",
    ],
    "^": [
      sprite("lavafloor"),
      area(),
      "hazard",
    ],
    "*": [
      sprite("ghost"),
      area(vec2(3), vec2(3)),
      "hazard",
    ],
    "-": [
      sprite("wall2"),
      solid(),
      area(),
    ],
    ">": [
      sprite("stairs"),
      solid(),
      area(),
      "door",
    ],
    "~": [
      sprite("anvil"),
      solid(),
      area(),
    ],
    "!": [
      sprite("furnace"),
      solid(),
      area(),
    ],
    "#": [
      sprite("ghoul"),
      area(vec2(3), vec2(3)),
      "hazard",
    ],
    "`": [
      sprite("weapons"),
      area(),
      solid(),
    ],
    "¡": [
      sprite("poisonskull"),
      area(),
      solid(),
    ],
    "≈": [
      sprite("wall3"),
      area(),
      solid(),
    ],
    "•": [
      sprite("spikes"),
      area(),
      "hazard",
    ],
    "/": [
      sprite("door2"),
      solid(),
      area(),
      "door",
    ],
    "%": [
      sprite("blazorb"),
      solid(),
      area(),
      "hazard",
    ],
    "æ": [
      sprite("thief"),
      solid(),
      area(),
      "final",
    ],
    any(ch) {
      const char = npc[ch];
      if (char) {
        return [
          sprite(char.sprite),
          area(),
          solid(),
          "npc",
          {
            msg: char.msg,
            name: char.name,
            textsize: char.textsize,
          },
        ];
      }
    },
  });

  let talking = null;
  let hasKey = false;

  function talk(msg, char, size) {
    talking = add([
      text(char + ": " + msg, size, {
        width: 700,
      }),
      color(1, 1, 1),
    ])
  }

  const player = get("player")[0];

  player.overlaps("final", () => {
    go("ending", 0);
  });

  player.overlaps("door", () => {
    // if(levelInx  2){
      if(levelInx == 2 || levelInx == 3 || levelInx == 4 || levelInx == 7 || levelInx == 8 || levelInx == 10){
        if(hasKey == true){
          go("main", levelInx + 1);
        }else {
          talk("get the key first", "clue", 10)
        }
      }else {
        go("main", levelInx + 1);
      }
    // }
  });

  player.collides("hazard", () => {
    go("gameover", levelInx);
  })

  player.overlaps("npc", (ch) => {
    talk(ch.msg, ch.name, ch.textsize);
  });

  // if(levelInx == 2 || levelInx == 3){
    player.overlaps("key", (key) => {
      play("collected", {
        volume: 0.1,
        speed: 1.2,
    });
	  	destroy(key);
      // keyCollected.play();
	  	hasKey = true;
	  });
  // }

  const dirs = {
    "left": vec2(-1, 0),
    "right": vec2(1, 0),
    "up": vec2(0, -1),
    "down": vec2(0, 1),
  };

  for (const dir in dirs) {
    keyPress(dir, () => {
      if (talking) {
        destroy(talking);
        talking = null;
      }
      // if(doorText){
      //   destroy(doorText);
      // }
    });
  };

  keyDown("left", () => {
    player.move(-SPEED, 0);
  })
  keyDown("right", () => {
    player.move(SPEED, 0);
  })
  keyDown("down", () => {
    player.move(0, SPEED);
  })
  keyDown("up", () => {
    player.move(0, -SPEED);
  })

  keyPress("left", () => {
    player.scale.x = -SCALE;
  })
  keyPress("right", () => {
    player.scale.x = SCALE;
  })

  // keyPress("right", () => {
  //   player.scale.x = SCALE;
  // });

  // keyPress("left", () => {
  //   player.scale.x = -SCALE;
  // })

  player.action(() => {
    player.pushOutAll();
  });

});

scene("gameover", (lvlIndex) => {
  add([
    text("you died, level reached: " + (lvlIndex+1)),
    pos(width()/2, height()/2),
    origin("center"),
  ])
  keyPress("space", () => go("main", lvlIndex));
	mouseClick(() => go("main", lvlIndex));
});

scene("ending", (idx) => {
  music.unloop();
  music.pause();
  const finals = ["first", "second", "third"];
  const t = [
    "The knight faced the thief, and after defeated him, he discovered that he was the king's son. And now, he will be in prision",
    "He was upset because he wanted to be a knight, and the knight took his place. So he made an evil plan, and executed it",
    "He stole all the things that are missing, even the animals. He released the ghost and monsters, and that way he wouldn't be discovered. Now the kingdom is safe, and the prince is suffering for his actions"
  ];
  add([
    sprite(finals[idx]),
    scale(5),
    pos(width()/2, height()/2),
    origin("center"),
  ]);
  add([
    text(t[idx], 10, {
      width: 700
    }),
    pos(width()/2, height()/1.4),
    origin("center"),
  ]);

  keyPress("space", () => {
    if(idx < 2){
      go("ending", idx+1);
    }else {
      go("thanks");
    }
  });
})

scene("thanks", () => {
  add([
    text("You get to the end of the game! Thanks for playing!", 10),
    pos(width()/2, height()/3),
    origin("center"),
  ])
})

go("main", 0);
focus();
