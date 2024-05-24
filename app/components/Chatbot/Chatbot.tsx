
import { useEffect, useRef, useState } from "react"
import "./Chatbot.css"

type ChatbotProps = {
	messages: string[],
	sendMessage: (message: string) => void,
}

export default function Chatbot({ messages, sendMessage }: ChatbotProps) {

	return (
		<div className="chatbot">
			<h2 className="header">Shopping Assistant Bot</h2>

			{/* TODO - Render messages... */}
			<Messages messages={messages}/>
			<Input sendMessage={sendMessage}/>
			
		</div>
	)
}

type MessagesProps = {
	messages: string[]
}
function Messages({ messages }: MessagesProps) {
	const el = useRef(null);
	useEffect(() => {
	  el.current.scrollIntoView({ block: "end", behavior: "smooth" });
	});
	return (
	  <div className="messages">
		{messages}
		<div id={"el"} ref={el} />
	  </div>
	);
  }




type InputProps = {
	sendMessage: (message: string) => void
}
function Input({ sendMessage }: InputProps) {

	const [text, setText] = useState("");

	const handleInputChange = e => {
		setText(e.target.value);
	};

	return (
		<div className="input">
			<form onSubmit={sendMessage}>
				<input
					type="text"
					onChange={handleInputChange}
					value={text}
					placeholder="Enter your message here"
				/>
				<button>
					<svg
						version="1.1"
						xmlns="http://www.w3.org/2000/svg"
						width="20"
						height="20"
						viewBox="0 0 500 500"
					>
						<g>
							<g>
								<polygon points="0,497.25 535.5,267.75 0,38.25 0,216.75 382.5,267.75 0,318.75" />
							</g>
						</g>
					</svg>
				</button>
			</form>
		</div>
	);

}