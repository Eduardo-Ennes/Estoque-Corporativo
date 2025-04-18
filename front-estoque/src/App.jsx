import React from 'react' 
import Header from './pages/header/Header'
import Form from './pages/form/Form'
import List from './pages/list/List'
import Login from './pages/Login'
import Card from './pages/card/Card'
import { useState } from 'react'    
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.css'

const App = () => {
    const [Permission , setPermission] = useState(false)
    return (
        <Router>
            <Routes>
    
                {/* Página de login isolada */}
                <Route path="/login" element={<Login />} />
        
                {/* Página principal ("/") com lógica condicional */}
                <Route path="/" element={
                    <>
                        {Permission === true ? (
                            <div className='content'>
                                <div className='content-header'>
                                    <Header Permission={Permission}/>
                                </div>

                                <div className='content-form'>
                                    <Form />
                                </div>

                                <div className='content-list'>
                                    <List />
                                </div>

                                <div className='content-card'>
                                    <Card />
                                </div>
                            </div>
                        ):(
                            <div className='content-false'>
                                <div className='content-header-false'>
                                    <Header Permission={Permission}/>
                                </div>

                                <div className='content-list-false'>
                                    <List />
                                </div>

                                <div className='content-card'>
                                    <Card />
                                </div>
                            </div>
                        )}
                    </>   
                } />
            </Routes>
        </Router>
    )
}

export default App