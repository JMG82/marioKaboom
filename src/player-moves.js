export default function playerMoves(gameLevel, levelLabel, scoreLabel) {
	const MOVE_SPEED = 120;
	const JUMP_FORCE = 360;
	const JUMP_FORCE_BIG = 550;
	let CURRENT_JUM_FORCE = JUMP_FORCE;
	let isJumping = false;
	const FALL_DEATH = 400;

	const power = () => {
		let timer = 0;
		let isBig = false;
		let isImmortal = false;
		return {
			update() {
				if (isBig) {
					timer -= dt();
					if (timer <= 0) {
						this.smallify();
					}
				}
			},
			isBig() {
				return isBig;
			},
			smallify() {
				if (isImmortal) {
					return;
				}
				if (isBig) {
					this.scale = vec2(1);
					timer = 0;
					isBig = false;
					CURRENT_JUM_FORCE = JUMP_FORCE;
					return;
				}
				go('lose', { score: scoreLabel.value, level: levelLabel.value });
			},
			bigify() {
				this.scale = vec2(2);
				timer = time;
				isBig = true;
				CURRENT_JUM_FORCE = JUMP_FORCE_BIG;
			},
			bombify() {
				this.scale = vec2(2);
				timer = time;
				isBig = true;
				CURRENT_JUM_FORCE = JUMP_FORCE_BIG;
			},
			immortalify(time) {
				this.scale = vec2(3);
				timer = time;
				isImmortal = true;
				CURRENT_JUM_FORCE = JUMP_FORCE_BIG;
			},
		};
	};

	const player = add([
		sprite('mario'),
		solid(),
		pos(30, 0),
		body(),
		power(),
		origin('bot'),
	]);

	player.action(() => {
		if (player.grounded()) {
			isJumping = false;
		}

		camPos(player.pos);
		if (player.pos.y >= FALL_DEATH) {
			go('lose', { score: scoreLabel.value, level: levelLabel.value });
		}
	});

	player.on('headbump', (obj) => {
		if (obj.is('block')) {
			destroy(obj);
		}

		if (obj.is('coin-surprise')) {
			gameLevel.spawn('$', obj.gridPos.sub(0, 1));
			destroy(obj);
			gameLevel.spawn('u', obj.gridPos.sub(0, 0));
		}

		if (obj.is('mushroom-surprise')) {
			gameLevel.spawn('#', obj.gridPos.sub(0, 1));
			destroy(obj);
			gameLevel.spawn('u', obj.gridPos.sub(0, 0));
		}

		if (obj.is('flower-surprise')) {
			gameLevel.spawn('*', obj.gridPos.sub(0, 1));
			destroy(obj);
			gameLevel.spawn('u', obj.gridPos.sub(0, 0));
		}
	});

	player.collides('evil', (e) => {
		console.log(player.pos.y, 'vs', e.pos.y);
		if (player.pos.y < e.pos.y) {
			destroy(e);
		} else {
			player.smallify();
		}
	});

	player.collides('mushroom', (m) => {
		destroy(m);
		player.bigify();
	});

	player.collides('flower', (f) => {
		destroy(f);
		player.immortalify(5);
	});

	player.collides('coin', (c) => {
		destroy(c);
		scoreLabel.value += 1;
		scoreLabel.text = scoreLabel.value;
	});

	keyDown('left', () => {
		player.move(-MOVE_SPEED, 0);
	});

	keyDown('right', () => {
		player.move(MOVE_SPEED, 0);
	});

	keyDown('space', () => {
		if (player.grounded()) {
			isJumping = true;
			player.jump(CURRENT_JUM_FORCE);
		}
	});
}
