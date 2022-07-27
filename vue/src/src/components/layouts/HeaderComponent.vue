<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="#">読書管理アプリ</a>
            <div class="collapse navbar-collapse">
                <ul class="navbar-nav ml-auto">
                    <li class="nav-item mr-2">
                        {{ name }}
                    </li>
                    <li class="nav-item">
                        <a class="button" @click="logout">ログアウト</a>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
</template>

<script>
import axios from 'axios'

export default {
    data() {
        return {
            name: window.localStorage.getItem('name'),
            error: null
        }
    },
    methods: {
        async logout () {
            this.error = null
            try {
                const res = await axios.delete('http://localhost:3000/auth/sign_out', {
                    headers: {
                        uid: window.localStorage.getItem('uid'),
                        "access-token": window.localStorage.getItem('access-token'),
                        client: window.localStorage.getItem('client')
                    }
                })

                if(!res) {
                    new Error('ログアウトできませんでした')
                }

                console.log("ログアウトしました")
                window.localStorage.removeItem('access-token')
                window.localStorage.removeItem('client')
                window.localStorage.removeItem('uid')
                window.localStorage.removeItem('name')

                console.log({ res })
                this.$router.push({ name: 'Welcome' })

                return res
            } catch (error) {
                this.error = 'ログアウトできませんでした'
                alert({ error })
            }
        }
    }
}
</script>

<style scoped>
    .button {
        text-decoration: none;
        background: #6246ea;
        color: #fffffe;
        font-weight: normal;
        border: 0;
        border-radius: 3px;
        padding: 10px 10px;
        cursor: pointer;
    }

</style>