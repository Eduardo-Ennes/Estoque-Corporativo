import React from 'react' 
import Header from './pages/header/Header'
import Form_product_update from './pages/form/Form_product_update'
import Form_product_create from './pages/form/Form_product_create'
import List from './pages/list/List'
import Login from './pages/Login'
import Card from './pages/card/Card'
import { useState } from 'react'    
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './app.css'

const App = () => {
    const [Permission , setPermission] = useState(true)
    const [selectedId, setSelectedId] = useState(null)
    const [ReloadList, setReloadList] = useState(true)
    // Função para "resetar" ReloadList para false após a atualização
    const changeReloadList = () => setReloadList(false)

    // Função para acionar o reload da lista
    const ReloadListDelete = () => setReloadList(true)

    /* ReloadList: Serve para quando fazermos uma atualização de um objeto a lista atualiza os dados.
    1 - No Form_product_update, quando atualizado o objeto, a função onClearId() é chamada para por o selectedId = null e o ReloadList = true. selectedId("usado para identificar o objeto que será atualizado.") e  ReloadList("Usamos apenas a sua mudança de estado para acionar o useEffect que aciona a API para buscar os dados da lista atualizados. Apenas a sua mudança de estado, true e false não interferem na lógica.")

    2 - Permission: para identificar se o admin está logado.
    */
    
    return (
        <Router>
            <Routes>
    
                {/* Página de login isolada */}
                <Route path="/login" element={<Login />} />
        
                {/* Página principal ("/") com lógica condicional */}
                <Route path="/" element={
                    <>
                        {Permission ? (
                            <div className='content'>
                                <div className='content-header'>
                                    <Header Permission={Permission} offPermission={() => setPermission(false)} />
                                </div>

                                <div className='content-form'>
                                {selectedId === null ? 
                                    <Form_product_create onClearId={() => setReloadList(true)}/>
                                :
                                    <Form_product_update selectedId={selectedId} onClearId={() => {    
                                    setSelectedId(null)
                                    setReloadList(true)
                                    }} />
                                }   
                                </div>

                                <div className='content-list'>
                                    <List 
                                    Permission={Permission} onSelectId={(id) => setSelectedId(id)} ReloadList={ReloadList} changeReloadList={changeReloadList}
                                    ReloadListDelete={ReloadListDelete}/>
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
                                    <List Permission={Permission}/>
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