//formatação do labirinto 
const map = [
    "WWWWWWWWWWWWWWWWWWWWW",
    "W   W     W     W W W",
    "W W W WWW WWWWW W W W",
    "W W W   W     W W   W",
    "W WWWWWWW W WWW W W W",
    "W         W     W W W",
    "W WWW WWWWW WWWWW W W",
    "W W   W   W W     W W",
    "W WWWWW W W W WWW W F",
    "S     W W W W W W WWW",
    "WWWWW W W W W W W W W",
    "W     W W W   W W W W",
    "W WWWWWWW WWWWW W W W",
    "W       W       W   W",
    "WWWWWWWWWWWWWWWWWWWWW",
];

let chao = 9
let parede = 0

//para criar o labirinto
function criarLabirinto(){
    const labirinto = document.getElementById('labirinto')
    //invocar a função callback e criar div para as paredes w
    map.forEach(chao=> {
        const caminho = document.createElement('div')
        caminho.classList.add('chao')
        chao = chao.split('')
//condição das letras w = parede, s = entrada, f saída.
        chao.forEach(letras=>{
            const criaDiv = document.createElement('div')
            if(letras === 'W'){
              criaDiv.classList.add('parede','lab')
            }
            else if(letras === 'S'){
                criaDiv.classList.add('entrada','lab')
                criaDiv.insertAdjacentHTML('beforeend','<p>S</p>')
            }
            else if(letras === 'F'){
                criaDiv.classList.add('saida','lab')
                criaDiv.insertAdjacentHTML('beforeend','<p>F</p>')
            }
            else{
                criaDiv.classList.add('caminho','lab')
            }    
            caminho.appendChild(criaDiv)
        })
        labirinto.appendChild(caminho)
    })
}
// cria jogador
function criaJogador(inicio){
    const jogador = document.createElement('div')
    jogador.id = 'jogador'
    inicio.appendChild(jogador)
}
// jogador com entrada em s
function jogador(){
    const entrada = document.getElementsByClassName('entrada')
    const jogador = document.createElement('div')
    jogador.id = 'jogador'
    entrada[0].appendChild(jogador)
}
//condição para mover com as setas

function mover(seta){
    let borda = bordas()
    let jogador = document.getElementById('jogador')
    if(seta === 'down'){
        if([...borda[chao+1][parede].classList].includes('caminho')){
            borda[chao][parede].removeChild(jogador)
            chao++
            criaJogador(borda[chao][parede])
        }
    }

    if(seta === 'up'){
        if([...borda[chao-1][parede].classList].includes('caminho')){
            borda[chao][parede].removeChild(jogador)
            chao--
            criaJogador(borda[chao][parede])
        }
    }
    
    if(seta === 'left'){
        if([...borda[chao][parede-1].classList].includes('caminho')){
            borda[chao][parede].removeChild(jogador)
            parede--
            criaJogador(borda[chao][parede])
        }
    }

    if(seta === 'right'){
        if([...borda[chao][parede+1].classList].includes('saida')){
            borda[chao][parede].removeChild(jogador)
            parede++
            criaJogador(borda[chao][parede])
            vitoria()
            
        } 
        if([...borda[chao][parede+1].classList].includes('caminho')){
            borda[chao][parede].removeChild(jogador)
            parede++
            criaJogador(borda[chao][parede])
        }
    }
}
// para mover, utilizar const keyName = event.key como na ultima entrega.(consultar)
function andar(){
    document.addEventListener('keydown', (event) => {
        const keyName = event.key;
        if(keyName === "ArrowDown"){ 
            mover('down')
        }
        if(keyName === "ArrowUp"){ 
            mover('up')
        }
        if(keyName === "ArrowLeft"){ 
            mover('left')
        }
        if(keyName === "ArrowRight"){ 
            mover('right')
        }
    });
}
// criar as bordas com array de posição
function bordas(){
    let arrayBordas = document.getElementsByClassName('lab')
    arrayBordas = [...arrayBordas]
    let borda = []
    while(arrayBordas.length>0){
        let chao = arrayBordas.splice(0,21)
        borda.push(chao)
    }
    return borda
}

// mostra mensagem de vitoria 
function vitoria(){
    const labirinto = document.getElementById('labirinto')
    const vitoria = document.createElement('div')
    labirinto.innerHTML = ''
    vitoria.id = 'vitoria'
    vitoria.insertAdjacentText('afterbegin', 'Muito bem, você saiu do Labirinto.')
    labirinto.appendChild(vitoria)
    
}


function labirinto(){
    criarLabirinto()
    jogador()
    andar()
}

labirinto()