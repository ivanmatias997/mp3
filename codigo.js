const songsList=[
	{
		title:"Diplo - Revolution (Unlike Pluto Remix)",
		file:"Diplo - Revolution (Unlike Pluto Remix).mp3",
	},
	{
		title:"EMINEM SURVIVAL (CLEAN VERSION)",
		file:"EMINEM SURVIVAL (CLEAN VERSION).mp3",
	},
	{
		title:"Flume - Say It ft. Tove Lo (Illenium Remix)",
		file:"Flume - Say It ft. Tove Lo (Illenium Remix).mp3",
	},

];

// CAPTURAR ELEMENTOS DEL DOM
titulo = document.getElementById("titulo")
canciones = document.getElementById("canciones");
previo = document.getElementById("previo");
proximo = document.getElementById("proximo");
audio= document.getElementById("audio");
reproducir= document.getElementById("reproducir");
progreso=document.getElementById("progress");
volumen= document.getElementById("volumen");
body= document.getElementsByTagName("body");

var actualSong=null;

// REPRODUCIR CANCION
 
function loadSong(index){
	audio.src = "song/" + songsList[index].file
	audio.play()
	actualSong=index;
}

// CARGAR LISTA DE CANCIONES

function loadSongs()
{
	songsList.forEach((song,index) => {
		
		const li = document.createElement("li")

		const link= document.createElement("a")

		link.textContent = song.title

		link.href="#" 

		link.addEventListener("click",()=>loadSong(index))

		link.addEventListener("click",()=> modifyTitle(index))

		link.addEventListener("click",()=> activeClass(index))

		link.addEventListener("click",()=> changeIconFirst(index))

		link.addEventListener("click",()=> progress())

		link.addEventListener("click",()=> {
			if (actualSong!=null) {
				volumeUp()
			}
		})

		li.appendChild(link)

		canciones.appendChild(li)

		
	})}



// EVENTOS

reproducir.addEventListener("click",()=> pauseSong())
reproducir.addEventListener("click",()=> changeIcon())
proximo.addEventListener("click",()=> nextSong())
previo.addEventListener("click",()=> prevSong())
volumen.addEventListener("mousemove",()=> changeVolume())
volumen.addEventListener("click",()=> changeVolume())
body[0].addEventListener("keydown",()=> changeVolume())
body[0].addEventListener("keypress",()=> changeVolume())
body[0].addEventListener("keyup",()=> changeVolume())


// CAMBIAR titulo

function modifyTitle(index){
	titulo.textContent = songsList[index].title ;
}

// pausar/reproducir cancion

function pauseSong(){
	if(audio.paused){
		audio.play()
	}else{
		audio.pause()
	}
}



// CAMBIAR EL ICONO DE REPRODUCIR

function changeIcon(){
	reproducir.classList.toggle("fa-play")
	reproducir.classList.toggle("fa-pause")
}

// CAMBIAR EL ICONO AL REPRODUCIR LA PRIMERA CANCION

function changeIconFirst(index){
	if (reproducir.classList.contains("fa-play")) {
		reproducir.classList.toggle("fa-play")
	 	reproducir.classList.toggle("fa-pause")
	}
}


// CLASE ACTIVE

function activeClass(index){
	for (let i = 0; i < songsList.length; i++) {
			canciones.children[i].children[0].className="";
		}
	canciones.children[index].children[0].className="active"
}

// MODIFICACIONES VARIAS 
function modify(index){
	loadSong(index);
	activeClass(index);
	modifyTitle(index);
}

// REPRODUCIR SIGUIENTE CANCION

function nextSong(){
	if (actualSong==songsList.length-1) {
		actualSong=0;
		modify(actualSong)
	}else{
		actualSong=actualSong+1;
		modify(actualSong)
	}
	
}

// REPRODUCIR ANTERIOR CANCION

function prevSong(){
	if (actualSong==0) {
		actualSong=songsList.length-1;
		modify(actualSong)
	}else{
		actualSong=actualSong-1
		modify(actualSong)
}}

//	PROGRESO DE LA CANCION

function progress(){
	actualSeg = audio.currentTime;
	totalSeg = audio.duration;
	percentage = (actualSeg/totalSeg)*100;
	progreso.style.width=`${percentage}%`;

}

// MODIFICAR EL VOLUMEN

function changeVolume(){
	audio.volume=volumen.value;
}

// VALIDAR EL VOLUMEN

function volumeUp(){
	volumen.removeAttribute("disabled")
}


loadSongs()

setInterval(()=>{if(!audio.paused&&actualSong!==null){progress()}},1000) 