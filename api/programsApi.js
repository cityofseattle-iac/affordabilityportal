import fetch from 'isomorphic-unfetch'
import config from '../config/config'

const images = [
  { id: 1, path: 'images/BenefitsCalculator/fresh-bucks-match.jpg', category: 'Food, Retail, and Entertainment' },
  { id: 2, path: 'images/BenefitsCalculator/Fresh-bucks.png', category: 'Food, Retail, and Entertainment' },
  { id: 3, path: 'images/BenefitsCalculator/ORCA-lift.png', category: 'Transportation' },
  { id: 4, path: 'images/BenefitsCalculator/orca-opportunity.png', category: 'Transportation' },
  { id: 5, path: 'images/BenefitsCalculator/Youth-ORCA.png', category: 'Transportation' },
  { id: 6, path: 'images/BenefitsCalculator/Vechical-Licence-Fee-Rebat.jpg', category: 'Transportation' },
  { id: 7, path: 'images/BenefitsCalculator/Low-Income-RPZ-Permit.png', category: 'Transportation' },
  { id: 8, path: 'images/BenefitsCalculator/Utility-Discount-Program.png', category: 'Utilities and Housing' },
  { id: 9, path: 'images/BenefitsCalculator/Wave-internet.png', category: 'Utilities and Housing' },
  { id: 10, path: 'images/BenefitsCalculator/Comcast-internet.png', category: 'Utilities and Housing' },
  { id: 11, path: 'images/BenefitsCalculator/School-Age-Care.jpg', category: 'Education and Child Care' },
  { id: 12, path: 'images/BenefitsCalculator/Seattle-Parks-and-Recreation-Preschool.jpg', category: 'Education and Child Care' },
  { id: 13, path: 'images/BenefitsCalculator/Seattle-Preschool-Program.jpg', category: 'Education and Child Care' },
  { id: 14, path: 'images/BenefitsCalculator/Seattle-Promise-2.png', category: 'Education and Child Care' },
  { id: 15, path: 'images/BenefitsCalculator/Child-Care-Assistance.jpg', category: 'Education and Child Care' },
  { id: 16, path: 'images/BenefitsCalculator/Pathway-Preschool.jpg', category: 'Education and Child Care' },
  { id: 17, path: 'images/BenefitsCalculator/Seattle-Parks-and-Rec-Summer-Camp.jpg', category: 'Education and Child Care' },
  { id: 18, path: 'images/BenefitsCalculator/logo-sound-generations.png', category: 'Utilities and Housing' },
  { id: 19, path: 'images/BenefitsCalculator/Seniors on the bus.png', category: 'Transportation' },
  { id: 20, path: 'images/BenefitsCalculator/orca-opportunity-seattle-promise-scholars.jpg', category: 'Transportation' },
  { id: 21, path: 'images/BenefitsCalculator/48082918977_1d94bd1f7a_c.jpg', category: 'Transportation' },
  { id: 22, path: 'images/BenefitsCalculator/InterConnection-Square.jpg', category: 'Utilities and Housing' },
  { id: 23, path: 'images/BenefitsCalculator/PCsforPeople.png', category: 'Utilities and Housing' },
  { id: 24, path: 'images/BenefitsCalculator/Emergency-Bill-Assistance.png', category: 'Utilities and Housing' },
  { id: 25, path: 'images/BenefitsCalculator/Emergency-Assistance-Program.png', category: 'Utilities and Housing' },
  { id: 26, path: 'images/BenefitsCalculator/Side-Sewer-Assistance-Program.png', category: 'Utilities and Housing' },
  { id: 27, path: 'images/BenefitsCalculator/Home-Repair.png', category: 'Utilities and Housing' },
  { id: 28, path: 'images/BenefitsCalculator/Weatherization.png', category: 'Utilities and Housing' },
  { id: 29, path: 'images/BenefitsCalculator/FLASH-Card.png', category: 'Food, Retail, and Entertainment' },
  { id: 30, path: 'images/BenefitsCalculator/Gold-Card.png', category: 'Food, Retail, and Entertainment' }
]

export function getPrograms() {
  return fetch(config.apiHost + '/benefits-calculator-programs')
    .then(res => res.json())
    .then(data => data.filter(p => 'PublishToProduction' in p ? Boolean(p.PublishToProduction) : true))
    .then(data => {
      return data.map(p => {
        return {
          ...p,
          image: images.find(x => x.id == p.id).path,
          categoryHeaderText : images.find(x => x.id == p.id).category,
        }
      })
    })
    .then(data => data.sort((a,b) => (parseInt(a.id) > parseInt(b.id)) ? 1 : -1))
    .catch(error => {
      throw error
    })
}