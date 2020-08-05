import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'



import { faBars, faPenFancy, faSync, faChevronLeft, faChevronRight, faQuoteLeft, faSearch } from '@fortawesome/free-solid-svg-icons'
library.add(faBars)
library.add(faPenFancy)
library.add(faSync)
library.add(faChevronLeft)
library.add(faChevronRight)
library.add(faQuoteLeft)
library.add(faSearch)



window.Vue.component('font-awesome-icon', FontAwesomeIcon)
