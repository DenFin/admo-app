<template>
  <div id="content" class="pt-5">
        <main>
            <div class="container d-flex align-items-center justify-content-between">
                <pageHeadline headline="Kategorie hinzufügen"></pageHeadline>
                <createNewItemButton path="/contacts/categories" title="Zurück"></createNewItemButton>
            </div>
            <div class="container mt-4">
                <div class="row">
                    <div class="col-sm-12 col-lg-6">
                        
                        <form action="">
                            <div class="form-group">
                                <label for="">Kategoriename</label>
                                <input v-model="category.name" class="form-control" type="text">
                            </div>
                        </form>
                        <button class="btn btn-primary" @click="submit">Submit</button>
                        <button class="btn btn-secondary" @click="submitAndBack">Submit and back</button>
                    </div>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
import axios from "axios"
import pageHeadline from "./../../../components/global/pageHeadline"
export default {
    components: {
        pageHeadline,
    },
    data(){
        return {
            category: {
                name: null
            },
            error: false,
        }
    },
    methods: {
         async submit(){
            const url = "http://localhost:8000/api/contactcategories";  
            console.log("submit")
            try {
                axios.post(url, this.category)
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
    }
}
</script>

<style>

</style>