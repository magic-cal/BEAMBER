/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MaintenanceLogController } from './../services/MaintenanceLogService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RecipeController } from './../services/RecipeService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RecipeStepController } from './../services/RecipeStepService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TagController } from './../services/TagService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ResourceController } from './../services/ResourceService';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "Guid": {
        "dataType": "refObject",
        "properties": {
            "value": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MaintenanceLog": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "resourceId": {"ref":"Guid","required":true},
            "type": {"dataType":"string","required":true},
            "details": {"dataType":"string","required":true},
            "timestamp": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "MaintenanceLogFilter": {
        "dataType": "refObject",
        "properties": {
            "maintenanceLogStepIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "resourceIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "FieldDef": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string","required":true},
            "tableID": {"dataType":"double","required":true},
            "columnID": {"dataType":"double","required":true},
            "dataTypeID": {"dataType":"double","required":true},
            "dataTypeSize": {"dataType":"double","required":true},
            "dataTypeModifier": {"dataType":"double","required":true},
            "format": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "QueryResult_any_": {
        "dataType": "refObject",
        "properties": {
            "command": {"dataType":"string","required":true},
            "rowCount": {"dataType":"double","required":true},
            "oid": {"dataType":"double","required":true},
            "fields": {"dataType":"array","array":{"ref":"FieldDef"},"required":true},
            "rows": {"dataType":"array","array":{"dataType":"any"},"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Recipe": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "requirementIds": {"dataType":"array","array":{"ref":"Guid"},"required":true},
            "readOnly": {"dataType":"union","subSchemas":[{"dataType":"enum","enums":[null]},{"dataType":"nestedObjectLiteral","nestedProperties":{"isComplete":{"dataType":"boolean","required":true},"isScheduled":{"dataType":"boolean","required":true},"isAssembly":{"dataType":"boolean","required":true},"endTime":{"dataType":"double","required":true},"startTime":{"dataType":"double","required":true}}}],"required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeFilter": {
        "dataType": "refObject",
        "properties": {
            "RecipeStepIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeStep": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "recipeRequirementId": {"ref":"Guid"},
            "tagId": {"ref":"Guid"},
            "recipeId": {"ref":"Guid","required":true},
            "resourceId": {"ref":"Guid"},
            "duration": {"dataType":"double","required":true},
            "capacity": {"dataType":"double","required":true},
            "start": {"dataType":"double","required":true},
            "sequence": {"dataType":"double","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeStepFilter": {
        "dataType": "refObject",
        "properties": {
            "recipeIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Tag": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "TagFilter": {
        "dataType": "refObject",
        "properties": {
            "resourceIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResourceReadonly": {
        "dataType": "refObject",
        "properties": {
            "tagList": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Resource": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "tags": {"dataType":"array","array":{"ref":"Tag"},"required":true},
            "readOnly": {"ref":"ResourceReadonly","required":true},
            "capacity": {"dataType":"double","required":true},
            "currentStep": {"ref":"Guid","required":true},
            "maintananceRequired": {"dataType":"boolean","required":true},
            "active": {"dataType":"boolean","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "ResourceFilter": {
        "dataType": "refObject",
        "properties": {
            "tagIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
};
const validationService = new ValidationService(models);

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

export function RegisterRoutes(app: express.Router) {
    // ###########################################################################################################
    //  NOTE: If you do not see routes for all of your controllers in this file, then you might not have informed tsoa of where to look
    //      Please look into the "controllerPathGlobs" config option described in the readme: https://github.com/lukeautry/tsoa
    // ###########################################################################################################
        app.post('/maintenanceLog/get',
            function MaintenanceLogController_getMaintenanceLog(request: any, response: any, next: any) {
            const args = {
                    maintenanceLogId: {"in":"body","name":"maintenanceLogId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new MaintenanceLogController();


            const promise = controller.getMaintenanceLog.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/maintenanceLog/get-by',
            function MaintenanceLogController_getMaintenanceLogsByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"MaintenanceLogFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new MaintenanceLogController();


            const promise = controller.getMaintenanceLogsByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/maintenanceLog/delete',
            function MaintenanceLogController_deleteMaintenanceLog(request: any, response: any, next: any) {
            const args = {
                    maintenanceLogId: {"in":"body","name":"maintenanceLogId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new MaintenanceLogController();


            const promise = controller.deleteMaintenanceLog.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/maintenanceLog/update',
            function MaintenanceLogController_updateOrCreateMaintenanceLog(request: any, response: any, next: any) {
            const args = {
                    maintenanceLog: {"in":"body","name":"maintenanceLog","required":true,"ref":"MaintenanceLog"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new MaintenanceLogController();


            const promise = controller.updateOrCreateMaintenanceLog.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Recipe/get',
            function RecipeController_getRecipe(request: any, response: any, next: any) {
            const args = {
                    recipeId: {"in":"body","name":"recipeId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeController();


            const promise = controller.getRecipe.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Recipe/get-by',
            function RecipeController_getRecipesByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"RecipeFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeController();


            const promise = controller.getRecipesByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/Recipe/delete',
            function RecipeController_deleteRecipe(request: any, response: any, next: any) {
            const args = {
                    recipeId: {"in":"body","name":"recipeId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeController();


            const promise = controller.deleteRecipe.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/Recipe/update',
            function RecipeController_updateOrCreateRecipe(request: any, response: any, next: any) {
            const args = {
                    recipe: {"in":"body","name":"recipe","required":true,"ref":"Recipe"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeController();


            const promise = controller.updateOrCreateRecipe.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/RecipeStep/get',
            function RecipeStepController_getRecipeStep(request: any, response: any, next: any) {
            const args = {
                    recipeStepId: {"in":"body","name":"recipeStepId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeStepController();


            const promise = controller.getRecipeStep.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/RecipeStep/get-by',
            function RecipeStepController_getRecipeStepsByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"RecipeStepFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeStepController();


            const promise = controller.getRecipeStepsByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/RecipeStep/delete',
            function RecipeStepController_deleteRecipeStep(request: any, response: any, next: any) {
            const args = {
                    recipeStepId: {"in":"body","name":"recipeStepId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeStepController();


            const promise = controller.deleteRecipeStep.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/RecipeStep/update',
            function RecipeStepController_updateOrCreateRecipeStep(request: any, response: any, next: any) {
            const args = {
                    recipeStep: {"in":"body","name":"recipeStep","required":true,"ref":"RecipeStep"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new RecipeStepController();


            const promise = controller.updateOrCreateRecipeStep.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tag/get',
            function TagController_getTag(request: any, response: any, next: any) {
            const args = {
                    tagId: {"in":"body","name":"tagId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.getTag.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/tag/get-by',
            function TagController_getTagsByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"TagFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.getTagsByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/tag/delete',
            function TagController_deleteTag(request: any, response: any, next: any) {
            const args = {
                    tagId: {"in":"body","name":"tagId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.deleteTag.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/tag/update',
            function TagController_updateOrCreateTag(request: any, response: any, next: any) {
            const args = {
                    tag: {"in":"body","name":"tag","required":true,"ref":"Tag"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new TagController();


            const promise = controller.updateOrCreateTag.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/resource/get',
            function ResourceController_getResource(request: any, response: any, next: any) {
            const args = {
                    resourceId: {"in":"body","name":"resourceId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ResourceController();


            const promise = controller.getResource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/resource/get-by',
            function ResourceController_getResourcesByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"ResourceFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ResourceController();


            const promise = controller.getResourcesByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/resource/delete',
            function ResourceController_deleteResource(request: any, response: any, next: any) {
            const args = {
                    resourceId: {"in":"body","name":"resourceId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ResourceController();


            const promise = controller.deleteResource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/resource/update',
            function ResourceController_updateOrCreateResource(request: any, response: any, next: any) {
            const args = {
                    resource: {"in":"body","name":"resource","required":true,"ref":"Resource"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ResourceController();


            const promise = controller.updateOrCreateResource.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa


    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function isController(object: any): object is Controller {
        return 'getHeaders' in object && 'getStatus' in object && 'setStatus' in object;
    }

    function promiseHandler(controllerObj: any, promise: any, response: any, successStatus: any, next: any) {
        return Promise.resolve(promise)
            .then((data: any) => {
                let statusCode = successStatus;
                let headers;
                if (isController(controllerObj)) {
                    headers = controllerObj.getHeaders();
                    statusCode = controllerObj.getStatus() || statusCode;
                }

                // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

                returnHandler(response, statusCode, data, headers)
            })
            .catch((error: any) => next(error));
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function returnHandler(response: any, statusCode?: number, data?: any, headers: any = {}) {
        if (response.headersSent) {
            return;
        }
        Object.keys(headers).forEach((name: string) => {
            response.set(name, headers[name]);
        });
        if (data && typeof data.pipe === 'function' && data.readable && typeof data._read === 'function') {
            data.pipe(response);
        } else if (data !== null && data !== undefined) {
            response.status(statusCode || 200).json(data);
        } else {
            response.status(statusCode || 204).end();
        }
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function responder(response: any): TsoaResponse<HttpStatusCodeLiteral, unknown>  {
        return function(status, data, headers) {
            returnHandler(response, status, data, headers);
        };
    };

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

    function getValidatedArgs(args: any, request: any, response: any): any[] {
        const fieldErrors: FieldErrors  = {};
        const values = Object.keys(args).map((key) => {
            const name = args[key].name;
            switch (args[key].in) {
                case 'request':
                    return request;
                case 'query':
                    return validationService.ValidateParam(args[key], request.query[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'path':
                    return validationService.ValidateParam(args[key], request.params[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'header':
                    return validationService.ValidateParam(args[key], request.header(name), name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'body':
                    return validationService.ValidateParam(args[key], request.body, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                case 'body-prop':
                    return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, 'body.', {"noImplicitAdditionalProperties":"ignore"});
                case 'formData':
                    if (args[key].dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.file, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                    } else if (args[key].dataType === 'array' && args[key].array.dataType === 'file') {
                        return validationService.ValidateParam(args[key], request.files, name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                    } else {
                        return validationService.ValidateParam(args[key], request.body[name], name, fieldErrors, undefined, {"noImplicitAdditionalProperties":"ignore"});
                    }
                case 'res':
                    return responder(response);
            }
        });

        if (Object.keys(fieldErrors).length > 0) {
            throw new ValidateError(fieldErrors, '');
        }
        return values;
    }

    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
}

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
