import React, { useState, useRef } from "react";
import { WindowBoundary } from "@kousta-ui/components";

export const BasicVisibilityPreview = () => {
  const [visible, setVisible] = useState(false);

  return (
    <div style={{ height: '150vh', paddingTop: '75vh' }}>
      <WindowBoundary
        onItemEnter={() => setVisible(true)}
        onItemExit={() => setVisible(false)}
      >
        <div style={{
          padding: '40px',
          textAlign: 'center',
          background: visible ? 'var(--kui-success-100)' : 'var(--kui-neutral-200)',
          color: visible ? 'var(--kui-success-800)' : 'var(--kui-neutral-800)',
          borderRadius: '8px',
          transition: 'all 0.3s ease',
          border: `2px solid ${visible ? 'var(--kui-success-500)' : 'var(--kui-neutral-400)'}`
        }}>
          {visible ? 'I am in the viewport!' : 'Scroll me into view!'}
        </div>
      </WindowBoundary>
    </div>
  );
};

export const LazyImagePreview = () => {
  const [isInView, setIsInView] = useState(false);

  return (
    <div style={{ height: '150vh', paddingTop: '75vh' }}>
        <WindowBoundary onceItemEnter={() => setIsInView(true)} threshold={0.1}>
            <div style={{
                minHeight: '200px',
                display: 'grid',
                placeItems: 'center',
                background: '#f0f0f0',
                borderRadius: '8px',
                color: '#888'
            }}>
                {isInView ? (
                    <img
                        src="https://via.placeholder.com/400x200.png?text=Image+Loaded"
                        alt="Lazy Loaded"
                        style={{ maxWidth: '100%', borderRadius: '8px' }}
                    />
                ) : (
                    'Scroll down to load image...'
                )}
            </div>
        </WindowBoundary>
    </div>
  );
};

export const InfiniteScrollPreview = () => {
  const [items, setItems] = useState(Array.from({ length: 5 }, (_, i) => `Item ${i + 1}`));
  const [loading, setLoading] = useState(false);

  const loadMore = () => {
    if (loading) return;
    setLoading(true);
    setTimeout(() => {
      const newItems = Array.from({ length: 5 }, (_, i) => `Item ${items.length + i + 1}`);
      setItems(prev => [...prev, ...newItems]);
      setLoading(false);
    }, 1000);
  };

  return (
    <div style={{ height: '300px', overflowY: 'auto', border: '1px solid #ccc', borderRadius: '8px', padding: '16px' }}>
      {items.map(item => (
        <div key={item} style={{ padding: '16px', borderBottom: '1px solid #eee' }}>{item}</div>
      ))}
      <WindowBoundary onItemEnter={loadMore} root={null} threshold={1.0}>
        <div style={{ padding: '20px', textAlign: 'center', color: '#888' }}>
          {loading ? 'Loading more...' : 'Scroll to load more'}
        </div>
      </WindowBoundary>
    </div>
  );
};
