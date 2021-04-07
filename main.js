let cursorNode = document.createElement('a')
cursorNode.classList.add('cursor')
cursorNode.textContent = '_'

const typeText = (element, text, delay = 100) => new Promise((resolve) => {
  let interval 
  const letters = text.split('')

  const createLetterNode = (letter) => {
    const node = document.createElement('span')
    node.classList.add('letter')
    node.textContent = letter
    return node
  }

  const typeNextLetter = () => {
    if (!letters.length) {
      clearInterval(interval)
      const node = createLetterNode("")
      element.appendChild(node)
      return resolve()
    }

    const letter = letters.shift()
    const node = createLetterNode(letter)
    element.appendChild(node)
  }
  
  interval = setInterval(typeNextLetter, delay)
})

const elements = document.querySelectorAll('*[data-type]')

async function typeAllTexts (nodes, delay = 100) {
  
  for (const node of nodes) {
    node.dataset.type = node.textContent
    node.textContent = ''
  }

  let node
  for (node of nodes) {
    await typeText(node, node.dataset.type, delay)
  }
  node.appendChild(cursorNode)
  
  // cursorNode.remove()
}
typeAllTexts(elements)
