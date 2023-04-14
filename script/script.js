
const containerVagas = document.querySelector(".containerVagas");
const menuAddVaga = document.querySelector('.menu-lateral');
const inputsDadoVaga = menuAddVaga.querySelectorAll('.formVaga input');
const btnAddVaga = menuAddVaga.querySelector('.btnAddVaga');
const inputsConfig = document.querySelectorAll('.config input')


let data = [[], [], [], [], [], [], []];

let contentVagas;

let configutations ={
   periodo: 7,
   vagasPorDias: 3
}

const getLocalstorage = (key) =>{
   const dadosString = localStorage.getItem(key);
   const dados = JSON.parse(dadosString)
   return dados;
}

const setLocalstorage = (key, dados) =>{
   const dadosString = JSON.stringify(dados)
   localStorage.setItem(key, dadosString)
}

const saveData = () =>{
   console.log('salvando dados')
   let dataVacancy = []
   data = []
   for (let i = 0; i < parseInt(configutations.periodo); i++) {
      data.push([])
      
   }
   const containerDays = document.querySelectorAll('.containerDay')
   containerDays.forEach((containerDay, index) => {
      const content = containerDay.querySelector('.content')
      const containerVagas = content.querySelectorAll('.vaga')

      containerVagas.forEach(containerVaga => {
         const empresa = containerVaga.querySelector('P.companyName').innerHTML
         const entrevista = containerVaga.querySelector('p.jobInterview').innerHTML
         const link = containerVaga.querySelector('a.jobVacancyLink').href
         const vaga = containerVaga.querySelector('h2.vacancyJob').innerHTML
      
         const jobVacancyData = {

            empresa: empresa,
            entrevista: entrevista,
            link: link,
            vaga: vaga
         }
         data[index].push(jobVacancyData)
      });
      
   });
   setLocalstorage('dadosVagas', data)
   console.log(data)
}


const handleChange = () =>{
   configutations.periodo =inputsConfig[0].value
   configutations.vagasPorDias =inputsConfig[1].value
   
   let increasesOrDecreasesDay = parseInt(configutations.periodo) - data.length
   if(increasesOrDecreasesDay > 0){

      for (let i = 0; i < increasesOrDecreasesDay; i++) {
         data.push([])
      }
   } else if (increasesOrDecreasesDay < 0) {
      for (let i = 0; i < Math.abs(increasesOrDecreasesDay); i++) {
        let dayRemoved = data.pop();
        if(dayRemoved.length > 0){
         prompt('Tem certeza que deseja diminuir o periodo de analise, o ultimo dia contem vagas adicionada')
        }
      }
   }

   setLocalstorage("dadosVagas", data)
   setLocalstorage('configurations', configutations)
   createDays()
}

const handleClick = (elementClicked) =>{
   const parentElement  = elementClicked.parentNode
   contentVagas = parentElement.querySelector('.content')
   contentVagas.classList.toggle('show')
}

const createDays = () =>{
   containerVagas.innerHTML = ''
   if(getLocalstorage("dadosVagas") !== null){
      
      data = getLocalstorage("dadosVagas")
   }

   if(getLocalstorage("configurations") !== null){
      
      configutations = getLocalstorage('configurations')
      inputsConfig[0].value = configutations.periodo 
      inputsConfig[1].value = configutations.vagasPorDias
   }
   

   for (let dayNumber = 0; dayNumber < parseInt(configutations.periodo)+1; dayNumber++) {
      // Para não criar container dia 0
      if(dayNumber !== 0){
         const containerDay = document.createElement('div')
         containerDay.classList.add('containerDay')
      
         const h1 = document.createElement('h1')
         h1.onclick = () => handleClick(h1)
         h1.innerText = `Dia ${dayNumber}`
         
         containerDay.append(h1)
         
         const content = document.createElement('div')
         content.classList.add('content');
         
         containerDay.append(content)
         
         for (let vaga = 0; vaga < data[dayNumber-1].length; vaga++) {
            if(vaga === parseInt(configutations.vagasPorDias)){
               break;
            }
            let dadosVagas = data[dayNumber-1][vaga]
            const templateVaga = `
               <h2 class="vacancyJob">${dadosVagas.vaga}</h2>
               <p class="companyName">${dadosVagas.empresa}</p>
               <p class="jobInterview">${dadosVagas.entrevista}</p>
               <a class="jobVacancyLink" href=${dadosVagas.link} target="_blank">Clique aqui para acessa a vaga</a>
            `

            const templateDiv = `
               <div class="containerInfos">
                  ${templateVaga}
               </div>
               <div class="containerActions">
                  <i class="fa-sharp fa-solid fa-trash delete" onClick="deleteVaga(this)"></i>
                  <i class="fa-solid fa-pen-to-square edit" onClick="updateVaga(this)"></i>
               </div>
            `
            const containerActions = document.createElement('div')
            const containerInfos = document.createElement('div')
            containerActions.classList.add('containerActions')
            containerInfos.classList.add('containerInfos')

            const containerVaga = document.createElement('div');

            containerVaga.classList.add('vaga');
            containerVaga.innerHTML = templateDiv;
            content.appendChild(containerVaga)
         }
         const btnAddVaga = document.createElement('i')
         
         btnAddVaga.setAttribute('class', 'fa-solid fa-plus fa-3x btnAddVaga')
         btnAddVaga.onclick = () => openMenu(btnAddVaga)
         
         
         content.append(btnAddVaga)
         if(data[dayNumber-1].length >= configutations.vagasPorDias){
            btnAddVaga.remove()
         } 
         containerVagas.append(containerDay)
      }      
   }
}

