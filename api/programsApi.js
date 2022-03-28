import fetch from 'isomorphic-unfetch'
import config from '../config/config'

const images = [
  { id: 1, path: 'images/BenefitsCalculator/fresh-bucks-match.jpg' },
  { id: 2, path: 'images/BenefitsCalculator/Fresh-bucks.png' },
  { id: 3, path: 'images/BenefitsCalculator/ORCA-lift.png' },
  { id: 4, path: 'images/BenefitsCalculator/orca-opportunity.png' },
  { id: 5, path: 'images/BenefitsCalculator/Youth-ORCA.png' },
  { id: 6, path: 'images/BenefitsCalculator/Vechical-Licence-Fee-Rebat.jpg' },
  { id: 7, path: 'images/BenefitsCalculator/Low-Income-RPZ-Permit.png' },
  { id: 8, path: 'images/BenefitsCalculator/Utility-Discount-Program.png' },
  { id: 9, path: 'images/BenefitsCalculator/Wave-internet.png' },
  { id: 10, path: 'images/BenefitsCalculator/Comcast-internet.png' },
  { id: 11, path: 'images/BenefitsCalculator/School-Age-Care.jpg' },
  { id: 12, path: 'images/BenefitsCalculator/Seattle-Parks-and-Recreation-Preschool.jpg' },
  { id: 13, path: 'images/BenefitsCalculator/Seattle-Preschool-Program.jpg' },
  { id: 14, path: 'images/BenefitsCalculator/Seattle-Promise-2.png' },
  { id: 15, path: 'images/BenefitsCalculator/Child-Care-Assistance.jpg' },
  { id: 16, path: 'images/BenefitsCalculator/Pathway-Preschool.jpg' },
  { id: 17, path: 'images/BenefitsCalculator/Seattle-Parks-and-Rec-Summer-Camp.jpg' },
  { id: 18, path: 'images/BenefitsCalculator/logo-sound-generations.png' },
  { id: 19, path: 'images/BenefitsCalculator/Seniors on the bus.png' },
  { id: 20, path: 'images/BenefitsCalculator/orca-opportunity-seattle-promise-scholars.jpg' },
  { id: 21, path: 'images/BenefitsCalculator/48082918977_1d94bd1f7a_c.jpg' },
  { id: 22, path: 'images/BenefitsCalculator/InterConnection-Square.jpg' },
  { id: 23, path: 'images/BenefitsCalculator/PCsforPeople.png' }
]

export function getPrograms() {
  return fetch(config.apiHost + '/benefits-calculator-programs')
    .then(res => res.json())
    .then(data => {
      return data.map(c => {
        return {
          ...c,
          image: images.find(x => x.id == c.id).path
        }
      })
    })
    .catch(error => {
      throw error
    })
}