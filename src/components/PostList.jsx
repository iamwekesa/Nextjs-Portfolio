import Link from 'next/link'

const PostList = ({ allPosts, postType }) => {
  return (
    <>
      <ul className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {allPosts.map(post => (
          <li
            className="flex flex-col bg-white dark:bg-gray-800 rounded p-8 shadow-sm"
            key={post.title}
          >
            <Link href={`/${postType}/${post.slug}`}>
              <a className="group flex flex-col justify-center gap-y-6">
                <div className="max-w-lg">
                  <h3 className="text-xl font-bold mb-1 group-hover:text-accent transition-colors">
                    {post.title}
                  </h3>
                  <p className="text-fore-subtle mb-3 lg:mb-0 lg:pr-6">
                    {post.metadata.excerpt}
                  </p>
                </div>
                <p className="flex items-center text-fore-subtle text-sm">
                  Read more
                </p>
              </a>
            </Link>
          </li>
        ))}
      </ul>
    </>
  )
}
export default PostList