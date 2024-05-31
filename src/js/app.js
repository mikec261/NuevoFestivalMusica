document.addEventListener('DOMContentLoaded', function () {
    navegacionFija()
    crearGaleria()
    resaltarEnlace()
    scrollNav()
})

function navegacionFija() {
    const header = document.querySelector('.header')
    const sobreFestival = document.querySelector('.sobre-festival')

    //Agregamos un escucha del evento scroll
    document.addEventListener('scroll', function () {
        //ejecuta codigo si la cordenada actual es menor a 1 
        if (sobreFestival.getBoundingClientRect().bottom < 1) {
            header.classList.add('fixed')
        } else {
            header.classList.remove('fixed')
        }

    })

}

function crearGaleria() {
    const galeria = document.querySelector('.galeria-imagenes') // Corregir este selector según corresponda

    const CANTIDAD_IMAGENES = 16
    for (let i = 1; i <= CANTIDAD_IMAGENES; i++) {
        const imagen = document.createElement('IMG')
        imagen.src = `src/img/gallery/full/${i}.jpg` // Utilizar comillas invertidas aquí
        imagen.alt = 'Imagen Galeria'

        //Event Handler
        imagen.onclick = function () {
            mostrarImagen(i)
        }

        galeria.appendChild(imagen)
    }
}

function mostrarImagen(i) {
    const imagen = document.createElement('IMG')
    imagen.src = `src/img/gallery/full/${i}.jpg` // Utilizar comillas invertidas aquí
    imagen.alt = 'Imagen Galeria'

    //Generar Modal
    const modal = document.createElement('DIV')
    modal.classList.add('modal')
    modal.onclick = cerrarModal

    //Boton cerrarModal
    const cerrarModalBtn = document.createElement('BUTTON')
    cerrarModalBtn.textContent = 'X'
    cerrarModalBtn.classList.add('btn-cerrar')
    cerrarModalBtn.onclick = cerrarModal

    //Agregar boton cerrar
    modal.appendChild(cerrarModalBtn)

    //Agregar la imagen
    modal.insertBefore(imagen, cerrarModalBtn)
    //Agregar al Html
    const body = document.querySelector('body')
    body.classList.add('overflow-hidden')
    body.appendChild(modal)
}

function cerrarModal() {
    const modal = document.querySelector('.modal')
    modal.classList.add('fadeOut')
    const body = document.querySelector('body')


    setTimeout(() => {
        modal?.remove()
        body.classList.remove('overflow-hidden')

    }, 500);

}

function resaltarEnlace() {
    document.addEventListener('scroll', () => {
        const sections = document.querySelectorAll('section')
        const navLinks = this.document.querySelectorAll('.navegacion-principal a')
        let actual = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop
            const sectionHeight = section.clientHeight

            if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
                actual = section.id
            }
        })
        navLinks.forEach(link => {
            link.classList.remove('active')
            if (link.getAttribute('href') === '#' + actual) {
                link.classList.add('active')
            }
        })
    })
}

function scrollNav() {
    const navLinks = document.querySelectorAll('.navegacion-principal a')

    navLinks.forEach(link => {
        link.addEventListener('click', e => {
            e.preventDefault()

            const sectionScroll = e.target.getAttribute('href')
            const section = document.querySelector(sectionScroll)

            section.scrollIntoView({ behavior: 'smooth' })

        })
    })
}

