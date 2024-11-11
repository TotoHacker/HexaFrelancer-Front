export interface BlogEntry {
    _id: string;
    image: string;
    title: string;
    content: string;
    date: string;
    author: string;
    state: 'borrador' | 'publicado';
    visibility: 'privado' | 'Público';
    tags: string[];
    metaTitle: string;
    metaDescription: string;
    order: number;
    isActive?: boolean;
}

export interface BlogTag {
    _id?: string;
    tag: string;
}