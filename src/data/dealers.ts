import source from "./dealers.source.json";
import type { Dealer } from "@/lib/types";

/**
 * Dealer directory exported from the Agile Store Locator on
 * https://arcticspinner.com/dealers/ (47 locations).
 * Records are reproduced as published; state abbreviations were normalized.
 */
export const dealers: Dealer[] = [...(source as Dealer[])].sort((a, b) =>
  a.state === b.state ? a.city.localeCompare(b.city) || a.name.localeCompare(b.name) : a.state.localeCompare(b.state),
);

export const dealerStates = [...new Set(dealers.map((d) => d.state))].sort();
