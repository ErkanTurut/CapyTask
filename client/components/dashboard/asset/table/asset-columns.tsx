"use client";

import { type ColumnDef } from "@tanstack/react-table";

import { DataTableColumnHeader } from "@/components/tables/custom/data-table-column-header";
import { Checkbox } from "@/components/ui/checkbox";

import { RouterOutput } from "@/trpc/client";

export function getColumns(): ColumnDef<
  RouterOutput["db"]["work_order"]["get"]["detail"]["asset"][number]
>[] {
  return [
    {
      id: "select",
      header: ({ table }) => (
        <Checkbox
          checked={
            table.getIsAllPageRowsSelected() ||
            (table.getIsSomePageRowsSelected() && "indeterminate")
          }
          onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
          aria-label="Select all"
          className="translate-y-0.5"
        />
      ),
      cell: ({ row }) => (
        <Checkbox
          checked={row.getIsSelected()}
          onCheckedChange={(value) => row.toggleSelected(!!value)}
          aria-label="Select row"
          className="translate-y-0.5"
        />
      ),
      enableSorting: false,
      enableHiding: false,
    },
    {
      accessorKey: "Title",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Title" />
      ),
      cell: ({ row }) => {
        // const label = tasks.label.enumValues.find(
        //   (label) => label === row.original.name,
        // );

        return (
          <div className="flex space-x-2">
            {/* {label && <Badge variant="outline">{label}</Badge>} */}
            <span className="max-w-[31.25rem] truncate font-medium">
              {row.original.name}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "description",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Description" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex">
            <span className="max-w-[21.25rem] truncate">
              {row.original.description}
            </span>
          </div>
        );
      },
    },
    {
      accessorKey: "location",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[16.25rem] truncate font-medium">
              {row.original.location?.name}
            </span>
          </div>
        );
      },
    },

    {
      accessorKey: "status",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex space-x-2">
            <span className="max-w-[16.25rem] truncate font-medium">
              {row.original.status}
            </span>
          </div>
        );
      },
    },

    // {
    //   accessorKey: "status",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Status" />
    //   ),
    //   cell: ({ row }) => {
    //     const status = tasks.status.enumValues.find(
    //       (status) => status === row.original.status,
    //     );

    //     if (!status) return null;

    //     const Icon = getStatusIcon(status);

    //     return (
    //       <div className="flex w-[6.25rem] items-center">
    //         <Icon
    //           className="mr-2 size-4 text-muted-foreground"
    //           aria-hidden="true"
    //         />
    //         <span className="capitalize">{status}</span>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    // {
    //   accessorKey: "priority",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Priority" />
    //   ),
    //   cell: ({ row }) => {
    //     const priority = tasks.priority.enumValues.find(
    //       (priority) => priority === row.original.priority,
    //     );

    //     if (!priority) return null;

    //     const Icon = getPriorityIcon(priority);

    //     return (
    //       <div className="flex items-center">
    //         <Icon
    //           className="mr-2 size-4 text-muted-foreground"
    //           aria-hidden="true"
    //         />
    //         <span className="capitalize">{priority}</span>
    //       </div>
    //     );
    //   },
    //   filterFn: (row, id, value) => {
    //     return Array.isArray(value) && value.includes(row.getValue(id));
    //   },
    // },
    // {
    //   accessorKey: "createdAt",
    //   header: ({ column }) => (
    //     <DataTableColumnHeader column={column} title="Created At" />
    //   ),
    //   cell: ({ cell }) => formatDate(cell.getValue() as Date),
    // },
    // {
    //   id: "actions",
    //   cell: function Cell({ row }) {
    //     const [isUpdatePending, startUpdateTransition] = React.useTransition();
    //     const [showUpdateTaskSheet, setShowUpdateTaskSheet] =
    //       React.useState(false);
    //     const [showDeleteTaskDialog, setShowDeleteTaskDialog] =
    //       React.useState(false);

    //     return (
    //       <>
    //         <UpdateTaskSheet
    //           open={showUpdateTaskSheet}
    //           onOpenChange={setShowUpdateTaskSheet}
    //           task={row.original}
    //         />
    //         <DeleteTasksDialog
    //           open={showDeleteTaskDialog}
    //           onOpenChange={setShowDeleteTaskDialog}
    //           tasks={[row.original]}
    //           showTrigger={false}
    //           onSuccess={() => row.toggleSelected(false)}
    //         />
    //         <DropdownMenu>
    //           <DropdownMenuTrigger asChild>
    //             <Button
    //               aria-label="Open menu"
    //               variant="ghost"
    //               className="flex size-8 p-0 data-[state=open]:bg-muted"
    //             >
    //               <DotsHorizontalIcon className="size-4" aria-hidden="true" />
    //             </Button>
    //           </DropdownMenuTrigger>
    //           <DropdownMenuContent align="end" className="w-40">
    //             <DropdownMenuItem onSelect={() => setShowUpdateTaskSheet(true)}>
    //               Edit
    //             </DropdownMenuItem>
    //             <DropdownMenuSub>
    //               <DropdownMenuSubTrigger>Labels</DropdownMenuSubTrigger>
    //               <DropdownMenuSubContent>
    //                 <DropdownMenuRadioGroup
    //                   value={row.original.label}
    //                   onValueChange={(value) => {
    //                     startUpdateTransition(() => {
    //                       toast.promise(
    //                         updateTask({
    //                           id: row.original.id,
    //                           label: value as Task["label"],
    //                         }),
    //                         {
    //                           loading: "Updating...",
    //                           success: "Label updated",
    //                           error: (err) => getErrorMessage(err),
    //                         },
    //                       );
    //                     });
    //                   }}
    //                 >
    //                   {tasks.label.enumValues.map((label) => (
    //                     <DropdownMenuRadioItem
    //                       key={label}
    //                       value={label}
    //                       className="capitalize"
    //                       disabled={isUpdatePending}
    //                     >
    //                       {label}
    //                     </DropdownMenuRadioItem>
    //                   ))}
    //                 </DropdownMenuRadioGroup>
    //               </DropdownMenuSubContent>
    //             </DropdownMenuSub>
    //             <DropdownMenuSeparator />
    //             <DropdownMenuItem
    //               onSelect={() => setShowDeleteTaskDialog(true)}
    //             >
    //               Delete
    //               <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
    //             </DropdownMenuItem>
    //           </DropdownMenuContent>
    //         </DropdownMenu>
    //       </>
    //     );
    //   },
    //   size: 40,
    // },
  ];
}
