// Efficient Meeting Scheduler
// Problem Statement:
// You are developing a feature for a calendar application that helps users find available meeting times. Your task is to implement a MeetingScheduler class that supports the following operations:

// schedule(start, end): Adds a new meeting to the calendar. The start and end parameters are integers representing the start time and end time of the meeting (in a 24-hour format). This method should return true if the meeting was successfully scheduled without any conflicts, and false otherwise.

// findAvailableSlots(duration, start, end): Finds all available slots in the calendar that can accommodate a meeting of duration minutes, within the specified start and end times. This method should return a list of available slots, where each slot is represented by a tuple (availableStart, availableEnd).

// Meetings cannot overlap, but they can start immediately after another meeting ends. For simplicity, assume that all times are in minutes from the start of the day (e.g., 9:00 AM is represented as 540).

// Constraints:
// 0 ≤ start < end ≤ 24 * 60
// 1 ≤ duration ≤ 24 * 60
// The number of calls to schedule and findAvailableSlots will not exceed 104.


function createMeetingScheduler() {
    let meetings = []; // Closure to store meetings

    function schedule(start, end) {
        // CODE HERE
        for (let i = 0; i < meetings.length; i++) {
            if (isInRange(start + 1, meetings[i])) {
                return false;
            } else if (isInRange(end - 1, meetings[i])) {
                return false;
            }
        }
        meetings.push([start, end]);
        // sort every time new meeting is added
        meetings.sort((a, b) => a[0] - b[0]);
        return true;

    }

    function findAvailableSlots(duration, start, end) {
        const availableSlots = [];
        // CODE HERE
        for (let i = 0; i < meetings.length; i++) {
            let meeting = meetings[i];

            if (!isInRange(start, meeting) && start + duration <= meeting[0]) {
                availableSlots.push([start, meeting[0]]);
                start = meetings[i][1];

            }
            // check for the last meetings element until end
            if (i === meetings.length - 1 && !isInRange(end, meeting)) {
                availableSlots.push([meeting[1], end]);
            }

        }
        return availableSlots;
    }

    function isInRange(checkTime, meeting) {
        return checkTime >= meeting[0] && checkTime <= meeting[1];
    }

    return { schedule, findAvailableSlots };
}

const scheduler = createMeetingScheduler();

// Schedule some meetings
console.log(scheduler.schedule(60, 120));  // True: Meeting scheduled from 1:00 to 2:00
console.log(scheduler.schedule(150, 180)); // True: Meeting scheduled from 2:30 to 3:00

// Find available slots
console.log(scheduler.findAvailableSlots(30, 0, 240));
// Expected Output: [[0, 60], [120, 150], [180, 240]]
// Explanation: Shows available slots before the first meeting, between the two meetings, and after the last meeting within the specified range.
