const baseUrl = "http://localhost:3000/";

const postNewTask = async (task) => {
  const data = { description: task, done: false };
  const apiUrl = `${baseUrl}`;
  try {
    const response = await fetch(apiUrl, {
      method: "POST",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const postGetAllTasks = async () => {
  const apiUrl = `${baseUrl}`;
  try {
    const response = await fetch(apiUrl, {
      method: "GET",
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const postDeleteTask = async (taskId) => {
  const apiUrl = `${baseUrl}${taskId}`;
  try {
    const response = await fetch(apiUrl, { method: "DELETE" });
    return response.status;
  } catch (err) {
    console.log(err);
  }
};

const postUpdateTaskStatus = async (taskId, status) => {
  const data = { done: status };
  const apiUrl = `${baseUrl}${taskId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};

const postUpdateTaskText = async (taskId, text) => {
  const data = { description: text };
  const apiUrl = `${baseUrl}${taskId}`;
  try {
    const response = await fetch(apiUrl, {
      method: "PUT",
      body: JSON.stringify(data),
      headers: {
        "content-type": "application/json",
      },
    });
    return await response.json();
  } catch (err) {
    console.log(err);
  }
};
