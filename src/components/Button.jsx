

function Button(    //parameters  children = buttontext 
  { children,   /* ALL THESE RAE BY DEFAULT VALUES IF NOT 
                   GIVEN THEN USE THIS OR IF GIVEN THEN 
                                           USE THIS */
    bgColor = 'bg-blue-600',
    type = "button",
    textColor = 'text-white',
    className = '',
    ...props //anyother properties additional properties 
  }
) {
  return (
    <button className={`px-4 py-4 rounded-lg ${className} ${bgColor} ${textColor}`} {...props}>
      {children}
    </button>

  )
}

export default Button
//This i sa common button that will be used every where for the styling   
