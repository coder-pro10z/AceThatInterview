import { Input } from 'antd';
const { TextArea } = Input;

export default function AnswerInput({ value, onChange }) {
  return (
    <TextArea
      rows={5}
      value={value}
      onChange={(e) => onChange(e.target.value)}
      placeholder="Type your answer or use voice input..."
      style={{ marginTop: 16 }}
    />
  );
}
