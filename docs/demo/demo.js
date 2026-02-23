const BONZE_METHODS = /\b(each|first|last|nth|odd|even|filter|siblings|back|set|plugin)\b/g

function escapeHtml(text) {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

export function colorizeCode(source) {
  const tokens = []
  let result = source

  // Capturer et remplacer les commentaires
  result = result.replace(/\/\/.*/g, (match) => {
    const id = `__TOKEN_${tokens.length}__`

    tokens.push(`<span class="cm">${escapeHtml(match)}</span>`)

    return id
  })

  // Capturer et remplacer les strings
  result = result.replace(/(['"`])(?:\\.|(?!\1)[^\\])*\1/g, (match) => {
    const id = `__TOKEN_${tokens.length}__`

    tokens.push(`<span class="str">${escapeHtml(match)}</span>`)

    return id
  })

  // Échapper le HTML restant
  result = escapeHtml(result)

  // Ajouter les spans pour $, => et méthodes
  result = result.replace(/\$/g, '<span class="fn">$</span>')
  result = result.replace(/=&gt;/g, '<span class="kw">=&gt;</span>')
  result = result.replace(BONZE_METHODS, '<span class="fn">$1</span>')

  // Restaurer les tokens
  tokens.forEach((token, i) => {
    result = result.replace(`__TOKEN_${i}__`, token)
  })

  return result
}

export function setCode(target, source) {
  const element = typeof target === 'string' ? document.querySelector(target) : target

  if (!element) {
    return
  }

  element.innerHTML = colorizeCode(source)
}

export function loadHeader(page) {
  fetch('_header.html')
    .then((res) => res.text())
    .then((html) => {
      const template = document.createElement('template')

      template.innerHTML = html.trim()

      const header = template.content.querySelector('header')

      if (header) {
        header.querySelector(`[data-page="${page}"]`)?.classList.add('active')
        document.querySelector('#header')?.replaceWith(header)
      }
    })
}

export function loadFooter() {
  fetch('_footer.html')
    .then((res) => res.text())
    .then((html) => {
      const template = document.createElement('template')

      template.innerHTML = html.trim()

      const footer = template.content.querySelector('footer')

      if (footer) {
        footer.querySelector('#year').textContent = new Date().getFullYear()
        document.querySelector('#footer')?.replaceWith(footer)
      }
    })
}
