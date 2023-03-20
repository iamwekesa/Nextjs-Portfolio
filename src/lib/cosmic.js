const Cosmic = require('cosmicjs')
const api = Cosmic()

const BUCKET_SLUG = process.env.COSMIC_BUCKET_SLUG
const READ_KEY = process.env.COSMIC_READ_KEY

const bucket = Cosmic().bucket({
  slug: BUCKET_SLUG,
  read_key: READ_KEY,
})

export async function getAllPosts(preview, postType, postCount) {
  const params = {
    query: { type: postType },
    ...(preview && { status: 'any' }),
    props:
      'title,slug,metadata.category,metadata.excerpt,metadata.published_date,created_at,status',
    limit: postCount,
    sort: '-created_at',
  }
  const data = await bucket.getObjects(params)
  return data.objects
}