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


import * as runtime from '../runtime';
import {
    Guid,
    GuidFromJSON,
    GuidToJSON,
    QueryResultAny,
    QueryResultAnyFromJSON,
    QueryResultAnyToJSON,
    Recipe,
    RecipeFromJSON,
    RecipeToJSON,
    RecipeFilter,
    RecipeFilterFromJSON,
    RecipeFilterToJSON,
} from '../models';

export interface DeleteRecipeRequest {
    recipeId: Guid;
}

export interface GetRecipeRequest {
    recipeId: Guid;
}

export interface GetRecipesByFilterRequest {
    filter?: RecipeFilter;
}

export interface UpdateOrCreateRecipeRequest {
    recipe: Recipe;
}

/**
 * 
 */
export class RecipeApi extends runtime.BaseAPI {

    /**
     */
    async deleteRecipeRaw(requestParameters: DeleteRecipeRequest): Promise<runtime.ApiResponse<boolean>> {
        if (requestParameters.recipeId === null || requestParameters.recipeId === undefined) {
            throw new runtime.RequiredError('recipeId','Required parameter requestParameters.recipeId was null or undefined when calling deleteRecipe.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Recipe/delete`,
            method: 'DELETE',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.recipeId),
        });

        return new runtime.TextApiResponse(response) as any;
    }

    /**
     */
    async deleteRecipe(requestParameters: DeleteRecipeRequest): Promise<boolean> {
        const response = await this.deleteRecipeRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getRecipeRaw(requestParameters: GetRecipeRequest): Promise<runtime.ApiResponse<Recipe>> {
        if (requestParameters.recipeId === null || requestParameters.recipeId === undefined) {
            throw new runtime.RequiredError('recipeId','Required parameter requestParameters.recipeId was null or undefined when calling getRecipe.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Recipe/get`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: GuidToJSON(requestParameters.recipeId),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => RecipeFromJSON(jsonValue));
    }

    /**
     */
    async getRecipe(requestParameters: GetRecipeRequest): Promise<Recipe> {
        const response = await this.getRecipeRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async getRecipesByFilterRaw(requestParameters: GetRecipesByFilterRequest): Promise<runtime.ApiResponse<Array<Recipe>>> {
        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Recipe/get-by`,
            method: 'POST',
            headers: headerParameters,
            query: queryParameters,
            body: RecipeFilterToJSON(requestParameters.filter),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => jsonValue.map(RecipeFromJSON));
    }

    /**
     */
    async getRecipesByFilter(requestParameters: GetRecipesByFilterRequest): Promise<Array<Recipe>> {
        const response = await this.getRecipesByFilterRaw(requestParameters);
        return await response.value();
    }

    /**
     */
    async updateOrCreateRecipeRaw(requestParameters: UpdateOrCreateRecipeRequest): Promise<runtime.ApiResponse<QueryResultAny>> {
        if (requestParameters.recipe === null || requestParameters.recipe === undefined) {
            throw new runtime.RequiredError('recipe','Required parameter requestParameters.recipe was null or undefined when calling updateOrCreateRecipe.');
        }

        const queryParameters: any = {};

        const headerParameters: runtime.HTTPHeaders = {};

        headerParameters['Content-Type'] = 'application/json';

        const response = await this.request({
            path: `/Recipe/update`,
            method: 'PUT',
            headers: headerParameters,
            query: queryParameters,
            body: RecipeToJSON(requestParameters.recipe),
        });

        return new runtime.JSONApiResponse(response, (jsonValue) => QueryResultAnyFromJSON(jsonValue));
    }

    /**
     */
    async updateOrCreateRecipe(requestParameters: UpdateOrCreateRecipeRequest): Promise<QueryResultAny> {
        const response = await this.updateOrCreateRecipeRaw(requestParameters);
        return await response.value();
    }

}