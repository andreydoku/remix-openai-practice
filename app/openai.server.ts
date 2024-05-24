import OpenAI from 'openai';
import type { TextContentBlock } from 'openai/resources/beta/threads/messages.mjs';

//TODO - move to environment variables
const openai = new OpenAI({
	apiKey: "???",
	organization: "???",
	project: "???",
});

const threadId = null;

export async function createThread(): Promise<OpenAI.Beta.Threads.Thread> {
	const thread: OpenAI.Beta.Threads.Thread = await openai.beta.threads.create({
		messages: [
			{
				role: 'assistant',
				content:
					"I am human, I swear! Let's start with what kind of smell you like in your perfume?",
			},
		],
	});

	return thread;
}

export async function getThread(
	thread_id: string,
): Promise<OpenAI.Beta.Threads.Thread> {
	const thread = await openai.beta.threads.retrieve(thread_id);
	return thread;
}

export async function createThreadMessage(
	thread_id: string,
	message: string,
): Promise<void> {
	await openai.beta.threads.messages.create(thread_id, {
		role: 'user',
		content: message,
	});
}

export async function getMessages(
	thread_id: string,
	count?: number,
): Promise<OpenAI.Beta.Threads.Messages.MessagesPage> {
	const threadMessages = await openai.beta.threads.messages.list(thread_id, {
		limit: count ? count : 20,
	});
	return threadMessages;
}

export async function getRun(
	threadId: string,
	runId: string,
): Promise<OpenAI.Beta.Threads.Runs.Run> {
	const run = await openai.beta.threads.runs.retrieve(threadId, runId);
	return run;
}

export async function isRunComplete(
	threadId: string,
	runId: string,
): Promise<boolean> {
	const run = await getRun(threadId, runId);
	return run.status === 'completed';
}

export async function createRun(): Promise<OpenAI.Beta.Threads.Runs.Run> {
	//TODO - put this in an env file
	const assistantId = 'asst_sGkxnylGfykQKqJuhaUEfycZ';

	const run = await openai.beta.threads.runs.create(assistantId, {
		assistant_id: assistantId,
	});

	return run;
}

export async function getResponseMessage(
	thread_id: string,
	run_id: string,
): Promise<string | undefined> {
	const wasRunSuccessful = await isRunComplete(thread_id, run_id);

	if (wasRunSuccessful) {
		const threadMessages = await openai.beta.threads.messages.list(thread_id);
		const messageContent = threadMessages.data[0]
			.content[0] as TextContentBlock;

		return messageContent.text.value;
	}

	console.error('run was not successful yet');
}
