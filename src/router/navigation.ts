export interface NavigationItem {
  id: string | null;
  name: string;
  icon: string | null;
  pathName: string;
}

export const navigationItems: NavigationItem[] = [
  { id: null, name: "Home", icon: "", pathName: "Home" },
  {
    id: null,
    name: "Resources List",
    icon: "",
    pathName: "ResourceList",
  },
  {
    id: null,
    name: "Resource Management",
    icon: "",
    pathName: "ResourceManagement",
  },
  { id: null, name: "Resource Types", icon: "", pathName: "ResourceTypes" },
  { id: null, name: "Scheduling", icon: "", pathName: "Scheduling" },
];
