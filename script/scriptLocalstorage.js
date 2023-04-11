export const getLocalstorage = (key) =>{
   const dadosString = localStorage.getItem(key);
   const dados = JSON.parse(dadosString)
   return dados;
}


export const setLocalstorage = (key, dados) =>{
   const dadosString = JSON.stringify(dados)
   localStorage.setItem(key, dadosString)
}