createDays()

console.log(data)

function openMenu(btnAddVaga) {
   
   contentVagas = btnAddVaga.parentNode;

   parentElement = contentVagas.parentNode;

   const h1Day = parentElement.querySelector('h1');

   const h1Menu = menuAddVaga.querySelector('.title h1');
   h1Menu.innerHTML = h1Day.innerText;
   
   
   menuAddVaga.classList.add('active');
   
}

const closeMenu =() => menuAddVaga.classList.remove('active')

const isValid = () =>{
   let valid = false;
   inputsDadoVaga.forEach(input => {
      // Colocar exceção no input entrevista - erro
      if(input.value !== ''){
         valid = true
         if(input.id === 'entrevista' && input.value !== ''){
            valid = true;
         }
      } else{
         valid = false
      }
      

   });
   return valid;
}

const getDay = () =>{
   let title = menuAddVaga.querySelector('h1').textContent;
   const match = title.match(/\d+/);
   let dayNumber;
   if (match) {
      dayNumber = parseInt(match[0]);
   }
   return dayNumber-1
}


const addVagas = ()=>{
   if(!isValid()) return;
   let dayNumber = getDay()
   let vaga = {};
   
   inputsDadoVaga.forEach(input => {
      vaga[input.id] =input.value;
   });

   
   if(data[dayNumber].length >= configutations.vagasPorDias) return;
   
   data[dayNumber].push(vaga)
   setLocalstorage('dadosVagas', data)
   createContainerVaga(dayNumber)
   clearInputs()
   closeMenu()
}

const deleteVaga = (elementClicked)=>{
   const containerVaga = elementClicked.parentElement.parentElement
   containerVaga.remove()
   saveData();
}

const updateVaga = () =>{
   console.log('Atualizando vaga')
}

const createContainerVaga = (dayNumber) =>{

   let numberVaga = data[dayNumber].length -1
   const dados = data[dayNumber][numberVaga]

   const templateVaga = `
      <h2>${dados.empresa}</h2>
      <p>${dados.vaga}</p>
      <p>${dados.entrevista}</p>
      <a href=${dados.link} target="_blank">Clique aqui para acessa a vaga</a>
   `

   const templateDiv = `
      <div class="containerInfos">
         ${templateVaga}
      </div>
      <div class="containerActions">
         <i class="fa-sharp fa-solid fa-trash delete" onClick="deleteVaga()"></i>
         <i class="fa-solid fa-pen-to-square edit" onClick="updateVaga()"></i>
      </div>
   `

   const containerVaga = document.createElement('div');
   containerVaga.classList.add('vaga');
   
   containerVaga.innerHTML = templateDiv;

   const i = contentVagas.querySelector('i.btnAddVaga')
   contentVagas.insertBefore(containerVaga, i)
   
   if(data[dayNumber].length >= configutations.vagasPorDias){
      contentVagas.removeChild(i)
      return;
   } 
}

btnAddVaga.addEventListener('click', (e) =>{
   e.preventDefault();
   addVagas()
   
})

const clearInputs = () =>{
   inputsDadoVaga.forEach(input => {
      input.value = ''
   });
}

const clearAll =() =>{
   for (let day = 0; day < data.length; day++) {
      data[day].length = 0
   }
   setLocalstorage("dadosVagas",data)
   containerVagas.innerHTML = ''
   createDays()
}