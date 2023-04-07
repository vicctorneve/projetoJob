const containerVagas = document.querySelector(".containerVagas");
const menuAddVaga = document.querySelector('.menu-lateral');
const inputsDadoVaga = menuAddVaga.querySelectorAll('.formVaga input');
const btnAddVaga = menuAddVaga.querySelector('.btnAddVaga');

let data = [[], [], [], [], [], [], []];
let element;

const getLocalstorage = () =>{
   
   const dadosString = localStorage.getItem("dadosVagas");
   const dados = JSON.parse(dadosString);
   if(dados !== null){
      data = dados
   }
   
   return data;
}


const setLocalstorage = (dados) =>{
   const dadosString = JSON.stringify(dados)
   localStorage.setItem("dadosVagas", dadosString)
}

const handleClick = (h1) =>{
   const elementPai = h1.parentNode
   const content = elementPai.querySelector('.content')
   content.classList.toggle('show')
}

const createContainerVaga = (day) =>{

   const dados = data[day][data[day].length -1]
   

   const templateVaga = `
      <h2>${dados.empresa}</h2>
      <p>${dados.vaga}</p>
      <p>${dados.entrevista}</p>
      <a href="">${dados.link}</a>
   `

   const div = document.createElement('div');
   div.classList.add('vaga');
   div.innerHTML = templateVaga;
   const i = element.querySelector('i')
   element.insertBefore(div, i)

   if(data[day].length >= 3){
      element.removeChild(i)
      return;
   } else{

   }
}

const createDays = () =>{

   data = getLocalstorage()

   for (let index = 0; index < 8; index++) {
      if(index !== 0){
         const div = document.createElement('div')
         div.classList.add('containerDay')
      
         const h1 = document.createElement('h1')
         h1.onclick = () => handleClick(h1)
         h1.innerText = `Dia ${index}`
         
         div.append(h1)
         
         const divContent = document.createElement('div')
         divContent.classList.add('content');
         
         div.append(divContent)
         

         
         for (let j = 0; j < data[index-1].length; j++) {
            let dados = data[index-1][j]
            const templateVaga = `
               <h2>${dados.empresa}</h2>
               <p>${dados.vaga}</p>
               <p>${dados.entrevista}</p>
               <a href="">${dados.link}</a>
            `

            const div = document.createElement('div');
            div.classList.add('vaga');
            div.innerHTML = templateVaga;
            divContent.appendChild(div)
            const i = divContent.querySelector('i')
         }
         
         const i = document.createElement('i')
         i.setAttribute('class', 'fa-solid fa-plus fa-3x')
         i.onclick = () => openMenu(i)
         
         
         divContent.append(i)
         if(data[index-1].length >= 3){
            i.remove()
         } 

         
         containerVagas.append(div)
      }      
   }

   
}

createDays()



console.log(data)

function openMenu(i) {
   
   element = i.parentNode

   elementPai = element.parentNode

   const h1Day = elementPai.querySelector('h1')

   const h1Menu = menuAddVaga.querySelector('.title h1')
   h1Menu.innerHTML = h1Day.innerText
   
   
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
   let numberDay;
   if (match) {
      numberDay = parseInt(match[0]);
   }
   return numberDay -1
}


const addVagas = ()=>{
   if(!isValid()) return;
   let day = getDay()
   let vaga = {};
   
   inputsDadoVaga.forEach(input => {
      vaga[input.id] =input.value;
   });

   data = getLocalstorage()
   
   if(data[day].length >= 3) return;
   
   
   data[day].push(vaga)
   setLocalstorage(data)
   createContainerVaga(day)
}



btnAddVaga.addEventListener('click', (e) =>{
   e.preventDefault();
   addVagas()
})









