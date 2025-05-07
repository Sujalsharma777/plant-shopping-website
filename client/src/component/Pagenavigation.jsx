import React from 'react'
import { NavLink } from 'react-router'

const Pagenavigation = ({ title }) => {
    return (
        <div className='text-lg font-normal flex justify-items-start items-center m-5'>
            <NavLink to="/">Home</NavLink>/ <span className='underline  font-medium '>{title}</span>
        </div>
    )
}

export default Pagenavigation