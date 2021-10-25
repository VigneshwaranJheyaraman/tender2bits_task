import React from "react";
import "./TodoApp.css";
import {ThemeContext} from "../../theme";
import {saveLocally, getPreviousList} from "../../store";
import TodoItem from "../Todo/TodoItem";
import Todo from "../Todo/Todo";

export default class TodoApp extends React.Component{
	constructor(props){
		super(props);
		this.state = {
			todos: (getPreviousList() || [
			]).map(t => new Todo(t)),
			todo:"",
			active:0,
			inactive:0,
		};

		this.onNewTodo = this.onNewTodo.bind(this);
		this.updateActiveInactiveCount = this.updateActiveInactiveCount.bind(this);
		this.onEnterUpdateTodo = this.onEnterUpdateTodo.bind(this);
	}

	componentDidMount(){
		this.updateActiveInactiveCount();
	}

	onNewTodo(e){
		this.setState(state => ({
			...state,
			todo: e.target.value
		}));
	}

	updateActiveInactiveCount(){
		this.setState(state => ({
			...state,
			active: state.todos.filter(t => t.isActive).length,
			inactive: state.todos.filter(t => !t.isActive).length
		}))
	}

	onEnterUpdateTodo(e){
		if(e.which === 13){
			this.setState(state => ({
				todos: Object.assign([], [...state.todos,new Todo({content: state.todo})]),
				todo:""
			}), () => {
				this.updateActiveInactiveCount();
				saveLocally(this.state.todos)});
		}
	}

	componentWillUnmount(){
		saveLocally(this.state.todos);
	}

	render(){
		return (
			<ThemeContext.Consumer>
			{
				({isLightTheme, toggleTheme}) => (<React.Fragment>
					<header className="flex space-btwn">
						<div className="flex">
							<i className="fa fa-2x fa-arrow-left box"></i>
							<i className="fa fa-2x fa-arrow-right box"></i>
						</div>
						<div className="flex">
							<i className={`fa fa-2x box ${isLightTheme ? 'fa-sun-o' : 'fa-moon-o'}`} onClick={toggleTheme}></i>
							<span className="active">{this.state.active}</span>
							<span className="not-active">{this.state.inactive}</span>
						</div>
					</header>
					<main>
						{
							this.state.todos.map(t => {
								return <TodoItem todo={t} key={t.id} onToggle={this.updateActiveInactiveCount}/>
							})
						}
					</main>
					<footer>
						<input value={this.state.todo} onChange={this.onNewTodo} onKeyPress={this.onEnterUpdateTodo}/>
					</footer>
				</React.Fragment>)
			}
			</ThemeContext.Consumer>
		);
	}
}