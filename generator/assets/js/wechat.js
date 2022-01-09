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
    let desire_input = document.getElementById("desire")
    let disgust_input = document.getElementById("disgust")
    let end_with_select = document.getElementById("end_with")
    let generate_btn = document.getElementById("generate")
    let wxid_input = document.getElementById("wxid")

    desire_input.focus()

    desire_input.addEventListener("change", function () {
        if (this.classList.contains("is-valid")) {
            this.classList.remove("is-valid")
        } else if (this.classList.contains("is-invalid")) {
            this.classList.remove("is-invalid")
        }
        if (this.value === "") {
            return
        }

        let desire_tip = document.getElementById("desire_tip")
        let desire_num = this.value * 1
        let disgust_num = disgust_input.value * 1

        if (desire_num < 0 || desire_num > 9) {
            desire_tip.innerHTML = "Numbers in 0~9 are allowed."
            this.classList.add("is-invalid")
        } else if (desire_input.value !== "" && disgust_input.value !== "" && desire_num === disgust_num) {
            desire_tip.innerHTML = "You disgust this number."
            this.classList.add("is-invalid")
        } else {
            this.classList.add("is-valid")
        }
    })

    disgust_input.addEventListener("change", function () {
        if (this.classList.contains("is-valid")) {
            this.classList.remove("is-valid")
        } else if (this.classList.contains("is-invalid")) {
            this.classList.remove("is-invalid")
        }
        if (this.value === "") {
            return
        }

        let disgust_tip = document.getElementById("disgust_tip")
        let disgust_num = this.value * 1
        let desire_num = desire_input.value * 1
        let end_with_num = end_with_select.value * 1

        if ((disgust_num === 2 && end_with_num !== 0) || (disgust_num === 1 && end_with_num === 12)) {
            disgust_tip.innerHTML = "End with " + end_with_select.value
            this.classList.add("is-invalid")
        } else if (disgust_num < 0 || disgust_num > 9) {
            disgust_tip.innerHTML = "Numbers in 0~9 are allowed"
            this.classList.add("is-invalid")
        } else if (desire_input.value !== "" && disgust_input.value !== "" && disgust_num === desire_num) {
            disgust_tip.innerHTML = "You desire this number"
            this.classList.add("is-invalid")
        } else {
            this.classList.add("is-valid")
        }
    })

    end_with_select.addEventListener("change", function () {
        if (this.classList.contains("is-valid")) {
            this.classList.remove("is-valid")
        } else if (this.classList.contains("is-invalid")) {
            this.classList.remove("is-invalid")
        }

        let end_with_tip = document.getElementById("end_with_tip")
        let end_with_num = this.value * 1
        let disgust_num = disgust_input.value * 1

        if ((end_with_num !== 0 && disgust_num === 2) || (end_with_num === 12 && disgust_num === 1)) {
            end_with_tip.innerHTML = "You disgust this number"
            this.classList.add("is-invalid")
        } else {
            this.classList.add("is-valid")
            if (disgust_input.classList.contains("is-invalid")) {
                disgust_input.classList.remove("is-invalid")
            }
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

        if (end_with_select.classList.contains("is-invalid") || desire_input.classList.contains("is-invalid") || disgust_input.classList.contains("is-invalid")) {
            setTimeout('alert("Please check your selection or input.", "warning", "exclamation-triangle-fill")', 300)
        } else {
            let t_len = 12
            let wxid = "wxid_"

            if (end_with_select.value === "") {
                t_len = 14
            }
            do {
                wxid = "wxid_"
                let t_char;
                for (let i = 0; i < t_len; i++) {
                    let t_random = Math.floor(Math.random() * 36)
                    if (t_random < 10) {
                        t_char = String.fromCharCode(t_random + 48)
                    } else {
                        t_char = String.fromCharCode(t_random + 87)
                    }
                    wxid += t_char;
                }
                if (t_len === 12) {
                    wxid += end_with_select.value
                }
            } while ((desire_input.value !== "" && wxid.indexOf(desire_input.value) < 0) || (disgust_input.value !== "" && wxid.indexOf(disgust_input.value) > -1))
            wxid_input.value = wxid
            setTimeout('alert("Generated successfully.", "success", "check-circle-fill")', 300)
        }
    })
}())