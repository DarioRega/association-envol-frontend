<template>
  <section>
    <small-container>
      <page-header :title="$t('contactUs')" />
    </small-container>
    <section class="bg-brand-main-gray">
      <container>
        <div class="flex flex-col lg:flex-row justify-between items-start">
          <div class="w-full lg:w-3/5">form</div>
          <div class="w-full lg:w-2/5">
            <card icon-name="location" icon-size="150">
              <h5 class="font-medium pb-4">{{ $t('contact.adress') }}</h5>
              <p>{{ $t('contact.name') }}</p>
              <p>{{ $t('contact.cp') }}</p>
              <p>{{ $t('contact.npa') }}</p>
            </card>
            <card class="mt-12" icon-name="phone" icon-size="125">
              <h5 class="font-medium pb-4">{{ $t('contact.contact') }}</h5>
              <p>{{ $t('contact.phoneNumber') }}</p>
            </card>
          </div>
        </div>
      </container>
    </section>
  </section>
</template>

<script>
import PageHeader from '@/components/PageHeader';
import SmallContainer from '@/components/containers/SmallContainer';
import Container from '@/components/containers/Container';
import Card from '@/components/Card';
export default {
  name: 'Contact',
  components: { Card, Container, SmallContainer, PageHeader },
};
</script>
