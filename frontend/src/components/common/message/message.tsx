import { NextPage } from 'next';

interface MessageProps {
  type: string;
  field?: string;
  message: string;
}

export const Message: NextPage<MessageProps> = ({
  type,
  field,
  message,
}: MessageProps) => {
  return (
    <article className={`message is-${type}`}>
      <div className="message-body">
        {field && `${field} `}
        {message}
      </div>
    </article>
  );
};
