import {React, useState} from 'react'
import "../../app.css"

function Form_product({onClearId}) {

  const [IdTeste, setIdTeste] = useState(1)

  const [FormData, setFormData] = useState({
    'name': '',
    'price': 0,
    'promotion': true,
    'price_promotion': 0,
    'quantity': 0,
    'category': '',
  })

  
  const handleSubimit = (event) => {
    try{
      event.preventDefault()
      const form = FormData
      console.log('*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*=*')
      console.log('Formulário: ', form)
    }catch(err){
      console.log(err)
    }
  }


  return (
    <>
      {!IdTeste ? (
        <button>Cadastrar</button>
      ):(
        <>
          <form className="form_update" onSubmit={handleSubimit}>
            <div className="div_form_update_contein_1">
              <input
              type="text"
              name="name"
              value={FormData.name}
              onChange={(e) => setFormData({...FormData, name: e.target.value})}
              placeholder="Nome do produto"/>

              <input
              type="number"
              name="price"
              onChange={(e) => setFormData({...FormData, price: e.target.value})}
              value={FormData.price}
              placeholder="Valor do produto"/>

              <label htmlFor=""> 
              Produto em Promoção?
                <input
                type="checkbox"
                name="promotion"
                checked={FormData.promotion}
                onChange={(e) => setFormData({...FormData, promotion: e.target.checked})}
                id="promotion"
                />
                
              </label>
            </div>

            <div className="div_form_update_contein_2">
              <input 
              type="number" 
              name="price_promotion"
              value={FormData.price_promotion}
              onChange={(e) => setFormData({...FormData, price_promotion: e.target.value})}
              placeholder="Valor do produto em promoção"/>

              <input 
              type="number" 
              name="quantity"
              onChange={(e) => setFormData({...FormData, quantity: e.target.value})}
              value={FormData.quantity}
              placeholder="Quantidade em estoque"/>

              <label htmlFor="">
                Categoria?
                <select 
                name="category"
                value={FormData.category}
                onChange={(e) => setFormData({...FormData, category: e.target.value})}
                >
                  <option value="1">Fluminense</option>
                  <option value="2">Barcelona</option>
                  <option value="3">Chelsea</option>
                  <option value="4">Coimbra</option>
                </select>
              </label>
            </div>
            
            <div className="div_form_update_contein_buttons">
              <button type="submit">Atualizar</button>
              <button onClick={onClearId}>Cadastrar</button>
            </div>
          </form>
        </>
      )}
    </>
  )
}

export default Form_product