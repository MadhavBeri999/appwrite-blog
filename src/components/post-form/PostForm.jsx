import React, { useState, useEffect, useCallback } from 'react'
import { useForm } from 'react-hook-form'
import Button from '../Button'
import RTE from '../RTE'
import Select from '../Select'
import Input from '../Input'
import service from '../../appwrite/conf'//kyunki data toh app write ko hii bhejna hai 
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

function PostForm({ post }) {
    const [previewUrl, setPreviewUrl] = useState(null)

    useEffect(() => {
        async function fetchPreview() {
            if (post?.featuredimage) {
                try {
                    console.log("Fetching preview for fileId:", post.featuredimage)
                    const url = service.getfilepreview(post.featuredimage)

                    console.log("Preview URL received:", url)
                    setPreviewUrl(url)
                } catch (error) {
                    console.log("Error fetching preview URL:", error)
                    setPreviewUrl(null) // fallback so broken img doesn't render
                }
            } else {
                console.log("No featuredimage found on post for preview")
                setPreviewUrl(null)
            }
        }
        fetchPreview()
    }, [post?.featuredimage])

    const navigate = useNavigate()
    const userData = useSelector(state => state.auth.userData)

    const userId = userData?.$id   // ✅ STEP 1: correct userId

    console.log("Redux userData:", userData)
    console.log("USER ID:", userId)

    const { register, handleSubmit, watch, setValue, control, getValues } = useForm(
        {
            defaultValues: {
                title: post?.title || '',
                slug: post?.slug || '',
                content: post?.content || '',
                status: post?.status || 'active',
            },
        }
    )

    if (!userData) {
        console.log("User not logged in")
        return null
    }

    //YAHAN PAR DO SCENARIO HAI KI AGR POST HAI YAAN TOH NAHI HOGA POST
    const submit = async (data) => {

        console.log("FORM SUBMITTED", data)

        // ✅ STEP 2: image validation for new post
        if (!post && (!data.image || data.image.length === 0)) {
            alert("Featured image is required")
            return
        }

        if (post) {
            const file = data.image?.[0]
                ? await service.fileupload(data.image[0])
                : null

            //file delete bhi toh karani padegi
            if (file) {
                await service.deletefile(post.featuredimage)
            }

            const dbPost = await service.updatepost(post.$id, {
                ...data,
                featuredimage: file ? file.$id : post.featuredimage, // ✅ FIXED
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }

        } else {
            // ✅ STEP 3: upload image first
            const file = await service.fileupload(data.image[0])

            if (!file) {
                throw new Error("File upload failed")
            }

            const fileId = file.$id
            console.log("FILE ID:", fileId)
            console.log("userId being sent to createpost:", userId)

            // ✅ STEP 4: correct payload for Appwrite
            const dbPost = await service.createpost({
                title: data.title,
                slug: data.slug,
                content: data.content,
                status: data.status,
                featuredimage: fileId, // 🔥 REQUIRED (correct name)
                userId: userId          // 🔥 REQUIRED
            })

            if (dbPost) {
                navigate(`/post/${dbPost.$id}`)
            }
        }
    }

    const slugTransform = useCallback((value) => {
        if (typeof value === "string") {
            return value
                .toLowerCase()
                .trim()
                .replace(/[^a-z0-9\s-]/g, "")
                .replace(/\s+/g, "-")
                .replace(/-+/g, "-")
        }
        return ""
    }, [])

    React.useEffect(() => {
        const subscription = watch((value, { name }) => {
            if (name === 'title') {
                setValue(
                    'slug',
                    slugTransform(value.title),
                    { shouldValidate: true }
                )
            }
        })

        return () => subscription.unsubscribe()
    }, [watch, slugTransform, setValue])

    return (
        <form onSubmit={handleSubmit(submit)} className="flex flex-wrap">

            <div className="w-2/3 px-2">
                <Input
                    label="Title :"
                    placeholder="Title"
                    className="mb-4"
                    {...register("title", { required: true })}
                />

                <Input
                    label="Slug :"
                    placeholder="Slug"
                    className="mb-4"
                    {...register("slug", { required: true })}
                    onInput={(e) => {
                        setValue(
                            "slug",
                            slugTransform(e.currentTarget.value),
                            { shouldValidate: true }
                        )
                    }}
                />

                <RTE
                    label="Content :"
                    name="content"
                    control={control}
                    defaultValue={getValues("content")}
                />
            </div>

            <div className="w-1/3 px-2">
                <Input
                    label="Featured Image :"
                    type="file"
                    className="mb-4"
                    accept="image/png, image/jpg, image/jpeg, image/gif"
                    {...register("image")}
                />
                {previewUrl ? (
                    <div className="w-full mb-4">
                        <img
                            src={previewUrl}
                            alt={post?.title}
                            className="rounded-lg"
                        />
                    </div>
                ) : (
                    <p className="text-center text-sm text-gray-500">
                        {post?.featuredimage ? "Loading image preview..." : "No image to preview"}
                    </p>
                )}

                <Select
                    options={["active", "inactive"]}
                    label="Status"
                    className="mb-4"
                    {...register("status", { required: true })}
                />

                <Button
                    type="submit"
                    bgColor={post ? "bg-green-500" : undefined}
                    className="w-full"
                >
                    {post ? "Update" : "Submit"}
                </Button>
            </div>
        </form>
    )
}

export default PostForm
