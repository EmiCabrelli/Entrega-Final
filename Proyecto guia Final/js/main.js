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

buscar.onclick = () => {
    const equipoStorage = JSON.parse(localStorage.getItem("equipo")) || []
    equipo.length = 0
    equipo.push(...equipoStorage)
    document.getElementById("title").innerHTML = `
        <h1>Aca podes acceder a la lista de campeones disponibles</h1>
        <div id="champs-container"></div>
        `
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
    verCampeones(campeones)

    function sumarAlEquipo (teamList) {
        const nuevoMiembro = document.querySelectorAll(".agregarChamp")
        nuevoMiembro.forEach(button => {
            button.onclick = (c) => {
                const champName = c.currentTarget.id
                const campeonElegido = teamList.find(champ => champ.nombre == champName)
                if (!equipo.some(champ => champ.nombre === champName)) {
                    equipo.push(campeonElegido)
                    localStorage.setItem("equipo", JSON.stringify(equipo))
                    Swal.fire({
                                icon: "success",
                                title: "Agregaste el campeon a tu equipo!",
                            })
                } else if (equipo.some(champ => champ.nombre === champName)){
                    Swal.fire({
                        icon: "error",
                        title: "Error",
                        text: "El campeon ya esta en el equipo!",

                    })
                }
            }
        })
    }

    document.getElementById("volver-placeholder").innerHTML = `
        <button onclick="location.reload()">Volver al Inicio</button>
    `

}
