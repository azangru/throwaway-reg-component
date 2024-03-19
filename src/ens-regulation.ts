import { LitElement, css, html, svg } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js';
import * as d3 from 'd3';

// import type { RegionData } from 'ensembl-regulation-backend-types';
// import type { RegionData } from './backend-api-types/RegionData';

type RegionData = any;

@customElement('ens-regulation')
class EnsRegulation extends LitElement {
  width: number = 0;
  height: number = 50;

  @property({
    type: Number
  })
  start?: number;

  @property({
    type: Number
  })
  length?: number;

  @state()
  data: Array<{ x: number, value: number}> = [];

  @state()
  points: [number, number][] = [];

  connectedCallback(): void {
    super.connectedCallback();

    const { width} = this.getBoundingClientRect();

    this.width = width;
    this.fetchData();
  }

  updated(changedProperties: Map<string, any>) {
    if (changedProperties.has('start')) {
      this.fetchData();
    }
  }

  async fetchData() {
    const start = this.start;
    const length = this.length;

    if (!start || !length) {
      return;
    }

    const url = `http://localhost:3000/data?start=${start}&length=${length}`;

    const response = await fetch(url);
    const regionData: RegionData = await response.json();
    const { data } = regionData;

    this.data = fitDataToWidth({data, width: this.width, height: this.height });
    this.reportRegionData(regionData);
  }

  reportRegionData(payload: RegionData) {
    const event = new CustomEvent('dataloaded', {
      detail: payload
    });
    this.dispatchEvent(event);
  }

  getArea = () => {
    const width = this.width;
    const height = this.height;

    const area = d3.area()
      .x(datum => datum[0])
      .y0(height)
      .y1(datum => datum[1]);

    const svg = d3.create("svg")
      .attr("width", this.width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto;");


    const points = this.data.map(({ x, value }) => [x, value] as [number, number]);

    svg.append("path")
      .attr("fill", "steelblue")
      .attr("d", area(points));

    return svg.html();
  }

  render() {
    if (!this.width) {
      return;
    }
    
    // const polylinePointsAttr = this.points.map(pair => pair.join(',')).join(' ');
    // <polyline points="${polylinePointsAttr}" fill="none" stroke="red" stroke-width="3"/>

    const path = svg`${unsafeSVG(this.getArea())}`;

    return html`
      <svg viewBox="0 0 ${this.width} 50">
        ${ path }
      </svg>
    `
  }

  static styles = css`
    :host {
      display: block;
      height: 50px;
    }
  `
}

const fitDataToWidth = (params: {
  data: RegionData['data'],
  width: number;
  height: number;
}) => {
  const { data, width, height } = params;

  const scale = d3.scaleLinear().domain([0, 255]).range([0, height]);

  const result: { x: number, value: number }[] = [];

  if (data.length > width) {
    const step = Math.floor(data.length / width);

    const last = {
      x: width,
      value: scale(data.at(-1)?.value as number)
    };

    for (let i = 0; i < width - 1; i++) {
      if (i % step === 0) {
        let acc = 0;
        for (let j = i - step + 1; j <= i; j++) {
          const value = data[j]?.value;
          if (!value) {
            continue;
          }
          acc += scale(value);
        }
        const average = Math.round(acc / step);
        result.push({ x: i, value: average });
      }
    }

    result.push(last);

  } else if (data.length < width) {
    // TODO
  } else {
    // TODO
  }

  return result;
}

declare global {
  interface HTMLElementTagNameMap {
    'ens-regulation': EnsRegulation
  }
}

export default EnsRegulation;
