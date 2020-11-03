<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="First Name">First Name</label>
        <input
          type="text"
          class="form-control"
          id="first_name"
          required
          v-model="client.FirstName"
          name="first_name"
        />
      </div>

      <div class="form-group">
        <label for="last_name">Last Name</label>
        <input
          type="text"
          class="form-control"
          id="last_name"
          required
          v-model="client.LastName"
          name="last_name"
        />
      </div>

      <div class="form-group">
        <label for="Mobile Number">Mobile Number</label>
        <input
          type="number"
          class="form-control"
          id="mobile_number"
          required
          v-model="client.MobileNumber"
          name="mobile_number"
        />
      </div>

      <div class="form-group">
        <label for="ID Number">ID Number</label>
        <input
          type="number"
          class="form-control"
          id="id_number"
          required
          v-model="client.IDNumber"
          name="id_number"
        />
      </div>

      <div class="form-group">
        <label for="Physical Address">Physical Address</label>
        <input
          type="text"
          class="form-control"
          id="address"
          required
          v-model="client.Address"
          name="address"
        />
      </div>

      <button @click="saveClient" class="btn btn-success">Submit</button>
    </div>

    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newClient">Add</button>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "add-client",
  data() {
    return {
      client: {
        id: null,
        FirstName: "",
        LastName: "",
        MobileNumber: null,
        IDNumber: null,
        Address: "",
      },
      submitted: false
    };
  },
  methods: {
    saveClient() {
      var data = {
        id: '',
        first_name: this.client.FirstName,
        last_name: this.client.LastName,
        mobile_number: this.client.MobileNumber,
        id_number: this.client.IDNumber,
        address: this.client.Address
      };

      DataService.create(data)
        .then(response => {
          this.client.id = response.data.id;
          console.log(response.data);
          this.submitted = true;
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    newClient() {
      this.submitted = false;
      this.client = {};
    }
  }
};
</script>

<style>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>
