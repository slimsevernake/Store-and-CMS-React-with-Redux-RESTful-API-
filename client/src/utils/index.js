import { format } from "date-fns"
// import { normalize, schema } from "normalizr"

// export const normalizeObjects = (entitiesName, items) => {
//     const entitiesSchema = new schema.Entity(entitiesName)
//     const listSchema = [entitiesSchema]
//     return normalize(items, listSchema)
// }

export const phoneToTextFormat = (phone) =>
  `${phone.slice(0, 2)} ${phone.slice(2, 7)} ${phone.slice(7)}`

export const phoneToValue = (phone) =>
  Number(phone.replace('+', '').replace('(', '').replace(')', '').replace('-', ''))


export function getCityIdByEngName(engName, cities) {
  return Object.values(cities)
    .filter(item => item.eng === engName)
    .reduce((res, item) => item, false)
}

export function getDisplayName(WrappedComponent) {
  return WrappedComponent.displayName || WrappedComponent.name || 'Component'
}

export const compose = (...funcs) => x => funcs.reduceRight((r, f) => f(r), x)
export const when = (cond, f) => x => {
  if (typeof cond === 'boolean') {
    return cond ? f(x) : x
  }
  return cond(x) ? f(x) : x
}

export const formatDateDMY = (date) => format(date, 'dd.MM.yyyy')

export function isNumber(value) {
  return typeof value === 'number' && isFinite(value)
}

export function classes() {
  const [...args] = arguments
  return args.reduce((total, arg) => arg ? total + ' ' + arg : total)
}


export const getDayName = (dayOfWeek = 0) => {
  return [
    {
      short: 'Вс',
      full: 'Воскресенье'
    }, {
      short: 'Пн',
      full: 'Понедельник'
    }, {
      short: 'Вт',
      full: 'Вторник'
    }, {
      short: 'Ср',
      full: 'Среда'
    }, {
      short: 'Чт',
      full: 'Четверг'
    }, {
      short: 'Пт',
      full: 'Пятница'
    }, {
      short: 'Сб',
      full: 'Суббота'
    }
  ][dayOfWeek]
}

export const getMonthName = (month = 0) => {
  return [
    'Января',
    'Февраля',
    'Марта',
    'Апреля',
    'Мая',
    'Июня',
    'Июля',
    'Августа',
    'Сентября',
    'Октября',
    'Ноября',
    'Декабря'
  ][month]
}

export function getAvailableDate(date, year = false) {
  const d = new Date(date)
  const monthRus = getMonthName(d.getMonth()).toLowerCase()
  return `${d.getDate()} ${monthRus} ${year ? d.getFullYear() : ''}`
}

export const getObjectWithoutKeys = (object, keysToRemove) => {
  return Object.entries(object).reduce((results, item) => {
    const [key, value] = item

    return keysToRemove.includes(key) ?
      { ...results } :
      { ...results, [key]: value }
  }, {})
}

export const uuid = () => Math.random().toString(32).substr(2, 12)