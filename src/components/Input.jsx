import React, { useId } from 'react'
//NEED TO LOOK ONCE AND TAKE CHAT GPT HELP ALSO



const Input = React.forwardRef(function Input({
    label,
    type = 'text', //By default value
    className = '',
    ...props
}, ref) {
    const id = useId()
    return (
        <div className='w-full'>
            {label && <label
                className='inline-block mb-1 pl-1'
                htmlFor={id}>
                {label}
            </label>
            }
            <input
                type={type}
                className={`px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 duration-200 border border-gray-200 w-full ${className}`} // class name ka syntax hai so pls remeber it 
                ref={ref}
                {...props}
                id={id}
            />
        </div>
    )
})



export default Input