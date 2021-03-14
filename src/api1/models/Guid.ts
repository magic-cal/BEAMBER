/* tslint:disable */
/* eslint-disable */
import { exists, mapValues } from '../runtime';
import Guid from "@/../utils/classes/common/guid"

export {Guid as Guid}

export function GuidFromJSON(json: any): Guid {
    return GuidFromJSONTyped(json, false);
}


export function GuidFromJSONTyped(json: any, ignoreDiscriminator: boolean): Guid {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return  Guid.fromString(json['value']);
}

export function GuidToJSON(value?: Guid | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        'value': value.value,
    };
}


