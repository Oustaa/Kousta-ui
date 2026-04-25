"use client";

import React from "react";
import { useDisclosure } from '@kousta-ui/hooks';
import { Button } from '@kousta-ui/components';

export default function HooksExample() {
    const { opened, toggle } = useDisclosure(false);

    return (
        <div style={{ padding: '2rem', border: '1px solid #cbd5e1', borderRadius: '0.5rem', background: '#ffffff' }}>
            <Button onClick={toggle}>
                {opened ? 'Hide Content' : 'Show Content'}
            </Button>
            {opened && (
                <div style={{ marginTop: '1rem', padding: '1rem', background: '#f1f5f9', borderRadius: '0.5rem' }}>
                    <p>This content is now visible!</p>
                    <p>You can use the <code>useDisclosure</code> hook to easily manage boolean state for modals, drawers, accordions, and more.</p>
                </div>
            )}
        </div>
    );
}
