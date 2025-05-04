import axios from 'axios'

class OperationLowerCard{
    async LowerCard(pk, qtd){
        try{
            const stotage_card = localStorage.getItem('card') 
            const storage_price = localStorage.getItem('price') 
            if(stotage_card != null && storage_price != null){
                const card = await JSON.parse(stotage_card)
                const price = await JSON.parse(storage_price)
                const data = [card, price]
                const response = await axios.put(`http://localhost:8000/lowerproduct/${pk}/`, data)
                const response_set_storage = await this.set_Lower_Local_Storage(response.data[0], response.data[1], )
                return response_set_storage.message
            }else{
                return{message: 'Houve um error ao criar no LocalStorage!'}
            }
        }catch(error){
            console.log(error)
        }
    }

    async set_Lower_Local_Storage(card, price){
        localStorage.setItem('card', JSON.stringify(card))
        localStorage.setItem('price', JSON.stringify(price))
        return{message: 'ok'}
    }
}

export default new OperationLowerCard()