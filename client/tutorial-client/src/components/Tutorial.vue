<template>
  <div v-if="currentTutorial" class="edit-form">
    <h4>Tutorial</h4>
    <form>
      <div class="form-group">
        <label for="title">Titel</label>
        <input
          type="text"
          class="form-control"
          id="title"
          v-model="currentTutorial.title"
        />
      </div>
      <div class="form-group">
        <label for="description">Beschreibung</label>
        <input
          type="text"
          class="form-control"
          id="description"
          v-model="currentTutorial.description"
        />
      </div>

      <div class="form-group">
        <label><strong>Status:</strong></label>
        {{ currentTutorial.published ? "Published" : "Pending" }}
      </div>
    </form>
    <button
      class="badge badge-primary mr-2"
      v-if="currentTutorial.published"
      @click="updatePublished(false)"
    >
      UnPublish
    </button>
    <button
      class="badge badge-primary mr-2"
      v-else
      @click="updatePublished(true)"
    >
      Publish
    </button>
    <button class="badge badge-danger mr-2" @click="deleteTutorial">
      Delete
    </button>

    <button type="submit" class="badge badge-success" @click="updateTutorial">
      Update
    </button>
    <p>{{ message }}</p>
  </div>
  <div v-else>
    <br />
    <p>Please click on a Tutorial...</p>
  </div>
</template>

<script lang="ts">
import { TutorialModel } from "@/Models/Tutorial";
import TutorialDataService from "@/services/TutorialDataService";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class Tutorial extends Vue {
  private currentTutorial = new TutorialModel();
  private message = "";

  getTutorial(id: string) {
    TutorialDataService.get(id)
      .then(resp => {
        this.currentTutorial = resp.data;
        console.log(resp.data);
      })
      .catch(err => console.error(`Error loading tutorial with id ${id}`, err));
  }

  updatePublished(status: boolean) {
    const data = new TutorialModel();
    data.id = this.currentTutorial.id;
    data.title = this.currentTutorial.title;
    data.description = this.currentTutorial.description;
    data.published = status;

    TutorialDataService.update(this.currentTutorial.id, data)
      .then(resp => {
        this.currentTutorial.published = status;
        console.log(resp.data);
      })
      .catch(err =>
        console.error(`Error updating published status to ${status}`, err)
      );
  }

  updateTutorial() {
    TutorialDataService.update(this.currentTutorial.id, this.currentTutorial)
      .then(resp => {
        console.log(resp.data);
        this.message = "The tutorial was updated sucessfully!";
      })
      .catch(err => console.error("Error updateting the turorial", err));
  }

  deleteTutorial() {
    TutorialDataService.delete(this.currentTutorial.id)
      .then(resp => {
        console.log(resp.data);
        this.$router.push({ name: "tutorials" });
      })
      .catch(err => console.error("Error deleting tutorial!", err));
  }

  mounted() {
      this.message ="";
      this.getTutorial(this.$route.params.id);
  }
}
</script>

<style scoped>
.edit-form {
  max-width: 300px;
  margin: auto;
}
</style>