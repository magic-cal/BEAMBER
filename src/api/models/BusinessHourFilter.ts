/* tslint:disable */
/* eslint-disable */
/**
 * amber
 * No description provided (generated by Openapi Generator https://github.com/openapitools/openapi-generator)
 *
 * The version of the OpenAPI document: 2.0.0
 * 
 *
 * NOTE: This class is auto generated by OpenAPI Generator (https://openapi-generator.tech).
 * https://openapi-generator.tech
 * Do not edit the class manually.
 */

import { exists, mapValues } from '../runtime';
/**
 * 
 * @export
 * @interface BusinessHourFilter
 */
export interface BusinessHourFilter {
    /**
     * 
     * @type {boolean}
     * @memberof BusinessHourFilter
     */
    onlyBusinessHours?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof BusinessHourFilter
     */
    dateStart?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof BusinessHourFilter
     */
    dateEnd?: boolean;
    /**
     * 
     * @type {boolean}
     * @memberof BusinessHourFilter
     */
    includeDeleted?: boolean;
}

export function BusinessHourFilterFromJSON(json: any): BusinessHourFilter {
    return BusinessHourFilterFromJSONTyped(json, false);
}

export function BusinessHourFilterFromJSONTyped(json: any, ignoreDiscriminator: boolean): BusinessHourFilter {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'onlyBusinessHours': !exists(json, 'onlyBusinessHours') ? undefined : json['onlyBusinessHours'],
        'dateStart': !exists(json, 'dateStart') ? undefined : json['dateStart'],
        'dateEnd': !exists(json, 'dateEnd') ? undefined : json['dateEnd'],
        'includeDeleted': !exists(json, 'includeDeleted') ? undefined : json['includeDeleted'],
    };
}

export function BusinessHourFilterToJSON(value?: BusinessHourFilter | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'onlyBusinessHours': value.onlyBusinessHours,
        'dateStart': value.dateStart,
        'dateEnd': value.dateEnd,
        'includeDeleted': value.includeDeleted,
    };
}


