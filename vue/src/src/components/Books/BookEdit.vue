<template>
    <div class="container">
        <h2 class="page-title">書籍編集</h2>
        <div class="error">{{ error }}</div>
        <form @submit.prevent="create">
            <div class="form-group">
                <label for="title">書籍名</label>
                <input class="form-control" type="text" id="title" v-model="title">
            </div>
            <div class="form-group">
                <label for="author">著者名</label>
                <input class="form-control" type="text" id="author" v-model="author">
            </div>
            <div class="form-group">
                <label for="summary">感想</label>
                <textarea class="form-control" id="summary" cols="30" rows="10" v-model="summary" />
            </div>
            <button>更新する</button>
        </form>
    </div>
</template>

<script>
import axios from 'axios'
import GetHeaders from '../../book/getHeaders'
const getHeaders = new GetHeaders

export default {
    props: {
        bookId: Number
    },
    data() {
        return {
            title: '',
            author: '',
            summary: '',
            error: null
        }
    },
    methods: {
        async getBook() {
            this.error = null
            try {
                const res = await axios.get(`http://localhost:3000/api/v1/books/${this.bookId}`,{
                    headers: {
                        uid: getHeaders.getUid(),
                        "access-token": getHeaders.getAccessToken(),
                        client: getHeaders.getClient()
                    }
                })

                if(!res) {
                    throw new Error('書籍情報を取得できませんでした')
                }

                // 受け取ったデータを変数に格納
                this.title = res.data.title
                this.author = res.data.author
                this.summary = res.data.summary
            } catch (error) {
                this.error = '書籍情報を取得できませんでした'
            }
        },
        async create() {
            this.error = null
            try {
                const res = await axios.post('http://localhost:3000/api/v1/books', {
                    title: this.title,
                    author: this.author,
                    summary: this.summary
                }, {
                    headers: {
                        uid: window.localStorage.getItem('uid'),
                        "access-token": window.localStorage.getItem('access-token'),
                        client: window.localStorage.getItem('client')
                    }
                })

                if(!res) {
                    throw new Error('書籍の登録に失敗しました')
                }

                if(!this.error) {
                    this.$router.push({ name: 'BookList' })
                }
            } catch (error) {
                this.error = '書籍の登録に失敗しました'
            }
        }
    },
    mounted() {
        this.getBook()
    }
}
</script>

<style scoped>
    .page-title {
        text-align: center;
        font-weight: bold;
        font-size: 30px;
        margin: 30px 0;
    }
    form {
        width: 800px;
        margin: 20px auto;
    }
    input {
        width: 100%;
        margin: 8px auto;
        border-radius: 4px;
        border: 2px solid #2b2c34;
        outline: none;
        box-sizing: border-box;
    }
    textarea {
        margin: 8px auto;
        border-radius: 4px;
        border: 2px solid #2b2c34;
        outline: none;
    }
</style>