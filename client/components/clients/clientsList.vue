<template>
    <section class="contactsList">
        <div class="container">
            <div class="row pt-3">
                <div class="col-sm-12">
                    <div>
                        <table class="table table-dark table-bordered">
                    <thead>
                        <th>Name</th>
                        <th>Street</th>
                        <th>ZIP</th>
                        <th>City</th>
                        <th>Actions</th>
                    </thead>
                    <tbody>
                        <tr v-bind:key="client.name" v-for="client in clients">
                            <td><nuxt-link :to="`/clients/${client._id}`">{{ client.name }}</nuxt-link></td>
                            <td>{{ client.street }}</td>
                            <td>{{ client.zip }}</td>
                            <td>{{ client.city }}</td>
                            <td><span class="i"></span></td>
                        </tr>
                    </tbody>
                </table>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal -->
        <!-- <div v-bind:class="{active: popupActive} " class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Element löschen</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span @click="closeModal" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Bist du sicher, dass du dieses Element unwiderruflich löschen möchtest?
                </div>
                <div class="modal-footer">
                    <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                    <button @click="deleteContact(2)" type="button" class="btn btn-danger">Löschen</button>
                </div>
                </div>
            </div>
        </div> -->
    </section>
</template>

<script>
import axios from "axios"
import * as ClientService from "./../../services/clients/ClientService"

export default {
    name: 'clientsList',
    data(){
        return{
            clients: []
        }
    },
    async fetch(){
        this.clients = await ClientService.fetchClients()
    },
}
</script>

<style lang="sass">
a
    color: #f8b572
.table-dark
    background:#04222f
.table-dark td, .table-dark th, .table-dark thead th
    border-color: #063144
</style>