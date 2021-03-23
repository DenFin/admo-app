<template>
  <div id="content" class="pt-5">
      <main>
          <div class="container">
              <div class="row">
                  <div class="col-sm-12">
                      <pageHeadline headline="Umsätze"></pageHeadline>
                  </div>
              </div>
          </div>
          <div class="container pt-5">
              <div class="row">
                  <div class="col-sm-12">
                      
                      <lineChart v-if="lineChartData.datasets[0].data" :data="lineChartData" :options="lineChartOptions"></lineChart>
                  </div>
              </div>
          </div>
      </main>
  </div>
</template>

<script>
import * as RevenuesService from "./../../services/revenues/RevenuesService"

import pageHeadline from "./../../components/global/pageHeadline"
import lineChart from "./../../components/charts/lineChart"


export default {
    components: {
        pageHeadline,
        lineChart
    },
    data(){
        return {
        test: '',
        lineChartData: {
            labels: null,
            datasets: [
                {
                    label: 'Revenues',
                    data: null,
                    // backgroundColor: '#003f5c'
                },
            ]
        },
        lineChartOptions: {
            responsive: true,
            maintainAspectRatio: false,
            legend: {
                display: false
            },
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
            }
        }
    },
    async fetch(){
        console.log("FEEEEETCH")
        const data = await RevenuesService.fetchRevenues()
        const revenues = data.data

        const labels = []
        const amounts = []
        revenues.forEach( revenue => {
            labels.push(revenue.month)
            amounts.push(revenue.amount)
        })


        this.lineChartData.labels = labels
        this.lineChartData.datasets[0].data = amounts
        console.log(revenues)

    }
}
</script>

<style>

</style>