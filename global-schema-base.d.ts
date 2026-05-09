declare global {
    namespace DBManagerSchema {
        type TableName = string;
        type ListBy<TN extends TableName> = { rows: RowBy<TN>[]; total: number };

        type RowBy<TN extends TableName> = Record<string, unknown>;
        type InsertBy<TN extends TableName> = Record<string, unknown>;
        type UpdateBy<TN extends TableName> = { where: Record<string, unknown>; patch: Record<string, unknown> };
        type DeleteBy<TN extends TableName> = {where: Record<string, unknown>, single: boolean};
        type PKBy<TN extends TableName> = string;

    }
    var DBManagerSchema: {
        readonly tableNames: readonly string[];
        hasTable(name: string): boolean;
    };
}
export { };
