let classicCfg = null;

export default async function loadMySprite() {
	console.log('Loading sprites...');

	await loadRoot('./assets/images/');

	await loadSprite('coin', 'coin.png');
	await loadSprite('evil-shroom-1', 'evil-shroom-1.png');
	await loadSprite('evil-shroom-2', 'evil-shroom-2.png');
	await loadSprite('brick', 'brick.png');
	await loadSprite('block', 'block.png');
	await loadSprite('mario', 'mario.png');
	await loadSprite('mushroom', 'mushroom.png');
	await loadSprite('surprise', 'surprise.png');
	await loadSprite('unboxed', 'unboxed.png');
	await loadSprite('flower', 'flower.png', 'flower', body());
	await loadSprite('pipe-top-left', 'pipe-top-left.png');
	await loadSprite('pipe-top-right', 'pipe-top-right.png');
	await loadSprite('pipe-bottom-left', 'pipe-bottom-left.png');
	await loadSprite('pipe-bottom-right', 'pipe-bottom-right.png');

	classicCfg = {
		width: 20,
		height: 20,
		'=': [sprite('block'), solid(), 'block'],
		c: [sprite('surprise'), solid(), 'coin-surprise'],
		m: [sprite('surprise'), solid(), 'mushroom-surprise'],
		f: [sprite('surprise'), solid(), 'flower-surprise'],
		u: [sprite('unboxed'), solid()],
		'(': [sprite('pipe-bottom-left'), solid(), scale(0.5)],
		')': [sprite('pipe-bottom-right'), solid(), scale(0.5)],
		'-': [sprite('pipe-top-left'), solid(), scale(0.5)],
		'+': [sprite('pipe-top-right'), solid(), scale(0.5)],
		e: [sprite('evil-shroom-1'), solid(), 'evil'],
		e: [sprite('evil-shroom-1'), solid(), 'evil'],
		$: [sprite('coin'), solid(), 'coin'],
		'#': [sprite('mushroom'), solid(), 'mushroom', body()],
		'*': [sprite('flower'), solid(), 'flower', body()],
	};

	console.log('sprites loaded');
}

export function getClassicConfig() {
	return classicCfg;
}
