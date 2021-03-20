<template>
  <div>
    <Sidebar></Sidebar>
    <Nuxt class="pb-6" />
  </div>
</template>
<script>
import Sidebar from "./../components/global/sidebar"
export default{
  components: {
      Sidebar
    }
}
</script>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";

.pb-6{
  padding-bottom: 600px;
}

body{
  font-family: "Merriweather", serif;
  overflow-y: scroll;
}

#__layout > div{
  display: flex;
}

aside {
  width: 300px;
  background: linear-gradient(180deg, #063144, #04222f);
  color: #fff;
  min-height: 100vh;
  /* padding: 2rem; */
}

#content{
  flex-grow: 1;
}

.btn-primary{
  background: #04222f;
}

.btn-primary:hover {
  background: #063144;
}

</style>
