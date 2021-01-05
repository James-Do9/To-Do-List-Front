const getState = ({ getStore, getActions, setStore }) => {
	return {
		store: {
			taskList: [],
			task: ""
		},
		actions: {
			// Use getActions to call a function within a fuction
			exampleFunction: () => {
				getActions().changeColor(0, "green");
			},

			loadToDoListData: () => {
				fetch("https://assets.breatheco.de/apis/fake/todos/user/dojam")
					.then(function(response) {
						if (!response.ok) {
							throw Error(response.statusText);
						}
						return response.json();
					})
					.then(jsonifiedResponse => setStore({ taskList: jsonifiedResponse }))
					.catch(function(error) {
						console.log("Looks like there was a problem: \n", error);
					});
			},

			addList: task => {
				let store = getStore();
				if (task) {
					var updatedList = store.taskList.concat({ label: task, done: false });
					setStore({ taskList: updatedList });
					fetch("https://assets.breatheco.de/apis/fake/todos/user/dojam", {
						method: "PUT", // or 'POST'
						body: JSON.stringify(updatedList), // data can be `string` or {object}!
						headers: {
							"Content-Type": "application/json"
						}
					})
						.then(res => res.json())
						.then(response => console.log("Success:", JSON.stringify(response)))
						.catch(error => console.error("Error:", error));
				}
			},

			removeList: index => {
				let store = getStore();
				let updatedTaskList = store.taskList;
				updatedTaskList.splice(index, 1);
				setStore({ taskList: updatedTaskList });
				fetch("https://assets.breatheco.de/apis/fake/todos/user/dojam", {
					method: "PUT", // or 'POST'
					body: JSON.stringify(updatedTaskList), // data can be `string` or {object}!
					headers: {
						"Content-Type": "application/json"
					}
				})
					.then(res => res.json())
					.then(response => console.log("Success:", JSON.stringify(response)))
					.catch(error => console.error("Error:", error));
			},

			changeColor: (index, color) => {
				//get the store
				const store = getStore();

				//we have to loop the entire demo array to look for the respective index
				//and change its color
				const demo = store.demo.map((elm, i) => {
					if (i === index) elm.background = color;
					return elm;
				});

				//reset the global store
				setStore({ demo: demo });
			}
		}
	};
};

export default getState;
