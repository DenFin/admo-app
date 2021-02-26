<template>
  <section>
      <div class="jumbotron">
          <div class="container">
              <div class="row">
                  <div class="col-sm-12">
                      <h1>Clients</h1>
                  </div>
              </div>
          </div>
      </div>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                
                 <div class="form-group">
                    <input placeholder="Search a client by name" v-model="searchTerm" v-on:input="change" type="text" class="form-control">
                </div>
            </div>
            <div class="col-sm-12 col-md-6 d-flex align-items-end">
                <nuxt-link to="clients/create" class="btn btn-primary mb-3">Add client</nuxt-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div>
                    <table class="table table-dark table-bordered">
                    <thead>
                        <th>Name</th>
                        <th>Street</th>
                        <th>ZIP</th>
                        <th>City</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-bind:key="client.name" v-for="client in filteredList">
                            <td><nuxt-link :to="`/clients/${client._id}`">{{ client.name }}</nuxt-link></td>
                            <td>{{ client.street }}</td>
                            <td>{{ client.zip }}</td>
                            <td>{{ client.city }}</td>
                            <td><span class="i"></span></td>
                        </tr>
                    </tbody>
                </table>
                </div>
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
            searchTerm: '',
            clients: []
        }
    },
    methods: {
        change(){
            return this.clients.filter(client => {
                return client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        }
    },
    async created(){
       
       const url = 'http://localhost:8000/api/clients'
        this.clients = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                JSON.stringify(data)
                resolve(data);
            } catch(error){
                // this.error = true
                // this.errorMessage = error
                reject(error);
            }
        })
    },
    computed: {
        filteredList: function() {
            console.log("AM FILTERING")
            return this.clients.filter(client => {
                return client.name.toLowerCase().includes(this.searchTerm.toLowerCase())
            })
        }
    }
}
</script>

<style>

</style>