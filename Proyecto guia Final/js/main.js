function obtenerCampeones() {
    fetch("./db/data.json")
        .then((response) => response.json())
        .then((data) => {
            campeones = data
})
}
obtenerCampeones()

let guia = document.getElementById("guia")
let buscar = document.getElementById("buscador")
let team = document.getElementById("team")

const equipo = []

function verCampeones(champArray) {
    champArray.forEach(campeon => {
        const champCard = document.createElement("div")
        champCard.className = "champs"
        champCard.innerHTML = `
            <h2>${campeon.nombre}</h2>
            <p>Coste: ${campeon.coste}</p>
            <p>Clase: ${campeon.clase}</p>
            <p>Origen: ${campeon.origen}</p>
            <p>Rol: ${campeon.rol}</p>
            <p>Estadistica Principal: ${campeon.mainStat}</p>
            <button class="agregarChamp" id="${campeon.nombre}">Agregar al equipo</button>
        `
        champArray.sort((a, b) => a.coste - b.coste)
        document.getElementById("champs-container").appendChild(champCard)

        sumarAlEquipo(campeones)
         
    })
}

function sumarAlEquipo (teamList) {
    const nuevoMiembro = document.querySelectorAll(".agregarChamp")
    nuevoMiembro.forEach(button => {
        button.onclick = (c) => {
            const champName = c.currentTarget.id
            const campeonElegido = teamList.find(champ => champ.nombre == champName)
            if (equipo.length >= 10) {
                Swal.fire({
                    icon: "warning",
                    title: "Equipo lleno.",
                    text: "Alcanzaste el maximo de campeones en tu equipo, vas a tener que sacar alguno en la seccion Equipo para añadir uno nuevo.",
                })
            } else if (!equipo.some(champ => champ.nombre === champName)){
                equipo.push(campeonElegido)
                localStorage.setItem("equipo", JSON.stringify(equipo))
                Swal.fire({
                    icon: "success",
                    title: "Agregaste el campeon a tu equipo!",
                })
            } else {
                Swal.fire({
                    icon: "error",
                    title: "Error",
                    text: "El campeon ya esta en el equipo!",
                })
            }
        }
    })
}

buscar.onclick = () => {
    const equipoStorage = JSON.parse(localStorage.getItem("equipo")) || []
    equipo.length = 0
    equipo.push(...equipoStorage)
    document.getElementById("title").innerHTML = `
        <h1>Aca podes acceder a la lista de campeones disponibles</h1>
        <input type="text" id="filtro" placeholder="Escribe la caracteristica por la que deseas filtrar">
        <div id="champs-container"></div>
        `
    
    verCampeones(campeones)

    let input = document.getElementById("filtro")
    input.onchange=() => {
        const filtro = input.value.toLowerCase()
        const campeonesFiltrados = campeones.filter(campeon => 
            campeon.nombre.toLowerCase().includes(filtro) ||
            campeon.clase.toLowerCase().includes(filtro) ||
            campeon.origen.toLowerCase().includes(filtro) ||
            campeon.rol.toLowerCase().includes(filtro) ||
            campeon.mainStat.toLowerCase().includes(filtro) ||
            campeon.coste.toString() === filtro
        )
        document.getElementById("champs-container").innerHTML = ""
        if (campeonesFiltrados.length > 0) {
            verCampeones(campeonesFiltrados)
        } else {
            Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "No se encontraron campeones con ese filtro, por favor asegurate de escribir bien la caracteristica que deseas buscar.",
                    })
            verCampeones(campeones)
        }
    }
    


    

    document.getElementById("volver-placeholder").innerHTML = `
        <button>Volver al Inicio</button>
    `
    document.querySelector("#volver-placeholder button").onclick = () => {
        location.reload()
    }
}
