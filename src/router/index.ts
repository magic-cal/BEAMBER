import Vue from "vue"
import VueRouter, { RouteConfig } from "vue-router"
import Home from "../views/Home.vue"
import Admin from "@/views/Admin.vue"
import EditResource from "@/views/resources/EditResource.vue"
import ListResources from "@/views/resources/ListResources.vue"
import EditTag from "@/views/tags/EditTag.vue"
import ListTags from "@/views/tags/ListTags.vue"

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
    props: route => ({
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
    props: route => ({
      tagId: route.params["tagId"]
    })
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