class PostExtractor {
  constructor() {
    this.apiUrl = 'https://gql.hashnode.com'; // Updated API endpoint
  }

  async sendQuery(query, variables = {}) {
    // console.log('Sending query:', query);
    // console.log('Variables:', variables);

    try {
      const response = await fetch(this.apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ query, variables }),
      });

      const data = await response.json();

      if (data.errors) {
        console.error('GraphQL Errors:', data.errors);
        const errorCode = data.errors[0]?.extensions?.code || 'UNKNOWN_ERROR';
        const errorMessage = data.errors[0]?.message || 'An unknown error occurred';
        throw new Error(`GraphQL Error: ${errorCode} - ${errorMessage}`);
      }

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return data.data;
    } catch (error) {
      console.error('Error in sendQuery:', error);
      throw error;
    }
  }

  async getPostBySlug(host, slug) {
    const query = `
      query Publication($host: String!, $slug: String!) {
        publication(host: $host) {
          post(slug: $slug) {
            title
            brief
            content {
              markdown
            }
            coverImage {
              url
            }
            author {
              name
            }
            coAuthors {
              name
            }
            tags {
              name
            }
            readTimeInMinutes
            views
            reactionCount
            publication {
              displayTitle
            }
            responseCount
            replyCount
            publishedAt
            updatedAt
          }
        }
      }
    `;

    const variables = { host, slug };
    return this.sendQuery(query, variables);
  }

  async getPublicationInfo(host) {
    const query = `
      query Publication($host: String!) {
        publication(host: $host) {
          id
          title
          displayTitle
          descriptionSEO
          about {
            markdown
          }
          isTeam
          followersCount
          url
          canonicalURL
          preferences {
            layout
            theme
          }
        }
      }
    `;

    const variables = { host };
    return this.sendQuery(query, variables);
  }
}

module.exports = PostExtractor;