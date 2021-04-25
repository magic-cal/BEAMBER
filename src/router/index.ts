import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Home from "../views/Home.vue"
import EditResource from "@/views/resources/EditResource.vue"
import ListResources from "@/views/resources/ListResources.vue"
import EditTag from "@/views/tags/EditTag.vue"
import ListTags from "@/views/tags/ListTags.vue"
import EditRecipe from "@/views/recipes/EditRecipe.vue"
import EditRecipeStep from "@/views/recipes/EditRecipeStep.vue"
import ListRecipes from "@/views/recipes/ListRecipes.vue"
import ManageMaintenanceLog from "@/views/resources/ManageMaintenanceLog.vue"
import EditMaintenanceLog from "@/views/resources/EditMaintenanceLog.vue"
import GanttTest from "@/views/dev/GanttTest.vue"
import Schedule from "@/views/scheduling/Schedule.vue"
import Settings from "@/views/settings/Settings.vue"

Vue.use(VueRouter)

export const routes: Array<RouteConfig> = [
  {
    path: "/",
    name: "Home",
    component: Home
  },
  {
    path: "/list-resources",
    name: "ResourceList",
    component: ListResources
  },
  {
    path: "/resource-management/:resourceId",
    name: "EditResource",
    component: EditResource,
    props: (route) => ({
      resourceId: route.params["resourceId"]
    })
  },
  {
    path: "/list-tags",
    name: "TagList",
    component: ListTags
  },
  {
    path: "/tag-management/:tagId",
    name: "EditTag",
    component: EditTag,
    props: (route) => ({
      tagId: route.params["tagId"]
    })
  },
  {
    path: "/list-recipes",
    name: "RecipeList",
    component: ListRecipes
  },
  {
    path: "/recipe-management/:recipeId",
    name: "EditRecipe",
    component: EditRecipe,
    props: (route) => ({
      recipeId: route.params["recipeId"]
    })
  },
  {
    path: "/recipe-step-management/:recipeStepId",
    name: "EditRecipeStep",
    component: EditRecipeStep,
    props: (route) => ({
      recipeStepId: route.params["recipeStepId"]
    })
  },
  {
    path: "/recipe-step-create/:recipeId",
    name: "AddRecipeStep",
    component: EditRecipeStep,
    props: (route) => ({
      recipeId: route.params["recipeId"]
    })
  },
  {
    path: "/manage-maintenance-log/:resourceId",
    name: "ManageMaintenanceLog",
    component: ManageMaintenanceLog,
    props: (route) => ({
      resourceId: route.params["resourceId"]
    })
  },
  {
    path: "/edit-maintenance-log/:maintenanceLogId",
    name: "EditMaintenanceLog",
    component: EditMaintenanceLog,
    props: (route) => ({
      maintenanceLogId: route.params["maintenanceLogId"]
    })
  },
  {
    path: "/create-maintenance-log/:resourceId",
    name: "CreateMaintenanceLog",
    component: EditMaintenanceLog,
    props: (route) => ({
      resourceId: route.params["resourceId"]
    })
  },
  {
    path: "/test/gantt",
    name: "GanttTest",
    component: GanttTest
    // props: (route) => ({
    //   resourceId: route.params["resourceId"]
    // })
  },
  {
    path: "/schedule",
    name: "Schedule",
    component: Schedule
    // props: (route) => ({
    //   resourceId: route.params["resourceId"]
    // })
  },
  {
    path: "/settings",
    name: "Settings",
    component: Settings
    // props: (route) => ({
    //   resourceId: route.params["resourceId"]
    // })
  }
  // {
  //   path: "/breweries/:resourceId",
  //   name: "Brewery",
  //   component: () =>
  //     import(/* webpackChunkName: "brewery" */ "../views/Brewery.vue"),
  //   props: (route) => ({
  //     breweryId: route.params["breweryId"],
  // }),
  // {
  //   path: "/resource-types",
  //   name: "ResourceTypes",
  //   component: ViewContainers,
  // },
  // {
  //   path: "/scheduling",
  //   name: "Scheduling",
  //   component: ViewContainers,
  // },
  // {
  //   path: "/breweries/:breweryId",
  //   name: "Brewery",
  //   component: () =>
  //     import(/* webpackChunkName: "brewery" */ "../views/Brewery.vue"),
  //   props: (route) => ({
  //     breweryId: route.params["breweryId"],
  // }),
  // },
]

const router = new VueRouter({
  mode: "history",
  routes
})

export default router
