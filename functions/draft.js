const axios = require('axios');

exports.handler = async (event) => {
  const { id, draftKey } = event.queryStringParameters;
  if (!id) {
    return {
      statusCode: 400,
      body: JSON.stringify({
        error: 'Missing "id" query parameter',
      }),
    };
  }
  return axios
    .get(
      `https://settenlab-blog.microcms.io/api/v1/blog/${id}?draftKey=${draftKey}`,
      {
        headers: { 'X-API-KEY': process.env.API_KEY },
      }
    )
    .then(({ data }) => ({
      statusCode: 200,
      body: JSON.stringify(data),
    }))
    .catch((error) => {
      return {
        statusCode: error.response.status,
        body: JSON.stringify(error.response.data),
      }
    });
};