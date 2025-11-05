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

    <h2 class="mb-10">Beez - Δt°</h2>
    <p>The difference between the temperature and the dew point for Beez.</p>
    <Chart
        point={locations.Beez}
        nameOfThisPlugin={name}
    />
</section>

<script lang="ts">
    import bcast from '@windy/broadcast';

    import config from './pluginConfig';

    import Chart from './Chart.svelte';

    import type { LatLon } from '@windy/interfaces.d';

    const { title, name } = config;

    type Location = 'Grands Malades' | 'Beez' | 'Awirs' | 'Dave' | 'Freyr' | 'Yvoir' | 'Pont-à-Lesse' | 'Pepinster';

    const locations: Record<Location, LatLon> = {
        Beez: { lat: 50.480, lon: 4.940 },
        'Grands Malades': { lat: 50.480, lon: 4.940 },
        Awirs: { lat: 50.480, lon: 4.940 },
        Dave: { lat: 50.480, lon: 4.940 },
        Freyr: { lat: 50.480, lon: 4.940 },
        Yvoir: { lat: 50.480, lon: 4.940 },

    };
</script>

<style lang="less">
    p {
        line-height: 1.8;
    }
</style>
