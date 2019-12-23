import React from 'react'

const Navigation=({onRoutchange,issignedin})=> {
    if(issignedin)
    {
        return (
        <nav style={{display:'flex',justifyContent:'flex-end'}}>
            <p
                onClick={()=> onRoutchange('signin')}
                className='f3 link dim black underline pa3 pointer'>Sign out</p>
        </nav>
        );
    }
    else
    {
        return (
            <nav style={{display:'flex',justifyContent:'flex-end'}}>
                <p
                    onClick={()=> onRoutchange('signin')}
                    className='f3 link dim black underline pa3 pointer'>Sign In
                </p>
                <p
                    onClick={()=> onRoutchange('register')}
                    className='f3 link dim black underline pa3 pointer'>Register
                </p>
                  
            </nav>
            )
    }
}

export default Navigation;
