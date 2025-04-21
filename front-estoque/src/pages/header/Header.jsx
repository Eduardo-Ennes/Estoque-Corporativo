import React from 'react'
import { Link, Outlet } from 'react-router-dom'

function Header({Permission, offPermission, onPermission}) {
  console.log('Permission Header - ', Permission) 

  return (
    <>
      <h1>Eduardo Zanelato</h1>
      {Permission ?
        <>
          <button onClick={offPermission}>Logout</button>
        </>
      :
        <>
          {/* <Link to='/login'>Login de Administrador</Link> */}
          <button onClick={onPermission}>Login de administrador</button>
        </>
      }
    </>
  )
}

export default Header