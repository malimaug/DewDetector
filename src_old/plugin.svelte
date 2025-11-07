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

    <h2 class="mb-10">Pepinster - Δt°</h2>
    <p>The difference between the temperature and the dew point for Pepinster.</p>
    <Chart
        point={locations.Pepinster}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Carrière des Awirs - Δt°</h2>
    <p>The difference between the temperature and the dew point for Carrière des Awirs.</p>
    <Chart
        point={locations.Awirs}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Beez - Δt°</h2>
    <p>The difference between the temperature and the dew point for Beez.</p>
    <Chart
        point={locations.Beez}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Grands Malades - Δt°</h2>
    <p>The difference between the temperature and the dew point for Grands Malades.</p>
    <Chart
        point={locations['Grands Malades']}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Dave - Δt°</h2>
    <p>The difference between the temperature and the dew point for Dave.</p>
    <Chart
        point={locations.Dave}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Yvoir - Δt°</h2>
    <p>The difference between the temperature and the dew point for Yvoir.</p>
    <Chart
        point={locations.Yvoir}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Freyr - Δt°</h2>
    <p>The difference between the temperature and the dew point for Freyr.</p>
    <Chart
        point={locations.Freyr}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Pont-à-Lesse - Δt°</h2>
    <p>The difference between the temperature and the dew point for Pont-à-Lesse.</p>
    <Chart
        point={locations['Pont-à-Lesse']}
        nameOfThisPlugin={name}
        indicator={true}
    />
    <h2 class="mb-10">Pepinster - Δt°</h2>
    <p>The difference between the temperature and the dew point for Pepinster.</p>
    <Chart
        point={locations.Pepinster}
        nameOfThisPlugin={name}
        indicator={true}
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
        Beez: { lat: 50.479869200456996, lon: 4.939502470929923},
        'Grands Malades': { lat: 50.468220, lon: 4.899924 },
        Awirs: { lat: 50.59062767540314, lon: 5.409223837180993 },
        Dave: { lat: 50.426400192515715, lon: 4.873954642259707 },
        Freyr: { lat: 50.223276374854294, lon: 4.893508872379353 },
        Yvoir: { lat: 50.33752440920969, lon: 4.872489267508661 },
        'Pont-à-Lesse': { lat: 50.22723761104121, lon: 4.914044770900586 },
        Pepinster: { lat: 50.57069572282945, lon: 5.800632624254907 },

    };
</script>

<style lang="less">
    p {
        line-height: 1.8;
    }
</style>
