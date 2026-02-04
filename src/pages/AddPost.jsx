import React from 'react'
import { Container } from '../components'
import PostForm from '../components/post-form/PostForm'


function AddPost() {
    return (
        <div className="min-h-screen flex flex-wrap content-center bg-gray-400">
            <Container>
                <PostForm />
            </Container>
        </div>
    )
}

export default AddPost