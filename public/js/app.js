// console.log('I am HERE!')


const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault()

    const location = encodeURIComponent(search.value)
    console.log('..SUBMIT: ' + location)

    const url = '/weather?address=' + location

    messageOne.textContent = '...loading'
    messageTwo.textContent = ''

    fetch(url).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                console.error(data.error)
                messageOne.textContent = data.error
                messageTwo.textContent = ''
            } else {
                messageOne.textContent = `${data.forecast}, ${data.temperature} Celzia`
                messageTwo.textContent = data.location
                console.log(data.location)
                console.log(data.temperature)
                console.log(data.forecast)
            }
        })
    })
})
