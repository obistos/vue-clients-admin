<template>
  <div v-if="currentClient" class="edit-form">
    <h4>Client</h4>
    <form>
      <div class="form-group">
        <label for="First Name">First Name</label>
        <input type="text" class="form-control" id="title"
          v-model="currentClient.first_name"
        />
      </div>
      <div class="form-group">
        <label for="Last Name">Last Name</label>
        <input type="text" class="form-control" id="description"
          v-model="currentClient.last_name"
        />
      </div>

      <div class="form-group">
        <label for="Mobile Number">Mobile Number:</label>
        <input type="text" class="form-control" id="description"
          v-model="currentClient.mobile_number"
        />
      </div>

      <div class="form-group">
        <label for="ID Number">ID Number:</label>
        <input type="text" class="form-control" id="description"
          v-model="currentClient.id_number"
        />
      </div>

      <div class="form-group">
        <label for="Address">Physical Address:</label>
        <input type="text" class="form-control" id="description"
          v-model="currentClient.address"
        />
      </div>
    </form>

    <button class="btn btn-sm btn-danger mr-2"
      @click="deleteClient"
    >
      Delete
    </button>

    <button type="submit" class="btn btn-sm btn-success"
      @click="updateClient"
    >
      Update
    </button>
    <p>{{ message }}</p>
  </div>

  <div v-else>
    <br />
    <p>Please click on a Client...</p>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "client",
  data() {
    return {
      currentClient: null,
      message: ''
    };
  },
  methods: {
    getClient(id) {
      DataService.get(id)
        .then(response => {
          this.currentClient = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updatePublished(status) {
      var data = {
        id: this.currentClient.id,
        FirstName: this.currentClient.first_name,
        LastName: this.currentClient.last_name,
        published: status
      };

      DataService.update(this.currentClient.id, data)
        .then(response => {
          this.currentClient.mobile_number = status;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    updateClient() {
      DataService.update(this.currentClient.id, this.currentClient)
        .then(response => {
          console.log(response.data);
          this.message = 'The Client was updated successfully!';
        })
        .catch(e => {
          console.log(e);
        });
    },

    deleteClient() {
      DataService.delete(this.currentClient.id)
        .then(response => {
          console.log(response.data);
          this.$router.push({ name: "clients" });
        })
        .catch(e => {
          console.log(e);
        });
    }
  },
  mounted() {
    this.message = '';
    this.getClient(this.$route.params.id);
  }
};
</script>

<style>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>
