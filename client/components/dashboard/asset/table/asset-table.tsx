"use client";
"use memo";

import * as React from "react";

import { type DataTableFilterField } from "@/types";

import { DataTableAdvancedToolbar } from "@/components/tables/custom/data-table-advanced-toolbar";
import { DataTable } from "@/components/tables/custom/data-table";
import { useDataTable } from "@/lib/hooks/use-data-table";

import { RouterOutput } from "@/trpc/client";
import { getColumns } from "./asset-columns";
// import { TasksTableToolbarActions } from "./tasks-table-toolbar-actions";

interface TasksTableProps {
  work_order: RouterOutput["db"]["work_order"]["get"]["detail"];
}

export function AssetTable({ work_order }: TasksTableProps) {
  const { asset: data, _asset: pageCount } = work_order;

  // Memoize the columns so they don't re-render on every render
  const columns = React.useMemo(() => getColumns(), []);

  /**
   * This component can render either a faceted filter or a search filter based on the `options` prop.
   *
   * @prop options - An array of objects, each representing a filter option. If provided, a faceted filter is rendered. If not, a search filter is rendered.
   *
   * Each `option` object has the following properties:
   * @prop {string} label - The label for the filter option.
   * @prop {string} value - The value for the filter option.
   * @prop {React.ReactNode} [icon] - An optional icon to display next to the label.
   * @prop {boolean} [withCount] - An optional boolean to display the count of the filter option.
   */
  const filterFields: DataTableFilterField<
    RouterOutput["db"]["work_order"]["get"]["detail"]["asset"][number]
  >[] = [
    {
      label: "Title",
      value: "name",
      placeholder: "Filter titles...",
    },
    //   {
    //     label: "Status",
    //     value: "work_step",
    //     options: tasks.status.enumValues.map((status) => ({
    //       label: status[0]?.toUpperCase() + status.slice(1),
    //       value: status,
    //       icon: getStatusIcon(status),
    //       withCount: true,
    //     })),
    //   },
    //   {
    //     label: "Priority",
    //     value: "priority",
    //     options: tasks.priority.enumValues.map((priority) => ({
    //       label: priority[0]?.toUpperCase() + priority.slice(1),
    //       value: priority,
    //       icon: getPriorityIcon(priority),
    //       withCount: true,
    //     })),
    //   },
  ];

  const { table } = useDataTable({
    data,
    columns,
    pageCount: undefined,
    rowCount: pageCount[0].count,
    /* optional props */
    filterFields,
    enableAdvancedFilter: true,
    initialState: {
      //   sorting: [{ id: "createdAt", desc: true }],
      //   columnPinning: { right: ["actions"] },
      columnVisibility: { location: false },
    },

    // For remembering the previous row selection on page change
    getRowId: (originalRow, index) => `${originalRow.id}-${index}`,
    /* */
  });

  return (
    <DataTable table={table}>
      <DataTableAdvancedToolbar table={table}>
        {/* <TasksTableToolbarActions table={table} /> */}
      </DataTableAdvancedToolbar>
    </DataTable>
  );
}
