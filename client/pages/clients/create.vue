<template>
  <section class="pt-4 pb-4">
      <div v-if="success" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 1rem; right: 1rem;">
        <div class="toast-header">
            <strong class="mr-auto">Added contact</strong>
            <small class="text-muted">Just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
           A new contact was added successfully to the database.
        </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="col-sm-12">
                    <h1>Create new client</h1>
                    <form action="">
                        <div class="form-group">
                            <label for="">Name</label>
                            <input v-model="client.name" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">Street</label>
                            <input v-model="client.street" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">ZIP</label>
                            <input v-model="client.zip" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">City</label>
                            <input v-model="client.city" class="form-control" type="text">
                        </div>                        
                    </form>
                    <button class="btn btn-primary" @click="submit">Submit</button>
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
            client: {
                name: '',
                street: '',
                zip: '',
                city: ''
            },
            success: false,
            error: false
        }
    },
    methods: {
        
        async submit(){
            const url = "http://localhost:8000/api/clients";
            
            try {
                axios.post(url, this.client)
                this.success = true

                setTimeout( () => {
                    this.success = false
                    console.log("TIMEOUT")
                }, 3000)

            } catch (error) {
                console.log(error)
                this.error = true
            }
            console.log("submit")
            

        }
    }
}
</script>

<style>

</style>