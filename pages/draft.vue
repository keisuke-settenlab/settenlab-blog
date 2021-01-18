<template>
  <main v-if="data" class="main">
    <h1 class="title">{{ data.title }}</h1>
    <p class="publishedAt">{{ data.publishedAt }}</p>
    <div class="post" v-html="data.body"></div>
  </main>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      data: {}
    };
  },
  async created() {
    const query = this.$route.query;
    if (query.id === undefined || query.draftKey === undefined) {
      return;
    }
    const { data } = await axios.get(
      `https://settenlab-blog.microcms.io/api/v1/blog/${query.id}?draftKey=${query.draftKey}`,
      {
        headers: { 'X-API-KEY': 'd1730a7c-b245-4732-b20e-69b58e25235a' }
      }
    )
    this.data = data;
  },
}
</script>