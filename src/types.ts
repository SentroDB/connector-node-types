export interface DBConfig {
    host: string;
    port: number;
    user: string;
    password: string;
    database: string;
    schema?: string;
    type: "postgres" | "mysql" | "mssql";
    ssl?: boolean
}

export interface Table {
    name: string;
    customization: CustomTable;
    columns: Column[];
    indexes: Index[];
    constraints: Constraint[];
}

export interface Column {
    name: string;
    customization: CustomColumn;
    type: string;
    nullable: boolean;
    default: string | null;
    primary_key: boolean;
    foreign_key: boolean;
    unique: boolean;
    autoincrement: boolean;
    isGenerated: boolean;
    generatedType: ColumnGeneratedType;
    enum_values: string[];
    /**
     * True for synthetic array-valued columns that represent a many-to-many
     * relation (Prisma implicit M2M). Backed by a hidden junction table; the
     * column has no underlying SQL column on the parent table.
     */
    isMany?: boolean;
    /** Target table + column the relation points at (PK of the related model) */
    references?: { table: string; column: string };
    /** Hidden junction table coordinates — present when isMany is true */
    junction?: { table: string; sourceColumn: string; targetColumn: string };
}

export interface Constraint {
    table: string;
    name: string;
    column: string;
    reference: {
        table: string;
        column: string;
    } | null;
    onUpdate: string | null;
    onDelete: string | null;
    relationshipType: RelationshipType;
    isUnique: boolean;
    /**
     * Present on synthetic many-to-many constraints (Prisma implicit M2M
     * junction tables that the parser folds away). Tells the connector how to
     * fan writes/reads through the hidden junction. Absent for ordinary FKs.
     */
    junction?: {
        table: string;
        sourceColumn: string;
        targetColumn: string;
    };
}

export interface Index {
    table: string;
    name: string;
    columns: string[];
    is_primary: boolean;
    is_unique: boolean;
}

export interface SchemaDetails {
    tables: Table[];
}

export interface CustomTable {
    rename: string;
    icon?: string;
    allowCreate: boolean;
    allowEdit: boolean;
    allowDelete: boolean;
    isVisible: boolean;
    allowExport: boolean;
    displayFields?: Array<{
        name: string;
        callback: (record: any) => any;
    }>;
    tableActions?: Array<{
        id: string;
        label: string;
        segmentId?: string;
    }>;
    recordActions?: Array<{
        id: string;
        label: string;
        segmentId?: string;
    }>;
    segments?: Segment[];
}

export type SegmentConditionOperator =
    | "eq"
    | "neq"
    | "gt"
    | "gte"
    | "lt"
    | "lte"
    | "contains"
    | "startsWith"
    | "endsWith"
    | "in"
    | "notIn"
    | "isNull"
    | "isNotNull";

export interface SegmentCondition {
    column: string;
    operator: SegmentConditionOperator;
    value?: string | number | boolean | Array<string | number> | null;
}

export type SegmentVisibility = "visible" | "hidden";

export interface Segment {
    id: string;
    slug: string;
    name: string;
    conditions: SegmentCondition[];
    visibility: SegmentVisibility;
    order: number;
}

export interface CustomColumn {
    description: string;
    rename: string;
    hideView: boolean;
    hideEdit: boolean;
    hideCreate: boolean;
    readOnly: boolean;
    position: number;
    displayType: string;
    editType: string;
    displayPrefix: string;
    displaySuffix: string;
    preferredColumnsToDisplay?: string[];

}

export interface Customization<T> {
    name: T;
    customization: CustomTable;
    columns: {
        name: string;
        customization: CustomColumn;
    }[];
}

export type RelationshipType = "one-to-one" | "one-to-many" | "many-to-many";
export type ColumnGeneratedType = "sequence" | "cuid" | "uuid" | "none";

export type ViewTemplateEngine = "ejs";

export interface ViewTableSelection {
    name: string;
    columns: string[];
    conditions?: SegmentCondition[];
    pageSize?: number;
}

export interface ViewConfig {
    slug: string;
    name: string;
    description?: string;
    engine: ViewTemplateEngine;
    tables: ViewTableSelection[];
    createdAt: string;
    updatedAt: string;
}

export interface ViewWithTemplate extends ViewConfig {
    template: string;
}
