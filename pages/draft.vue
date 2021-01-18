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
      `/.netlify/functions/draft?id=${query.id}&draftKey=${query.draftKey}`,
    );
    this.data = data;
  },
}
</script>

<style lang="scss" scoped>
.main {
  width: 960px;
  margin: 0 auto;
}

.title {
  margin-bottom: 20px;
}

.publishedAt {
  margin-bottom: 40px;
}

.post {
  & > h1 {
    font-size: 30px;
    font-weight: bold;
    margin: 40px 0 20px;
    background-color: #eee;
    padding: 10px 20px;
    border-radius: 5px;
  }

  & > h2 {
    font-size: 24px;
    font-weight: bold;
    margin: 40px 0 16px;
    border-bottom: 1px solid #ddd;
  }

  & > p {
    line-height: 1.8;
    letter-spacing: 0.2px;
  }

  & > ol {
    list-style-type: decimal;
    list-style-position: inside;
  }
}
</style>