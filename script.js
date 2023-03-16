let likeImg = document.querySelectorAll('.likes-block__img')
let countLikes = document.querySelectorAll('.likes-block__count')
let trashIcon = document.querySelector('.comments__delete-icon')

likeImg.forEach(item => item.addEventListener("mouseover", function () {
    item.style.backgroundColor = "#AFA9A9"
}))

likeImg.forEach(item => item.addEventListener("mouseout", function () {
    item.style.backgroundColor = "#E1E0E0"
}))

likeImg.forEach(item => item.addEventListener("click", function () {
    if (item.src.includes('black-heart')) {
        item.nextElementSibling.textContent = +item.nextElementSibling.textContent - 1
        item.src = "icons/heart.svg"
    } else {
        item.nextElementSibling.textContent = +item.nextElementSibling.textContent + 1
        item.src = "icons/black-heart.svg"
    }
}))

trashIcon.addEventListener("mouseover", function () {
    this.style.backgroundColor = "#AFA9A9"
})

trashIcon.addEventListener("mouseout", function () {
    this.style.backgroundColor = "#E1E0E0"
})

let createCommentForm = document.querySelector('.create-comment__form')

function showForm() {
    createCommentForm.style.display = "block"
}
let createCommentButton = document.querySelector('.create-comment__create-button')

createCommentButton.addEventListener("click", showForm)

let inputNameObj = document.querySelector('.form__input')
let textAreaObj = document.querySelector('.form__textarea')
let timeObj = document.querySelector('.form__time')
let delButton = document.querySelectorAll('.comments__delete-button')
delButton[0].addEventListener("click", function () {
    delButton[0].parentElement.parentElement.remove()
})

function checkCorrectDate() {
    if (timeObj.value === '') {
        return true
    }
    if (typeof +timeObj.value.slice(0, 2) !== 'number' || +timeObj.value.slice(0, 2) > 31) {
        return false
    }
    if (typeof +timeObj.value.slice(3, 5) !== 'number' || +timeObj.value.slice(3, 5) > 12) {
        return false
    }
    if (typeof +timeObj.value.slice(6, 10) !== 'number' || +timeObj.value.slice(6, 10) < 2010 || +timeObj.value.slice(6, 10) > 2023) {
        return false
    }
    if (timeObj.value[2] !== '.' || timeObj.value[5] !== '.') {
        return false
    }
    return true
}

function yesterdayOtToday() {
    let date = new Date()
    let currenFullDate = date.toLocaleString()
    let currentDate = date.getDate()

    if (timeObj.value === '') {
        return `Сегодня, ${currenFullDate.slice(12, 17)}`
    }

    if (checkCorrectDate() === true) {
        if (timeObj.value === currenFullDate.slice(0, 10)) {
            return `Сегодня, ${currenFullDate.slice(12, 17)}`
        } else if (+timeObj.value.slice(0, 2) === currentDate - 1) {
            return `Вчера, ${currenFullDate.slice(12, 17)}`
        } else {
            return `${timeObj.value}`
        }
    } else {
    }
}
let main__comments = document.querySelector(".main__comments")

let form = document.forms[0]

