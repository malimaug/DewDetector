<section lang="ts">


    <h2 class="mb-10">Pepinster - Δt°</h2>
    <p>The difference between the temperature and the dew point for Pepinster.</p>
    <Chart
        point={pos}
        nameOfThisPlugin={nameOfThisPlugin}
        indicator={true}
    />
</section>

<script lang="ts">
    import Chart from 'src/Chart.svelte';
    import { LatLon } from '@windy/interfaces.d';

    export let crag_name: string;
    export let pos: LatLon
    export let nameOfThisPlugin: string;
</script>