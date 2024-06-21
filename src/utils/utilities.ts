export const formatNumber = (num: number) => {
  return new Intl.NumberFormat('ru-RU').format(num)
}

export const isNumberKey = (e: any) => {
  if (!/[0-9]/.test(e.key)) {
    e.preventDefault();
  }
}

export const isNumberLength = (num: number) => (num).toLocaleString('en-US', {minimumIntegerDigits: 6, useGrouping:false})

export const dateFormat = (str: string | number | Date) => (new Date(str).toLocaleString().split(',')[0])

const warehouses = [
  {
    name: "Склад",
    address: "ул. Гагарина, д. 10А"
  },
  {
    name: "СЦ Абакан",
    address: "г. Абакан, ул. Аскизская 177"
  },
  {
    name: "Черная грязь",
    address: "д. Черная Грязь, ул. Промышленная, с.2"
  },
  {
    name: "Внуково",
    address: "ул. Торосова, д.15, пом.294Н"
  },
  {
    name: "Белая дача",
    address: "г. Барнаул, ул. Новороссийская, 138В"
  },
  {
    name: "Электросталь",
    address: "г. Иркутск, ул. Шевцова, д. 68"
  },
  {
    name: "Вёшки",
    address: "г. Красноярск ул.Железнодорожников, д.11"
  },
]

export const getWarehouse = (warehouse: string) => warehouses.find((war) => warehouse === war.name)

