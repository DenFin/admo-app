<template>
    <section>
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
            <div class="form-group">
                <label for="">Kategorie</label>
                <select v-model="contact.category" class="form-control form-control-sm " name="" id="">
                    <option :value="null" disabled hidden>Bitte wähle eine Kategorie aus</option>
                    <option v-bind:key="category.name" v-for="category in contactCategories" v-bind:value="category.name">{{ category.name }}</option>
                </select>
            </div>
            <div class="custom-file mb-4">
                <input @change="onFileChanged" type="file" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile">Choose file</label>
                <button @click="onUpload">Upload!</button>
            </div>                        
        </form>
        <button class="btn btn-primary" @click="submit">Submit</button>
        <button class="btn btn-secondary" @click="submitAndBack">Submit and back</button>

  </section>
</template>

<script>
import axios from "axios"
import * as ContactCategoryService from "./../../services/contacts/ContactCategoryService"
export default {
    name: 'contactCreateForm',
    data(){
        return{
            contact: {
                firstname: '',
                lastname: '',
                dob: new Date(),
                street: '',
                zip: '',
                city: '',
                avatar: null,
                category: null
            },
            contactCategories: null,
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

            
            
        }
    },
    async fetch() {
        this.contactCategories = await ContactCategoryService.fetchContactCategories()
    }
}
</script>

<style>

</style>