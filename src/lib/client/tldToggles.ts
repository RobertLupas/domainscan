import { defaultTldList } from "@/lib/shared/data.ts"

export type TldToggles = (typeof defaultTldList)[number]

export type TldToggleState = Record<TldToggles, boolean>

export const defaultTldToggleState = Object.fromEntries(
  defaultTldList.map((key) => [key, true])
) as TldToggleState
