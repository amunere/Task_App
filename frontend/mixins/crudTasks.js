import axios from 'axios';

export default {
    methods: {
        getTasks() {
            const path = 'http://127.0.0.1:5000/';
            axios.get(path)
                .then((res) => {
                    this.tasks = res.data.tasks;
                    this.total = res.data.tasks.length;
                    for (let index = 0; index < this.total; index++) {
                        if (!res.data.tasks[index].complete) {
                            this.do_count++;
                        }
                    }
                    for (let index = 0; index < this.total; index++) {
                        if (res.data.tasks[index].complete) {
                            this.done_count++;
                        }
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        getCurrentDate() {
            const path = 'http://127.0.0.1:5000/';
            axios.get(path)
                .then((res) => {
                    this.current_date = res.data.current_date;
                })
                .catch((error) => {
                    console.error(error);
                });
        },
        addTask(load) {
            let config = {
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
            }
            const path = 'http://127.0.0.1:5000/';
            axios.post(path, load, config)
                .then(() => {
                    this.getTasks();
                    this.$router.push({ name: "tasklist" }).catch(() => { });
                })
                .catch((error) => {
                    console.log(error);
                    this.$router.push({ name: "tasklist" }).catch(() => { });
                });
        },
        updateTask(load, taskID) {
            let config = {
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
            }
            const path = 'http://127.0.0.1:5000/tasks/' + taskID;
            axios.put(path, load, config)
                .then(() => {
                    this.getTasks();
                    this.$router.push({ name: "tasklist" }).catch(() => { });
                })
                .catch((error) => {
                    console.error(error);
                    this.$router.push({ name: "tasklist" }).catch(() => { });
                });
        },
        deleteTask(taskID) {
            let config = {
                headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*', 'Access-Control-Allow-Headers': 'Origin, X-Requested-With, Content-Type, Accept' }
            }
            const path = 'http://127.0.0.1:5000/tasks/' + taskID;
            axios.delete(path, config)
                .then(() => {
                    this.getTasks();
                    this.$router.push({ name: "tasklist" }).catch(() => { });
                })
                .catch((error) => {
                    console.error(error);
                    this.$router.push({ name: "tasklist" }).catch(() => { });
                });
        },
    },
};