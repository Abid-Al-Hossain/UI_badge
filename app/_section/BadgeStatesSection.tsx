"use client";
import React from "react";
import { SectionCard } from "@/components/shared/layout/ui";
import ColorControl from "@/components/shared/color/ColorControl";
import Slider from "@/components/shared/input/Slider";
import Switch from "@/components/shared/input/Switch";
import { SegmentedControl } from "@/components/shared/input/SegmentedControl";
import type { BadgeState } from "../types";

type SetterValue<T> = T | ((prev: T) => T);
type Props = {
  state: BadgeState;
  makeSetter: <K extends keyof BadgeState>(key: K) => (value: SetterValue<BadgeState[K]>) => void;
};

export default function BadgeStatesSection({ state, makeSetter }: Props) {
  return (
    <div className="space-y-4">
      <SectionCard title="Disabled state" subtitle="Disabled appearance and cursor.">
        <Switch label="Disabled" checked={state.disabled} onChange={makeSetter("disabled")} />
        <Slider label="Disabled opacity" value={state.disabledOpacity} min={0.1} max={1} step={0.05} onChange={makeSetter("disabledOpacity")} />
        <SegmentedControl
          label="Disabled cursor"
          value={state.disabledCursor}
          options={[{ label: "Not allowed", value: "not-allowed" }, { label: "Default", value: "default" }, { label: "Pointer", value: "pointer" }]}
          onChange={(v) => makeSetter("disabledCursor")(v as BadgeState["disabledCursor"])}
        />
      </SectionCard>
      <SectionCard title="Hover & focus" subtitle="Interactive hover colors and keyboard focus ring.">
        <ColorControl label="Hover background" value={state.hoverBgColor} onChange={makeSetter("hoverBgColor")} />
        <ColorControl label="Hover text" value={state.hoverTextColor} onChange={makeSetter("hoverTextColor")} />
        <Switch label="Focus ring" checked={state.focusRingEnabled} onChange={makeSetter("focusRingEnabled")} />
        <Slider label="Focus ring width" value={state.focusRingWidth} min={1} max={6} step={1} onChange={makeSetter("focusRingWidth")} />
        <ColorControl label="Focus ring color" value={state.focusRingColor} onChange={makeSetter("focusRingColor")} />
      </SectionCard>
      <SectionCard title="Border & transitions" subtitle="Border style and transition timing.">
        <SegmentedControl
          label="Border style"
          value={state.borderStyle}
          options={[{ label: "Solid", value: "solid" }, { label: "Dashed", value: "dashed" }, { label: "Dotted", value: "dotted" }]}
          onChange={(v) => makeSetter("borderStyle")(v as BadgeState["borderStyle"])}
        />
        <Slider label="Transition duration (ms)" value={state.transitionDuration} min={0} max={600} step={10} onChange={makeSetter("transitionDuration")} />
        <SegmentedControl
          label="Easing"
          value={state.transitionEasing}
          options={[{ label: "Ease", value: "ease" }, { label: "In", value: "ease-in" }, { label: "Out", value: "ease-out" }, { label: "In-out", value: "ease-in-out" }]}
          onChange={(v) => makeSetter("transitionEasing")(v as BadgeState["transitionEasing"])}
        />
      </SectionCard>
      <SectionCard title="Typography" subtitle="Letter spacing and text transform.">
        <Slider label="Letter spacing" value={state.letterSpacing} min={-2} max={6} step={0.5} onChange={makeSetter("letterSpacing")} />
        <SegmentedControl
          label="Text transform"
          value={state.textTransform}
          options={[{ label: "None", value: "none" }, { label: "Upper", value: "uppercase" }, { label: "Lower", value: "lowercase" }, { label: "Caps", value: "capitalize" }]}
          onChange={(v) => makeSetter("textTransform")(v as BadgeState["textTransform"])}
        />
      </SectionCard>
    </div>
  );
}
