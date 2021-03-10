<template>
  <div>
    <h5 v-show="files.length > 0" class="pb-10">Documents</h5>
    <div
      v-for="(file, key) in files"
      :key="key"
      class="flex w-full justify-between items-center"
    >
      <p>#{{ key + 1 }}</p>
      <img :ref="'preview' + parseInt(key)" class="w-48 flex-none" />
      <p>
        {{ file.name }}
      </p>
      <div class="w-32 text-rigth">
        <a class="cursor-pointer" @click="$emit('removeFile', key)"
          ><icon name="close" size="75"
        /></a>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'FileListUpload',
  props: {
    files: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    name() {},
    getImagePreviews() {
      // /
      //  Iterate over all of the files and generate an image preview for each one.
      // /
      for (let i = 0; i < this.files.length; i++) {
        // /
        // Ensure the file is an image file
        // /
        if (/.(jpe?g|png|gif)$/i.test(this.files[i].name)) {
          // /
          // Create a new FileReader object
          // */
          const reader = new FileReader();

          /*
       Add an event listener for when the file has been loaded
       to update the src on the file preview.
      */
          reader.addEventListener(
            'load',
            function () {
              this.$refs[`preview${parseInt(i)}`][0].src = reader.result;
            }.bind(this),
            false
          );

          // /*
          //  Read the data for the file in through the reader. When it has
          //  been loaded, we listen to the event propagated and set the image
          //  src to what was loaded from the reader.
          // /*
          reader.readAsDataURL(this.files[i]);
        } else {
          // /
          //  We do the next tick so the reference is bound and we can access it.
          // */
          this.$nextTick(function () {
            this.$refs[`preview${parseInt(i)}`][0].src = '/images/file.png';
          });
        }
      }
    },
  },
};
</script>

<style scoped></style>
