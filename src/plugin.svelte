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

    <h2 class="mb-10">Foehn Chart</h2>
    <p>In the Foehn chart, the pressure difference between Lugano and Zurich is represented.</p>
    <Chart
        pointTop={locations.Lugano}
        pointBottom={locations.Zurich}
        nameOfThisPlugin={name}
    />
</section>

<script lang="ts">
    import bcast from '@windy/broadcast';

    import config from './pluginConfig';

    import Chart from './Chart.svelte';

    import type { LatLon } from '@windy/interfaces.d';

    const { title, name } = config;

    type Location = 'Grands Malades' | 'Beez' | 'Awirs' | 'Dave' | 'Freyr';

    const locations: Record<Location, LatLon> = {
        Lugano: { lat: 46.003678, lon: 8.951052 },
        Zurich: { lat: 47.376887, lon: 8.541694 },
    };
</script>

<style lang="less">
    p {
        line-height: 1.8;
    }
</style>
