<template>
  <div class="pt-5 pb-5">
      <div v-if="success" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 1rem; right: 1rem;">
        <div class="toast-header">
            <strong class="mr-auto">Added contact</strong>
            <small class="text-muted">Just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
           Die Rechnung {{newBilling.nr}} wurde erfolgreich gespeichert!
        </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="col-sm-12">
                  <div style="position:absolute;top:-45px;">
                    <div v-if="showFeedback" class="alert alert-success" role="alert">
                        Die Rechnung {{newBilling.nr}} wurde erfolgreich gespeichert!
                    </div>
                  </div>
                  <h1>Neue Rechnung</h1>
                  <div class="form">
                    <div class="billing-info">
                        <div class="row">
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                <div class="form-group">
                                    <label for="">Kunde</label>
                                    <select v-model="newBilling.client" class="form-control form-control-sm " name="" id="">
                                        <option v-bind:key="client.name" v-for="client in clients" v-bind:value="client.name">{{ client.name }}</option>
                                    </select>
                                </div>
                                <div class="form-group">
                                    <label for="">Rechnungsnr.</label>
                                    <input v-model="newBilling.nr" class="form-control form-control-sm" type="text">
                                </div>
                                <div class="form-group">
                                    <label for="">Rechnungstitel</label>
                                    <input v-model="newBilling.title" class="form-control form-control-sm" type="text">
                                </div>
                            </div>
                            <div class="col-sm-12 col-md-12 col-lg-6">
                                 <div class="form-group">
                                    <label for="">Rechnungsdatum</label>
                                    <input v-model="newBilling.date" class="form-control form-control-sm" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="">Leistungszeitraum</label>
                                    <input v-model="newBilling.dateRangeStart" class="mb-2 form-control form-control-sm" type="date">
                                    <input v-model="newBilling.dateRangeEnd" class="form-control form-control-sm" type="date">
                                </div>
                                <div class="form-group">
                                    <label for="">Stunden- od. Tagessatz</label>
                                    <select class="form-control form-control-sm " v-model="rate" name="" id="">
                                        <option :selected="true" value="hourlyRate">Stundensatz</option>
                                        <option value="dailyRate">Tagessatz</option>
                                    </select>
                                </div>
                            </div>
                        </div>
                    </div>

                        <table @change="updateTotalAmount" class="table table-sm table-bordered table-dark mt-5">
                            <thead>
                                <tr>
                                    <th width="100">Position</th>
                                    <th>Tätigkeit</th>
                                    <th width="100" class="text-right">
                                        <span v-if="rate == 'hourlyRate'">Stundensatz</span>
                                        <span v-if="rate == 'dailyRate'">Tagessatz</span>
                                    </th>
                                    <th width="100" class="text-right">
                                        <span v-if="rate == 'hourlyRate'">Stunden</span>
                                        <span v-if="rate == 'dailyRate'">Tage</span>
                                    </th>
                                    <th width="160" class="text-right">Betrag</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr>
                                    <td><input step="1" value="0" class="position" type="number"></td>
                                    <td><input class="activity" type="text"></td>
                                    <td align="right" >
                                        <span class="rate" v-if="rate == 'hourlyRate'">{{ hourlyRate }}</span>
                                        <span class="rate" v-if="rate == 'dailyRate'">{{ dailyRate }}</span>
                                    </td>
                                    <td align="right"><input class="factor text-right" step="0.25" value="0"  type="number"></td>
                                    <td align="right"><span class="amount"></span> €</td>
                                </tr>
                            </tbody>
                            <tfoot>
                                <tr class="bg-warning">
                                    <td colspan="4">Gesamtbetrag</td>
                                    <td align="right" ><span v-bind="newBilling.billingTotal" class="totalAmount">{{ this.newBilling.billingTotal }} </span>€</td>
                                </tr>
                                <tr class="bg-danger">
                                    <td colspan="4">Mwst. 19%</td>
                                    <td align="right" ><span v-bind="newBilling.billingTaxes" class="taxes">{{ this.newBilling.billingTaxes }}</span> €</td>
                                </tr>
                                <tr class="bg-primary">
                                    <td colspan="4">Brutto-Gesamtbetrag</td>
                                    <td align="right" ><span v-bind="newBilling.billingTotalWithTaxes" class="totalWithTaxes">{{ this.newBilling.billingTotalWithTaxes }} </span> €</td>
                                </tr>
                            </tfoot>
                        </table>
                        <button class="btn btn-primary btn-sm" @click="addRow">Add new row</button>
                        <button class="btn btn-success btn-sm" @click="saveBilling">Save billing</button>
                    </div>
              </div>
          </div>
      </div>
  </div>
</template>

<script>
import axios from "axios"

