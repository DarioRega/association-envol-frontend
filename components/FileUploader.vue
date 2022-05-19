<template>
  <div id="file-drag-drop" class="pb-12">
    <form
      ref="fileForm"
      class="uploader lg:bg-brand-main-gray lg:rounded-md lg:h-64 flex items-center justify-center"
    >
      <input
        ref="inputFile"
        type="file"
        :multiple="true"
        class="invisible w-0 h-0 opacity-0"
      />
      <div class="text-center">
        <div class="hidden lg:block text-center">
          <span class="drop-files">{{ $t('formDemand.dropFilesHere') }}</span>
          <p class="my-2">{{ $t('formDemand.or') }}</p>
          <button class="button-secondary" @click="openDirectory">
            {{ $t('formDemand.find') }}
          </button>
        </div>
        <button
          class="lg:hidden button-secondary mb-10 mt-2"
          @click="openDirectory"
        >
          {{ $t('formDemand.downloadFiles') }}
        </button>
      </div>
    </form>

    <div
      v-show="files.length > 0"
      class="flex justify-between items-center py-10"
    >
      <h5>{{ $t('formDemand.filesDeposed') }}</h5>
      <span class="h-full" @click="shouldShowFiles = !shouldShowFiles">
        <icon :name="shouldShowFiles ? 'arrow-up' : 'arrow-down'" size="75" />
      </span>
    </div>
    <file-list-upload
      v-show="shouldShowFiles"
      ref="fileListUpload"
      :files="files"
      @removeFile="removeFile($event)"
    />
  </div>
</template>

<script>
import FileListUpload from '@/components/FileListUpload';
import { API_URL } from '@/constantes';

export default {
  /*
   Variables used by the drag and drop component
  */
  name: 'FileUpload',
  components: { FileListUpload },
  data() {
    return {
      shouldShowFiles: true,
      dragAndDropCapable: false,
      files: [],
      uploadPercentage: 0,
    };
  },
  watch: {
    files: {
      deep: true,
      handler() {
        this.$refs.fileListUpload.getImagePreviews();
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
      // for the fileForm.
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
          this.$refs.fileForm.addEventListener(
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
      this.$refs.fileForm.addEventListener('drop', (e) => {
        // /
        //  Capture the files from the drop event and add them to our local files
        //  array.
        // */
        // e.dataTransfer.files.forEach((file) => this.files.push(file));
        for (let i = 0; i < e.dataTransfer.files.length; i++) {
          this.files.push(e.dataTransfer.files[i]);
        }
      });
    }
    this.$refs.inputFile.addEventListener('change', (e) => {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        if (file) {
          this.files.push(file);
        }
      }
    });
  },
  methods: {
    openDirectory(e) {
      e.preventDefault();
      this.$refs.inputFile.click();
    },
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
        .post(API_URL.FILE_DRAG_AND_DROP_URL, formData, {
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
          // TODO handle that
        })
        .catch(function () {
          // TODO handle that
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
    @screen lg {
      box-shadow: 0 0 0 3px rgba(127, 156, 245, 0.45);
    }
  }
}
</style>
