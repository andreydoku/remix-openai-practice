import { json, LoaderFunctionArgs } from '@remix-run/node';
import { createThread, getMessages } from '~/openai.server';

export async function loader({ request , context , params }:LoaderFunctionArgs) {
	
	const cookie = request.headers.get("threadId")
	// console.log('🚀 \n cookie:', cookie)

	// const thread = await createThread();
	// const {id: thread_id} = thread;
	// // console.log({thread});
	
	// const messages = await getMessages(thread_id);
	// console.log({messages});
	

	// const data = [
		
	// ]
	
	return json( cookie );
}