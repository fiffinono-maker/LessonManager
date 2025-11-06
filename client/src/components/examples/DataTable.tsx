import DataTable from '../DataTable';
import { Badge } from '@/components/ui/badge';

export default function DataTableExample() {
  const columns = [
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { 
      key: 'role', 
      label: 'Role',
      render: (value: string) => (
        <Badge variant={value === 'admin' ? 'default' : 'secondary'}>
          {value}
        </Badge>
      )
    },
    { key: 'status', label: 'Status' },
  ];

  const data = [
    { name: 'John Doe', email: 'john@example.com', role: 'admin', status: 'Active' },
    { name: 'Jane Smith', email: 'jane@example.com', role: 'gym_owner', status: 'Active' },
    { name: 'Mike Johnson', email: 'mike@example.com', role: 'client', status: 'Inactive' },
  ];

  return (
    <div className="p-8">
      <DataTable 
        columns={columns} 
        data={data}
        onEdit={(row) => console.log('Edit:', row)}
        onDelete={(row) => console.log('Delete:', row)}
      />
    </div>
  );
}
