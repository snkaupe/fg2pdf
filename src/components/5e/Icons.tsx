import { JSX } from "react";


export interface DnDIcons {
    readonly weaponProperties: JSX.Element;
    readonly spellSlotMarker: JSX.Element;
    readonly spellPreparedMarker: JSX.Element;
    readonly spellComponents: JSX.Element;
    readonly spellRange: JSX.Element;
    readonly spellCastingTime: JSX.Element;
    readonly spellDuration: JSX.Element;
    readonly spellDamage: JSX.Element;
    readonly spellEffect: JSX.Element;
}

const ICON_SIZE: number = 20;
const ICON_SIZE_INLINE: number = 14;

const STROKE_WIDTH: number = 1.25;

export const Icons: DnDIcons = {
    get weaponProperties(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-brackets-contain"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M7 4h-4v16h4" /><path d="M17 4h4v16h-4" /><path d="M8 16h.01" /><path d="M12 16h.01" /><path d="M16 16h.01" /></svg>;
    },

    get spellSlotMarker(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE_INLINE} height={ICON_SIZE_INLINE} viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>;
    },

    get spellPreparedMarker(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-circle"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-9 0a9 9 0 1 0 18 0a9 9 0 1 0 -18 0" /></svg>;
    },

    get spellComponents(): JSX.Element {
        return <svg  xmlns="http://www.w3.org/2000/svg"  width={ICON_SIZE}  height={ICON_SIZE}  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width={STROKE_WIDTH}  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-components"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M3 12l3 3l3 -3l-3 -3z" /><path d="M15 12l3 3l3 -3l-3 -3z" /><path d="M9 6l3 3l3 -3l-3 -3z" /><path d="M9 18l3 3l3 -3l-3 -3z" /></svg>;
    },

    get spellRange(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-ruler-measure"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M19.875 12c.621 0 1.125 .512 1.125 1.143v5.714c0 .631 -.504 1.143 -1.125 1.143h-15.875a1 1 0 0 1 -1 -1v-5.857c0 -.631 .504 -1.143 1.125 -1.143h15.75z" /><path d="M9 12v2" /><path d="M6 12v3" /><path d="M12 12v3" /><path d="M18 12v3" /><path d="M15 12v2" /><path d="M3 3v4" /><path d="M3 5h18" /><path d="M21 3v4" /></svg>;
    },

    get spellCastingTime(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-wand"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M6 21l15 -15l-3 -3l-15 15l3 3" /><path d="M15 6l3 3" /><path d="M9 3a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /><path d="M19 13a2 2 0 0 0 2 2a2 2 0 0 0 -2 2a2 2 0 0 0 -2 -2a2 2 0 0 0 2 -2" /></svg>;
    },

    get spellDuration(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-clock"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M3 12a9 9 0 1 0 18 0a9 9 0 0 0 -18 0" /><path d="M12 7v5l3 3" /></svg>;
    },

    get spellDamage(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-current-location"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M12 12m-3 0a3 3 0 1 0 6 0a3 3 0 1 0 -6 0" /><path d="M12 12m-8 0a8 8 0 1 0 16 0a8 8 0 1 0 -16 0" /><path d="M12 2l0 2" /><path d="M12 20l0 2" /><path d="M20 12l2 0" /><path d="M2 12l2 0" /></svg>;
    },

    get spellEffect(): JSX.Element {
        return <svg xmlns="http://www.w3.org/2000/svg" width={ICON_SIZE} height={ICON_SIZE} viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width={STROKE_WIDTH} stroke-linecap="round" stroke-linejoin="round" class="icon icon-tabler icons-tabler-outline icon-tabler-stars"><path stroke="none" d="M0 0h24v24H0z" fill="none" /><path d="M17.8 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /><path d="M6.2 19.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /><path d="M12 9.817l-2.172 1.138a.392 .392 0 0 1 -.568 -.41l.415 -2.411l-1.757 -1.707a.389 .389 0 0 1 .217 -.665l2.428 -.352l1.086 -2.193a.392 .392 0 0 1 .702 0l1.086 2.193l2.428 .352a.39 .39 0 0 1 .217 .665l-1.757 1.707l.414 2.41a.39 .39 0 0 1 -.567 .411l-2.172 -1.138z" /></svg>
    }
}
