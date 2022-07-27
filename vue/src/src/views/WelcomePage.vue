<template>
    <div class="container-css welcome">
        <p>ようこそ</p>
        <div v-if="shouldShowLoginForm">
            <LoginForm @redirectToBooks="redirectToBooks" />
            <p class="change-form">初めての方は<span @click="shouldShowLoginForm = false">こちら</span>をクリック</p>
        </div>
        <div v-if="!shouldShowLoginForm">
            <SignupForm @redirectToBooks="redirectToBooks" />
            <p class="change-form">アカウントをお持ちの方は<span @click="shouldShowLoginForm = true">こちら</span>をクリック</p>
        </div>
    </div>
</template>

<script>
import LoginForm from '../components/auth/LoginForm.vue'
import SignupForm from '../components/auth/SignupForm.vue'

export default {
    components: {
        LoginForm,
        SignupForm
    },
    data() {
        return {
            shouldShowLoginForm: true
        }
    },
    methods: {
        redirectToBooks() {
            this.$router.push({ name: 'BookList' })
        }
    }

}
</script>

<style>
    .welcome {
        text-align: center;
        padding: 20px 0;
    }
    .welcome form {
        width: 300px;
        margin: 20px auto;
    }
    .welcome label {
        display: block;
        margin: 20px 0 10px;
    }
    .welcome input {
        width: 100%;
        padding: 12px 20px;
        margin: 8px auto;
        border-radius: 4px;
        border: 2px solid #2b2c34;
        outline: none;
        box-sizing: border-box;
    }
    .welcome span{
        font-weight: bold;
        text-decoration: underline;
        color: #6246ea;
        cursor: pointer;
    }
    .welcome button {
        margin: 20px auto;
    }
</style>