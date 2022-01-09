let alertPlaceholder = document.getElementById('liveAlertPlaceholder')

function alert(message, type, icon) {
    let wrapper = document.createElement('div')
    wrapper.innerHTML = '<div class="alert alert-' + type + ' d-flex align-items-center alert-dismissible w-50 mx-auto" role="alert"><svg class="bi flex-shrink-0 me-2" width="24" height="24" role="img"><use xlink:href="#' + icon + '"/></svg>' + message + '<button type="button" class="btn-close" data-bs-dismiss="alert"></button></div>'

    alertPlaceholder.appendChild(wrapper)

    setTimeout(function () {
        wrapper.innerHTML = ""
    }, 3000)
}

(function () {
    let city_select = document.getElementById("city")
    let year_input = document.getElementById("year")
    let month_input = document.getElementById("month")
    let day_input = document.getElementById("day")
    let gender_radio = document.getElementsByName("gender_radio")
    let generate_btn = document.getElementById("generate")
    let card_id_input = document.getElementById("card_id")

    year_input.focus()

    year_input.addEventListener("change", function () {
        if (this.classList.contains("is-valid")) {
            this.classList.remove("is-valid")
        } else if (this.classList.contains("is-invalid")) {
            this.classList.remove("is-invalid")
        }
        if (this.value === "") {
            return
        }

        let year_tip = document.getElementById("year_tip")
        let year_num = this.value * 1
        let month_num = month_input.value * 1
        let day_num = day_input.value * 1
        let t_date = new Date()
        let t_year = t_date.getFullYear()
        let t_month = t_date.getMonth() + 1
        let t_day = t_date.getDate()

        if (year_num < 1) {
            year_tip.innerHTML = "Invalid year"
            this.classList.add("is-invalid")
        } else if (year_num < 1900) {
            year_tip.innerHTML = "Too early"
            this.classList.add("is-invalid")
        } else if (year_num > t_year) {
            year_tip.innerHTML = "It's in the future"
            this.classList.add("is-invalid")
        } else if (year_num === t_year) {
            if (month_num > t_month || (month_num === t_month && day_num > t_day)) {
                year_tip.innerHTML = "It's in the future"
                this.classList.add("is-invalid")
            } else {
                this.classList.add("is-valid")
            }
        } else if (month_num === 2 && day_num === 29) {
            if (!(year_num % 4 === 0 && year_num % 100 !== 0 || year_num % 400 === 0)) {
                year_tip.innerHTML = "It's not a leap year"
                this.classList.add("is-invalid")
            } else {
                this.classList.add("is-valid")
            }
        } else {
            this.classList.add("is-valid")
        }
    })

    month_input.addEventListener("change", function () {
        if (this.classList.contains("is-valid")) {
            this.classList.remove("is-valid")
        } else if (this.classList.contains("is-invalid")) {
            this.classList.remove("is-invalid")
        }
        if (this.value === "") {
            return
        }

        let month_tip = document.getElementById("month_tip")
        let year_num = year_input.value * 1
        let month_num = this.value * 1
        let day_num = day_input.value * 1
        let t_date = new Date()
        let t_year = t_date.getFullYear()
        let t_month = t_date.getMonth() + 1

        if (month_num < 1 || month_num > 12) {
            month_tip.innerHTML = "Invalid month"
            this.classList.add("is-invalid")
        } else if (day_num > 28) {
            switch (month_num) {
                case 2:
                    if (year_input.value !== "" && !(year_num % 4 === 0 && year_num % 100 !== 0 || year_num % 400 === 0)) {
                        month_tip.innerHTML = "It's not a leap year"
                        this.classList.add("is-invalid")
                    } else if (day_num > 29) {
                        month_tip.innerHTML = "Up to 29 days in February"
                        this.classList.add("is-invalid")
                    } else {
                        this.classList.add("is-valid")
                    }
                    break
                case 4:
                case 6:
                case 9:
                case 11:
                    if (day_num > 30) {
                        month_tip.innerHTML = "Only 30 days this month"
                        this.classList.add("is-invalid")
                    } else {
                        this.classList.add("is-valid")
                    }
                    break
                default:
                    this.classList.add("is-valid")
            }
        } else if (year_num === t_year) {
            if (month_num > t_month) {
                month_tip.innerHTML = "It's in the future"
                this.classList.add("is-invalid")
            } else {
                this.classList.add("is-valid")
            }
        } else {
            this.classList.add("is-valid")
        }
    })

    day_input.addEventListener("change", function () {
        if (this.classList.contains("is-valid")) {
            this.classList.remove("is-valid")
        } else if (this.classList.contains("is-invalid")) {
            this.classList.remove("is-invalid")
        }
        if (this.value === "") {
            return
        }

        let day_tip = document.getElementById("day_tip")
        let day_num = this.value * 1
        let month_num = month_input.value * 1
        let year_num = year_input.value * 1
        let t_date = new Date()
        let t_year = t_date.getFullYear()
        let t_month = t_date.getMonth() + 1
        let t_day = t_date.getDate()

        if (day_num < 1 || day_num > 31) {
            day_tip.innerHTML = "Invalid date"
            this.classList.add("is-invalid")
        } else if (day_num > 28) {
            switch (month_num) {
                case 2:
                    if (year_input.value !== "" && !(year_num % 4 === 0 && year_num % 100 !== 0 || year_num % 400 === 0)) {
                        day_tip.innerHTML = "It's not a leap year"
                        this.classList.add("is-invalid")
                    } else if (day_num > 29) {
                        day_tip.innerHTML = "Up to 29 days in February"
                        this.classList.add("is-invalid")
                    } else {
                        this.classList.add("is-valid")
                    }
                    break
                case 4:
                case 6:
                case 9:
                case 11:
                    if (day_num > 30) {
                        day_tip.innerHTML = "Only 30 days this month"
                        this.classList.add("is-invalid")
                    } else {
                        this.classList.add("is-valid")
                    }
                    break
                default:
                    this.classList.add("is-valid")
            }
        } else if (year_num === t_year && month_num === t_month) {
            if (day_num > t_day) {
                day_tip.innerHTML = "It's in the future"
                this.classList.add("is-invalid")
            } else {
                this.classList.add("is-valid")
            }
        } else {
            this.classList.add("is-valid")
        }
    })

    generate_btn.addEventListener("click", function () {
        let alertList = document.querySelectorAll('.alert')
        let alerts = [].slice.call(alertList).map(function (element) {
            return new bootstrap.Alert(element)
        })
        alerts.map(function (element) {
            element.close()
        })

        if (year_input.classList.contains("is-invalid") || month_input.classList.contains("is-invalid") || day_input.classList.contains("is-invalid")) {
            setTimeout('alert("Please check your selection or input.", "warning", "exclamation-triangle-fill")', 300)
        } else {
            let card_id = city_select.value

            if (year_input.value !== "") {
                card_id += (Array(4).join(0) + parseInt(year_input.value)).slice(-4)
            } else {
                card_id += "2001"
            }
            if (month_input.value !== "") {
                card_id += (Array(2).join(0) + parseInt(month_input.value)).slice(-2)
            } else {
                card_id += "01"
            }
            if (day_input.value !== "") {
                card_id += (Array(2).join(0) + parseInt(day_input.value)).slice(-2)
            } else {
                card_id += "01"
            }

            let t_gender
            for (i = 0; i < gender_radio.length; i++) {
                if (gender_radio[i].checked) {
                    t_gender = gender_radio[i].value;
                }
            }

            let t_random_num
            if (t_gender === "female") {
                do {
                    t_random_num = Math.floor(Math.random() * 999)
                } while (t_random_num % 2 > 0)
            } else {
                do {
                    t_random_num = Math.floor(Math.random() * 999)
                } while (t_random_num % 2 == 0)
            }
            card_id += (Array(3).join(0) + parseInt(t_random_num.toString())).slice(-3)
            let t_sum = card_id[0] * 7 + card_id[1] * 9 + card_id[2] * 10 + card_id[3] * 5 + card_id[4] * 8 + card_id[5] * 4 + card_id[6] * 2 + card_id[7] * 1 + card_id[8] * 6 + card_id[9] * 3 + card_id[10] * 7 + card_id[11] * 9 + card_id[12] * 10 + card_id[13] * 5 + card_id[14] * 8 + card_id[15] * 4 + card_id[16] * 2
            let t_mod = t_sum % 11
            switch (t_mod) {
                case 0:
                    card_id += "1"
                    break
                case 1:
                    card_id += "0"
                    break
                case 2:
                    card_id += "X"
                    break
                case 3:
                    card_id += "9"
                    break
                case 4:
                    card_id += "8"
                    break
                case 5:
                    card_id += "7"
                    break
                case 6:
                    card_id += "6"
                    break
                case 7:
                    card_id += "5"
                    break
                case 8:
                    card_id += "4"
                    break
                case 9:
                    card_id += "3"
                    break
                case 10:
                    card_id += "2"
                    break
            }
            card_id_input.value = card_id
            setTimeout('alert("Generated successfully.", "success", "check-circle-fill")', 300)
        }
    })
}())