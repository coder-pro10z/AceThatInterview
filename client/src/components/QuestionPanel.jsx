import { Card, Typography, Popover } from 'antd';
import { InfoCircleOutlined } from '@ant-design/icons';

const { Text, Title } = Typography;

export default function QuestionPanel({ question, showHint }) {
  return (
    <Card
      bordered
      bodyStyle={{ padding: '12px 16px' }}
      style={{
        marginTop: 16,
        borderRadius: 8,
        boxShadow: '0 2px 6px rgba(0,0,0,0.05)',
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
        <Title level={5} style={{ marginBottom: 0 }}>
          {question.question}
        </Title>

        {showHint && !!question.hint && (
          <Popover
            content={<Text style={{ fontSize: 13 }}>{question.hint}</Text>}
            title="Hint"
            placement="right"
          >
            <InfoCircleOutlined style={{ color: '#1890ff', cursor: 'pointer' }} />
          </Popover>
        )}
      </div>

      <Text type="secondary" style={{ fontSize: 13 }}>
        Topic: {question.topic} • Difficulty: {question.difficulty}
      </Text>
    </Card>
  );
}
