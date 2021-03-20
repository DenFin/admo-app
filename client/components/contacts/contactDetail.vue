<template>
  <section class="section-contact-detail">
      <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <div class="contact"  v-if="contact" >
                        <figure class="contact__avatar">
                        <img v-if="contact.avatar" :src="'http://localhost:8000/' + contact.avatar" alt="">
                        <div v-else>
                            <input @change="onFileChanged" type="file" class="custom-file-input" id="customFile">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                            <button @click="onUpload">Upload!</button>
                        </div>
                    </figure>
                    <h1>{{contact.firstname}} {{contact.lastname}}</h1>

                    <table class="table table-dark table-bordered table-">
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
        </div>
  </section>
</template>

<script>
import axios from "axios";
 
export default {
    name: 'contactDetail',
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
        onFileChanged(event){
            console.log("ON CHANGE")
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
                const data = res.data.data.contact;
                
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
.contact__avatar
    border-radius: 50%
    width: 200px
    height: 200px
    overflow: hidden

    img
        max-width: 100%
        width: 100%
        height: 100%
        object-fit: cover
</style>