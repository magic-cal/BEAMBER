export interface Resource {
  id: string;
  name: string;
  tags: ResourceTag[];
}

export interface ResourceTag{
  id: string;
  name: string;
}

