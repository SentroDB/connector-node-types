// Augmentation seams for the global DBManagerSchema namespace.
// Codegen (connector-node's types.generator.ts -> generateGlobalTypes) augments
// the Registered* interfaces via declaration merging. When nothing is registered,
// TableName falls back to `string` and per-row types fall back to
// `Record<string, unknown>` so the package compiles standalone.
// Pattern reference: TanStack Router's `Register`, RTK Query's `TagTypes`.

declare global {
    namespace DBManagerSchema {
        interface RegisteredRows { }
        interface RegisteredColumns { }
        interface RegisteredInserts { }
        interface RegisteredUpdates { }
        interface RegisteredDeletes { }
        interface RegisteredPKs { }

        type TableName =
            keyof RegisteredRows extends never ? string : keyof RegisteredRows;

        type RowBy<TN extends TableName> =
            TN extends keyof RegisteredRows
            ? RegisteredRows[TN]
            : Record<string, unknown>;

        type ColumnBy<TN extends TableName> =
            TN extends keyof RegisteredColumns
            ? RegisteredColumns[TN]
            : string;

        type InsertBy<TN extends TableName> =
            TN extends keyof RegisteredInserts
            ? RegisteredInserts[TN]
            : Record<string, unknown>;

        type UpdateBy<TN extends TableName> = {
            where: Record<string, unknown>;
            patch: TN extends keyof RegisteredUpdates
            ? RegisteredUpdates[TN]
            : Record<string, unknown>;
        };

        type DeleteBy<TN extends TableName> = {
            where: TN extends keyof RegisteredDeletes
            ? RegisteredDeletes[TN]
            : Record<string, unknown>;
            single: boolean;
        };

        type PKBy<TN extends TableName> =
            TN extends keyof RegisteredPKs ? RegisteredPKs[TN] : string;

        type ListBy<TN extends TableName> = { rows: RowBy<TN>[]; total: number };
    }

    var DBManagerSchema: {
        readonly tableNames: readonly DBManagerSchema.TableName[];
        hasTable(name: string): boolean;
    };
}
export { };
