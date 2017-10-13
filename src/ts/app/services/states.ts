import { InjectionToken } from "@angular/core";

export type States = [ { name: string, abbreviation: string }];

export const STATES = new InjectionToken<States>("states");

export const states: States = [
    {
        name: "Alabama",
        abbreviation: "AL",
    },
    {
        name: "Alaska",
        abbreviation: "AK",
    },
    {
        name: "American Samoa",
        abbreviation: "AS",
    },
    {
        name: "Arizona",
        abbreviation: "AZ",
    }
]