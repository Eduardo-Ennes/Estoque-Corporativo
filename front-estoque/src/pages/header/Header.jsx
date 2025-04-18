import React from 'react'
import { useState } from 'react'
import { Link, Outlet } from 'react-router-dom'

function Header({Permission}) {
  console.log(Permission)
  const [Logado, setLogado] = useState(Permission)
  return (
    <>
      <h1>Eduardo Zanelato</h1>
      {Logado == false ?
        <>
          <Link to='/login'>Login de Administrador</Link>
        </>
      :
        <>
          <button>Logout</button>
        </>
      }
    </>
  )
}

export default Header