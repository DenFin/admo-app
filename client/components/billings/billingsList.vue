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
                                <td><span class="i"></span></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
import * as BillingService from "./../../services/billings/BillingService"

export default {
    name: 'billingsList',
    data(){
        return {
            billings: []
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
    },
    async fetch(){
        this.billings = await BillingService.fetchBillings()
        this.formatDate();
    }
}
</script>

<style>

</style>