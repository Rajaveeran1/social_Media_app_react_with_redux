import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectAllPosts, getPostStatus, getPostError, fetchPosts } from './postsSlice'
import PostExcerpts from './PostExcerpts'


const PostList = () => {
    const dispatch = useDispatch()
    const posts = useSelector(selectAllPosts)
    const postStatus = useSelector(getPostStatus)
    const error = useSelector(getPostError)

    useEffect( () =>{
        if (postStatus === 'idle') {
            dispatch(fetchPosts())
        }
    }, [postStatus, dispatch])
    
    let content;

    if (postStatus === 'loading') {
        content = <p>"loading</p>
    }  else if (postStatus === 'succeeded') {
      const orderedPosts = posts.slice().sort((a,b) => b.date.localeCompare(a.date))
      content = orderedPosts.map(post => (<PostExcerpts key={post.id} post={post}/>))
    } else if (postStatus === 'failed') {
        content = <p>{error}</p>
    }
    
  return (
   <section>
        {content}
   </section>
  )
}

export default PostList