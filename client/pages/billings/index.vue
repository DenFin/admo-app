<template>
  <section class="pb-4">
      <div class="jumbotron">
          <div class="container">
              <div class="row">
                  <div class="col-sm-12">
                      <h1>Billings</h1>
                  </div>
              </div>
          </div>
      </div>
    <div class="container">
        <div class="row">
            <div class="col-sm-12 col-md-6">
                
                 <div class="form-group">
                    <input placeholder="Search a billing by name" v-model="searchTerm" v-on:input="change" type="text" class="form-control">
                </div>
            </div>
            <div class="col-sm-12 col-md-6 d-flex align-items-end">
                <nuxt-link to="billings/create" class="btn btn-primary mb-3">Add billing</nuxt-link>
            </div>
        </div>
        <div class="row">
            <div class="col-sm-12">
                <div>
                    <table class="table table-dark table-bordered table-sm table-condensed">
                    <thead>
                        <th>Nr.</th>
                        <th>Bezeichnung</th>
                        <th>Rechnungsdatum</th>
                        <th>Zahlungseingang</th>
                        <th>Brutto</th>
                        <th>Netto</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-bind:key="billing.name" v-for="billing in billings">
                            <td><nuxt-link :to="`/billings/${billing._id}`">{{ billing.nr }}</nuxt-link></td>
                            <td>{{ billing.title }}</td>
                            <td>{{ billing.date }}</td>
                            <td>{{ billing.zip }}</td>
                            <td align="right">{{ billing.billingTotal }} €</td>
                            <td align="right">{{ billing.billingTotalWithTaxes }} €</td>
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
            billings: [],
            billingsDue: []
        }
    },
    methods: {
       async formatDate(){
            await this.billings.forEach(billing =>{
                let date = new Date(billing.date)
                let day = date.getDate();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                month = date.toLocaleString('default', { month: 'long' });
                billing.date = `${day}. ${month} ${year}`
            })  
        },
    },
    async created(){
       
       const url = 'http://localhost:8000/api/billings'
        this.billings = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data.data;
                JSON.stringify(data)
                resolve(data);
            } catch(error){
                // this.error = true
                // this.errorMessage = error
                reject(error);
            }
        })
        this.formatDate()

        this.billingsDue = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data.billingsDue;
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
        // filteredList: function() {
        //     console.log("AM FILTERING")
        //     return this.billings.filter(billing => {
        //         return billing.name.toLowerCase().includes(this.searchTerm.toLowerCase())
        //     })
        // }
    }
}
</script>

<style>

</style>