let date = new Date();
let currentMonth = date.getMonth();
console.log(currentMonth);
let currentYear = date.getFullYear();
let daysOfWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

let monthsOfYear = [
    "January",
    "February",
    "March",
    "April",
    "Mai",
    "Juni",
    "Juli",
    "August",
    "September",
    "October",
    "November",
    "December",
];

// create a new date object for the first day of the current month
var firstDayOfMonth = new Date(currentYear, currentMonth, 1);

// get the day of the week for the first day of the current month
var dayOfWeek = firstDayOfMonth.getDay();

let daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

let firstDay = new Date(currentYear, currentMonth, 1);
console.log(firstDay);

// calculate the number of days in the current month
let numDays = new Date(currentYear, currentMonth + 1, 0).getDate();

// calculate the number of days to show from the previous month
var numDaysPrevMonth = dayOfWeek;

// calculate the number of days to show from the next month
var numDaysNextMonth =
    6 - new Date(currentYear, currentMonth, numDays).getDay();


function displayCalendar() {
    // Generate a Calendar

    //Returns the day of the week (0 – 6) for the specified date according to local time.
    // 0 is a Sunday
    let startingDay = firstDay.getDay();
    if (startingDay == 0) {
        startingDay = 6;
    }
    // console.log(startingDay);

    // creating table header
    const table = document.createElement("table");
    document.querySelector("#calendar-table").appendChild(table);
    const headerRow = document.createElement("tr");
    let headerMonth = document.createElement("th");
    headerMonth.setAttribute("id", "headerMonth");
    headerMonth.colSpan = 7;
    headerMonth.innerHTML =
        date.toLocaleString("default", {
            month: "long",
        }) +
        " " +
        currentYear;
    headerRow.appendChild(headerMonth);
    table.appendChild(headerRow);

    // create table for days of the week
    let weekDaysRow = document.createElement("tr");
    for (let i = 0; i < 7; i++) {
        let weekDayHeader = document.createElement("th");
        weekDayHeader.innerHTML = daysOfWeek[i];
        weekDaysRow.appendChild(weekDayHeader);
    }

    table.appendChild(weekDaysRow);


    let currentDay = 1;
    let currentRow = document.createElement("tr");
    // loop through the days to show from the previous month
    for (let i = numDaysPrevMonth; i > 0; i--) {
        let prevDate = new Date(currentYear, currentMonth, 0 - i + 1);
        // table += '<td class="prev-month">' + date.getDate() + "</td>";
        let emptyCell = document.createElement("td");
        emptyCell.innerHTML = prevDate.getDate();
        emptyCell.addEventListener("click", function () {
            console.log(emptyCell.innerHTML + "empty cells work");
        });
        console.log(emptyCell + "empty cell is here");
        currentRow.appendChild(emptyCell);
    }

    for (let i = startingDay; i < 7; i++) {
        let dayCell = document.createElement("td");
        dayCell.innerHTML = currentDay;

        currentRow.appendChild(dayCell);
        // console.log(dayCell);
        currentDay++;
    }
    table.appendChild(currentRow);

    while (currentDay <= daysInMonth || currentRow.children.length < 7) {
        currentRow = document.createElement("tr");

        for (let i = 0; i < 7; i++) {
            let dayCell = document.createElement("td");
            if (currentDay <= daysInMonth) {
                dayCell.innerHTML = currentDay;
            } else {
                dayCell.innerHTML = new Date(currentYear, currentMonth + 1, currentDay - daysInMonth).getDate();

            }

            // for(let i = 1; i <= numDaysNextMonth; i++) {
            //     // let nextDate = new Date(currentYear, currentMonth + 1, i);
            //     // dayCell.innerHTML = nextDate;
            //     dayCell.innerHTML = i;
            //     currentRow.appendChild(dayCell);
            //     // console.log("next date: " + nextDate.getDate() + ", dayCell: " + dayCell.innerHTML);
            //     console.log("i: " + i);
            // }
            // console.log("number of the days of the next month " + numDaysNextMonth);


            console.log("current day: " + currentDay)
            // if(dayCell.innerHTML != '') {
            dayCell.addEventListener("click", function () {
                console.log("day cells work");
            });

            // }

            currentRow.appendChild(dayCell);
            if (currentDay == new Date().getDate() &&
                currentYear == new Date().getFullYear() &&
                currentMonth == new Date().getMonth()) {
                console.log(currentMonth);
                dayCell.setAttribute("id", "today");
            }
            currentDay++;
        }
        table.appendChild(currentRow);
    }
}

