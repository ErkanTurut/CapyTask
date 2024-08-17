// "use client";
// "use memo";

// import * as React from "react";

// import { type DataTableFilterField } from "@/types";

// import { AssetDataTable } from "@/components/tables/asset/data-table";
// import { DataTableAdvancedToolbar } from "@/components/tables/custom/data-table-advanced-toolbar";
// import { useDataTable } from "@/lib/hooks/use-data-table";

// import { RouterOutput } from "@/trpc/client";
// import { TWorkOrderAssetQuerySchema } from "@/trpc/server/routes/work_order/get.schema";
// import { getColumns } from "./asset-columns";
// import { Status } from "@prisma/client";
// import { statusConfig } from "@/config/dashboard.config";
// import { Icons } from "@/components/icons";
// import { DataTableFacetedFilter } from "@/components/tables/asset/data-table-faceted-filter";
// // import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions";

// interface AssetTableProps {
//   data: NonNullable<RouterOutput["db"]["work_order"]["get"]["detail"]>["asset"];
//   count: number;
// }

// export function AssetTable({ data, count }: AssetTableProps) {
//   const columns = React.useMemo(() => getColumns(), []);
//   /**
//    * This component can render either a faceted filter or a search filter based on the `options` prop.
//    *
//    * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
//    *
//    * Each `option` object has the following properties:
//    * @prop {string} label - The label for the filter option.
//    * @prop {string} value - The value for the filter option.
//    * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
//    * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
//    */
//   const filterFields: DataTableFilterField<
//     NonNullable<
//       RouterOutput["db"]["work_order"]["get"]["detail"]
//     >["asset"][number]
//   >[] = [
//     // {
//     //   label: "Title",
//     //   value: "asset.title",
//     //   placeholder: "Filter titles...",
//     // },

//     {
//       label: "Status",
//       value: "status",
//       options: statusConfig.map((status) => ({
//         label: status.label,
//         value: status.value,
//         icon: () => {
//           if (!status.icon) return null;
//           const Icon = Icons[status.icon];
//           return (
//             <Icon className="size-4 text-muted-foreground group-hover:text-accent-foreground" />
//           );
//         },
//         withCount: true,
//       })),
//     },
//   ];
//   return <AssetDataTable data={{ data, count }} columns={columns} />;
//   // const { table } = useDataTable({
// data,
// columns,
// pageCount: undefined,
// rowCount: count,
// /* optional props */
// filterFields,
// enableAdvancedFilter: true,
// initialState: {
//   //   sorting: [{ id: "createdAt", desc: true }],
//   //   columnPinning: { right: ["actions"] },
//   columnVisibility: { location: false },
// },

// // For remembering the previous row selection on page change
// getRowId: (originalRow, index) => `${originalRow.asset_id}-${index}`,
// /* */
//   // });

//   // return (
//   //   <DataTable table={table}>
//   //     <DataTableAdvancedToolbar filterFields={filterFields} table={table}>
//   //       {/* <TasksTableToolbarActions table={table} /> */}
//   //     </DataTableAdvancedToolbar>
//   //   </DataTable>
//   // );
// }
