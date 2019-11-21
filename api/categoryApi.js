import fetch from 'isomorphic-unfetch'
import config from '../config/config'

export function getCategories() {
  return fetch(config.apiHost + '/benefits-calculator-categories')
  .then(res => res.json())
  .catch (error => {
    throw error
  })
}