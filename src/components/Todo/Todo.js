export default class Todo{
	constructor({isActive, content, time}){
		this.isActive = isActive !== undefined ? !!isActive : false;
		this.content = content || "";
		this.time = time ? new Date(time) : new Date();
		this.id = this.time.getTime();

		this.toggle = this.toggle.bind(this);
	}

	toggle(){
		this.isActive = !this.isActive;
	}

	toString(){
		return `Todo Item - ${this.id}`;
	}
}