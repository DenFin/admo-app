<template>
    <section>
        <input @change="onFileChanged" type="file" class="custom-file-input" id="customFile">
        <label class="custom-file-label" for="customFile">Datei aussuchen</label>
        <button @click="onUpload">Bild hochladen</button>
        <div v-if="uploading" class="progress">
            <div class="progress-bar" role="progressbar" :style="`width: ${progress}%`" aria-valuenow="25" aria-valuemin="0" aria-valuemax="100"></div>
        </div>
    </section>
</template>

<script>
import axios from "axios";
export default {
    name: 'contactAvatarUpload',
    props: ['contact'],
    data(){
        return {
            avatar: null,
            uploading: true,
            progress: 0,
            // avatar: {
            //     fieldname: null,
            //     originalname: null,
            //     encoding: null,
            //     mimetype: null,
            //     destination: null,
            //     filename: null,
            //     path: null,
            //     size: null
            // }
        }
    },
    methods: {
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
                                console.log(progressEvent)
                                this.uploading = true
                                let progress = Math.round( (progressEvent.loaded * 100) / progressEvent.total )
                                this.progress = progress
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
                        this.uploading = false
                        this.contact.avatar = this.avatar
                        resolve(data)

                    } catch (error) {
                        reject(error);
                    }
                })

                const filePath = `${data.destination}${data.filename}`
                this.avatar = filePath

                this.save()
            
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
    }
}
</script>