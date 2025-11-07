<script lang="ts">
    // All allowed crag names
    import type { LatLon } from '@windy/interfaces';

    type CragName = 'Grands Malades' | 'Beez' | 'Awirs' | 'Dave' | 'Freyr' | 'Yvoir' | 'Pont-à-Lesse' | 'Pepinster';

    export let locations: Record<CragName, LatLon>;
    /*
    {
        Beez: { lat: 50.479869200456996, lon: 4.939502470929923},
        'Grands Malades': { lat: 50.468220, lon: 4.899924 },
        Awirs: { lat: 50.59062767540314, lon: 5.409223837180993 },
        Dave: { lat: 50.426400192515715, lon: 4.873954642259707 },
        Freyr: { lat: 50.223276374854294, lon: 4.893508872379353 },
        Yvoir: { lat: 50.33752440920969, lon: 4.872489267508661 },
        'Pont-à-Lesse': { lat: 50.22723761104121, lon: 4.914044770900586 },
        Pepinster: { lat: 50.57069572282945, lon: 5.800632624254907 },
    };*/
</script>