<div class="mt-15">
    <svg bind:this={svgEl}></svg>
</div>

<script lang="ts">
    import { getPointForecastData } from '@windy/fetch';

    import * as d3 from 'd3';

    import type { DataHash, LatLon, WeatherDataPayload, SummaryDay } from '@windy/interfaces.d';
    import type { Timestamp, YearMonthDay } from '@windy/types.d';
    import type { HttpPayload } from '@windy/http.d';

    export let point: LatLon;
    export let nameOfThisPlugin: string;

    export let indicator: boolean;

    let svgEl: SVGSVGElement;

    type TSValue = { ts: Timestamp; diff: number; hum: number };

    $: {
        if (point) {
            const pointPromise = getPointForecastData('arome', point, nameOfThisPlugin);

            Promise.all([pointPromise]).then(
                ([{data: point}]: HttpPayload<
                    WeatherDataPayload<DataHash>
                >[]) => {
                    const pointData = point.data;
                    const tsValues = calculateDeltaDewTemp(pointData);
                    const midnights = getAllMidnights(point.summary);
                    drawTheGraph(tsValues, midnights);
                },
            );
        }
    }

    const getAllMidnights = (summary: Record<YearMonthDay, SummaryDay>): Timestamp[] => {
        return Object.keys(summary).map(key => summary[key].timestamp);
    };

    /**
     * Calculate the pressure difference between two datasets. In 99.999% of cases, the datasets will have
     * the same timestamps, but in edge case (when each will be from different reference time) they can have
     * different arrays
     */
    const calculateDeltaDewTemp = (
        { temp: real_temp, dewPoint: dew_temp, rh: humidity, ts: ts }: DataHash,
    ): TSValue[] => {
        const tsValues: TSValue[] = ts.map((ts, i) => {
                return { ts, diff: (real_temp[i] - dew_temp[i]), hum: (humidity[i]/10)};
        });
        return tsValues;
    };

    const drawTheGraph = (lineData: TSValue[], midnights: Timestamp[]) => {
        const importantValues = [-4, -2, 0, 2, 4, 6, 8, 10];
        const noons: Timestamp[] = midnights.map(ts => ts + 12 * 3600 * 1000);

        const startingTimestamp = lineData[0].ts;
        const lastTimestamp = lineData[lineData.length - 1].ts;

        const margin = { top: 5, right: 5, bottom: 20, left: 40 };
        const width = svgEl.clientWidth - margin.left - margin.right;
        const height = svgEl.clientHeight - margin.top - margin.bottom;

        const textMargin = 20;

        const svg = d3.select(svgEl);

        const innerSvg = svg
            .append('g')
            .attr('transform', `translate(${margin.left}, ${margin.top})`);

        const xScale = d3.scaleTime().domain([startingTimestamp, lastTimestamp]).range([0, width]);

        const yScale = d3.scaleLinear().domain([-4, 10]).range([height, 0]);

        const line1 = d3
            .line<TSValue>()
            .x(d => xScale(d.ts))
            .y(d => yScale(d.diff));

        const line2 = d3
            .line<TSValue>()
            .x(d => xScale(d.ts))
            .y(d => yScale(d.hum));

        const xAxis = d3.axisBottom(xScale).tickValues(noons).tickFormat(d3.timeFormat('%a %d'));

        const yAxis = d3
            .axisLeft(yScale)
            .tickValues(importantValues)
            .tickFormat(d => `${d} t°`);

        // Draw horizontal lines for each important value
        importantValues.forEach(value => {
            innerSvg
                .append('line')
                .attr('x1', 0)
                .attr('y1', yScale(value))
                .attr('x2', width)
                .attr('y2', yScale(value))
                .attr('stroke', 'lightgray')
                .attr('stroke-width', 1)
                .attr('stroke-opacity', value === 0 ? 1 : 0.3);
        });

        // Draw a vertical line for each midnight
        midnights
            .filter(ts => ts > startingTimestamp && ts < lastTimestamp)
            .forEach(midnight => {
                innerSvg
                    .append('line')
                    .attr('x1', xScale(midnight))
                    .attr('y1', 0)
                    .attr('x2', xScale(midnight))
                    .attr('y2', height + 5)
                    .attr('stroke', 'lightgray')
                    .attr('stroke-width', 1)
                    .attr('stroke-dasharray', '5,5');
            });

        // Add text indicators for data
        if (indicator == true) {
            innerSvg
                .append('text')
                .attr('x', width - textMargin)
                .attr('y', textMargin)
                .attr('text-anchor', 'end')
                .attr('alignment-baseline', 'hanging')
                .attr('font-size', '30px')
                .attr('opacity', 0.5)
                .attr('fill', 'white')
                .text('Dry');

            innerSvg
                .append('text')
                .attr('x', width - textMargin)
                .attr('y', height - textMargin)
                .attr('text-anchor', 'end')
                .attr('alignment-baseline', 'ideographic')
                .attr('font-size', '30px')
                .attr('opacity', 0.5)
                .attr('fill', 'white')
                .text('Wet');
        }

        // Main temperature difference line
        innerSvg
            .append('path')
            .datum(lineData)
            .attr('fill', 'none')
            .attr('stroke', 'orange')
            .attr('stroke-width', 3)
            .attr('d', line1);

        // Main humidity line
        innerSvg
            .append('path')
            .datum(lineData)
            .attr('fill', 'none')
            .attr('stroke', 'lightblue')
            .attr('stroke-width', 3)
            .attr('d', line2);

        // X axis
        innerSvg
            .append('g')
            .attr('transform', `translate(0,${height})`)
            .call(xAxis)
            .selectAll('.tick line')
            .attr('stroke-width', 0);

        // Y axis
        innerSvg.append('g').call(yAxis);
    };
</script>

<style lang="less">
    svg {
        width: 100%;
        height: 300px;
    }
</style>
