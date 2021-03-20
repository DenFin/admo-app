<template>
    <div id="content" class="pt-5">
        <main>
            <div class="container">
                <div class="col-sm-12">
                    <pageHeadline headline="Neuen Kontakt erstellen"></pageHeadline>
                    
                </div>
                <div class="col-sm-12 col-lg-6">
                    <contactCreateForm></contactCreateForm>
                </div>
            </div>
        </main>
    </div>






  <!-- <section class="pt-4 pb-4" style="position:relative;">
      <div v-if="success" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 1rem; right: 1rem;">
        <div class="toast-header">
            <strong class="mr-auto">Added contact</strong>
            <small class="text-muted">Just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
           A new contact was added successfully to the database.
        </div>
      </div>
      <div v-if="fileUploadComplete" class="toast show" role="alert" aria-live="assertive" aria-atomic="true" style="position: absolute; top: 1rem; right: 1rem;">
        <div class="toast-header">
            <strong class="mr-auto">Added contact</strong>
            <small class="text-muted">Just now</small>
            <button type="button" class="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
            <span aria-hidden="true">&times;</span>
            </button>
        </div>
        <div class="toast-body">
           Datei erfolgreich hochgeladen.
        </div>
      </div>
      <div class="container">
          <div class="row">
              <div class="col-sm-12">
                    <h1>Create new contact</h1>
                    <form action="">
                        <div class="form-group">
                            <label for="">First Name</label>
                            <input v-model="contact.firstname" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">Last Name</label>
                            <input v-model="contact.lastname" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">D.O.B.</label>
                            <input v-model="contact.dob" class="form-control" type="date">
                        </div>
                        <div class="form-group">
                            <label for="">Street</label>
                            <input v-model="contact.street" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">ZIP</label>
                            <input v-model="contact.zip" class="form-control" type="text">
                        </div>
                        <div class="form-group">
                            <label for="">City</label>
                            <input v-model="contact.city" class="form-control" type="text">
                        </div>
                        <div class="custom-file mb-4">
                            <input @change="onFileChanged" type="file" class="custom-file-input" id="customFile">
                            <label class="custom-file-label" for="customFile">Choose file</label>
                            <button @click="onUpload">Upload!</button>
                        </div>                        
                    </form>
                    <button class="btn btn-primary" @click="submit">Submit</button>
                    <button class="btn btn-secondary" @click="submitAndBack">Submit and back</button>
              </div>
          </div>
      </div>
  </section> -->
</template>

<script>
import axios from "axios"
import pageHeadline from "./../../components/global/pageHeadline"
import contactCreateForm from "./../../components/contacts/contactCreateForm"

export default {
    components: {
        pageHeadline,
        contactCreateForm
    }
}
</script>
