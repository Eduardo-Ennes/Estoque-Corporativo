import React from 'react'
import { Link } from 'react-router-dom'

function Header({Permission, offPermission}) {
  // console.log('Permission Header - ', Permission) 

  return (
    <>
      <h1 className='Title-Header'>Nome da Loja</h1>
      {Permission ?
        <>
          <button onClick={offPermission} className='Logout-Button'>Logout</button>
        </>
      :
        <>
          <Link to='/login' className='Login-Button'>Login</Link>
        </>
      }
    </>
  )
}

export default Header