const form = document.querySelector('#form')
const baseUrl = "https://api.shrtco.de/v2/shorten?url="

const shortenLink = async (longUrl) => {
  const response = await fetch(baseUrl + longUrl)

  if (!response.ok) {
    throw new Error('Oops! Something went wrong. Please try after sometime.')
  }

  const data = await response.json()
  return data
}

const callback = (e) => {
  e.preventDefault()
  const longUrl = document.querySelector('#pasted_link')
  const resultArea = document.querySelector('#result')
  const dynamicText = document.querySelector('#dynamic_text')
  shortenLink(longUrl.value)
    .then(data => {
      dynamicText.innerHTML = `Shortened Link: <a href="${data.result.full_short_link}" target="_blank" id="result">${data.result.short_link}</a>`
    })
    .catch(error => {
      dynamicText.innerText = "Error: "
      resultArea.innerText = error.message
    })

  dynamicText.innerText = "generating your short link..."


}


form.addEventListener('submit', callback)