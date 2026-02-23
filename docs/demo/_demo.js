const BONZE_METHODS = /\b(bonze|each|first|last|nth|odd|even|filter|siblings|back|set|plugin)\b/g

export function colorizeCode(source) {
  return source
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replace(/(['"`])(?:\\.|(?!\1)[^\\])*\1/g, '<span class="str">$&</span>')
    .replaceAll('=>', '<span class="fn">=&gt;</span>')
    .replace(BONZE_METHODS, '<span class="fn">$1</span>')
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
