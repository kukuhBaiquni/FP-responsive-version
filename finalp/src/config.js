import moment from 'moment'
export const SERVER_URL = 'http://192.168.43.120:3004/';
export const baseColor = '#4d2e9b'
export const emoji = [
  ':grinning:', ':grin:', ':joy:', ':slight_smile:', ':frowning2:', ':rofl:', ':smile:', ':sweat_smile:', ':laughing:', ':wink:', ':blush:',
  ':yum:', ':sunglasses:', ':heart_eyes:', ':hugging:', ':thinking:', ':neutral_face:', ':expressionless:', ':smirk:', ':persevere:'
  , ':disappointed_relieved:', ':hushed:', ':tired_face:', ':weary:', ':astonished:', ':scream:', ':innocent:', ':sob:', ':sweat:',
  ':sneezing_face:', ':face_with_hand_over_mouth:', ':worried:', ':sleeping:', ':shushing_face:'
]

export function validation(a, b, c, d, e){
  if (a !== '' && b !== '-' && c !== '' && d.length !== 0 && e.length !== 0) {
    return 'Form Valid'
  }else{
    return 'Form Invalid'
  }
}

export function localFormat(value, unit, suffix, date){
  let target = ''
  let defaultFormat = ['second', 'minute', 'hour', 'day']
  let localFormat = ['Baru saja', ' menit', ' jam', 'kemarin']
  let localSuffix = ' yang lalu'
  if (defaultFormat.includes(unit)) {
    if (unit === 'second') {
      return localFormat[0]
    }else if (unit === 'day' && value === 1) {
      return localFormat[3] + ' pukul ' + moment(date).format('HH:mm')
    }else if (unit === 'day' && value !== 1) {
      return moment(date).format('MMM, DD') + ' pukul ' + moment(date).format('HH:mm')
    }else {
      for (var i = 0; i < defaultFormat.length; i++) {
        if (unit === defaultFormat[i]) {
          target = localFormat[i]
          return value + ' ' + target + ' ' + localSuffix
        }
      }
    }
  }else{
    let wm = ['week', 'month']
    if (wm.includes(unit)) {
      return moment(date).format('MMM, DD') + ' pukul ' + moment(date).format('HH:mm')
    }else{
      return moment(date).format('MMM, DD \'YY') + ' pukul ' + moment(date).format('HH:mm')
    }
  }
}
