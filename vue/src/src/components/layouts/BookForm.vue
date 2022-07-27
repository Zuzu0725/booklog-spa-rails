<template>
    <div class="container">
        <h2 class="page-title">{{ pageTitle }}</h2>
        <form>
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
        </form>
    </div>
</template>

<script>
export default {
    props: [
        'pageTitle',
        'title',
        'author',
        'summary'
    ]

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