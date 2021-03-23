<template>
  <div v-bind:class="{active: popupActive} " class="modal fade" tabindex="-1" role="dialog" aria-hidden="true">
            <div class="modal-dialog modal-dialog-centered" role="document">
                <div class="modal-content">
                <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLongTitle">Element löschen</h5>
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                    <span @click="closeModal" aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div class="modal-body">
                    Bist du sicher, dass du dieses Element unwiderruflich löschen möchtest?
                </div>
                <div class="modal-footer">
                    <button @click="closeModal" type="button" class="btn btn-secondary" data-dismiss="modal">Abbrechen</button>
                    <button @click="deleteContact(2)" type="button" class="btn btn-danger">Löschen</button>
                </div>
                </div>
            </div>
        </div>
</template>

<script>
export default {
    name: 'modalDelete',
    data(){
        return {
            popupActive: false,
            deleteItem: null,
        }
    },
    methods: {
        closeModal(){
            this.popupActive = false;
        },
        openModal(id){
            this.deleteItem = id;
            this.popupActive = true;
        },
    }
}
</script>

<style lang="sass" scoped>

.active
    opacity: 1 !important
    display: block

.modal
    background: rgba(0,0,0,0.75)
    
.fade
    transition: opacity .35s ease

// .modal-content
//     transform: translateY(-)
</style>