"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.installSchemaNamespace = installSchemaNamespace;
/**
 * Installs a runtime global "Schema" object with:
 * - tableNames: readonly string[]
 * - hasTable(name): name is TableName (runtime guard)
 *
 * NOTE: The *type* Schema.TableName will be bound by the example package
 * via an ambient .d.ts that references the generated dbmanager-types.ts.
 */
function installSchemaNamespace(details) {
    const names = Array.from(new Set((details.tables ?? []).map(t => t.name))).sort();
    const ns = Object.freeze({
        tableNames: names,
        hasTable(name) {
            // This returns a boolean at runtime; the type refinement is supplied
            // by the ambient declaration in the example package.
            return names.includes(name);
        },
    });
    // attach once (use the same instance if already installed)
    const g = globalThis;
    if (!g.Schema)
        g.Schema = ns;
    else
        Object.assign(g.Schema, ns);
    return ns;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NoZW1hTmFtZXNwYWNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vc3JjL3NjaGVtYU5hbWVzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQVdBLHdEQWtCQztBQTFCRDs7Ozs7OztHQU9HO0FBQ0gsU0FBZ0Isc0JBQXNCLENBQUMsT0FBc0I7SUFDekQsTUFBTSxLQUFLLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLElBQUksRUFBRSxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztJQUVsRixNQUFNLEVBQUUsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDO1FBQ3JCLFVBQVUsRUFBRSxLQUEwQjtRQUN0QyxRQUFRLENBQUMsSUFBWTtZQUNqQixxRUFBcUU7WUFDckUscURBQXFEO1lBQ3JELE9BQVEsS0FBMkIsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsQ0FBQztLQUNKLENBQUMsQ0FBQztJQUVILDJEQUEyRDtJQUMzRCxNQUFNLENBQUMsR0FBRyxVQUFpQixDQUFDO0lBQzVCLElBQUksQ0FBQyxDQUFDLENBQUMsTUFBTTtRQUFFLENBQUMsQ0FBQyxNQUFNLEdBQUcsRUFBRSxDQUFDOztRQUN4QixNQUFNLENBQUMsTUFBTSxDQUFDLENBQUMsQ0FBQyxNQUFNLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFakMsT0FBTyxFQUFFLENBQUM7QUFDZCxDQUFDIn0=