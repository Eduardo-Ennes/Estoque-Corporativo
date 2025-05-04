import React, { useEffect, useState } from 'react'
import ApiGet from './ApiGet'
import ApiCard from './ApiAddCard'
import axios from 'axios'
import '../../app.css'

function List({Permission, onSelectId, ReloadList, changeReloadList, ReloadListDelete, OnReloadCard}) {

  const [Products, setProducts] = useState([])
  const [Categories, setCategories] = useState([])

  const [IdCategory, setIdCategory] = useState(0)
  const [NameSearch, setNameSearch] = useState('')

  useEffect(() => {
    const FetchApiGet = async () => {
      try{
        const response = await ApiGet.getProducts()
        setProducts(response)
        changeReloadList()
      }catch(err){
        console.log(err)
      }
    }
    FetchApiGet()
  }, [ReloadList])

  useEffect(() => {
    const ApiGetCategories = async () => {
      try{
        const response = await axios.get('http://localhost:8000/returncategories/')
        setCategories(response.data.categories)
      }catch(err){
        console.log(err)
      }
    }
    ApiGetCategories()
  }, [])

  const handleSubmitUpdate = (event, id) => {
    try{
      onSelectId(id)
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (event, id) => {
    try{
      event.preventDefault()
      const confirmation = confirm("Tem certeza que deseja excluir este produto?")
      if(confirmation === false){
        return;
      }
      const response = await axios.delete(`http://localhost:8000/products/${id}/`)
      alert(response.data.message)
      ReloadListDelete()
    }catch(error){
      console.log(error)
    }
  }

  const handleCard = async (event, pk, qtd=1) => {
    // Função para adicionar um item aocarrinho
    try{
      event.preventDefault()
      const response = await ApiCard.AddCard(pk, qtd)
      console.log(response)
      OnReloadCard()
    }catch(error){
      console.log(error)
    }
  } 

  const handleSearch = async(event, id, name) => {
    try{
      event.preventDefault()
      if(name === '' || name === ' '){
        alert('O campo de busca não pode ser enviado em branco!')
        return;
      }
      console.log(id, name)
      const response = await axios.get(`http://localhost:8000/search/${id}/${name}/`)
      setProducts(response.data)
    }catch(error){
      console.log(error)
    }
  }

  const handleResetCard = async(event) => {
    try{
      const card = localStorage.getItem('card')
      const price = localStorage.getItem('price')
      if(card != null && price != null){
        setTimeout(() => {
          localStorage.clear()
        }, 2000)
        OnReloadCard()
      }else{
        alert('Você não possui itens no carrinho!')
        return;
      }
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
      <nav className='nav-search'>
        <select 
        name="select" 
        className='select'
        value={IdCategory}
        onChange={(e) => (setIdCategory(e.target.value))}>
          {Categories.map(categories => (
            <option key={categories.id} value={categories.id}>{categories.name}</option>
          ))}
        </select>

        <div className='div-search-position'>
          <input 
          type="text" 
          className='search' 
          placeholder='Buscar produto'
          value={NameSearch}
          onChange={(e) => setNameSearch(e.target.value)}/>
          <button 
          type='button' 
          className='button_icon-search'
          onClick={(e) => handleSearch(e, IdCategory, NameSearch.trim())}><span className="material-icons">search</span></button>
        </div>

        <button type='button' onClick={(e) => handleResetCard(e)} className='Reset_Card'>X</button>
      </nav>

      
      {Permission ? 
        <>
          <div className='div-table-position-fixed'>
            {Products.length > 0 ? (
              <table className='table'>
                <thead className='thead-list-fixed'>
                  <tr className='tr-table'>
                    <th className='list-th-size-name'>Nome do produto</th>
                    <th>preço</th>
                    <th>Pro</th>
                    <th>Preço.P</th>
                    <th>Categoria</th>
                    <th>Qtd</th>
                    <th>Ação</th>
                  </tr>
                </thead>

                <tbody>
                  {Products.map(product => (
                    <tr key={product.id} className='tr-table'>
                        <td title={product.name} className='list-td-name-product'>{product.name}</td>
                        <td>R${product.price}</td>
                        <td className='td-position-promotion'>{product.promotion? 'Sim' : 'Não'}</td> 
                        <td>R${product.price_promotion}</td>
                        <td>{product.category.name}</td>
                        <td>{product.stock_quantity}</td>
                        <td className='td-position-button'>
                          <button onClick={(e) => handleSubmitUpdate(e, product.id)}>&#128221;</button>
                          <button type='button' onClick={(e) => handleDelete(e, product.id)}>&#10060;</button>
                          <button type='button' onClick={(e) => handleCard(e, product.id)}>&#128722;</button>
                        </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            ):(
              <h1 className='H1-title-list-empty'>Produto Não encontrado!</h1>
            )}
          </div>
        </>
      :
        <>
        <div className='div-table-position-fixed-false'>
          {Products.length > 0 ? ( 
            <table className='table'>
              <thead className='thead-list-fixed'>
                <tr className='tr-table'>
                  <th className='list-th-size-name'>Nome do produto</th>
                  <th>preço</th>
                  <th>Pro</th>
                  <th>Preço.P</th>
                  <th>Categoria</th>
                  <th>Qtd</th>
                  <th>Ação</th>
                </tr>
              </thead>

              <tbody>
              {Products.map(product =>(
                    <tr key={product.id} className='tr-table'>
                        <td title={product.name} className='list-td-name-product'>{product.name}</td>
                        <td>R${product.price}</td>
                        <td className='td-position-promotion'>{product.promotion? 'Sim' : 'Não'}</td> 
                        <td>R${product.price_promotion}</td>
                        <td>{product.category.name}</td>
                        <td>{product.stock_quantity}</td>
                        <td className='td-position-button'>
                          <button type='button' onClick={(e) => handleCard(e, product.id)}>&#128722;</button>
                        </td>
                    </tr>
                  ))}
              </tbody>
            </table>
            
            ):(
              <h1 className='H1-title-list-empty'>Produto Não encontrado!</h1>
            )}
          </div>
        </>
      }
        
    </>
  )
}

export default List