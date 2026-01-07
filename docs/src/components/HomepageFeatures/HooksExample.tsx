import React from 'react';
import { useDisclosure } from '@kousta-ui/hooks';
import { Button } from '@kousta-ui/components';

export default function HooksExample() {
    const { opened, toggle } = useDisclosure(false);

    return (
        <div style={{ padding: '2rem', border: '1px solid var(--ifm-color-emphasis-300)', borderRadius: 'var(--ifm-card-border-radius)', background: 'var(--ifm-background-color)' }}>
            <Button onClick={toggle}>
                {opened ? 'Hide Content' : 'Show Content'}
            </Button>
            {opened && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: 'var(--ifm-color-emphasis-100)', borderRadius: 'var(--ifm-card-border-radius)' }}>
                    <p>This content is now visible!</p>
                    <p>You can use the <code>useDisclosure</code> hook to easily manage boolean state for modals, drawers, accordions, and more.</p>
                </div>
            )}
        </div>
    );
}
