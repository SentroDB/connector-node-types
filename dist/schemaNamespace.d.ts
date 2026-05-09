import type { SchemaDetails } from "./types";
/**
 * Installs a runtime global "Schema" object with:
 * - tableNames: readonly string[]
 * - hasTable(name): name is TableName (runtime guard)
 *
 * NOTE: The *type* Schema.TableName will be bound by the example package
 * via an ambient .d.ts that references the generated dbmanager-types.ts.
 */
export declare function installSchemaNamespace(details: SchemaDetails): Readonly<{
    tableNames: readonly string[];
    hasTable(name: string): name is string;
}>;
//# sourceMappingURL=schemaNamespace.d.ts.map