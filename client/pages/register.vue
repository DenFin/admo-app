<template>
  <section>
      <div class="container">
          <div class="row">
              <div class="col-sm-12 col-md-6 mx-auto">
                  <form @submit="submit" action="">
                      <div class="form-group">
                        <label for="">E-Mail</label>
                        <input v-model="loginData.email" type="mail" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">Username</label>
                        <input v-model="loginData.username" type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">Password</label>
                        <input v-model="loginData.password" type="password" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">Confirm Password</label>
                        <input v-model="loginData.password2" type="password" class="form-control">
                    </div>
                    <button  @click.stop.prevent="submit()" class="btn btn-primary" type="submit" >Sign up</button>
                </form>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
import axios from "axios"
export default {
    layout: 'auth',
    data(){
        return{
            message: null,
            loginData: {
                email: '',
                username: '',
                password: '',
                password2: ''
            }
        }
    },
    methods: {
        async submit(){
            console.log("SUBMITTED FORM")

            const url = "http://localhost:8000/auth/register"
            const message = await new Promise( async (resolve, reject) => {
                try {
                    const res = await axios.post(url, this.loginData)
                    const data = res.data;
                    JSON.stringify(data)
                    console.log(data)
                    resolve(data);
                    this.$router.push({path: '/'})
                } catch (error) {
                    console.log(error)
                    reject(error)
                }
            })

        }
    }
}
</script>

<style>

</style>