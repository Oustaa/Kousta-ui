import React, { useState } from 'react';
import { updateNestedProperties } from '@kousta-ui/helpers';
import { Input, Button, Group } from '@kousta-ui/components';

const initialObject = {
    user: {
        name: 'John Doe',
        address: {
            city: 'New York',
            zip: '10001',
        },
    },
    settings: {
        theme: 'dark',
    },
};

export default function HelpersExample() {
    const [data, setData] = useState(initialObject);
    const [key, setKey] = useState('user.address.city');
    const [value, setValue] = useState('San Francisco');

    const handleUpdate = () => {
        const updatedData = updateNestedProperties(data, key, value);
        setData(updatedData);
    };

    return (
        <div style={{ padding: '2rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 'var(--ifm-card-border-radius)', background: 'var(--ifm-background-color)' }}>
            <Group direction="column" gap="1rem">
                <Input
                    label="Key (e.g., user.address.city)"
                    value={key}
                    onChange={(e) => setKey(e.target.value)}
                />
                <Input
                    label="New Value"
                    value={value}
                    onChange={(e) => setValue(e.target.value)}
                />
                <Button onClick={handleUpdate}>Update Property</Button>
            </Group>
            <pre style={{ marginTop: '1.5rem', padding: '1rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: 'var(--ifm-card-border-radius)', whiteSpace: 'pre-wrap' }}>
                {JSON.stringify(data, null, 2)}
            </pre>
        </div>
    );
}
