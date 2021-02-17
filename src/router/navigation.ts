export interface NavigationItem {
  id: string | null
  name: string
  icon: string | null
  pathName: string
}

export const navigationItems: NavigationItem[] = [
  { id: null, name: "Home", icon: "", pathName: "Home" },
  {
    id: null,
    name: "Resources List",
    icon: "",
    pathName: "ResourceList"
  },
  // {
  //   id: null,
  //   name: "Resource Management",
  //   icon: "",
  //   pathName: "ResourceManagement"
  // },
  {
    id: null,
    name: "Tags List",
    icon: "",
    pathName: "TagList"
  },
  {
    id: null,
    name: "Recipe List",
    icon: "",
    pathName: "RecipeList"
  }
  // {
  //   id: null,
  //   name: "Tag Management",
  //   icon: "",
  //   pathName: "TagManagement"
  // }
]
