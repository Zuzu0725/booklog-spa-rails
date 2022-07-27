<template>
  <div>
    <Header class="mb-3" />
    <router-view/>
  </div>
</template>

<script>
import Header from './components/layouts/HeaderComponent.vue'
export default {
    components: {
        Header
    }

}
</script>

