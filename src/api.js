import axios from 'axios';

const API = 'https://demo.orocon.me';
// const API = '../public';

const initOptions = {
  headers: {
    'X-AUTH-TOKEN': '$2y$13$hXiqwA/jnwOY81pk/dYii.F2XjjdulyLiXyPo81Htp5FkTGuOmQxS',
    'Access-Control-Allow-Origin': '*'
  },
};

const simpleFetch = (options) => axios({ ...initOptions, ...options}).then(response => response.data);

export default {
  fetchTasks: () => simpleFetch({ url: `${API}/api/v1/activity/` }),
  addTask: ({ id, taskData }) => simpleFetch({ url: `${API}/api/v1/activity/task/${id}`, method: 'put', data: taskData }),
};