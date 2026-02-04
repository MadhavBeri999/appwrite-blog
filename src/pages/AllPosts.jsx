import React, { useState } from 'react'
import service from '../appwrite/conf'
import PostCard from '../components/PostCard'
import { Container } from '../components'
import { useEffect } from 'react'


// AllPosts.jsx
function AllPosts() {
    const [posts, setPosts] = useState([])

    useEffect(() => {
        // Put the service call INSIDE the useEffect
        service.getallposts([]).then((posts) => {
            if (posts) {
                setPosts(posts.documents)
            }
        })
    }, []) // The empty brackets [] ensure this only runs ONCE

    return (
        <div className='w-full py-8'>
            <Container>
                <div className='flex flex-wrap '>
                    {posts.map((post) => (
                        <div key={post.$id} className='p-2 w-full sm:w-1/2 md:w-1/3 lg:w-1/4'>
                            <PostCard {...post} />
                        </div>
                    ))}
                </div>
            </Container>
        </div>
    )
}

export default AllPosts