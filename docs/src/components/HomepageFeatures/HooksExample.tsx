"use client";

import React from "react";
import { useDisclosure } from '@kousta-ui/hooks';
import { Button } from '@kousta-ui/components';
import styles from './examples.module.css';

export default function HooksExample() {
    const { opened, toggle } = useDisclosure(false);

    return (
        <div className={styles.card}>
            <Button onClick={toggle}>
                {opened ? 'Hide Content' : 'Show Content'}
            </Button>
            {opened && (
                <div className={styles.panel} style={{ marginTop: '1rem' }}>
                    <p>This content is now visible!</p>
                    <p>You can use the <code>useDisclosure</code> hook to easily manage boolean state for modals, drawers, accordions, and more.</p>
                </div>
            )}
        </div>
    );
}
