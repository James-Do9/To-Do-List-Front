import "../../styles/home.scss";
import React, { useState, useEffect, useContext } from "react";
import { Context } from "../store/appContext";

export const Home = () => {
	const { store, actions } = useContext(Context);
	const [task, setTask] = useState("");
	return (
		<div>
			<h1>To Do List:</h1>
			<div className="ToDoList">
				<div className="list-group list-group-flush">
					<input
						className="list-group-item"
						onChange={e => setTask(e.target.value)}
						value={task}
						type="text"
						onKeyUp={e => {
							if (e.keyCode == 13) {
								actions.addList(task);
								setTask("");
							}
						}}
						placeholder="What needs to be done?"
					/>
				</div>
			</div>
			<div className="ToDoList paper">
				<ol className="list-group list-group-flush">
					{store.taskList.map((content, index) => {
						return (
							<li
								className={
									content.done ? "finished list-group-item listText" : "list-group-item listText"
								}
								key={index}>
								<span className="float-right" onClick={() => actions.doneButton(index)}>
									<i className="fas fa-check" style={{ color: "green " }} />
								</span>
								{content.label}{" "}
								<span className="float-right" onClick={() => actions.removeList(index)}>
									<i className="fas fa-times" style={{ color: "red " }} />
								</span>
							</li>
						);
					})}
				</ol>
				<p>{store.taskList.length} task(s) remaining.</p>
			</div>
		</div>
	);
};
