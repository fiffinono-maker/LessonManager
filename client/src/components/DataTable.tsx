import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { MoreHorizontal, Edit, Trash } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

interface Column {
  key: string;
  label: string;
  render?: (value: any, row: any) => React.ReactNode;
}

interface DataTableProps {
  columns: Column[];
  data: any[];
  onEdit?: (row: any) => void;
  onDelete?: (row: any) => void;
  onToggle?: (row: any) => void;
  editLabel?: string;
  deleteLabel?: string;
  toggleLabel?: string;
}

export default function DataTable({ 
  columns, 
  data, 
  onEdit, 
  onDelete, 
  onToggle,
  editLabel = "Modifier",
  deleteLabel = "Supprimer",
  toggleLabel = "Activer/Désactiver"
}: DataTableProps) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            {columns.map((column) => (
              <TableHead key={column.key}>{column.label}</TableHead>
            ))}
            {(onEdit || onDelete || onToggle) && <TableHead className="w-[70px]">Actions</TableHead>}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.length === 0 ? (
            <TableRow>
              <TableCell colSpan={columns.length + 1} className="text-center text-muted-foreground py-8">
                Aucune donnée disponible
              </TableCell>
            </TableRow>
          ) : (
            data.map((row, idx) => (
              <TableRow key={idx} className="hover-elevate" data-testid={`table-row-${idx}`}>
                {columns.map((column) => (
                  <TableCell key={column.key}>
                    {column.render ? column.render(row[column.key], row) : row[column.key]}
                  </TableCell>
                ))}
                {(onEdit || onDelete || onToggle) && (
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" data-testid={`button-actions-${idx}`}>
                          <MoreHorizontal className="w-4 h-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        {onEdit && (
                          <DropdownMenuItem 
                            onClick={() => onEdit(row)}
                            data-testid={`action-edit-${idx}`}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            {editLabel}
                          </DropdownMenuItem>
                        )}
                        {onToggle && (
                          <DropdownMenuItem 
                            onClick={() => onToggle(row)}
                            data-testid={`action-toggle-${idx}`}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            {toggleLabel}
                          </DropdownMenuItem>
                        )}
                        {onDelete && (
                          <DropdownMenuItem 
                            onClick={() => onDelete(row)}
                            className="text-destructive"
                            data-testid={`action-delete-${idx}`}
                          >
                            <Trash className="w-4 h-4 mr-2" />
                            {deleteLabel}
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                )}
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>
    </div>
  );
}
