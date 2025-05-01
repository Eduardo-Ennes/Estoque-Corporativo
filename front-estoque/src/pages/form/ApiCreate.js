import axios from 'axios'

class CreateForm{
    async Create(form){
        try{
            const response = await axios.post('http://localhost:8000/products/', form)
            return response.data
        }catch(error){
            console.log(error)
            return {
                error: error.response.data, 
                status: error.response.status
            }
        }
    }
}

export default new CreateForm()