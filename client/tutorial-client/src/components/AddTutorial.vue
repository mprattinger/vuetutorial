<template>
  <div class="submit-form">
    <div v-if="!submitted">
      <div class="form-group">
        <label for="title">Titel</label>
        <input
          type="text"
          class="form-control"
          id="title"
          required
          v-model="tutorial.title"
          name="title"
        />
      </div>

      <div class="form-group">
        <label for="description">Description</label>
        <input
          class="form-control"
          id="description"
          required
          v-model="tutorial.description"
          name="description"
        />
      </div>

      <button @click="saveTutorial" class="btn btn-success">Submit</button>
    </div>
    <div v-else>
      <h4>You submitted successfully!</h4>
      <button class="btn btn-success" @click="newTutorial">Add</button>
    </div>
  </div>
</template>

<script lang="ts">
import TutorialDataService from "@/services/TutorialDataService";
import { TutorialModel } from "@/Models/Tutorial";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class AddTutorial extends Vue {
  private tutorial: TutorialModel = new TutorialModel();

  private submitted = false;

  saveTutorial() {
    const data = new TutorialModel();
    data.title = this.tutorial.title;
    data.description = this.tutorial.description;

    TutorialDataService.create(data)
      .then(resp => {
        this.tutorial.id = resp.data.id;
        console.log(resp.data);
        this.submitted = true;
      })
      .catch(err => console.log(err));
  }

  newTutorial() {
      this.submitted = false;
      this.tutorial = new TutorialModel();
  }
}
</script>

<style scoped>
.submit-form {
  max-width: 300px;
  margin: auto;
}
</style>