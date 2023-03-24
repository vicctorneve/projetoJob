let dias = []

class Dia {
    dia;
    estrutura;

    constructor(dia, vaga, emp, fb, data) {
        this.dia = dia;
        this.estrutura = 
        `<div class="containerDay">
            <h2>Dia ${dia}</h2>
            <i class="fa-solid fa-plus fa-3x"></i>
            <div class="tableContainer">
                <table>
                    <thead>
                        <tr>
                            <th>Vaga</th>
                            <th>Empresa</th>
                            <th>Feedback</th>
                            <th>Entrevista</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td>${vaga}</td>
                            <td>${emp}</td>
                            <td>${fb}</td>
                            <td>${data}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>`
    }
}


// Validação de entrada

// 

element = new Dia(1, 'microsoft', 'padaria pãobom', 'negativo', '22-03-2023');
dias.push(element.estrutura);

document.body.insertAdjacentHTML('beforeend', dias[0]);
