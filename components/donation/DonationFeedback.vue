<template>
  <div
    class="
      feedback
      absolute
      inset-0
      w-full
      h-full
      loader-container
      flex
      items-center
      justify-center
      transition-all
      duration-500
    "
    style="z-index: 888"
  >
    <div
      class="
        hero-feedback
        w-full
        h-full
        bg-brand-dark-blue
        flex
        items-center
        justify-center
        rounded-md
      "
      :class="currentState"
    >
      <div class="p-6">
        <div v-if="currentState === 'loading'" class="text-white text-center">
          <div class="w-16 mx-auto pb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path
                d="M11.989 23.99c-3.204-.001-6.216-1.25-8.48-3.517C1.244 18.206-.002 15.193 0 11.99c0-1.941.479-3.874 1.385-5.59.13-.247.384-.4.663-.4.121 0 .242.03.349.086.177.094.308.25.367.442.06.192.041.395-.053.572C1.919 8.601 1.5 10.292 1.5 11.99c-.001 2.803 1.089 5.439 3.071 7.423 1.981 1.983 4.616 3.076 7.42 3.077 2.807 0 5.441-1.091 7.422-3.071 1.983-1.981 3.076-4.616 3.077-7.419.001-2.803-1.089-5.439-3.071-7.423C17.438 2.594 14.803 1.501 12 1.5c-.2 0-.389-.078-.53-.22-.142-.142-.22-.33-.219-.531C11.25.336 11.587 0 12 0c3.204.001 6.216 1.25 8.48 3.517 2.265 2.267 3.511 5.279 3.51 8.483-.001 3.204-1.25 6.216-3.517 8.48-2.265 2.263-5.276 3.509-8.478 3.509h-.006z"
              />
              <path
                d="M12 12.75c-.2 0-.389-.078-.53-.22L.97 2.03C.828 1.889.75 1.7.75 1.5s.078-.389.22-.53c.141-.142.33-.22.53-.22s.389.078.53.22l10.5 10.5c.142.141.22.33.22.53s-.078.389-.22.53-.33.22-.53.22z"
              />
              <circle cx="7.875" cy="1.875" r="1.125" />
            </svg>
          </div>
          <h3 class="text-2xl text-white">Traitement en cours...</h3>
        </div>

        <div v-if="currentState === 'success'" class="text-white text-center">
          <div class="w-16 mx-auto pb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path
                d="M9.325 17.916c-.117 0-.235-.012-.352-.035-.472-.094-.879-.365-1.146-.764l-2.44-3.462c-.238-.338-.157-.807.181-1.045.127-.09.276-.137.432-.137.244 0 .473.119.614.318l2.45 3.477c.054.081.12.126.201.142.02.004.04.006.06.006.058 0 .115-.018.164-.051.028-.019.052-.042.072-.068l7.852-9.935c.142-.18.356-.284.587-.284.168 0 .333.057.464.161.157.124.257.302.28.501.023.199-.032.395-.156.552l-7.843 9.923c-.113.149-.257.284-.423.396-.297.2-.642.305-.997.305z"
              />
              <path
                d="M12 23.999c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5z"
              />
            </svg>
          </div>
          <h3 class="text-2xl text-current pb-4">Succès !</h3>
          <p class="text-current pb-6">
            Donation effectuée, vous allez recevoir un email de confirmation
          </p>
          <h3 class="text-current text-2xl">Merci !</h3>
        </div>

        <div v-if="currentState === 'error'" class="text-white text-center">
          <div class="w-16 mx-auto pb-8">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="#fff"
            >
              <path
                d="M12 23.999c-6.617 0-12-5.383-12-12s5.383-12 12-12 12 5.383 12 12-5.383 12-12 12zm0-22.5c-5.79 0-10.5 4.71-10.5 10.5s4.71 10.5 10.5 10.5 10.5-4.71 10.5-10.5-4.71-10.5-10.5-10.5z"
              />
              <path
                d="M16.5 17.249c-.2 0-.389-.078-.53-.22L12 13.06l-3.97 3.97c-.142.142-.33.22-.53.22s-.389-.078-.53-.22c-.292-.292-.292-.768 0-1.061l3.97-3.97-3.97-3.97c-.142-.141-.22-.33-.22-.53s.078-.389.22-.53c.141-.142.33-.22.53-.22s.389.078.53.22l3.97 3.97 3.97-3.97c.142-.142.33-.22.53-.22s.389.078.53.22c.142.141.22.33.22.53s-.078.389-.22.53l-3.97 3.97 3.97 3.97c.292.292.292.768 0 1.061-.141.141-.33.219-.53.219z"
              />
            </svg>
          </div>
          <h3 class="text-2xl text-current pb-4">Erreur</h3>
          <p class="text-current pb-6">
            Une erreur est survenue durant la procédure
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DonationFeedback',
  props: {
    currentState: {
      type: String,
      default: '',
    },
  },
};
</script>
<style lang="scss">
.hero-feedback {
  &.loading {
    @apply bg-brand-dark-blue;
  }

  &.success {
    @apply bg-brand-success;
  }

  &.error {
    @apply bg-brand-error;
  }
}
</style>
