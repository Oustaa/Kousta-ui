import React from 'react';
import { Input, Select, AsyncSelect, Button, FormElement, Group } from '@kousta-ui/components';

const frameworkData = [
    { value: 'react', label: 'React' },
    { value: 'vue', label: 'Vue' },
    { value: 'svelte', label: 'Svelte' },
    { value: 'angular', label: 'Angular' },
];

const allUsers = [
    { id: '1', name: 'John Doe', email: 'john.d@example.com' },
    { id: '2', name: 'Jane Smith', email: 'jane.s@example.com' },
    { id: '3', name: 'Peter Jones', email: 'peter.j@example.com' },
];

const mockApi = ({ page, limit, searchTerm }) => {
    return new Promise(resolve => {
        setTimeout(() => {
            const filteredUsers = allUsers.filter(user =>
                user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                user.email.toLowerCase().includes(searchTerm.toLowerCase())
            );
            resolve({ items: filteredUsers, totalPages: 1 });
        }, 500);
    });
};

export default function FormExample() {
    return (
        <div style={{ padding: '2rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 'var(--ifm-card-border-radius)', background: 'var(--ifm-background-color)' }}>
            <Group direction="column" gap="1.5rem">
                <FormElement>
                    <Input label="Project Name" placeholder="Enter a name for your project" />
                </FormElement>
                <FormElement>
                    <Select
                        label="Framework"
                        placeholder="Choose a framework"
                        data={frameworkData}
                    />
                </FormElement>
                <FormElement>
                    <AsyncSelect
                        label="Assign to User"
                        getData={mockApi}
                        extractDynamicData={(response: any) => response.items}
                        hasMore={(response: any) => false}
                        options={{ value: 'id', label: 'name' }}
                        placeholder="Search for a user..."
                    />
                </FormElement>
                <Group style={{ justifyContent: 'flex-end' }}>
                    <Button variant="primary">Submit</Button>
                </Group>
            </Group>
        </div>
    );
}
