export const SELECT_OPTIONS = {
	CITY: [
		{ key: 'Москва', label: 'Москва' },
		{ key: 'Псков', label: 'Псков' },
		{ key: 'Тверь', label: 'Тверь' },
		{ key: 'Абакан', label: 'Абакан' },
		{ key: 'Нижний Новгород', label: 'Нижний Новгород' },
		{ key: 'Кострома', label: 'Кострома' },
		{ key: 'Ярославль', label: 'Ярославль' },
	],
	TYPE_DELIVERY: [
		{ key: 'Короб', label: 'Короб' },
		{ key: 'Монопаллета', label: 'Монопаллета' },
	],

	WAREHOUSE: [
		{ key: 'Склад', label: 'Склад' },
		{ key: 'СЦ Абакан', label: 'СЦ Абакан' },
		{ key: 'Черная грязь', label: 'Черная грязь' },
		{ key: 'Внуково', label: 'Внуково' },
		{ key: 'Белая дача', label: 'Белая дача' },
		{ key: 'Электросталь', label: 'Электросталь' },
		{ key: 'Вёшки', label: 'Вёшки' },
	],
	STATUS: [
		{ key: 'В пути', label: 'В пути' },
		{ key: 'Задерживается', label: 'Задерживается' },
	],

	FIELDS: [
		{ key: 'id', label: 'По номеру' },
		{ key: 'city', label: 'По городу' },
		{ key: 'type', label: 'По типу доставки' },
		{ key: 'status', label: 'По статусу' },
	]
}