<template>
  <div> <h1>Create Account</h1>
    Account nr:  <input v-model="accountNr"> <br>
    Name <input v-model="name"> <br>
    Amount <input v-model="amount"> <br>
    <button v-on:click="createAccount">Create Account</button>
    <button v-on:click="depositMoney">Deposit</button> <br>
    <button v-on:click="withdrawMoney">Withdraw</button> <br>
    <button v-on:click="getBalance()">Get Balance</button> <br>
    <br>
    Balance: {{balance}} <br>
    <br>
    From account <input v-model="fromAccount"> <br>
    To account <input v-model="toAccount"> <br>
    <button v-on:click="transferMoney">Transfer Money</button> <br>

    <br>
    Date from <input v-model="from"> <br>
    Date to <input v-model="to"> <br>
    <button v-on:click="getTransactionHistory">Get Transaction History</button> <br>


    <table>
      <tr>
        <th>fromAccount</th>
        <th>toAccount</th>
        <th>type</th>
        <th>amount</th>
      </tr>
      <tr v-for="row in transactionHistory">
        <td>{{row.fromaccount}}</td>
        <td>{{row.toaccount}}</td>
        <td>{{row.type}}</td>
        <td>{{row.amount}}</td>
      </tr>


    </table>


  </div>
</template>

<style>
table {
  border-collapse: collapse;
  width: 100%;
  text-align: center;
}

th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

tr:hover {background-color: lightgoldenrodyellow;}

button {
  background-color: black;
  border: none;
  color: white;
  padding: 10px 15px;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  font-size: 16px;
  margin: 4px 2px;
  cursor: pointer;
}

input{
  width: 30%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

}
</style>


<script>
export default {
  methods: {
    createAccount: function () {
      let requestBody = {
        name: this.name,
        account: this.accountNr,
        amount: this.amount
      }
      this.$http.post("vue-test/register", requestBody)
    },
    getBalance: function () {
      this.$http.get("/vue-test/getBalance?accountNr=" + this.accountNr)
          .then(result => {
            this.balance = result.data
          })
    },

    depositMoney: function () {
      this.$http.get('/vue-test/depositMoney?accountNr=' + this.accountNr + "&amount=" + this.amount)
    },

    withdrawMoney: function () {
      this.$http.get('/vue-test/withdrawMoney?accountNr=' + this.accountNr + "&amount=" + this.amount)
    },

    transferMoney: function () {
      this.$http.get("/vue-test/transferMoney?fromAccount=" + this.fromAccount + "&toAccount=" + this.toAccount + "&amount=" + this.amount)

    },
    getTransactionHistory: function () {
      this.$http.get("/vue-test/transactionHistory?accountNr=" + this.accountNr + "&from=" + this.from + "&to" + this.to)
      .then(response => {
        this.transactionHistory = response.data
          })

    }


  },


  data: function () {
    return {
      accountNr: "",
      name: "",
      amount: "",
      balance: 0,
      toaccount: null,
      fromaccount: null,
      from: "",
      to: "",
      transactionHistory: [],
      type: ""
    }
  },
  mounted(){
    this.getTransactionHistory()
  }
}
</script>

<style scoped>

</style>