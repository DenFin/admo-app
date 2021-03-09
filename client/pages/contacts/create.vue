<template>
  <section class="pt-4 pb-4" style="position:relative;">
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
      <div v-if="fileUploadComplete" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 1rem; right: 1rem;">
        <div class="toast-header">
            <strong class="mr-auto">Added contact</strong>
            <small class="text-muted">Just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
           Datei erfolgreich hochgeladen.
        </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="col-sm-12">
                    <h1>Create new contact</h1>
                    <form action="">
                        <div class="form-group">
                            <label for="">First Name</label>
                            <input v-model="contact.firstname" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">Last Name</label>
                            <input v-model="contact.lastname" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">D.O.B.</label>
                            <input v-model="contact.dob" class="form-control" type="date">
                        </div>
                        <div class="form-group">
                            <label for="">Street</label>
                            <input v-model="contact.street" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">ZIP</label>
                            <input v-model="contact.zip" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">City</label>
                            <input v-model="contact.city" class="form-control" type="text">
                        </div>
                        <div class="custom-file mb-4">
                            <input @change="onFileChanged" type="file" class="custom-file-input" id="customFile">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                            <button @click="onUpload">Upload!</button>
                        </div>                        
                    </form>
                    <button class="btn btn-primary" @click="submit">Submit</button>
                    <button class="btn btn-secondary" @click="submitAndBack">Submit and back</button>
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
            contact: {
                firstname: '',
                lastname: '',
                dob: new Date(),
                street: '',
                zip: '',
                city: '',
                avatar: null
            },
            success: false,
            error: false,
            fileUploadComplete: false
        }
    },
    methods: {
        
        async submit(){
            const url = "http://localhost:8000/api/contacts";  
            console.log("submit")
            try {
                axios.post(url, this.contact)
                this.success = true

                setTimeout( () => {
                    this.success = false
                    console.log("TIMEOUT")
                }, 3000)

            } catch (error) {
                console.log(error)
                this.error = true
            }

        },
        async submitAndBack(){
            try {
                this.submit();
                this.$router.back()
            } catch (error) {
                console.log(error)
            }
        },
        onFileChanged(event){
            const file = event.target.files[0]
            this.contact.avatar = file
        },
        async onUpload(event){
            event.preventDefault()

            const url = 'http://localhost:8000/api/contacts/avatar/upload'
            const formData = new FormData();
            
            formData.append('file', this.contact.avatar);
                let data;
                await new Promise( async(resolve, reject) => {
                    try {
                       const res = await axios.post(url, formData, {
                            onUploadProgress: progressEvent => {
                                console.log(progressEvent.loaded / progressEvent.total)
                                if(progressEvent.loaded === progressEvent.total){
                                    this.fileUploadComplete = true
                                    setTimeout( () => {
                                        this.fileUploadComplete = false
                                        console.log("TIMEOUT")
                                    }, 3000)
                                }
                            }
                        })

                        data = res.data.file
                        resolve(data)

                    } catch (error) {
                        reject(error);
                    }
                })

                const filePath = `${data.destination}${data.filename}`
                this.contact.avatar = filePath
                console.log(data)
                console.log(filePath)

            
            
        }
    }
}
</script>

<style>

</style>