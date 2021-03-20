<template>
    <div class="col-sm-12 col-lg-4 mb-4">
        <div class="card">
            <div class="card-body">
                <h5>{{ birthday.firstname }} {{ birthday.lastname }}</h5>
                Hat in {{ birthday.days }} Tagen Geburtstag und wird {{ birthday.age }} Jahre alt.
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'contactBirthdayCard',
    props: ['birthday']
}
</script>

<style>

</style>