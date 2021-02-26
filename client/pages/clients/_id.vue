<template>
  <section>
    <div v-if="success" class="alert alert-success" role="alert">
        A simple success alert—check it out!
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
        A simple danger alert—check it out!
    </div>
      <div class="container">
          <div class="row">
              <div class="col-sm-12">
                  <h1>Client</h1>
                  <table v-if="client" class="table table-dark table-bordered table-">
                    <tr>
                    <th>Kunde</th>
                    <td><input v-model="client.name" type="text"></td>
                    </tr>
                    <tr>
                    <th>Adresse</th>
                    <td><input v-model="client.street" type="text"></td>
                    </tr>
                    <tr>
                    <th>PLZ</th>
                    <td><input v-model="client.zip" type="text"></td>
                    </tr>
                    <tr>
                    <th>Stadt</th>
                    <td><input v-model="client.city" type="text"></td>
                    </tr>
                </table>
                <nuxt-link class="btn btn-primary" to="/clients">Back</nuxt-link>
                <button @click="save" class="btn btn-primary">Save</button>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import axios from "axios"
export default {
    data(){
        return{
            error: false,
            success: false,
            client: null,
            updatedClient: {
                
            }
        }
    },
    methods: {
        input(e){
            console.log(e.target.innerText)
        },
        async save(){
            let id = this.$route.params.id
            const url = `http://localhost:8000/api/clients/${id}`
            
            try {
                axios.patch(url, this.client)
                this.success = true
                setTimeout( () => { 
                    console.log("TIMEOUT")
                    this.success = false 
                    }, 3000);
            } catch (error) {
                this.error = true
            }
        }
    },
    async created(){
        let id = this.$route.params.id
        const url = `http://localhost:8000/api/clients/${id}`
        this.client = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                
                console.log(data)
                JSON.stringify(data)
                resolve(data);
            } catch(error){
                
                // this.errorMessage = error
                reject(error);
            }
            
        })
    },
}
</script>

<style lang="sass">
table
    table-layout: fixed
td
    position: relative
    input
        color: #fff
        position: absolute
        top: 0
        left: 0
        right: 0
        bottom: 0
        background: transparent
        width: 100%
        border: none

</style>