export default {
    data(){
        return{
            hourlyRate: 60,
            dailyRate: 450,
            rate: "hourlyRate",
            showFeedback: false,
            clients: [],
            totalAmount: 100,
            taxes: 16,
            totalWithTaxes: 116,
            newBilling: {
                nr: null,
                client: null,
                title: null,
                date: null,
                dateRangeStart: null,
                dateRangeEnd: null,
                status: "neu",
                items: [],
                billingTotal: null,
                billingTaxes: null,
                billingTotalWithTaxes: null
            },
            success: false,
            error: false
        }
    },
    methods: {
        fetchClients(){
            return new Promise(async(resolve, reject) => {
                try {
                    const url = 'http://localhost:8000/api/clients'
                    const res = await axios.get(url);
                    const data = res.data;
                    this.clients = data;
                    resolve(data);
                } catch (error) {
                    reject(error);
                }
            })
        },
        addRow(){
            let lastRow = document.querySelector("tbody tr:last-of-type")
            let str = ` 
                                    <td><input step="1" value="0" class="position" type="number"></td>
                                    <td><input class="activity" type="text"></td>
                                    <td align="right"><span class="rate"></span></td>
                                    <td align="right" ><input class="factor text-right" step="0.25" value="0"  type="number"></td>
                                    <td class="" align="right"><span class="amount"></span> €</td>`
            lastRow.insertAdjacentHTML( 'afterend', str );

            if(this.rate == "hourlyRate"){
                document.querySelector("tbody tr:last-of-type td:nth-of-type(3) span").innerText = this.hourlyRate
            } else {
                document.querySelector("tbody tr:last-of-type td:nth-of-type(3) span").innerText = this.dailyRate
            }
        },
        updateTotalAmount(){

            // Get all positions rows
            const rows = document.querySelectorAll("tbody tr")
            
            rows.forEach( row => {
                console.log(row.cells[3])
                let rate = parseFloat(row.cells[2].innerText).toFixed(2)
                let factor = parseFloat(row.cells[3].children[0].valueAsNumber).toFixed(2)
                let amount = rate * factor
                
                row.cells[4].children[0].innerText = parseFloat(amount).toFixed(2)

                

                let amountCells = document.querySelectorAll(".amount")
                let cellsAdded = 0

                 amountCells.forEach( cell => {
                     cellsAdded = cellsAdded + parseFloat(cell.innerText)
                })
                this.newBilling.billingTotal = parseFloat(cellsAdded).toFixed(2);
            
            })

            this.newBilling.billingTotal = parseFloat(this.newBilling.billingTotal).toFixed(2)
            this.newBilling.billingTaxes  = parseFloat(this.newBilling.billingTotal * 0.16).toFixed(2)
            this.newBilling.billingTotalWithTaxes = (parseFloat(this.newBilling.billingTotal) + parseFloat(this.newBilling.billingTaxes)).toFixed(2)

    
        },
        async saveBilling(){


            // Get all positions
            let positions = document.querySelectorAll("tbody tr")
            let items = [];

            // for Each Position create new objet
            positions.forEach( position => {
                console.log(position)
                let item = {
                    "nr": position.cells[0].children[0].valueAsNumber,
                    "description": position.cells[1].children[0].value,
                    "hourlyRate": position.cells[2].children[0].innerText,
                    "factor": position.cells[3].children[0].valueAsNumber,
                    "total": position.cells[4].children[0].innerText,
                }
                items.push(item)
            })

            let newBilling = {
                "nr": this.newBilling.nr,
                "client": this.newBilling.client,
                "title": this.newBilling.title,
                "date": this.newBilling.date,
                "dateRangeStart": this.newBilling.dateRangeStart,
                "dateRangeEnd": this.newBilling.dateRangeEnd,
                "status": this.newBilling.status,
                "items": JSON.stringify(items),
                "billingTotal": this.newBilling.billingTotal,
                "billingTaxes": this.newBilling.billingTaxes,
                "billingTotalWithTaxes": this.newBilling.billingTotalWithTaxes 
            }

            this.newBilling = newBilling
            

            const url = 'http://localhost:8000/api/billings'


            
            try {
                axios.post(url, this.newBilling)
                this.success = true

                setTimeout( () => {
                    this.success = false
                    console.log("TIMEOUT")
                }, 3000)

            } catch (error) {
                console.log(error)
                this.error = true
            }
            console.log("submit")





            // await axios.post(`${url}`,{
            //     content: newBilling
            // })
            // .then( response => {
                
            //     if(response.status == 201){
            //         this.showFeedback = true
            //         newBilling = null
            //         this.newBilling = {
            //                 nr: null,
            //                 client: null,
            //                 title: null,
            //                 status: "neu",
            //                 items: [],
            //                 billingTotal: null,
            //                 billingTaxes: null,
            //                 billingTotalWithTaxes: null
            //             }
            //         setTimeout(() => {
            //             this.showFeedback = false
            //         }, 4000)
            //     }

            // })
            // .catch(function (error) {
            //     console.log(error);
            // });
           

        }
    },
    async created(){
        this.clients = this.fetchClients();
    }
    
}
</script>

<style>
    input{
        background: #343a40;
        border: none;
        color: #fff;
    }
    input:focus{
        outline-style: dotted;
        outline-width: thin;
    }
    th, input{
        /* text-align: right; */
    }


</style>