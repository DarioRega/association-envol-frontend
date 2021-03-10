<template>
  <div id="file-drag-drop">
    <form
      ref="fileform"
      class="uploader bg-brand-variant-main-gray rounded-md h-64 flex items-center justify-center"
    >
      <div class="text-center">
        <span class="drop-files">Drop the files here!</span>
        <p>ou</p>
        <button class="button-secondary" @click="openDirectory">
          chercher
        </button>
      </div>
    </form>

    <!--    <progress max="100" :value.prop="uploadPercentage"></progress>-->

    <file-list-upload
      ref="fileListUpload"
      :files="files"
      @removeFile="removeFile($event)"
    />

    <a v-show="files.length > 0" class="submit-button" @click="submitFiles()"
      >Submit</a
    >
  </div>
</template>

<script>
export default {
  /*
   Variables used by the drag and drop component
  */
  name: 'FileUpload',
  data() {
    return {
      dragAndDropCapable: false,
      files: [],
      uploadPercentage: 0,
    };
  },
  watch: {
    files: {
      deep: true,
      handler() {
        this.$emit('filesChange', this.files);
      },
    },
  },

  mounted() {
    /*
     Determine if drag and drop functionality is capable in the browser
    */
    this.dragAndDropCapable = this.determineDragAndDropCapable();

    // If drag and drop capable, then we continue to bind events to our elements.

    if (this.dragAndDropCapable) {
      // Listen to all of the drag events and bind an event listener to each
      // for the fileform.
      // /
      [
        'drag',
        'dragstart',
        'dragend',
        'dragover',
        'dragenter',
        'dragleave',
        'drop',
      ].forEach(
        function (evt) {
          // /
          //  For each event add an event listener that prevents the default action
          //  (opening the file in the browser) and stop the propagation of the event (so
          //  no other elements open the file in the browser)
          // */
          this.$refs.fileform.addEventListener(
            evt,
            function (e) {
              e.preventDefault();
              e.stopPropagation();
            },
            false
          );
        }.bind(this)
      );

      // /*
      //  Add an event listener for drop to the form
      // /
      this.$refs.fileform.addEventListener(
        'drop',
        function (e) {
          // /
          //  Capture the files from the drop event and add them to our local files
          //  array.
          // */
          for (let i = 0; i < e.dataTransfer.files.length; i++) {
            this.files.push(e.dataTransfer.files[i]);
            this.$refs.fileListUpload.getImagePreviews();
            // this.getImagePreviews();
          }
        }.bind(this)
      );
    }
  },
  methods: {
    openDirectory(){
    }
    // /*
    //  Determines if the drag and drop functionality is in the
    //  window
    // /
    determineDragAndDropCapable() {
      // /
      //   Create a test element to see if certain events
      //   are present that let us do drag and drop.
      //  */
      const div = document.createElement('div');

      /*
   Check to see if the draggable event is in the element
   or the ondragstart and ondrop events are in the element. If
   they are, then we have what we need for dragging and dropping files.


   We also check to see if the window has FormData and FileReader objects
   present so we can do our AJAX uploading
  */
      return (
        ('draggable' in div || ('ondragstart' in div && 'ondrop' in div)) &&
        'FormData' in window &&
        'FileReader' in window
      );
    },

    //  Gets the image preview for the file.
    // /

    //
    // /*
    //  Submits the files to the server
    // /
    submitFiles() {
      // /
      //  Initialize the form data
      // */
      const formData = new FormData();

      /*
 Iteate over any file sent over appending the files
 to the form data.
*/
      for (let i = 0; i < this.files.length; i++) {
        const file = this.files[i];

        formData.append(`files[${i}]`, file);
      }

      /*
 Make the request to the POST /file-drag-drop URL
*/
      this.$axios
        .post('/file-drag-drop', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
          onUploadProgress: function (progressEvent) {
            this.uploadPercentage = parseInt(
              Math.round((progressEvent.loaded * 100) / progressEvent.total)
            );
          }.bind(this),
        })
        .then(function () {
          console.log('SUCCESS!!');
        })
        .catch(function () {
          console.log('FAILURE!!');
        });
    },

    /*
 Removes a select file the user has uploaded
*/
    removeFile(key) {
      this.files.splice(key, 1);
    },
  },
};
</script>
<style lang="scss">
.uploader {
  &:hover {
    box-shadow: 0 0 0 3px rgba(127, 156, 245, 0.45);
  }
}
.upload-form {
  display: block;
  height: 400px;
  width: 400px;
  background: #ccc;
  margin: auto;
  margin-top: 40px;
  text-align: center;
  line-height: 400px;
  border-radius: 4px;
}

div.file-listing {
  width: 400px;
  margin: auto;
  padding: 10px;
  border-bottom: 1px solid #ddd;
}

div.file-listing img {
  height: 100px;
}

div.remove-container {
  text-align: center;
}

div.remove-container a {
  color: red;
  cursor: pointer;
}

a.submit-button {
  display: block;
  margin: auto;
  text-align: center;
  width: 200px;
  padding: 10px;
  text-transform: uppercase;
  background-color: #ccc;
  color: white;
  font-weight: bold;
  margin-top: 20px;
}

progress {
  width: 400px;
  margin: auto;
  display: block;
  margin-top: 20px;
  margin-bottom: 20px;
}
</style>
