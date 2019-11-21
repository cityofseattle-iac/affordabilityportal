import fetch from 'isomorphic-unfetch'
import config from '../config/config'

export function getPrograms() {
  return fetch(config.apiHost + '/benefits-calculator-programs')
    .then(res => res.json())
    .catch(error => {
      throw error
    })
}