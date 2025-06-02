import { Progress } from 'antd';

export default function Header({ current, total }) {
  return (
    <Progress
      percent={(current / total) * 100}
      format={() => `Question ${current} of ${total}`}
    />
  );
}
