<template>
  <div class="register">
    Konto number <input v-model="client.accountNr"> <br>
    Kasutaja nimi <input v-model="client.name"> <br>
    Summa <input v-model="client.amount"> <br>
    <button v-on:click="register">Loo konto</button> <br>
    <button v-on:click="depositMoney">Lisa raha</button> <br>
    <button v-on:click="withdrawMoney">Kanna raha</button> <br>
    <button v-on:click="getBalance()">Konto jääk</button>
    <input disabled id="getBalanceResult"> <br>
    <button v-on:click="getData()">Get Data</button>
    Data {{ client }}<br>

    <table>
      <tr>
        <th>account</th>
        <th>name</th>
        <th>amount</th>
      </tr>
      <tr v-for="row in clients">
        <td>{{row.account}}</td>
        <td>{{row.name}}</td>
        <td>{{row.amount}}</td>
      </tr>


    </table>


  </div>
</template>

<script>
export default {
  methods: {
    register: function () {
      this.$http.post('/vue-test/register', this.client)
      this.client.push(this.client);
    },

    getBalance: function () {
      this.$http.get('/vue-test/getBalance')
          .then(response => response.text())
          .then(function (response) {
            document.getElementById("getBalanceResult").value = response;
          })
    },

    depositMoney: function () {
      this.$http.get('/vue-test/depositMoney', this.client)
    },

    withdrawMoney: function () {
      this.$http.get('/vue-test/withdrawMoney', this.client)
    },

    transferMoney: function () {
      this.$http.get('/vue-test/transferMoney', this.client)
    },

    getData: function () {
      this.$http.get('/vue-test/data')
          .then(response => {
            this.client = response.data
          })
    }
  },



  data: function () {
    return {
      client: {},
      clients:[]
    }
  },
  mounted () {
    this.getAllData()
  }
}
</script>
