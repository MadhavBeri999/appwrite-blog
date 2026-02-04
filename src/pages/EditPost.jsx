import React from 'react'
import { useEffect, useState } from 'react'
import { Container } from '../components'
import PostForm from '../components/post-form/PostForm'
import service from '../appwrite/conf'
import { useNavigate, useParams } from 'react-router-dom'

function EditPost() {
    const [post, setposts] = useState(null)
    const { slug } = useParams() // This hook use to withraw the value of slug from the url 
    const navigate = useNavigate()
    useEffect(() => {

        if (slug) {
            service.getpost(slug).then((post) => {
                if (post) {
                    setposts(post)
                }
            })
        }
        else {
            navigate('/')
        }
    }, [slug, navigate])
    return post ? (
        <div className='py-8'>
            <Container>
                <PostForm post={post} />
            </Container>
        </div>
    ) : null


}

export default EditPost