export interface GalleryItem {
  id: string;
  title: string;
  author: string;
  preview: string;
  tags?: string[];
}

export const galleryItems: GalleryItem[] = [
  {
    id: 'g-modern-apartment',
    title: 'Modern Apartment Interior',
    author: 'Showcase',
    preview: '/assets/images/sofa.png',
    tags: ['apartment', 'interior', 'modern'],
  },
  {
    id: 'g-modern-living',
    title: 'Modern Living Room',
    author: 'Showcase',
    preview: '/assets/images/sofa.png',
    tags: ['living room', 'warm', 'modern'],
  },
  {
    id: 'g-cozy-bedroom',
    title: 'Cozy Bedroom Retreat',
    author: 'Showcase',
    preview: '/assets/images/bed.png',
    tags: ['bedroom', 'cozy', 'neutral'],
  },
];
