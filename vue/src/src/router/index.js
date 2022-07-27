import { createRouter, createWebHistory } from 'vue-router'
import Welcome from '../views/WelcomePage.vue'
import BookList from '../components/Books/BookList.vue'
import BookCreate from '../components/Books/BookCreate.vue'
import BookEdit from '../components/Books/BookEdit.vue'
import useValidate from '../auth/validate'

const { error, validate } = useValidate()

const requireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  const accessToken = window.localStorage.getItem('access-token')

  if (!uid || !client || !accessToken) {
    console.log('ログインしていません')
    next({ name: 'Welcome' })
    return
  }

  await validate()

  if (error.value) {
    console.log('認証に失敗しました')
    next({ name: 'Welcome' })
  } else {
    next()
  }
}

const noRequireAuth = async (to, from, next) => {
  const uid = window.localStorage.getItem('uid')
  const client = window.localStorage.getItem('client')
  const accessToken = window.localStorage.getItem('access-token')

  if (!uid && !client && !accessToken) {
    next()
    return
  }

  await validate()

  if (!error.value) {
    next({ name: 'BookList'})
  } else {
    next()
  }
}

const routes = [
  {
    path: '/',
    name: 'Welcome',
    component: Welcome,
    beforeEnter: noRequireAuth
  },
  {
    path: '/books',
    name: 'BookList',
    component: BookList,
    beforeEnter: requireAuth
  },
  {
    path: '/books/create',
    name: 'BookCreate',
    component: BookCreate,
    beforeEnter: requireAuth
  },
  {
    path: '/books/:bookId',
    name: 'BookEdit',
    component: BookEdit,
    beforeEnter: requireAuth,
    props: true
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
