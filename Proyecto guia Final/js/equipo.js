team.onclick = () => {
    let = teamStorage = localStorage.getItem("equipo")
    teamStorage = JSON.parse(teamStorage)

    document.getElementById("title").innerHTML = `
        <h1>Equipo</h1>
        <div id="team-container"></div>
        <button id="costo">Calcular Costo</button>
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
        document.getElementById("team-container").innerHTML = ""
        teamArray.forEach((campeon, sacar) => {
            const teamCard = document.createElement("div")
            teamCard.innerHTML = `
                <h2>${campeon.nombre}</h2>
                <p>Coste: ${campeon.coste}</p>
                <button class="quitar-campeon" data-index="${sacar}">Quitar</button>
            `
            document.getElementById("team-container").appendChild(teamCard)
            })

        const botonesQuitar = document.querySelectorAll(".quitar-campeon")
        botonesQuitar.forEach(boton => {
            boton.onclick = function() {
                const aSacar = parseInt(boton.getAttribute("data-index"))
                teamArray.splice(aSacar, 1)
                localStorage.setItem("equipo", JSON.stringify(teamArray))
                verEquipo(teamArray)
            }
        })
        if (teamArray.length === 0) {
            document.getElementById("team-container").innerHTML = "<p>El equipo está vacío.</p>"
        }
    }
    
    document.getElementById("costo").onclick = () => {
        if (!teamStorage || teamStorage.length === 0) {
            Swal.fire({
                title: "Error",
                text: "Te falta añadir campeones a tu equipo!",
                icon: "error",
            })
            return
        }
        const costeTotal = teamStorage.reduce((costo, campeon) => costo + Number(campeon.coste), 0)
            Swal.fire(`Vas a necesitar ${costeTotal} de oro para conseguir todo tu equipo.`)
            
    }
    
    document.getElementById("borrar-equipo").onclick = () => {
        localStorage.removeItem("equipo")
        document.getElementById("team-container").innerHTML = `<p>El equipo está vacío.</p>`
    }

    document.getElementById("volver-placeholder").innerHTML = `
        <button onclick="location.reload()">Volver al Inicio</button>`
    
}