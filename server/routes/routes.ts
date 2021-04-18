/* tslint:disable */
/* eslint-disable */
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { Controller, ValidationService, FieldErrors, ValidateError, TsoaRoute, HttpStatusCodeLiteral, TsoaResponse } from '@tsoa/runtime';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RecipeStepController } from './../services/RecipeStepService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { RecipeController } from './../services/RecipeService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AssemblyController } from './../services/AssemblyService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { AssemblyStepController } from './../services/AssemblyStepService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { BusinessHourController } from './../services/BusinessHoursService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { LeaseController } from './../services/LeaseService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { DataService } from './../services/DataService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { MaintenanceLogController } from './../services/MaintenanceLogService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { TagController } from './../services/TagService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ResourceController } from './../services/ResourceService';
// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
import { ScheduleService } from './../services/ScheduleService';
import * as express from 'express';

// WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

const models: TsoaRoute.Models = {
    "UUID": {
        "dataType": "refAlias",
        "type": {"dataType":"string","validators":{"pattern":{"value":"[0-9A-Fa-f]{8}-[0-9A-Fa-f]{4}-4[0-9A-Fa-f]{3}-[89ABab][0-9A-Fa-f]{3}-[0-9A-Fa-f]{12}"}}},
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Guid": {
        "dataType": "refObject",
        "properties": {
            "value": {"ref":"UUID","required":true},
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
    "Assembly": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "complete": {"dataType":"boolean","required":true},
            "parentId": {"ref":"Guid"},
            "recipeId": {"ref":"Guid"},
            "recipeProductId": {"ref":"Guid"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AssemblyFilter": {
        "dataType": "refObject",
        "properties": {
            "AssemblyStepIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AssemblyStep": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "assemblyId": {"ref":"Guid","required":true},
            "assemblyRequirementId": {"ref":"Guid"},
            "tagId": {"ref":"Guid"},
            "resourceId": {"ref":"Guid"},
            "duration": {"dataType":"double","required":true},
            "capacity": {"dataType":"double","required":true},
            "sequence": {"dataType":"double","required":true},
            "complete": {"dataType":"boolean","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "AssemblyStepFilter": {
        "dataType": "refObject",
        "properties": {
            "assemblyIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EnumDay": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"double","required":true},
            "value": {"dataType":"string","required":true},
            "translationKey": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BusinessHour": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "day": {"ref":"EnumDay","required":true},
            "startTime": {"dataType":"datetime"},
            "endTime": {"dataType":"datetime"},
            "tagId": {"ref":"Guid"},
            "isOpen": {"dataType":"boolean","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "BusinessHourFilter": {
        "dataType": "refObject",
        "properties": {
            "onlyBusinessHours": {"dataType":"boolean","default":false},
            "dateStart": {"dataType":"boolean","default":false},
            "dateEnd": {"dataType":"boolean","default":false},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "EnumLeaseType": {
        "dataType": "refObject",
        "properties": {
            "key": {"dataType":"double","required":true},
            "value": {"dataType":"string","required":true},
            "translationKey": {"dataType":"string","required":true},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "Lease": {
        "dataType": "refObject",
        "properties": {
            "versionNo": {"dataType":"double","required":true},
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "resourceId": {"ref":"Guid","required":true},
            "endTime": {"dataType":"datetime","required":true},
            "startTime": {"dataType":"datetime","required":true},
            "leaseType": {"ref":"EnumLeaseType","required":true},
            "maintenanceId": {"ref":"Guid"},
            "assemblyStepId": {"ref":"Guid"},
            "packagingId": {"ref":"Guid"},
            "productId": {"ref":"Guid"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "LeaseFilter": {
        "dataType": "refObject",
        "properties": {
            "LeaseStepIds": {"dataType":"array","array":{"ref":"Guid"},"default":[]},
            "includeDeleted": {"dataType":"boolean","default":false},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeBreakdownSteps": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "duration": {"dataType":"double"},
        },
        "additionalProperties": true,
    },
    // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
    "RecipeBreakdown": {
        "dataType": "refObject",
        "properties": {
            "name": {"dataType":"string"},
            "description": {"dataType":"string"},
            "breakdownSteps": {"dataType":"array","array":{"ref":"RecipeBreakdownSteps"},"required":true},
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
    "Tag": {
        "dataType": "refObject",
        "properties": {
            "id": {"ref":"Guid","required":true},
            "name": {"dataType":"string","required":true},
            "description": {"dataType":"string","required":true},
            "capacity": {"dataType":"double","required":true},
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
        app.post('/Assembly/get',
            function AssemblyController_getAssembly(request: any, response: any, next: any) {
            const args = {
                    assemblyId: {"in":"body","name":"assemblyId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyController();


            const promise = controller.getAssembly.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Assembly/get-by',
            function AssemblyController_getAssembliesByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"AssemblyFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyController();


            const promise = controller.getAssembliesByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/Assembly/delete',
            function AssemblyController_deleteAssembly(request: any, response: any, next: any) {
            const args = {
                    assemblyId: {"in":"body","name":"assemblyId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyController();


            const promise = controller.deleteAssembly.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/Assembly/update',
            function AssemblyController_updateOrCreateAssembly(request: any, response: any, next: any) {
            const args = {
                    assembly: {"in":"body","name":"assembly","required":true,"ref":"Assembly"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyController();


            const promise = controller.updateOrCreateAssembly.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/AssemblyStep/get',
            function AssemblyStepController_getAssemblyStep(request: any, response: any, next: any) {
            const args = {
                    assemblyStepId: {"in":"body","name":"assemblyStepId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyStepController();


            const promise = controller.getAssemblyStep.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/AssemblyStep/get-by',
            function AssemblyStepController_getAssemblyStepsByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"AssemblyStepFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyStepController();


            const promise = controller.getAssemblyStepsByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/AssemblyStep/delete',
            function AssemblyStepController_deleteAssemblyStep(request: any, response: any, next: any) {
            const args = {
                    assemblyStepId: {"in":"body","name":"assemblyStepId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyStepController();


            const promise = controller.deleteAssemblyStep.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/AssemblyStep/update',
            function AssemblyStepController_updateOrCreateAssemblyStep(request: any, response: any, next: any) {
            const args = {
                    assemblyStep: {"in":"body","name":"assemblyStep","required":true,"ref":"AssemblyStep"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new AssemblyStepController();


            const promise = controller.updateOrCreateAssemblyStep.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/BusinessHour/get',
            function BusinessHourController_getBusinessHour(request: any, response: any, next: any) {
            const args = {
                    businessHourId: {"in":"body","name":"businessHourId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessHourController();


            const promise = controller.getBusinessHour.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/BusinessHour/get-by',
            function BusinessHourController_getBusinessHoursByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"BusinessHourFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessHourController();


            const promise = controller.getBusinessHoursByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/BusinessHour/delete',
            function BusinessHourController_deleteBusinessHour(request: any, response: any, next: any) {
            const args = {
                    businessHourId: {"in":"body","name":"businessHourId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessHourController();


            const promise = controller.deleteBusinessHour.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/BusinessHour/update',
            function BusinessHourController_updateOrCreateBusinessHour(request: any, response: any, next: any) {
            const args = {
                    businessHour: {"in":"body","name":"businessHour","required":true,"ref":"BusinessHour"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new BusinessHourController();


            const promise = controller.updateOrCreateBusinessHour.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Lease/get',
            function LeaseController_getLease(request: any, response: any, next: any) {
            const args = {
                    leaseId: {"in":"body","name":"leaseId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LeaseController();


            const promise = controller.getLease.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Lease/get-by',
            function LeaseController_getLeasesByFilter(request: any, response: any, next: any) {
            const args = {
                    filter: {"in":"body","name":"filter","ref":"LeaseFilter"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LeaseController();


            const promise = controller.getLeasesByFilter.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.delete('/Lease/delete',
            function LeaseController_deleteLease(request: any, response: any, next: any) {
            const args = {
                    leaseId: {"in":"body","name":"leaseId","required":true,"ref":"Guid"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LeaseController();


            const promise = controller.deleteLease.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.put('/Lease/update',
            function LeaseController_updateOrCreateLease(request: any, response: any, next: any) {
            const args = {
                    lease: {"in":"body","name":"lease","required":true,"ref":"Lease"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new LeaseController();


            const promise = controller.updateOrCreateLease.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Data/clear-assemblies',
            function DataService_clearAssemblies(request: any, response: any, next: any) {
            const args = {
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new DataService();


            const promise = controller.clearAssemblies.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/Data/create-recipes',
            function DataService_createRecipesFromSteps(request: any, response: any, next: any) {
            const args = {
                    recipeBreakdown: {"in":"body","name":"recipeBreakdown","required":true,"ref":"RecipeBreakdown"},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new DataService();


            const promise = controller.createRecipesFromSteps.apply(controller, validatedArgs as any);
            promiseHandler(controller, promise, response, undefined, next);
        });
        // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa
        app.post('/MaintenanceLog/get',
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
        app.post('/MaintenanceLog/get-by',
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
        app.delete('/MaintenanceLog/delete',
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
        app.put('/MaintenanceLog/update',
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
        app.post('/Tag/get',
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
        app.post('/Tag/get-by',
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
        app.delete('/Tag/delete',
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
        app.put('/Tag/update',
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
        app.post('/Resource/get',
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
        app.post('/Resource/get-by',
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
        app.delete('/Resource/delete',
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
        app.put('/Resource/update',
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
        app.post('/Schedule/recipes',
            function ScheduleService_scheduleRecipes(request: any, response: any, next: any) {
            const args = {
                    recipeIds: {"in":"body","name":"recipeIds","required":true,"dataType":"array","array":{"ref":"Guid"}},
            };

            // WARNING: This file was auto-generated with tsoa. Please do not modify it. Re-run tsoa to re-generate this file: https://github.com/lukeautry/tsoa

            let validatedArgs: any[] = [];
            try {
                validatedArgs = getValidatedArgs(args, request, response);
            } catch (err) {
                return next(err);
            }

            const controller = new ScheduleService();


            const promise = controller.scheduleRecipes.apply(controller, validatedArgs as any);
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