displayCalendar();

let buttPrev = document.getElementById("previous");
buttPrev.addEventListener("click", function () {
    console.log("Button Previous");
    date.setMonth(date.getMonth() - 1);
    currentMonth = date.getMonth();
    if (currentMonth == 11) {
        currentYear--;
    }
    // console.log(previousMonth);
    // document.querySelector('#headerMonth').innerHTML = monthsOfYear[previousMonth] + ' ' + currentYear;
    // firstDay = new Date(currentYear, previousMonth, 1);

    // let date = new Date(currentYear, previousMonth, 1);
    // console.log(currentMonth);
    // let currentYear = date.getFullYear();
    document.querySelector("#calendar-table").innerHTML = "";
    displayCalendar();
});

let buttNext = document.getElementById("next");
buttNext.addEventListener("click", function () {
    console.log("Button Next");
    date.setMonth(date.getMonth() + 1);
    currentMonth = date.getMonth();
    if (currentMonth == 0) {
        currentYear++;
    }
    // console.log(nextMonth);
    // console.log(monthsOfYear[nextMonth]);
    // document.querySelector('#headerMonth').innerHTML = monthsOfYear[nextMonth] + ' ' + currentYear;
    // firstDay = new Date(currentYear, nextMonth, 1);
    document.querySelector("#calendar-table").innerHTML = "";
    displayCalendar();
});

let buttPlus = document.getElementById("addEvent");
buttPlus.addEventListener("click", function () {
    console.log("it works");
});

// Get your current position

let lat;
let long;

function getPosition() {
    const success = (position) => {
        console.log(position);
        lat = position.coords.latitude;
        long = position.coords.longitude;

        function getCity() {
            console.log(lat);
            console.log(long);
            fetch(
                "http://api.openweathermap.org/geo/1.0/reverse?lat=" +
                lat +
                "&lon=" +
                long +
                "&limit=2&appid=" +
                "e9ca98e57b68488e060c64799d86e7fc"
                // 'https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=e9ca98e57b68488e060c64799d86e7fc'
            )
                .then((response) => response.json())
                .then((data) => weather.fetchWeather(data));
        }

        let weather = {
            apiKey: "e9ca98e57b68488e060c64799d86e7fc",
            // getCity: function(){
            //     fetch(
            //         "http://api.openweathermap.org/geo/1.0/reverse?lat="
            //         + lat
            //         + "&lon="
            //         + long
            //         + "&limit=2&appid="
            //         + this.apiKey
            //         // 'https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=e9ca98e57b68488e060c64799d86e7fc'
            //     ).then((response)=> response.json())
            //     .then((data)=> thi(data));
            // },
            fetchWeather: function (data) {
                console.log(data);
                let city = data[0].name;
                console.log(city);
                fetch(
                    "https://api.openweathermap.org/data/2.5/weather?q=" +
                    city +
                    "&units=metric&appid=" +
                    this.apiKey
                    // 'https://api.openweathermap.org/data/2.5/weather?q=Berlin&units=metric&appid=e9ca98e57b68488e060c64799d86e7fc'
                )
                    .then((response) => response.json())
                    .then((data) => this.displayWeather(data));
            },
            displayWeather: function (data) {
                const { name } = data;
                const { icon, description } = data.weather[0];
                const { temp, humidity } = data.main;
                const { speed } = data.wind;
                document.querySelector(".city").innerText = "Weather in " + name;
                document.querySelector(".icon").src =
                    "https://openweathermap.org/img/wn/" + icon + "@2x.png";
                document.querySelector(".description").innerText = description;
                document.querySelector(".temp").innerText = parseInt(temp) + "°C";
                document.querySelector(".humidity").innerText =
                    "Humidity: " + humidity + "%";
                document.querySelector(".wind").innerText =
                    "Wind speed: " + speed + " km/h";
                console.log(name, icon, description, humidity, speed);
            },
        };

        getCity();
    };

    const error = () => {
        console.log("no");
        // window.status.textContent = 'Unable to retrieve your location';
    };

    navigator.geolocation.getCurrentPosition(success, error);
}
getPosition();
