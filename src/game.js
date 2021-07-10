import level1 from '../maps/level-1.js';
import loadMySprites, { getClassicConfig } from './load-sprite.js';
import playerMoves from './player-moves.js';

kaboom({
	global: true,
	fullscreen: true,
	scale: 2,
	debug: true,
	clearColor: [0, 0, 0, 1],
});

const ENNEMY_SPEED = 30;

await loadMySprites();

scene('game', ({ score, level }) => {
	layers(['bg', 'obj', 'ui'], 'obj');

	const gameLevel = addLevel(level1, getClassicConfig());

	const scoreLabel = add([
		text(score),
		pos(50, 6),
		layer('ui'),
		{
			value: score,
		},
	]);

	const levelLabel = add([
		text(level),
		pos(4, 6),
		layer('ui'),
		{
			value: level,
		},
	]);

	playerMoves(gameLevel, levelLabel, scoreLabel);

	action('evil', (e) => {
		e.move(-ENNEMY_SPEED, 0);
	});

	action('mushroom', (m) => {
		m.move(30, 0);
	});
});

scene('lose', ({ score, level }) => {
	add([text(score, 32), origin('center'), pos(width() / 2, height() / 2)]);
	add([text(level, 32), origin('center'), pos(width() / 2, height() / 2 + 50)]);
});

start('game', { score: 0, level: 1 });
