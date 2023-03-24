const inputsConfig = document.querySelectorAll(".box input");
const containerVagas = document.querySelector(".containerVagas");
const menuAddVaga = document.querySelector('.menu-lateral');
const btnAddVaga = menuAddVaga.querySelector('.btnAddVaga');
const inputsDadoVaga = menuAddVaga.querySelectorAll('.formVaga input');

let element;
let configurations;

let count = 7;
let data = [];

function createDays(index){
   const day = document.createElement('div');
   day.classList.add('containerDay')
   
   const h2 = document.createElement('h2');
   h2.innerText = `Dia ${index}`;
   day.append(h2);
   const i = document.createElement('i');
   i.setAttribute('class', 'fa-solid fa-plus fa-3x')
   i.onclick = function(){
      element = i.parentNode
      OpenMenu()
   }
   
   day.append(i)
   containerVagas.appendChild(day)
}

(changeInput =()=>{
   configurations = {
      vagaPorDia: parseInt(inputsConfig[0].value),
      periodo: parseInt(inputsConfig[1].value) 
   }


   if(configurations.periodo === 7){
      for (let i = 1; i < configurations.periodo +1; i++) {
         createDays(i)
      }
   } else{
      createDays(configurations.periodo)
   }

})()


const OpenMenu =() => {
   menuAddVaga.classList.add('active')
   const elementPai = btnAddVaga.parentNode.parentNode
   const h2Day = element.querySelector('h2')
   const h1 = elementPai.querySelector('h1')
   h1.innerHTML = h2Day.textContent
}

const closeMenu =() => menuAddVaga.classList.remove('active')

// const addVagas = day =>{
//    const vagas = day.querySelectorAll('table');
      
//    if(vagas.length === configurations.vagaPorDia){
//       return;
//    }
//    createTables(day)
// }

const getInputVaga = () =>{
   for (let i = 0; i < inputsDadoVaga.length; i++) {
      console.log(inputsDadoVaga[i].value)
      console.log(inputsDadoVaga[i].id)
   }
}

btnAddVaga.addEventListener('click', (e) =>{
   e.preventDefault();
   getInputVaga();
   createTables(element);
})


function createTables(day){
   const vagas = day.querySelectorAll('table');
      
   if(vagas.length === configurations.vagaPorDia){
      return;
   }
   const table = document.createElement('table');

   const tableTemplate = `
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
         <td>Estagio</td>
         <td>Amazon</td>
         <td>Positivo</td>
         <td>01/04/2023</td>
      </tr>
   </tbody>
   `;

   // Adiciona a string de template à tabela
   table.innerHTML = tableTemplate;
   day.appendChild(table)
}