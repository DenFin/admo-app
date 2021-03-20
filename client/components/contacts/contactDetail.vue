<template>
  <section class="section-contact-detail">
      <div class="container" v-if="contact" >
            <div class="row">
                <div class="col-sm-12">
                    <div class="contact"  >
                    <figure v-if="contact.avatar" class="contact__avatar">
                        <img   :src="`http://localhost:8000/${contact.avatar}`" />
                    </figure>
                    <div>
                        <!-- <contactAvatarUpload :contact="contact"></contactAvatarUpload> -->
                        <div class="custom-file mb-4">
                            <input @change="onFileChanged" type="file" class="custom-file-input" id="customFile">
                            <label class="custom-file-label" for="customFile"><span v-if="filename" :v-model="filename">{{ filename }}</span><span v-else>Datei aussuchen</span></label>
                            <button class="btn btn-primary btn-xl" @click="onUpload">Bild hochladen</button>
                        </div>  
                    </div>
                    <pageHeadline v-if="contact" :headline="`${contact.firstname} ${contact.lastname}`"></pageHeadline>
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
import pageHeadline from "./../../components/global/pageHeadline"
import contactAvatarUpload from "./../../components/contacts/contactAvatarUpload"
import * as ContactService from "./../../services/contacts/ContactService"
 
export default {
    name: 'contactDetail',
    components: {
        pageHeadline,
        contactAvatarUpload
    },
    data(){
        return{
            error: false,
            success: false,
            contact: null,
            nextBirthday: null,
            updatedContact: {
                avatar: null
            },
            filename: null,
            contactCategories: null,
            success: false,
            error: false,
            fileUploadComplete: false
        }
    },
    methods: {
        input(e){
            console.log(e.target.innerText)
        },
        onFileChanged(event){
            console.log("ON CHANGE")
            
            const file = event.target.files[0]
            console.log(file)
            this.filename = file.name
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
                        const filePath = `${data.destination}${data.filename}`
                        this.contact.avatar = filePath
                        console.log("==========HERE========")
                        console.log(data)
                        console.log(filePath)
                        resolve(data)

                    } catch (error) {
                        reject(error);
                    }
                })  
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
    async fetch(){
        const id = this.$route.params.id
        const url = `http://localhost:8000/api/contacts/${id}`
        this.contact = await ContactService.fetchContactById(url)
        this.contact.avatar = this.contact.avatar.replace(/['"]+/g, '')
    }
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
