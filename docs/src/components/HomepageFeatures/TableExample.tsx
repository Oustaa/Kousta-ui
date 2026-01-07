import React from 'react';
import { Button, Group } from '@kousta-ui/components';
import Badge from '@site/src/components/Badge';

const tableData = [
    { id: 'PROJ-001', name: 'Kousta-UI Migration', status: 'In Progress', assignee: 'John Doe' },
    { id: 'PROJ-002', name: 'API Integration', status: 'Done', assignee: 'Jane Smith' },
    { id: 'PROJ-003', name: 'Homepage Redesign', status: 'In Progress', assignee: 'Peter Jones' },
    { id: 'PROJ-004', name: 'E2E Testing Setup', status: 'Backlog', assignee: 'Mary Williams' },
];

const statusBadge = (status) => {
    switch (status) {
        case 'In Progress':
            return <Badge color="info">In Progress</Badge>;
        case 'Done':
            return <Badge color="success">Done</Badge>;
        case 'Backlog':
            return <Badge>Backlog</Badge>;
        default:
            return <Badge>{status}</Badge>;
    }
}

export default function TableExample() {
    return (
        <div style={{ overflowX: 'auto', padding: '1rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 'var(--ifm-card-border-radius)', background: 'var(--ifm-background-color)' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                <thead>
                    <tr style={{ borderBottom: '1px solid var(--ifm-color-emphasis-300)' }}>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>ID</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Name</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Status</th>
                        <th style={{ padding: '1rem', textAlign: 'left' }}>Assignee</th>
                        <th style={{ padding: '1rem', textAlign: 'right' }}>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {tableData.map((row) => (
                        <tr key={row.id} style={{ borderBottom: '1px solid var(--ifm-color-emphasis-200)' }}>
                            <td style={{ padding: '1rem' }}>{row.id}</td>
                            <td style={{ padding: '1rem' }}>{row.name}</td>
                            <td style={{ padding: '1rem' }}>{statusBadge(row.status)}</td>
                            <td style={{ padding: '1rem' }}>{row.assignee}</td>
                            <td style={{ padding: '1rem', textAlign: 'right' }}>
                                <Group gap="0.5rem">
                                    <Button size="sm" variant="neutral-outline">Edit</Button>
                                    <Button size="sm" variant="danger-outline">Delete</Button>
                                </Group>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