form.addEventListener("submit", function (event) {
    event.preventDefault()
    if (inputNameObj.value.trim() === '') {
        document.querySelector('.form__input-block').style.position = "relative"
        if (!document.querySelector('.input-error')) {
            inputNameObj.insertAdjacentHTML("beforebegin", `<span class="input-error">Поле обязательно для заполнения!</span>`)
            document.querySelector('.input-error').style.position = "absolute"
            document.querySelector('.input-error').style.left = "100px"
            document.querySelector('.input-error').style.color = "red"
        }
    }
    if (textAreaObj.value.trim() === '') {
        document.querySelector('.form__textarea-block').style.position = "relative"
        if (!document.querySelector('.textarea-error')) {
            textAreaObj.insertAdjacentHTML("beforebegin", `<span class="textarea-error">Поле обязательно для заполнения!</span>`)
            document.querySelector('.textarea-error').style.position = "absolute"
            document.querySelector('.textarea-error').style.left = "100px"
            document.querySelector('.textarea-error').style.color = "red"
        }
    } else if (textAreaObj.value.trim().length < 5) {
        document.querySelector('.form__textarea-block').style.position = "relative"
        if (!document.querySelector('.textarea-error')) {
            textAreaObj.insertAdjacentHTML("beforebegin", `<span class="textarea-error">Комментарий должен содержать не менее 5 символов!</span>`)
            document.querySelector('.textarea-error').style.position = "absolute"
            document.querySelector('.textarea-error').style.left = "100px"
            document.querySelector('.textarea-error').style.color = "red"
        }
    }

    if (checkCorrectDate() === false && timeObj.value !== '') {
        document.querySelector('.form__time-block').style.position = "relative"
        if (!document.querySelector('.time-error')) {
            timeObj.insertAdjacentHTML("beforebegin", `<span class="time-error">Указана неверная дата!</span>`)
            document.querySelector('.time-error').style.position = "absolute"
            document.querySelector('.time-error').style.left = "280px"
            document.querySelector('.time-error').style.color = "red"
        }
    }

    if (inputNameObj.value.trim() !== '' && textAreaObj.value.trim().length >= 5 && textAreaObj.value.trim() !== '' && checkCorrectDate() === true) {
        main__comments.insertAdjacentHTML("afterbegin", ` <div class="comments__item">
        <div class= "comments__header" >
                    <div class="comments__header-logo user-logo">
                        <img src="icons/default-profile-picture-male-icon.svg" alt="">
                    </div>
                    <div class="comments__header-name user-name">${inputNameObj.value}</div>
                    <div class="comments__header-time submit-time">${yesterdayOtToday()}</div>
                </div >
                <div class="comments__text">${textAreaObj.value}</div>
                <div class="comments__likes likes-block">
                    <img class="likes-block__img" src="icons/heart.svg" alt="">
                    <span class="likes-block__count">0</span>
                </div>
                <div class="comments__delete__block">
                    <button class="comments__delete-button" type=""><img class="comments__delete-icon" src="icons/trash.svg" alt=""></button>
                </div>
            </div>`)
        inputNameObj.value = ''
        textAreaObj.value = ''
        timeObj.value = ''

        document.querySelectorAll('.likes-block__img')[1].addEventListener("mouseover", function () {
            this.style.backgroundColor = "#AFA9A9"
        })
        document.querySelectorAll('.likes-block__img')[1].addEventListener("mouseout", function () {
            this.style.backgroundColor = "#E1E0E0"
        })
        document.querySelectorAll('.likes-block__img')[1].addEventListener("click", function () {
            if (this.src.includes('black-heart')) {
                this.nextElementSibling.textContent = +this.nextElementSibling.textContent - 1
                this.src = "icons/heart.svg"
            } else {
                this.nextElementSibling.textContent = +this.nextElementSibling.textContent + 1
                this.src = "icons/black-heart.svg"
            }
        })

        document.querySelectorAll('.comments__delete-button')[0].addEventListener("click", function () {
            this.parentElement.parentElement.remove()
        })

        document.querySelector('.comments__delete-icon').addEventListener("mouseover", function () {
            this.style.backgroundColor = "#AFA9A9"
        })

        document.querySelector('.comments__delete-icon').addEventListener("mouseout", function () {
            this.style.backgroundColor = "#E1E0E0"
        })
    }
})

document.addEventListener("keydown", function (event) {
    if (createCommentForm.style.display === "block" && event.code === "Enter" && document.activeElement !== textAreaObj) {
        document.querySelector('.form__submit-button').click()
    }
})

inputNameObj.addEventListener('focus', function () {
    inputNameObj.placeholder = ""
    document.querySelector('.input-error').remove()
})
inputNameObj.addEventListener('blur', function () {
    inputNameObj.placeholder = "Введите имя"
    document.querySelector('.input-error').remove()
})

textAreaObj.addEventListener('focus', function () {
    textAreaObj.placeholder = ""
    document.querySelector('.textarea-error').remove()
})
textAreaObj.addEventListener('blur', function () {
    textAreaObj.placeholder = "Введите комментарий"
    document.querySelector('.textarea-error').remove()
})

timeObj.addEventListener('focus', function () {
    timeObj.placeholder = ""
    document.querySelector('.time-error').remove()
})
timeObj.addEventListener('blur', function () {
    timeObj.placeholder = "Введите дату"
    document.querySelector('.time-error').remove()
})
