import { config } from './config.js';

export const timeTracker = {
    // Key for storing time tracking data in local storage
    STORAGE_KEY: 'family_task_manager_time_tracking',

    // Initialize or get existing time tracking data
    getTimeTrackingData() {
        const storedData = localStorage.getItem(this.STORAGE_KEY);
        return storedData ? JSON.parse(storedData) : {};
    },

    // Save time tracking data to local storage
    saveTimeTrackingData(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },

    // Start tracking time for a specific task
    startTaskTimer(taskId) {
        const timeTrackingData = this.getTimeTrackingData();
        const startTime = new Date().getTime();

        timeTrackingData[taskId] = {
            startTime,
            endTime: null,
            totalTime: 0
        };

        this.saveTimeTrackingData(timeTrackingData);
        return startTime;
    },

    // Stop tracking time for a specific task
    stopTaskTimer(taskId) {
        const timeTrackingData = this.getTimeTrackingData();
        const taskTracking = timeTrackingData[taskId];

        if (taskTracking && taskTracking.startTime) {
            const endTime = new Date().getTime();
            const elapsedTime = endTime - taskTracking.startTime;

            taskTracking.endTime = endTime;
            taskTracking.totalTime += elapsedTime;
            taskTracking.startTime = null;

            this.saveTimeTrackingData(timeTrackingData);
            return taskTracking.totalTime;
        }

        return 0;
    },

    // Get total time spent on a task
    getTaskTotalTime(taskId) {
        const timeTrackingData = this.getTimeTrackingData();
        const taskTracking = timeTrackingData[taskId];

        return taskTracking ? taskTracking.totalTime : 0;
    },

    // Format time in hours, minutes, seconds
    formatTime(milliseconds) {
        const totalSeconds = Math.floor(milliseconds / 1000);
        const hours = Math.floor(totalSeconds / 3600);
        const minutes = Math.floor((totalSeconds % 3600) / 60);
        const seconds = totalSeconds % 60;

        return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    }
};