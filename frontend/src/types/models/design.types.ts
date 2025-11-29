export interface DesignSummary {
  id: string;
  name: string;
  description?: string;
  previewImage: string;
  updatedAt: string;
}

export interface DesignDetail extends DesignSummary {
  authorId?: string;
  scene: string;
  tags?: string[];
  isPublic?: boolean;
}
