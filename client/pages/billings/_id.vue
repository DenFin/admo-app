<template>
  <section>
    <div v-if="success" class="alert alert-success" role="alert">
        Änderungen gespeichert
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
        Ein Fehler ist aufgetreten!
    </div>
    <div class="jumbotron">
          <div class="container">
              <div class="row">
                  <div class="col-sm-12">
                     <h2 v-if="billing">{{ billing.nr }} {{ billing.title }}</h2>
                  </div>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="col-sm-12">
                  <table v-if="billing" class="table table-dark table-bordered table-">
                    <tr>
                    <th>Rechnungsnummer</th>
                    <td><input v-model="billing.nr" type="text"></td>
                    </tr>
                    <tr>
                    <th>Titel</th>
                    <td><input v-model="billing.title" type="text"></td>
                    </tr>
                    <tr>
                    <th>Brutto</th>
                    <td><input v-model="billing.billingTotal" type="text"></td>
                    </tr>
                    <tr>
                    <th>Netto</th>
                    <td><input v-model="billing.billingTotalWithTaxes" type="text"></td>
                    </tr>
                </table>
                <table v-if="billing" class="table table-dark table-bordered table-">
                    <thead>
                        <th>Position</th>
                        <th>Tätigkeit</th>
                        <th>Einzelpreis</th>
                        <th>Faktor</th>
                        <th>Gesamt</th>
                    </thead>
                    <tr v-bind:key="row.id" v-for="row in billing.items">
                        <th>{{ row.nr }}</th>
                        <td>{{ row.description }}</td>
                        <td>{{ row.hourlyRate }}</td>
                        <td>{{ row.factor }}</td>
                        <td>{{ row.total }}</td>
                    </tr>
                </table>
                <div class="btn-group">
                    <nuxt-link class="btn btn-dark" to="/billings">Back</nuxt-link>
                    <button @click="save" class="btn btn-success">Save</button>
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
            error: false,
            success: false,
            billing: null,
            updatedbilling: {
                
            }
        }
    },
    methods: {
        input(e){
            console.log(e.target.innerText)
        },
        async save(){
            let id = this.$route.params.id
            const url = `http://localhost:8000/api/billings/${id}`
            
            try {
                axios.patch(url, this.billing)
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
        const url = `http://localhost:8000/api/billings/${id}`
        this.billing = await new Promise( async(resolve, reject) => {
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

        this.billing.items = JSON.parse(this.billing.items)
        
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