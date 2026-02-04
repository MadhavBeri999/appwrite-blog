import React from 'react'
import { Editor } from '@tinymce/tinymce-react'
import { Controller } from 'react-hook-form'//forward ref waala kam hi hoyega ismein

export default function RTE({ name, control, label, defaultValue = '' }) {
    return (
        <>
            <div className='w-full'>
                {label && <label className='inline-block mb-1 pl-1 '>{label}
                </label>}
                <Controller
                    name={name || 'content'}
                    control={control}
                    render={({ field: { onChange } }) => (
                        <Editor
                            apiKey='kzt7j54qgz5kw5ok4rc6o2qamjg1x96sijso2m3da3qffxos'
                            init={{
                                plugins: [
                                    "image",
                                    "advlist",
                                    "autolink",
                                    "lists",
                                    "link",
                                    "image",
                                    "charmap",
                                    "preview",
                                    "anchor",
                                    "searchreplace",
                                    "visualblocks",
                                    "code",
                                    "fullscreen",
                                    "insertdatetime",
                                    "media",
                                    "table",
                                    "code",
                                    "help",
                                    "wordcount",
                                    "anchor",
                                ],
                                toolbar:
                                    "undo redo | blocks | image | bold italic forecolor | alignleft aligncenter bold italic forecolor | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent |removeformat | help",
                                content_style: "body { font-family:Helvetica,Arial,sans-serif; font-size:14px }"
                            }}
                            initialValue="Welcome to TinyMCE!"
                        />

                    )}//tabhi render hoyega jab kuch change haoyega because we have set the value to be on change

                />
            </div>
        </>
    )
}

