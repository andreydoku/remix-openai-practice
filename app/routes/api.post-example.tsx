import { json, ActionFunctionArgs } from '@remix-run/node';

export async function action({ request, params }: ActionFunctionArgs) {

	const body = await request.json()
	console.log({body});
	
    return json({ status: 200 });
    
}