import React, { useEffect, useState } from 'react'
import ApiCreate from './ApiCreate'
import axios from 'axios'
import '../../app.css'

function Form_product_create({onClearId}) {
  const [Categories, setCategories] = useState([])
  const [FormCreate, setFormCreate] = useState({
    'name': '',
    'price': 0,
    'promotion': false,
    'price_promotion': 0,
    'stock_quantity': 0,
    'category_id': 1,
  })

  useEffect(() => {
    const GetCategories = async () => {
      try{
          const response = await axios.get('http://localhost:8000/returncategories/')
          setCategories(response.data.categories)
      }catch(error){
          console.log(error)
          return{message: 'Houve um error no servidor, tente novamente.', code: 500}
      }
  }

  GetCategories()
  }, [])

  const handleSubmit = async (event) => {
    try{
      event.preventDefault()
      const response = await ApiCreate.Create(FormCreate)
      if(response.error){
        for(const campo in response.error){
          alert(`${response.error[campo][0]}`)
          return;
        }
      }
      alert('Produto cadastrado com sucesso!')
      onClearId()
      setFormCreate({
        'name': '',
        'price': 0,
        'promotion': false,
        'price_promotion': 0,
        'stock_quantity': 0,
        'category_id': 1,
      })
    }catch(error){
      console.log(error)
    }
  }

  return (
    <>
        <form className="form_update" onSubmit={handleSubmit}>
          <div className="div_form_update_contein_1">
            <input
            type="text"
            name="name"
            placeholder='Nome do produto'
            value={FormCreate.name}
            onChange={(e) => setFormCreate({...FormCreate, name: e.target.value})}/>

            <input
            type="number"
            name="price"
            value={FormCreate.price}
            onChange={(e) => setFormCreate({...FormCreate, price: Number.parseFloat(e.target.value)})}/>

            <label htmlFor=""> 
            Produto em Promoção?
              <input
              type="checkbox"
              name="promotion"
              id="promotion"
              checked={FormCreate.promotion}
              onChange={(e) => setFormCreate({...FormCreate, promotion: e.target.checked})}/>
            </label>
          </div>

          <div className="div_form_update_contein_2">
            <input 
            type="number" 
            name="price_promotion"
            value={FormCreate.price_promotion}
            onChange={(e) => setFormCreate({...FormCreate, price_promotion: Number.parseFloat(e.target.value)})}/>

            <input 
            type="number" 
            name="quantity"
            value={FormCreate.stock_quantity}
            onChange={(e) => setFormCreate({...FormCreate, stock_quantity: Number.parseInt(e.target.value)})}/>

            <label htmlFor="">
              Categoria?
              <select
              value={FormCreate.category_id}
              onChange={(e) => setFormCreate({...FormCreate, category_id: Number.parseInt(e.target.value)})}>
                {Categories.filter(category => category.id !== undefined).map(category => (
                  <option key={category.id} value={category.id}>{category.name}</option>
                ))}
              </select>
            </label>
          </div>
          
          <div className="div_form_update_contein_buttons">
            <button type="submit">Cadastrar</button>
          </div>
        </form>
    </>
  )
}

export default Form_product_create