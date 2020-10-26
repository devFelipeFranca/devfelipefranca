//Capturar todo o canvas em um plano 2d
let screen = document.getElementById('Screen')
let ctx = screen.getContext('2d')
//Gradea e inicia contagem do array/canvas
let grid = 16
let count = 0
let vel = 12
//Personagens
let snake1 = {x:160,y:160,dx:grid,dy:0,com:[],comMax:4}
let snake2 = {x:160,y:160,dx:grid,dy:0,com:[],comMax:4}
let apple  = {x:320,y:320}
//Função de random para a maçã
function getRandomInt(min, max) {
  return Math.floor(Math.random() * (max - min)) + min
}
//Função de refresh e comprosição de tela de todo conteúdo
function refresh() {
  requestAnimationFrame(refresh)
  
//Define velocidade
  if (++count < vel) {
    return
  }
//Define plano de fundo do canvas
  count = 0
  ctx.clearRect(0,0,screen.width,screen.height)
  
  //Delimita a grade de movimento do jogador 1
  snake1.x += snake1.dx
  snake1.y += snake1.dy

  if(snake1.x < 0){

  	snake1.x = screen.width - grid
  }
  if (snake1.x >= screen.width) {

  	snake1.x = 0
  }
  if (snake1.y < 0) {

  	snake1.y = screen.height - grid
  }
  if (snake1.y >= screen.height) {

  	snake1.y = 0
  }
  snake1.com.unshift({x1:snake1.x,y1:snake1.y})
  if (snake1.com.length > snake1.comMax) {
  	snake1.com.pop()
  }
    
//Delimita a grade de movimento do jogador 2
  snake2.x += snake2.dx
  snake2.y += snake2.dy

  if (snake2.x < 0) {
  	snake2.x = screen.width - grid
  }
  if (snake2.x >= screen.width) {

  	snake2.x = 0
  }
  if (snake2.y < 0) {

  	snake2.y = screen.height - grid
  }
  if (snake2.y >= screen.height) {

  	snake2.y = 0
  }
  snake2.com.unshift({x2:snake2.x,y2:snake2.y})
  if (snake2.com.length > snake2.comMax) {
	snake2.com.pop()
  }

  //Atribui cor e posição inicial da maçã
  ctx.fillStyle = 'red'
  ctx.fillRect(apple.x,apple.y,grid,grid)


  //Atribui cor e posição inicial do jogador 1
  ctx.fillStyle = 'darkblue'
  snake1.com.forEach(function(com, index){
   ctx.fillRect(com.x1,com.y1,grid, grid)
//Atribui resultado da colisão do jogado 1 com a maçã
   if (com.x1 == apple.x && com.y1 == apple.y) {
    console.log(vel)
    vel -= 0.5
   	snake1.comMax++
   	apple.x = apple.y = getRandomInt(0, 25)*grid

   }
   for(let i = index + 1; i < snake1.com.length; i++){
//Atribui resultado da colisão do jogador 1 com si mesmo
   	if (com.x1 == snake1.com[i].x1 && com.y1 == snake1.com[i].y1) {
   		snake1.x = snake1.y = 160
   		snake1.com = []
   		snake1.comMax = 4
   		snake1.dx = grid
   		snake1.dy = 0
   	}
   }
   for(let i = index; i < snake2.com.length; i++){
     if(com.x1 == snake2.com[i].x2 && com.y1 == snake2.com[i].y2){
        console.log(vel)
        vel += 0.7
        snake1.x = snake1.y = 160
        snake1.com = []
        snake1.comMax = 4
        snake1.dx = grid
        snake1.dy = 0
     }
   }
  })


  //Atribui cor e posição inicial do jogador 2
  ctx.fillStyle = 'darkgreen'
  snake2.com.forEach(function(com, index){
    ctx.fillRect(com.x2,com.y2, grid, grid)
//Atribui resultado da colisão do jogador 2 com a maçã
  	if (com.x2 == apple.x && com.y2 == apple.y) {
      console.log(vel)
      vel -= 0.5
  		snake2.comMax++
  		apple.x = apple.y = getRandomInt(0, 25)*grid
  	}
  	for(let i = index + 1; i < snake2.com.length; i++){
//Atribui resultado da colisão do jogador 2 com si mesmo
  		if (com.x2 == snake2.com[i].x2 && com.y2 == snake2.com[i].y2) {
  			snake2.x = snake2.y = 160
  			snake2.com = []
  			snake2.comMax= 4
  			snake2.dx = grid
  			snake2.dy = 0
  		}
    }
    for(let i = index; i < snake1.com.length; i++){
      if(com.x2 == snake1.com[i].x1 && com.y2 == snake1.com[i].y1){
        console.log(vel)
        vel += 0.7
        snake2.x = snake2.y = 160
        snake2.com = []
        snake2.comMax = 4
        snake2.dx = grid
        snake2.dy = 0
      }
    }
  })

}

//Evento de Movimentação em games com contexto 2d
document.addEventListener('keydown', function(e) {
 // Tecla 'A', Esquerda
  if (e.which === 65 && snake1.dx === 0) {
    snake1.dx = -grid;
    snake1.dy = 0;
  }
 // Tecla 'W', Cima
  else if (e.which === 87 && snake1.dy === 0) {
    snake1.dy = -grid;
    snake1.dx = 0;
  }
 // Tecla 'D', Direita
  else if (e.which === 68 && snake1.dx === 0) {
    snake1.dx = grid;
    snake1.dy = 0;
  }
 // Tecla 'S', Baixo
  else if (e.which === 83 && snake1.dy === 0) {
    snake1.dy = grid;
    snake1.dx = 0;
  }
 // Tecla 'left arrow', Esquerda
  if (e.which === 37 && snake2.dx === 0) {
    snake2.dx = -grid;
    snake2.dy = 0;
  }
 // Tecla 'up arrow', Cima
  else if (e.which === 38 && snake2.dy === 0) {
    snake2.dy = -grid;
    snake2.dx = 0;
  }
 // Tecla 'right arrow', Direita
  else if (e.which === 39 && snake2.dx === 0) {
    snake2.dx = grid;
    snake2.dy = 0;
  }
 // Tecla 'down arrow', Baixo
  else if (e.which === 40 && snake2.dy === 0) {
    snake2.dy = grid;
    snake2.dx = 0;
  }
})


requestAnimationFrame(refresh);
