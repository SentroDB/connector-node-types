// connector-node-types/src/schemaNamespace.ts
import type { SchemaDetails } from "./types";

/**
 * Installs a runtime global "Schema" object with:
 * - tableNames: readonly string[]
 * - hasTable(name): name is TableName (runtime guard)
 *
 * NOTE: The *type* Schema.TableName will be bound by the example package
 * via an ambient .d.ts that references the generated dbmanager-types.ts.
 */
export function installSchemaNamespace(details: SchemaDetails) {
    const names = Array.from(new Set((details.tables ?? []).map(t => t.name))).sort();

    const ns = Object.freeze({
        tableNames: names as readonly string[],
        hasTable(name: string): name is string {
            // This returns a boolean at runtime; the type refinement is supplied
            // by the ambient declaration in the example package.
            return (names as readonly string[]).includes(name);
        },
    });

    // attach once (use the same instance if already installed)
    const g = globalThis as any;
    if (!g.Schema) g.Schema = ns;
    else Object.assign(g.Schema, ns);

    return ns;
}
