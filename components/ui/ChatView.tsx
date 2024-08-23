import { Message } from "ai";
import MarkdownRender from "../MarkdownRender";

type HandleSubmitType = (e: React.FormEvent<HTMLFormElement>) => void;
type HandleInputChangeType = (
  e:
    | React.ChangeEvent<HTMLInputElement>
    | React.ChangeEvent<HTMLTextAreaElement>
) => void;

type ChatViewProps = {
  messages: Message[];
  input: string;
  handleInputChange: HandleInputChangeType;
  handleSubmit: HandleSubmitType;
};

export const ChatView = ({
  messages,
  input,
  handleInputChange,
  handleSubmit,
}: ChatViewProps) => {
  return (
    <div
      className="
      flex flex-col 
      h-full w-3/4
      max-w-4xl
      mx-auto stretch
    "
    >
      <div
        className="
        flex-grow-8 space-y-4 py-24 h-full
        w-full
        overflow-y-scroll
        overflow-x-hidden
      "
      >
        {messages.map((m) => (
            <div
                key={m.id}
                className={`min-w-96 whitespace-pre-wrap flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
                <div
                    className={`${m.role === 'user' ? 'bg-zinc-200' : 'bg-zinc-200'} p-4 shadow-lg rounded-lg inline-block min-w-96`}
                >
                    <div className="font-bold">{m.role}</div>
                    <>
                        {m.content.length > 0 ? (
                            <MarkdownRender>{m.content}</MarkdownRender>
                        ) : (
                            <span className="italic font-light">
                                {"calling tool: " + m?.toolInvocations?.[0].toolName}
                            </span>
                        )}
                    </>
                </div>
            </div>
        ))}
      </div>

      <div className="flex-grow-1 flex items-center justify-center w-full">
        <form
          onSubmit={handleSubmit}
          className="flex items-center justify-center w-full px-4 gap-2"
        >
          <input
            className="w-full h-16 p-4 mb-8 border border-gray-300 rounded-full shadow-xl"
            value={input}
            placeholder="Say something..."
            onChange={handleInputChange}
          />

          <button className="w-16 h-16 p-4 mb-8 bg-blue-500 text-white rounded-full shadow-xl border border-gray-300">
            -&gt;
          </button>
        </form>
      </div>
    </div>
  );
};
