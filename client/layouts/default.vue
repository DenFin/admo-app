<template>
  <div>
    <Sidebar></Sidebar>
    <Nuxt />
  </div>
</template>
<script>
import Header from "./../components/Header"
import Sidebar from "./../components/global/sidebar"
export default{
  components: {
      Header,
      Sidebar
    }
}
</script>

<style>
@import "https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css";

body{
  font-family: "Merriweather", serif;
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
