<template>
  <div id="content">
    <section class="pt-4">
    <div class="container">
      <div class="row">
        <div class="col-sm-12 col-md-3">
          <div class="card">
            <div class="card-header">
              Kontakte
            </div>
            <div class="card-body">
              <div class="card-text">
                <p>Du hast <span v-if="contactCount">{{ contactCount }}</span> Kontakte</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
  </div>
</template>

<script>
import axios from "axios"
export default {
  data(){
    return {
      contactCount: null
    }
  },
  async created(){
    const url = 'http://localhost:8000/api/contacts/amount'
        this.contactCount = await new Promise( async(resolve, reject) => {
            try{
                const res = await axios.get(url);
                const data = res.data;
                JSON.stringify(data)
                resolve(data);
            } catch(error){
                // this.error = true
                // this.errorMessage = error
                reject(error);
            }
        })
  }

}
</script>

<style>

</style>