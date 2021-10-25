/*store*/
const KEY = "todo_app_store";

export function saveLocally(state){
	localStorage.setItem(KEY, JSON.stringify(state));
}

export function getPreviousList(){
	if(KEY in localStorage){
		try{
		return JSON.parse(localStorage.getItem(KEY))
		}catch(err){
			return [];
		}
	}else{
		return null;
	}
}