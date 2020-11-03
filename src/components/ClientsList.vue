<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input type="text" class="form-control" placeholder="Search..."
          v-model="searchInput"/>
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button"
            @click="searchClient"
          >
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Clients List</h4>
      <ul class="list-group">
        <li class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(client, index) in clients"
          :key="index"
          @click="setActiveClient(client, index)"
        >
          {{ client.first_name }} {{ client.last_name }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllClients">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentClient">
        <h4>Client</h4>
        <div>
          <label><strong>First Name:</strong></label> {{ currentClient.first_name }}
        </div>
        <div>
          <label><strong>Last Name:</strong></label> {{ currentClient.last_name }}
        </div>
        <div>
          <label><strong>Mobile Number:</strong></label> {{ currentClient.mobile_number }}
        </div>
        <div>
          <label><strong>ID Number:</strong></label> {{ currentClient.id_number }}
        </div>
        <div>
          <label><strong>Address:</strong></label> {{ currentClient.address }}
        </div>

        <a class="btn btn-sm btn-warning"
          :href="'/clients/' + currentClient.id">
          Edit
        </a>
      </div>
      <div v-else>
        <br />
        <p>Please click on a Client...</p>
      </div>
    </div>
  </div>
</template>

<script>
import DataService from "../services/DataService";

export default {
  name: "clients-list",
  data() {
    return {
      clients: [],
      currentClient: null,
      currentIndex: -1,
      FirstName: "",
      searchInput: "",
      searchResults: null
    };
  },
  methods: {
    retrieveclients() {
      DataService.getAll()
        .then(response => {
          this.clients = response.data;
          console.log(response.data);
        })
        .catch(e => {
          console.log(e);
        });
    },

    refreshList() {
      this.retrieveclients();
      this.currentClient = null;
      this.currentIndex = -1;
    },

    setActiveClient(client, index) {
      this.currentClient = client;
      this.currentIndex = index;
    },

    removeAllClients() {
      DataService.deleteAll()
        .then(response => {
          console.log(response.data);
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        });
    },
    
    searchClient() {
      let keyword = this.searchInput;
      let result = [];

      for (const [key, value] of Object.entries(this.clients)) {
        if(key && value.first_name == keyword)
          result.push(value);
        if(key && value.id_number == keyword)
          result.push(value);
        if(key && value.mobile_number == keyword)
          result.push(value);
      }
      this.searchResults = result;
    }
  },
  mounted() {
    this.retrieveclients();
  }
};
</script>

<style>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>
