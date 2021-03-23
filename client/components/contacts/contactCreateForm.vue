<template>
    <section class="panel pb-5">
        <alertSuccess :success="success"></alertSuccess>
        <alertError :error="error"></alertError>
        <form action="">
            <div class="form-group">
                <label for="">Vorname</label>
                <input v-model="contact.firstname" class="form-control" type="text">
            </div>
            <div class="form-group">
                <label for="">Nachname</label>
                <input v-model="contact.lastname" class="form-control" type="text">
            </div>
            <div class="form-group">
                <label for="">Geburtsdatum</label>
                <input v-model="contact.dob" class="form-control" type="date">
            </div>
            <div class="form-group">
                <label for="">Straße</label>
                <input v-model="contact.street" class="form-control" type="text">
            </div>
            <div class="form-group">
                <label for="">PLZ</label>
                <input v-model="contact.zip" class="form-control" type="text">
            </div>
            <div class="form-group">
                <label for="">Stadt</label>
                <input v-model="contact.city" class="form-control" type="text">
            </div>
            <div class="form-group">
                <label for="">Kategorie</label>
                <select v-model="contact.category" class="form-control" name="" id="">
                    <option :value="null" disabled hidden>Bitte wähle eine Kategorie aus</option>
                    <option v-bind:key="category.name" v-for="category in contactCategories" v-bind:value="category.name">{{ category.name }}</option>
                </select>
            </div>
            <span>Profilbild</span>
            <div class="custom-file mb-4">
                <input @change="onFileChanged" type="file" class="custom-file-input" id="customFile">
                <label class="custom-file-label" for="customFile"><span v-if="filename" :v-model="filename">{{ filename }}</span><span v-else>Datei aussuchen</span></label>
                <button class="btn btn-primary btn-xl" @click="onUpload">Bild hochladen</button>
            </div>
            <div v-if="uploading" class="progress">
            <div class="progress-bar" role="progressbar" :style="`width: ${progress}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>                       
        </form>
        <div class="mt-5">
            <button class="btn btn-primary" @click="submit">Submit</button>
            <button class="btn btn-secondary" @click="submitAndBack">Submit and back</button>
        </div>
    </section>
</template>

<script>
import axios from "axios"
import * as ContactCategoryService from "./../../services/contacts/ContactCategoryService"

import alertSuccess from "./../alerts/alertSuccess"
import alertError from "./../alerts/alertError"

export default {
    name: 'contactCreateForm',
    components: {
        alertSuccess,
        alertError
    },
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
            filename: null,
            contactCategories: null,
            success: false,
            error: false,
            fileUploadComplete: false,
            uploading: false
        }
    },
    methods: {
        
        async submit(){
            const url = "http://localhost:8000/api/contacts";  
            console.log("submit")
            console.log(this.contact.avatar)
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
                                console.log(progressEvent)
                                this.uploading = true
                                let progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                                this.progress = progress
                                if(progressEvent.loaded === progressEvent.total){
                                    this.fileUploadComplete = true
                                    setTimeout( () => {
                                        this.fileUploadComplete = false
                                        this.uploading = false
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

                

            
            
        }
    },
    async fetch() {
        this.contactCategories = await ContactCategoryService.fetchContactCategories()
    }
}
</script>

<style>

</style>