const chartWeek =document.querySelector("#chartWeek").getContext('2d');
const chartMonth =document.querySelector("#chartMonth").getContext('2d');

const chartRating =document.querySelector("#chartRating").getContext('2d');
const chartRevenue =document.querySelector("#chartRevenue").getContext('2d');

const chartAccessWeek =document.querySelector("#chartAccessWeek").getContext('2d');
const chartAccessMonth =document.querySelector("#chartAccessMonth").getContext('2d');



new Chart(chartWeek, {
    type: 'bar',
    data: {
        labels: ['Week 19th', 'Week 20th', 'Week 21st', 'Week 22nd', 'Week 23rd'],
        datasets: [
            {
                label: 'WEEKs',
                data: [86, 70, 68, 90, 88],
                backgroundColor: '#6271e5'
            }
        ]
    },
    option: {
        responsive: true
    }
});
new Chart(chartMonth, {
    type: 'bar',
    data: {
        labels: ['June 2022', 'July 2022', 'August 2022', 'September 2022', 'October 2022', 'November 2022', 'Decomber 2022', 'January 2023',
         'February 2023', 'March 2023', 'April 2023', 'May 2023'],
        datasets: [
            {
                label: 'MONTHs',
                data: [300, 280, 278, 293, 277, 298, 302, 257, 264, 220, 245, 260],
                backgroundColor: '#7de660'
            }
        ]
    },
    option: {
        responsive: true
    }
});


// ===========================RIGHT==========================
new Chart(chartRating, {
    type: 'bar',
    data: {
        labels: ['1', '2', '3', '4', '5'],
        datasets: [
            {
                label: 'Rating',
                data: [1, 2, 1, 7, 9],
                backgroundColor: '#f1ef7e'
            }
        ]
    },
    option: {
        responsive: true
    }
});
new Chart(chartRevenue, {
    type: 'bar',
    data: {
        labels: ['June 2022', 'July 2022', 'August 2022', 'September 2022', 'October 2022', 'November 2022', 'Decomber 2022', 'January 2023',
        'February 2023', 'March 2023', 'April 2023', 'May 2023'],
        datasets: [
            {
                label: 'Revenue',
                data: [858, 868, 823, 725, 858, 868, 823, 725, 858, 868, 823, 725],
                backgroundColor: '#ff7782'
            }
        ]
    },
    option: {
        responsive: true
    }
});
new Chart(chartAccessWeek, {
    type: 'line',
    data: {
        labels: ['Week 19th', 'Week 20th', 'Week 21st', 'Week 22nd', 'Week 23rd'],
        datasets: [
            {
                label: 'WEEK ACCESS',
                data: [86, 70, 68, 90, 88],
                borderColor: '#6271e5'
            }
        ]
    },
    option: {
        responsive: true
    }
});
new Chart(chartAccessMonth, {
    type: 'line',
    data: {
        labels: ['June 2022', 'July 2022', 'August 2022', 'September 2022', 'October 2022', 'November 2022', 'Decomber 2022', 'January 2023',
         'February 2023', 'March 2023', 'April 2023', 'May 2023'],
        datasets: [
            {
                label: 'MONTHs',
                data: [300, 280, 278, 293, 277, 298, 302, 257, 264, 220, 245, 260],
                borderColor: '#7de660'
            }
        ]
    },
    option: {
        responsive: true
    }
})
