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

    async PutUpdate(id, form_updated){
        console.log('REQUISIÇÃO PUT')
        console.log(id)
        console.log(form_updated)
        // try{
        //     const response = await axios.put(`http://localhost:8000/products/${id}/`, form_updated)
        //     console.log('REQUISIÇÃO PUT')
        // }catch(error){
        //     console.log(error)
        //     return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        // }
    }

    async PatchUpdate(id, form_updated){
        console.log('REQUISIÇÃO PATCH')
        try{
            const response = await axios.patch(`http://localhost:8000/products/${id}/`, form_updated)
            console.log('REQUISIÇÃO PATCH')
        }catch(error){
            console.log(error)
            return {error: 'Houve um error no servidor, tente novamente.', status: 500}
        }
    }

    async ApiPutAndPatchUpdated(form_api, form_updated){
        const object_to_api = this.ObjectPutOrPatch(form_api, form_updated, 'patch')
        const object_to_api_legth = Object.keys(object_to_api).length
        console.log('OBJETO', object_to_api)
        if(object_to_api_legth >= 1 && object_to_api_legth < 6){
            try{
                const response = await this.PatchUpdate(form_api['id'], object_to_api)
            }catch(error){
                console.log(error)
                return {error: 'Houve um error no servidor, tente novamente.', status: 500}
            }
        }
    }

    ObjectPutOrPatch(form_api, form_updated, method){
        if(method === 'patch'){
            try{
                const object_partial_fields = {}
                for(const key in form_updated){
                    if(form_updated['promotion'] === true){
                        if(form_updated[key] === form_api['promotion']){
                            object_partial_fields[key] = form_api[key]
                        }
                        else if(form_updated[key] === form_api['price']){
                            object_partial_fields[key] = Number.parseFloat(form_api['price'])
                        }
                        else if(form_updated[key] === form_api['price_promotion']){
                            object_partial_fields[key] = Number.parseFloat(form_api['price_promotion'])
                        }
                        else if(form_updated[key] != form_api[key]){
                            object_partial_fields[key] = form_updated[key]
                        }
                    }
                    else{
                        if(form_updated[key] != form_api[key]){
                            object_partial_fields[key] = form_updated[key]
                        }
                    }
                }

                return object_partial_fields
            }catch(error){
                console.log(error)
                return {error: 'Houve um error no servidor, tente novamente.', status: 500}
            }
        }
    }
}

export default new ApiRetriverUpdated()