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
import {
    Guid,
    GuidFromJSON,
    GuidFromJSONTyped,
    GuidToJSON,
} from './';

/**
 * 
 * @export
 * @interface RecipeStep
 */
export interface RecipeStep {
    /**
     * 
     * @type {Guid}
     * @memberof RecipeStep
     */
    id: Guid;
    /**
     * 
     * @type {string}
     * @memberof RecipeStep
     */
    name: string;
    /**
     * 
     * @type {string}
     * @memberof RecipeStep
     */
    description: string;
    /**
     * 
     * @type {Guid}
     * @memberof RecipeStep
     */
    recipeRequirementId: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof RecipeStep
     */
    tagId: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof RecipeStep
     */
    recipeId: Guid;
    /**
     * 
     * @type {Guid}
     * @memberof RecipeStep
     */
    resourceId: Guid;
    /**
     * 
     * @type {number}
     * @memberof RecipeStep
     */
    duration: number;
    /**
     * 
     * @type {number}
     * @memberof RecipeStep
     */
    capacity: number;
    /**
     * 
     * @type {number}
     * @memberof RecipeStep
     */
    start: number;
}

export function RecipeStepFromJSON(json: any): RecipeStep {
    return RecipeStepFromJSONTyped(json, false);
}

export function RecipeStepFromJSONTyped(json: any, ignoreDiscriminator: boolean): RecipeStep {
    if ((json === undefined) || (json === null)) {
        return json;
    }
    return {
        
        'id': GuidFromJSON(json['id']),
        'name': json['name'],
        'description': json['description'],
        'recipeRequirementId': GuidFromJSON(json['recipeRequirementId']),
        'tagId': GuidFromJSON(json['tagId']),
        'recipeId': GuidFromJSON(json['recipeId']),
        'resourceId': GuidFromJSON(json['resourceId']),
        'duration': json['duration'],
        'capacity': json['capacity'],
        'start': json['start'],
    };
}

export function RecipeStepToJSON(value?: RecipeStep | null): any {
    if (value === undefined) {
        return undefined;
    }
    if (value === null) {
        return null;
    }
    return {
        
        'id': GuidToJSON(value.id),
        'name': value.name,
        'description': value.description,
        'recipeRequirementId': GuidToJSON(value.recipeRequirementId),
        'tagId': GuidToJSON(value.tagId),
        'recipeId': GuidToJSON(value.recipeId),
        'resourceId': GuidToJSON(value.resourceId),
        'duration': value.duration,
        'capacity': value.capacity,
        'start': value.start,
    };
}


