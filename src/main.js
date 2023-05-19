import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import "./index.css"

import { library } from '@fortawesome/fontawesome-svg-core'
import { faMoon, faSun, faGlobe, faPencil, faBars, faSearch, faThumbsUp, faRightToBracket, faArrowRight } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
library.add(faMoon, faSun, faGlobe, faPencil, faBars, faSearch, faThumbsUp, faRightToBracket, faArrowRight)

createApp(App).component('font-awesome-icon', FontAwesomeIcon).use(router).use(store).mount('#app')
