<template>
  <section class="page-spacer">
    <container>
      <page-header
        :title="$t('contactUs')"
        page-category="contact"
        class="md:mt-10 lg:my-16 xl:my-20 2xl:my-24"
      />
    </container>
    <section class="bg-white">
      <container>
        <div class="flex flex-col lg:flex-row justify-between items-start">
          <div class="w-full lg:w-3/5 2xl:max-w-5xl lg:pr-24 mb-16 lg:mb-0">
            <div class="sm:w-9/12 lg:w-full mx-auto w-full">
              <form-contact />
            </div>
          </div>
          <div class="w-full lg:w-2/5">
            <div class="sm:w-9/12 lg:w-full mx-auto w-full">
              <div class="mb-12">
                <alert
                  :title="$t('home.alert.title')"
                  :paragraphs="textsAlert"
                  class="shadow-lg"
                />
              </div>
              <card class="mb-12" icon-name="location" icon-size="150">
                <h5 class="font-medium pb-4">{{ $t('contact.address') }}</h5>
                <p>{{ $t('contact.name') }}</p>
                <p>{{ $t('contact.cp') }}</p>
                <p>{{ $t('contact.npa') }}</p>
              </card>

              <card icon-name="phone" icon-size="125">
                <h5 class="font-medium pb-4">{{ $t('contact.contact') }}</h5>
                <a
                  class="hover:text-brand-dark-gray"
                  :href="`tel:${$t('contact.phoneNumber')}`"
                  >{{ $t('contact.phoneNumber') }}</a
                >
              </card>
            </div>
          </div>
        </div>
      </container>
    </section>
  </section>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import Container from '@/components/containers/Container';
import Card from '@/components/Card';
import FormContact from '@/components/FormContact';
import Alert from '~/components/Alert';

export default {
  name: 'Contact',
  components: { FormContact, Card, Container, PageHeader, Alert },
  computed: {
    textsAlert() {
      return [
        this.$t('home.alert.paragraph1'),
        this.$t('home.alert.paragraph2'),
        this.$t('home.alert.paragraph3'),
      ];
    },
  },
  head() {
    return { title: `Contact - ${process.env.APP_NAME}` };
  },
};
</script>
