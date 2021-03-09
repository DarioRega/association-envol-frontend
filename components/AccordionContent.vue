<template>
  <transition-expand>
    <p>{{ content }}</p>
  </transition-expand>
</template>

<script>
import TransitionExpand from '@/components/TransitionExpand';
export default {
  name: 'AccordionContent',
  components: { TransitionExpand },
  props: {
    content: {
      type: String,
      default: '',
    },
  },
};
</script>
