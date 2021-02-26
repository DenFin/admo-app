<template>
  <section>
      <div class="container">
          <div class="row">
              <div class="col-sm-12 col-md-6 mx-auto">
                  <form action="">
                    <div class="form-group">
                        <label for="">Username</label>
                        <input type="text" class="form-control">
                    </div>
                    <div class="form-group">
                        <label for="">Password</label>
                        <input type="text" class="form-control">
                    </div>
                    <button class="btn btn-primary" type="submit" >Login</button>
                </form>
              </div>
          </div>
      </div>
  </section>
</template>

<script>
export default {
    layout: 'auth',
}
</script>

<style>

</style>