const campeones = [
    {
        nombre: "Aatrox",
        coste: 1,
        clase: "Heavyweight",
        origen: "Mighty Mech",
        rol: "peleador",
        mainStat: "ad",
    },{
        nombre: "Lucian",
        coste: 1,
        clase: "Sorcerer",
        origen: "Mighty Mech",
        rol: "caster",
        mainStat: "ap",
    },{
        nombre: "Gangplank",
        coste: 2,
        clase: "Duelist",
        origen: "Mighty Mech",
        rol: "peleador",
        mainStat: "ad",
    },{
        nombre: "Senna",
        coste: 3,
        clase: "Executioner",
        origen: "MightyMech",
        rol: "tirador",
        mainStat: "ad",
    },{
        nombre: "Jarvan",
        coste: 4,
        clase: "Strategist",
        origen: "Mighty Mech",
        rol: "tanque",
        mainStat: "hp",
    },{
        nombre: "Karma",
        coste: 4,
        clase: "Sorcerer",
        origen: "Mighty Mech",
        rol: "",
        mainStat: "",
        
    },{
        nombre: "Yone",
        coste: 5,
        clase: "Edgelord",
        origen: "Mighty Mech",
        rol: "peleador",
        mainStat: "ad",
    },{
        nombre: "Malphite",
        coste: 1,
        clase: "Protector",
        origen: "The Crew",
        rol: "tanque",
        mainStat: "hp"
    },{
        nombre: "Sivir",
        coste: 1,
        clase: "Sniper",
        origen: "The Crew",
        rol: "tirador",
        mainStat: "ad"
    },{
        nombre: "Shen",
        coste: 2,
        clase: "Bastion",
        origen: "The Crew",
        rol: "tanque",
        mainStat: "hp"
    },{
        nombre: "Ziggs",
        coste: 3,
        clase: "Strategist",
        origen: "The Crew",
        rol: "caster",
        mainStat: "ap"
    },{
        nombre: "Twisted Fate",
        coste: 5,
        clase: "Rogue Captain",
        origen: "The Crew",
        rol: "tirador",
        mainStat: "hibrido"
    },{
        nombre: "Kayle",
        coste: 1,
        clase: "Duelist",
        origen: "Wraith",
        rol: "especialista",
        mainStat: "ap"
    },{
        nombre: "Zac",
        coste: 1,
        clase: "Heavyweight",
        origen: "Wraith",
        rol: "tanque",
        mainStat: "ap"
    },{
        nombre: "Jhin",
        coste: 2,
        clase: "Sniper",
        origen: "Wraith",
        rol: "especialista",
        mainStat: "ad"
    },{
        nombre: "Malzahar",
        coste: 3,
        clase: "Prodigy",
        origen: "Wraith",
        rol: "caster",
        mainStat: "ap"
    },{
        nombre: "K'sante",
        coste: 4,
        clase: "Protector",
        origen: "Wraith",
        rol: "tanque",
        mainStat: "hp"
    },{
        nombre: "Varus",
        coste: 5,
        clase: "Sniper",
        origen: "Wraith",
        rol: "especialista",
        mainStat: "hibrido"
    }/*,{
        nombre: "",
        coste: 0,
        clase: "",
        origen: "",
        rol: "",
        mainStat: ""
    },*/
]
// Dejar una plantilla para agregar mas champs.

let guia = document.getElementById("guia")
let buscar = document.getElementById("buscador")
let team = document.getElementById("team")

const equipo = []

guia.onclick = () => {
    document.getElementById("title").innerHTML = `
        <h1>Guía de Teamfight Tactics</h1>
        <label for="mecanicas">Sobre que querés saber? </label>
        <select id="mecanicas" name="mecanicas" placeholder="Selecciona una opción">
            <option value="" disabled selected>--opciones--</option>
            <option value="bases">Bases del juego</option>
            <option value="economia">Economia</option>
            <option value="unidades">Unidades</option>
            <option value="objetos">Objetos</option>
        </select>
        <div id="guia-text"></div>
        
    `
    document.getElementById("volver-placeholder").innerHTML = `
        <button onclick="location.reload()">Volver al Inicio</button>
        `
    
    const mecanicas = document.getElementById("mecanicas")
    mecanicas.onchange = () => {
        const guiaText = document.getElementById("guia-text")
        switch (mecanicas.value) {
            case "bases":
                guiaText.innerHTML = `
                    <h2>Bases del juego</h2>
                    <p> Aca va texto </p>
                `
                break
            case "economia":
                guiaText.innerHTML = `
                    <h2>Economía</h2>
                    <p> Aca va texto </p>
                `
                break
            case "unidades":
                guiaText.innerHTML = `
                    <h2>Unidades</h2>
                    <p> Aca va texto </p>
                `
                break
            case "objetos":
                guiaText.innerHTML = `
                    <h2>Objetos</h2>
                    <p> Aca va texto </p>
                `
        }
            
    }
}

buscar.onclick = () => {
    document.getElementById("title").innerHTML = `
        <h1>Aca podes acceder a la lista de campeones disponibles</h1>
        <input type="text" id="search" placeholder="Escribe lo que desees buscar">
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
            equipo.push(campeonElegido)
            console.log(equipo)

            localStorage.setItem("equipo", JSON.stringify(equipo))
            }
        })
    }

    document.getElementById("volver-placeholder").innerHTML = `
        <button onclick="location.reload()">Volver al Inicio</button>
    `

}

team.onclick = () => {
    let = teamStorage = localStorage.getItem("equipo")
    teamStorage = JSON.parse(teamStorage)

    document.getElementById("title").innerHTML = `
        <h1>Equipo</h1>
        <div id="team-container"></div>
        <button id="borrar-equipo">Borrar Equipo</button>
    `
    if (!teamStorage || teamStorage.length === 0) {
        document.getElementById("team-container").innerHTML = `
            <p>El equipo esta vacio.</p>
        `
    }else{
        verEquipo(teamStorage)
    }
    
    function verEquipo(teamArray) {
            teamArray.forEach(campeon => {
            const teamCard = document.createElement("div")
            teamCard.innerHTML = `<h2>${campeon.nombre}</h2>`
            document.getElementById("team-container").appendChild(teamCard)
            })
        }
    
        document.getElementById("borrar-equipo").onclick = () => {
        localStorage.removeItem("equipo")
        document.getElementById("team-container").innerHTML = `<p>El equipo está vacío.</p>`
    }

    document.getElementById("volver-placeholder").innerHTML = `
        <button onclick="location.reload()">Volver al Inicio</button>`
    
}
