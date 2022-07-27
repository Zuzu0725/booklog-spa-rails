<template>
    <div class="container">
        <p class="error">{{ error }}</p>
        <div class="card-deck">
            <ul v-for="book in books" :key="book.id">
                <li class="card p-3 shadow-sm" style="width: 18rem; height: 16rem;">
                    <h4 class="card-title">{{ book.title }}</h4>
                    <p>{{ book.author }}</p>
                    <p class="card-text" style="height: 5.5rem">{{ book.summary }}</p>
                    <div class="row mx-2">
                        <router-link
                            class="col p-1"
                            v-bind:to="{ name: 'BookEdit', params: { bookId: book.id} }"
                        >
                            <button  style="font-weight: normal;">編集</button>
                        </router-link>
                        <button @click="destroy(book.id)" class="my-1 btn-danger">削除</button>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    data() {
        return {
            books: [],
            error: null
        }
    },
    methods: {
        async getBooks() {
            this.error = null
            try {
                const res = await axios.get('http://localhost:3000/api/v1/books', {
                    headers: {
                        uid: window.localStorage.getItem('uid'),
                        "access-token": window.localStorage.getItem('access-token'),
                        client: window.localStorage.getItem('client')
                    }
                })

                if(!res) {
                    new Error('書籍一覧を取得できませんでした')
                }

                this.books = res.data
            } catch (error) {
                this.error =  '書籍一覧を取得できませんでした'
            }
        },
        async destroy(id) {
            this.error = null
            try {
                const res = await axios.delete(`http://localhost:3000/api/v1/books/${id}`, {
                    headers: {
                        uid: window.localStorage.getItem('uid'),
                        "access-token": window.localStorage.getItem('access-token'),
                        client: window.localStorage.getItem('client')
                    }
                })

                if(!res) {
                    throw new Error('削除に失敗しました')
                } else {
                    // エラーがなかったら、再度書籍情報を読み込む
                    this.getBooks()
                }
                return
            } catch (error) {
                this.error = '削除に失敗しました'
            }
        }
    },
    mounted() {
        this.getBooks()
    }
}
</script>

<style scoped>


</style>