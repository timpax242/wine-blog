import type { ChainModifiers, Entry, EntryFieldTypes, EntrySkeletonType, LocaleCode } from "contentful";

export interface TypeMenuItemFields {
    title?: EntryFieldTypes.Symbol;
    url?: EntryFieldTypes.Symbol;
    order?: EntryFieldTypes.Integer;
    isExternal?: EntryFieldTypes.Boolean;
}

export type TypeMenuItemSkeleton = EntrySkeletonType<TypeMenuItemFields, "menuItem">;
export type TypeMenuItem<Modifiers extends ChainModifiers, Locales extends LocaleCode = LocaleCode> = Entry<TypeMenuItemSkeleton, Modifiers, Locales>;
