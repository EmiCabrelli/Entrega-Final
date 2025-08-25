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

let = teamStorage = localStorage.getItem("equipo")

team.onclick = () => {
    teamStorage = JSON.parse(teamStorage)

    document.getElementById("title").innerHTML = `
        <h1>Equipo</h1>
        <div id="team-container"></div>
        <button id="costo">Confirmar</button>
        <button id="borrar-equipo">Borrar Equipo</button>
    `
    if (!teamStorage || teamStorage.length === 0) {
        document.getElementById("team-container").innerHTML = `
            <p>El equipo esta vacio.</p>
        `
    }else{
        verEquipo(teamStorage)
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
        const sinergias = {}
        teamStorage.forEach(campeon => {
            if (sinergias[campeon.clase]) {
                sinergias[campeon.clase] += 1
            } else {
                sinergias[campeon.clase] = 1
            }
            if (sinergias[campeon.origen]) {
                sinergias[campeon.origen] += 1
            } else {
                sinergias[campeon.origen] = 1
            }
        })

        let sinergyCount = ""
        for (const clase in sinergias) {
            sinergyCount += `${sinergias[clase]} ${clase}(s) en el equipo.<br>`
        }

        Swal.fire({
            title: "Sinergias en tu equipo",
            html: `Vas a necesitar ${costeTotal} de oro para conseguir todo tu equipo.<br><br>${sinergyCount}`,
            icon: "info",
            confirmButtonText: "Suerte!",
        })

    }
    
    document.getElementById("borrar-equipo").onclick = () => {
        localStorage.removeItem("equipo")
        document.getElementById("team-container").innerHTML = `<p>El equipo está vacío.</p>`
    }

    document.getElementById("volver-placeholder").innerHTML = `
        <button>Volver al Inicio</button>
    `
    document.querySelector("#volver-placeholder button").onclick = () => {
        location.reload()
    }
}