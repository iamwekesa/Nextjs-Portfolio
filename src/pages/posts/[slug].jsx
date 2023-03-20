import { useRouter } from 'next/router'
import PostBody from '@/components/PostBody'
import PostHeader from '@/components/PostHeader'
import { getAllPostsWithSlug, getPostAndMorePosts } from '@/lib/cosmic'
import PostTitle from '@/components/PostTitle'
import Head from 'next/head'
import markdownToHtml from '@/lib/markdownToHtml'
import AlertPreview from '@/components/AlertPreview'
import PageNotFound from '../404'
import Loader from '@/components/Loader'

const Post = ({ post }) => {
  const router = useRouter()
  if (!router.isFallback && !post?.slug) {
        // Checking if the page exists and redirecting to a 404 page if it doesn't.
    return <PageNotFound />
  }
  return (
    <>
      {router.isFallback ? (
        <PostTitle>
          <div className="flex justify-center items-center">
                        {/* // If you have a custom loader, you can use it here, if not just fill in the text "Loading... */}
            <Loader />
          </div>
        </PostTitle>
      ) : (
        <>
                    <article className="border-b border-back-subtle py-8 mb-8">
            {post.status === 'draft' && <AlertPreview />}
            <PostHeader post={post} />
            <PostBody content={post.content} />
          </article>
        </>
      )}
    </>
  )
}
export default Post
// Here is where we get all of the posts from Cosmic, and pass the data into the { post } prop.
export async function getStaticProps({ params, preview = null }) {
  const data = await getPostAndMorePosts(params.slug, preview)
// We're calling that function we wrote earlier in /lib/markdownToHtml.js to convert our Markdown to HTML and send it to our <PostBody> component.
  const content = await markdownToHtml(data.post?.metadata?.content || '')

  return {
    props: {
      preview,
      post: {
        ...data.post,
        content,
      },
      morePosts: data.morePosts || [],
    },
  }
}

export async function getStaticPaths() {
  const allPosts = (await getAllPostsWithSlug()) || []
  return {
    paths: allPosts.map(post => `/posts/${post.slug}`),
    fallback: true,
  }
}