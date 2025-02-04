import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";
import type { TypeAuthorSkeleton } from "./TypeAuthor";
import type { TypeCategorySkeleton } from "./TypeCategory";

export interface TypePostFields {
    title: EntryFieldTypes.Symbol;
    slug: EntryFieldTypes.Symbol;
    hero?: EntryFieldTypes.Boolean;
    content: EntryFieldTypes.RichText;
    excerpt?: EntryFieldTypes.Symbol;
    coverImage: EntryFieldTypes.AssetLink;
    date?: EntryFieldTypes.Date;
    author?: EntryFieldTypes.EntryLink<TypeAuthorSkeleton>;
    category?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<TypeCategorySkeleton>>;
}

export type TypePostSkeleton = EntrySkeletonType<TypePostFields, "post">;
export type TypePost<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypePostSkeleton, Modifiers, Locales>;
