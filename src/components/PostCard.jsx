import React from 'react'
import service from '../appwrite/conf'
import { Link } from 'react-router-dom'

// PostCard.jsx
function PostCard({ $id, title, featuredimage }) {
    return (
        <Link to={`/post/${$id}`}>
            <div className='p-4 rounded-xl w-full bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100'>
                <div className='w-full justify-center mb-4'>
                    <div className='w-full justify-center mb-4'>
                        {featuredimage ? (
                            <img
                                src={service.getfilepreview(featuredimage)}
                                alt={title}
                                className='rounded-xl w-full object-cover aspect-video'
                            />
                        ) : (
                            <div className="bg-gray-100 h-40 flex items-center justify-center rounded-xl">
                                <span className="text-gray-400">No Image</span>
                            </div>
                        )}
                    </div>
                    <h2 className='text-xl font-bold text-gray-800'>{title}</h2>
                </div>
            </div>
        </Link>
    )
}
export default PostCard