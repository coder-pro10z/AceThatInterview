import React from 'react';
import { Button, Space } from 'antd';

export default function ActionButtons({
  currentIndex,
  total,
  canProceed,
  onPrev,
  onNext,
  onSkip,
  showHint,
  toggleHint,
}) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 24 }}>
      <Space>
        <Button type="default" onClick={toggleHint}>
          {showHint ? 'Hide Hint' : 'Show Hint'}
        </Button>
        <Button type="text" danger onClick={onSkip}>
          Skip
        </Button>
      </Space>

      <Space>
        <Button onClick={onPrev} disabled={currentIndex === 0}>
          Prev
        </Button>
        <Button type="primary" onClick={onNext} disabled={!canProceed}>
          {currentIndex < total - 1 ? 'Next' : 'Finish'}
        </Button>
      </Space>
    </div>
  );
}
