import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMainNavigationFields {
    title?: EntryFieldTypes.Symbol;
    menuItems?: EntryFieldTypes.Array<EntryFieldTypes.EntryLink<EntrySkeletonType>>;
}

export type TypeMainNavigationSkeleton = EntrySkeletonType<TypeMainNavigationFields, "mainNavigation">;
export type TypeMainNavigation<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMainNavigationSkeleton, Modifiers, Locales>;
