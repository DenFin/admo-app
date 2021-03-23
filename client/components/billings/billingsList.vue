<template>
    <section class="section-billings-list">
        <div class="container">
            <div class="row">
                <div class="col-sm-12">
                    <table class="table table-dark table-bordered table-sm table-condensed">
                        <thead>
                            <th>Nr.</th>
                            <th>Bezeichnung</th>
                            <th>Rechnungsdatum</th>
                            <th>Zahlungseingang</th>
                            <th>Brutto</th>
                            <th>Netto</th>
                            <th>Actions</th>
                        </thead>
                        <tbody>
                            <tr v-bind:key="billing.name" v-for="billing in billings">
                                <td><nuxt-link :to="`/billings/${billing._id}`">{{ billing.nr }}</nuxt-link></td>
                                <td>{{ billing.title }}</td>
                                <td>{{ billing.date }}</td>
                                <td>{{ billing.zip }}</td>
                                <td align="right">{{ billing.billingTotal }} €</td>
                                <td align="right">{{ billing.billingTotalWithTaxes }} €</td>
                                <td>
                                    <div class="dropdown">
                                        <button class="btn btn-sm btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                                        </button>
                                        <div class="dropdown-menu" aria-labelledby="dropdownMenuButton">
                                            <nuxt-link class="dropdown-item" :to="`/contacts/${billing._id}`">Rechnung bearbeiten</nuxt-link>
                                            <a class="dropdown-item" href="#"><span :data-id="billing._id" @click="openModal(billing._id)" class="i i--delet">Rechnung löschen</span></a>
                                        </div>
                                    </div>
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        <div v-bind:class="{active: popupActive} " class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
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
                    <button @click="deleteBilling()" type="button" class="btn btn-danger">Löschen</button>
                </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import axios from 'axios'
import * as BillingService from "./../../services/billings/BillingService"

export default {
    name: 'billingsList',
    data(){
        return {
            billings: [],
            popupActive: false,
            deleteItem: null,
        }
    },
    methods: {
       async formatDate(){
            await this.billings.forEach(billing =>{
                let date = new Date(billing.date)
                let day = date.getDate();
                let year = date.getFullYear();
                let month = date.getMonth()+1;
                month = date.toLocaleString('default', { month: 'long' });
                billing.date = `${day}. ${month} ${year}`
            })  
        },
        closeModal(){
            this.popupActive = false;
        },
        openModal(id){
            this.deleteItem = id;
            this.popupActive = true;
        },
        async deleteBilling(){
            const id = this.deleteItem
            const url = `http://localhost:8000/api/billings/${id}`
            try {
                await axios.delete(url)
                this.billings = await BillingService.fetchBillings()
                this.popupActive = false;
            } catch (error) {
                // TODO: handle error
                console.error(error)
            }
        },
    },
    async fetch(){
        this.billings = await BillingService.fetchBillings()
        this.formatDate();
    }
}
</script>

<style lang="sass">
.active
    opacity: 1 !important
    display: block !important
</style>