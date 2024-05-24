import { LinksFunction } from "@remix-run/node";
import { cssBundleHref } from "@remix-run/css-bundle";

import {
	Links,
	Meta,
	Outlet,
	Scripts,
	ScrollRestoration,
} from "@remix-run/react";

import { useEffect, useState } from 'react'
import Cookies from 'js-cookie'
import baseStyles from "~/styles/baseStyles.css";
import NavBar from "./components/NavBar/NavBar";
import Chatbot from "./components/Chatbot/Chatbot";

export const links: LinksFunction = () => [
	...(cssBundleHref ? [{ rel: "stylesheet", href: cssBundleHref }] : []),
	{ rel: "stylesheet", href: baseStyles },
];


const getMessages = async (threadId?: string) => {
	try {

		const headers: HeadersInit = {
			'Content-Type': 'application/json',
			'threadId': threadId ?? ''
		}

		const response = await fetch('/api/get-messages', {
			method: 'GET',
			headers: headers,
		})

		if(!response.ok){
			throw new Error('Response was bad!')
		}

		const messages: string[] = await response.json();
		return messages

	} catch (error) {
		throw new Error('An error occured')
	}
}

export function Layout({ children }: { children: React.ReactNode }) {

	const [threadId, setThreadId] = useState<string | undefined>( undefined );
	const [messages, setMessages] = useState<string[]>( [] );

	useEffect(() => {
		const cookieThreadId = Cookies.get('theadId');
		setThreadId(cookieThreadId)

		if(!threadId){
			// TODO - API call to create thread
		} else {
			// TODO - API call to get thread
		}

	}, [])
	
	function sendMessage(message:string){
		console.log("message sent: " + message);
		
	}
	
	return (
		<html lang="en">
			<head>
				<meta charSet="utf-8" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				<Meta />
				<Links />
			</head>
			<body>
				<NavBar />
				<Chatbot messages={messages} sendMessage={sendMessage}/>
					
				<main>
					{children}
				</main>
				
				<ScrollRestoration />
				<Scripts />
			</body>
		</html>
	);
}

export default function App() {
	return <Outlet />;
}
