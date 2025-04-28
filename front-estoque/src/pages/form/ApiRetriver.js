import axios from 'axios'

class ApiRetriverUpdated{
    async Retriver(pk){
        try{
            const response = await axios.get(`http://localhost:8000/products/${pk}/`)
            return {data: response.data, status: 200}
        }catch(error){
            console.log(error)
            return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        }
    }

    async ApiPutAndPatchUpdated(form_api, form_updated){
        try{
            console.log('FEFE DO MERCADINHO')
        }catch(error){
            console.log(error)
            return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        }
    }
}

export default new ApiRetriverUpdated()