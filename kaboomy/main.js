// Define some constants
// const coincollected = play("collect", {
//   volume: 10,
//   speed: 2,
//   detune: 1200,
// });

layers([
	"game",
	"ui",
], "game");

camIgnore([ "ui", ]);

const map = addLevel([
  "                   ",
  "                   ",
  "                   ",
  "                 $ ",
  "                ===",
  "           ====    ",
  "==========         ",
], {
  width: 20,
  height: 20,
  pos: vec2(0, 0),
  "=": [
    sprite("ground"),
    solid(),
    "wall"
  ],
  "$": [
    sprite("coin"),
    area(),
    "coin"
  ],
});

const score = add([
	text("0"),
	pos(6, 6),
	layer("ui"),
	{
		value: 0,
	},
]);

const player = add([
  sprite("knight"),
  pos(50, 50),
  //we need area to detect collisions
  area(),
  scale(1),
  origin("center"),
  body(),
]);

player.collides("coin", (c) => {
  // coincollected.play();
  score.value++;
  score.text = score.value;
  destroy(c);
})

keyPress('space', () => {
  if(player.grounded()){
    player.jump(240)
  }
});

keyDown("left", () => {
	player.move(-120, 0);
  player.scale.x = -1;
});

keyDown("right", () => {
	player.move(120, 0);
  player.scale.x = 1;
});

player.action(() => {
	camPos(player.pos);
});
