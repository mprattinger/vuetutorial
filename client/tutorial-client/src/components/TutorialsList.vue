<template>
  <div class="list row">
    <div class="col-md-8">
      <div class="input-group mb-3">
        <input
          type="text"
          class="form-control"
          placeholder="Search by title..."
          v-model="title"
        />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" @click="searchTitle">
            Search
          </button>
        </div>
      </div>
    </div>
    <div class="col-md-6">
      <h4>Tutorals List</h4>
      <ul class="list-group">
        <li
          class="list-group-item"
          :class="{ active: index == currentIndex }"
          v-for="(tutorial, index) in tutorials"
          :key="index"
          @click="setActiveTutorial(tutorial, index)"
        >
          {{ tutorial.title }}
        </li>
      </ul>

      <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
        Remove All
      </button>
    </div>
    <div class="col-md-6">
      <div v-if="currentTutorial">
        <h4>Tutorial</h4>
        <div>
          <label><strong>Titel:</strong></label> {{ currentTutorial.title }}
        </div>
        <div>
          <label><strong>Beschreibung:</strong></label>
          {{ currentTutorial.description }}
        </div>
        <div>
          <label><strong>Status:</strong></label>
          {{ currentTutorial.published ? "Published" : "Pending" }}
        </div>

        <a
          class="badge badge-warning"
          :href="'/tutorials/' + currentTutorial.id"
          >Edit</a
        >
      </div>
      <div v-else>
        <br />
        <p>Please click on a tutorial...</p>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { TutorialModel } from "@/Models/Tutorial";
import TutorialDataService from "@/services/TutorialDataService";
import { Component, Vue } from "vue-property-decorator";

@Component
export default class TutorialsList extends Vue {
  private tutorials: TutorialModel[] = [];
  private currentTutorial: TutorialModel = new TutorialModel;
  private currentIndex = -1;
  private title = "";

  retrieveTutorials() {
    TutorialDataService.getAll()
      .then(resp => {
        this.tutorials = resp.data;
        console.log(resp.data);
      })
      .catch(err => console.error("Error loading tutorials!", err));
  }

  refreshList() {
    this.retrieveTutorials();
    this.currentTutorial = new TutorialModel();
    this.currentIndex = -1;
  }

  setActiveTutorial(tutorial: TutorialModel, index: number) {
    this.currentTutorial = tutorial;
    this.currentIndex = index;
  }

  removeAllTutorials() {
    TutorialDataService.deleteAll()
      .then(resp => {
        console.log(resp.data);
        this.refreshList();
      })
      .catch(err => console.error("Error deleting all Tutorials!", err));
  }

  searchTitle() {
    TutorialDataService.findByTitle(this.title)
      .then(resp => {
        this.tutorials = resp.data;
        console.log(resp.data);
      })
      .catch(err => console.error("Error searching by title!", err));
  }

  mounted() {
      this.retrieveTutorials();
  }
}
</script>

<style scoped>
.list {
  text-align: left;
  max-width: 750px;
  margin: auto;
}
</style>