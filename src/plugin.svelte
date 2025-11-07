<div class="plugin__mobile-header">
    {title}
</div>
<section class="plugin__content">
    <div
        class="plugin__title plugin__title--chevron-back"
        on:click={() => bcast.emit('rqstOpen', 'menu')}
    >
        {title}
    </div>
    <Crag
        crag_name="Pepinster"
        pos={ lat: 50.57069572282945, lon: 5.800632624254907 }
        nameOfThisPlugin={name}
    />

</section>

<script lang="ts">
    import bcast from '@windy/broadcast';

    import config from './pluginConfig';

    import Crag from './Crags/Crag_Template.svelte';

    const { title, name } = config;
</script>

<style lang="less">
    p {
        line-height: 1.8;
    }
</style>
