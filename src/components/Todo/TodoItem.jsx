import React from "react";
import "./TodoItem.css";

export default function TodoItem(props){
	var [isActive, toggleActive] = React.useState(props.todo.isActive)
	const date = props.showDT ? new Date(props.todo.time) : null;
	return (
		<div className="todo flex">
			<div className="flex">
				<div className={`${isActive ? 'active' : 'inactive'}`} onClick={() => {
						props.todo.toggle();
						toggleActive(!isActive);
						props.onToggle && props.onToggle();
					}}>
						<div className="tick"></div>
				</div>
				<div className="content">{props.todo.content}</div>
			</div>
			{
				date ? 
				<div className="dt">{date.toString()}</div>
				: null
			}
		</div>
	)
}