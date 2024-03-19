import { LitElement } from 'lit';
type RegionData = any;
declare class EnsRegulation extends LitElement {
    width: number;
    height: number;
    start?: number;
    length?: number;
    data: Array<{
        x: number;
        value: number;
    }>;
    points: [number, number][];
    connectedCallback(): void;
    updated(changedProperties: Map<string, any>): void;
    fetchData(): Promise<void>;
    reportRegionData(payload: RegionData): void;
    getArea: () => string;
    render(): import("lit-html").TemplateResult<1> | undefined;
    static styles: import("lit").CSSResult;
}
declare global {
    interface HTMLElementTagNameMap {
        'ens-regulation': EnsRegulation;
    }
}
export default EnsRegulation;
