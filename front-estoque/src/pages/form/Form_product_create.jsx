import React from 'react'
import '../../app.css'

function Form_product_create() {
  return (
    <>
        <form className="form_update">
          <div className="div_form_update_contein_1">
            <input
            type="text"
            name="name"
            placeholder='Nome do produto'/>

            <input
            type="number"
            name="price"
            placeholder='Preço do produto: R$'/>

            <label htmlFor=""> 
            Produto em Promoção?
              <input
              type="checkbox"
              name="promotion"
              id="promotion"/>
            </label>
          </div>

          <div className="div_form_update_contein_2">
            <input 
            type="number" 
            name="price_promotion"
            placeholder='Preço do produto em promoção: R$'/>

            <input 
            type="number" 
            name="quantity"
            placeholder='Quantidade em estoque'/>

            <label htmlFor="">
              Categoria?
              <select>
                <option value="1">OI</option>
                <option value="1">OLÁ</option>
                <option value="1">HELLO</option>
              </select>
            </label>
          </div>
          
          <div className="div_form_update_contein_buttons">
            <button>Cadastrar</button>
          </div>
        </form>
    </>
  )
}

export default Form_product_create