import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import './assets/tailwind.css'



/* import the fontawesome core */
import { library } from '@fortawesome/fontawesome-svg-core'

/* import font awesome icon component */
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

/* import specific icons */
import { faSearch , faUserCircle, faBell, faHome,faTv, faUsersRectangle, faVideo, faImage, faFaceSmile,faThumbsUp, faComment, faShare, faBullhorn, faEllipsisVertical,  } from '@fortawesome/free-solid-svg-icons'
import { faFacebook, faFacebookMessenger } from '@fortawesome/free-brands-svg-icons'

/* add icons to the library */
library.add(faSearch, faFacebook, faUserCircle, faFacebookMessenger, faBell, faHome,faTv, faUsersRectangle, faVideo, faImage, faFaceSmile, faThumbsUp, faComment, faShare, faBullhorn, faEllipsisVertical)





createApp(App).use(router).component('font-awesome-icon', FontAwesomeIcon).mount('#app')
