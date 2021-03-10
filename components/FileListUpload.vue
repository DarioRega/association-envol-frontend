<template>
  <transition-expand>
    <div>
      <div
        v-for="(file, key) in files"
        :key="key"
        class="flex w-full justify-between items-center"
        :class="key > 1 ? 'my-10 lg:my-14' : 'mb-10 lg:mb-14'"
      >
        <p class="hidden lg:block">#{{ key + 1 }}</p>
        <div class="w-16 md:w-24 mr-10 lg:mx-10 flex-none">
          <img :ref="'preview' + parseInt(key)" />
        </div>
        <p class="flex-1 overflow-hidden">
          {{ file.name }}
        </p>
        <div class="w-16 lg:w-32 text-right">
          <a class="cursor-pointer" @click="$emit('removeFile', key)"
            ><icon name="close" size="75"
          /></a>
        </div>
      </div>
    </div>
  </transition-expand>
</template>

<script>
import TransitionExpand from '@/components/TransitionExpand';
export default {
  name: 'FileListUpload',
  components: { TransitionExpand },
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
            // TODO REPLACE WITH OWN UPLOADED IMG ON DOMAIN
            this.$refs[`preview${parseInt(i)}`][0].src =
              'https://i.imgur.com/waeQCg6.png';
          });
        }
      }
    },
  },
};
</script>

<style scoped></style>
