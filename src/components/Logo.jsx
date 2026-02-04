import React from 'react'

import logoImg from '../LOGO.png'

function Logo({ width = '100px' }) {
    return (
        <div>
            <img src={logoImg} style={{ width }} alt="Logo" />
        </div>
    )
}

export default Logo