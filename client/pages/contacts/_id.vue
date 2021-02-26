<template>
  <section>
    <div v-if="success" class="alert alert-success" role="alert">
        Änderungen gespeichert!
    </div>
    <div v-if="error" class="alert alert-danger" role="alert">
        Fehler aufgetreten!
    </div>
    <div class="jumbotron">
          <div class="container">
              <div class="row">
                  <div class="col-sm-12">
                     <h2 v-if="contact">{{ contact.firstname }} {{ contact.lastname }}</h2>
                  </div>
              </div>
          </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="col-sm-12">
                  
                  <table v-if="contact" class="table table-dark table-bordered table-">
                    <tr>
                        <th>Vorname</th>
                        <td><input v-model="contact.firstname" type="text"></td>
                    </tr>
                    <tr>
                    <th>Nachname</th>
                    <td><input v-model="contact.lastname" type="text"></td>
                    </tr>
                    <tr>
                    <th>Adresse</th>
                    <td><input v-model="contact.street" type="text"></td>
                    </tr>
                    <tr>
                    <th>DOB</th>
                    <td><input v-model="contact.dob" type="date"></td>
                    </tr>
                    <tr>
                    <th>PLZ</th>
                    <td><input v-model="contact.zip" type="text"></td>
                    </tr>
                    <tr>
                    <th>Stadt</th>
                    <td><input v-model="contact.city" type="text"></td>
                    </tr>
                </table>
                <div class="btn-group">
                    <nuxt-link class="btn btn-dark" to="/contacts">Back</nuxt-link>
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
            contact: null,
            nextBirthday: null,
            updatedcontact: {
                
            }
        }
    },
    methods: {
        input(e){
            console.log(e.target.innerText)
        },
        async save(){
            let id = this.$route.params.id
            const url = `http://localhost:8000/api/contacts/${id}`
            
            try {
                axios.patch(url, this.contact)
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
        const url = `http://localhost:8000/api/contacts/${id}`
        this.contact = await new Promise( async(resolve, reject) => {
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

