import fetch from 'isomorphic-unfetch'
import config from '../config/config'

const icons = [
  { id: 1, path: 'images/BenefitsCalculator/icon-childcare.png' },
  { id: 2, path: 'images/BenefitsCalculator/icon-food.png' },
  { id: 3, path: 'images/BenefitsCalculator/icon-transportation.png' },
  { id: 4, path: 'images/BenefitsCalculator/icon-utilities.png' }
]

export function getCategories() {
  return fetch(config.apiHost + '/benefits-calculator-categories')
  .then(res => res.json())
  .then(data => {
    return data.map(c => {
      return {
        ...c,
        iconImage: icons.find(x => x.id == c.id).path
      }
    })
  })
  .catch (error => {
    throw error
  })
}