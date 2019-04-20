var attrList = ['idade', 'FOR', 'DES', 'INT', 'ideia', 'CON', 'APA', 'POD', 'sorte', 'TAM', 'SAN', 'EDU', 'saber','vida','magia','dano'];
var tabelaRenda = Object.freeze({'1':"R$1.500", '2':"R$2.500", '3':"R$3.500", '4':"R$3.500", '5':"R$.4500", '6':"R$5.500", '7':"R$6.500", '8':"R$7.500", '9':"R$10.000", '10':"R$20.000"});
var edu = 0;
var oldAge = 0;

window.onload = function () {
	var form = document.getElementById("idade");
	form.addEventListener("input", function () {
		idade = (parseInt(document.getElementById('idade').value));
		difIdade =  idade - (edu + 6);
		eduPlusBonus = Math.floor((difIdade) * 0.1);
		currentEdu = edu + eduPlusBonus;
		document.getElementById('EDU').value = currentEdu;
		document.getElementById('skills').value = ((currentEdu)* 20);
		if (idade > 49){
			difIdade2 = idade - 40;		
			oldAge = Math.floor((difIdade2) * 0.1);	
			document.getElementById("oldAge").hidden = false;
			document.getElementById("oldAgeRed").innerHTML = parseInt(document.getElementById(document.getElementById("oldAgeType").innerHTML).value) - oldAge;
		} else {
			document.getElementById("oldAge").hidden = true;
		}
	});
};

function radioSt(myRadio) {
    switch(myRadio.value){
    	case 'for':
    		forca = parseInt(document.getElementById("FOR").value) ;
    		document.getElementById("oldAgeType").innerHTML  = "FOR"
    		document.getElementById("oldAgeRed").innerHTML = forca - oldAge;
    	break;
    	case 'con':
    		con = parseInt(document.getElementById("CON").value) ;
    		document.getElementById("oldAgeType").innerHTML  = "CON"
    		document.getElementById("oldAgeRed").innerHTML = con - oldAge;
    	break;
    	case 'des':
    		des = parseInt(document.getElementById("DES").value) ;
    		document.getElementById("oldAgeType").innerHTML  = "DES"
    		document.getElementById("oldAgeRed").innerHTML = des - oldAge;
    	break;
    	case 'apa':
    		apa = parseInt(document.getElementById("APA").value) ;
    		document.getElementById("oldAgeType").innerHTML  = "APA"
    		document.getElementById("oldAgeRed").innerHTML = apa - oldAge;
    	break;
    }
}

function rolarDado(qtd, tipo){
	var dados = [];
	var total = 0;
	for(var i=0; i < qtd; i++){
		dados.push(Math.floor(Math.random() * tipo) + 1);
		console.log("Dado[" + i + "] = " + dados[i])
		total += dados[i]; 
	}
	return total;
}

function tabelaBonusDano(soma){
	switch(true){
		case (soma >= 2 && soma <= 12):
			return -rolarDado(1, 6);
		break;
		case (soma >= 13 && soma <= 16):
			return -rolarDado(1, 4);
		break;
		case (soma >= 17 && soma <= 24):
			return 0;
		break;
		case (soma >= 25 && soma <= 32):
			return rolarDado(1, 4);
		break;
		case (soma >= 33 && soma <= 40):
			return rolarDado(1, 6);
		break;
		case (soma >= 41 && soma <= 56):
			return rolarDado(2, 6);
		break;
		case (soma >= 57 && soma <= 72):
			return rolarDado(3, 6);
		break;
		case (soma >= 73 && soma <= 88):
			return rolarDado(4, 6);
		break;
		case (soma >= 89 && soma <= 104):
			return rolarDado(5, 6);
		break;
		case (soma >= 105 && soma <= 120):
			return rolarDado(6, 6);
		break;
		case (soma >= 121 && soma <= 136):
			return rolarDado(7, 6);
		break;
		case (soma >= 137 && soma <= 152):
			return rolarDado(8, 6);
		break;
		case (soma >= 153 && soma <= 168):
			return rolarDado(9, 6);
		break;
		case (soma >= 179 && soma <= 184):
			return rolarDado(10, 6);
		break;
		default:
			return 0;
		break;
	}
}

function rolarDadoEspecifico(qtd, tipo, bonus, attr){
	var total = 0;
	var con = 0;
	var tamanho = 0;
	var forca = 0;
	total = rolarDado(qtd, tipo) + bonus;
	document.getElementById(attr).value = total;

	switch(attr){
		case 'INT':
			document.getElementById('ideia').value = total * 5;
			document.getElementById('hobbies').value = total * 10;
		break;
		case 'POD':
			document.getElementById('sorte').value = total * 5;
			document.getElementById('SAN').value = total * 5;
			document.getElementById('magia').value = total;
		break;
		case 'EDU':
			edu = total;
			document.getElementById('saber').value = total * 5;
			document.getElementById('skills').value = total * 20;
			document.getElementById('idade').min =  total + 6;
			document.getElementById('idade').value =  total + 6;
			document.getElementById('idade').readOnly = false;
			document.getElementById("idadeDiv").innerHTML = total + 6;
		break;
		case 'CON':
			con = parseFloat(total);
			tamanho = parseFloat(document.getElementById('TAM').value);
			document.getElementById('vida').value = Math.ceil((con+tamanho)/2.00);
		break;
		case 'FOR':
		case 'TAM':
			con = parseFloat(document.getElementById('CON').value);
			tamanho = parseFloat(document.getElementById('TAM').value);
			forca = parseFloat(document.getElementById('FOR').value);
			document.getElementById('vida').value = Math.ceil((con+tamanho)/2.00);
			document.getElementById('dano').value = tabelaBonusDano(tamanho + forca);
		break;
		case 'renda':
			document.getElementById('renda').value = tabelaRenda[total];
		break;
	}
}

function clearStatus(){
	inputs = document.getElementsByTagName('input');
	for(index in inputs) {
		if (inputs[index].id == "idade"){
			if (!isNaN(document.getElementById('idadeDiv').innerHTML))
				inputs[index].value = parseInt(document.getElementById('idadeDiv').innerHTML);
		}else if (inputs[index].type != 'radio'){
			inputs[index].value = 0;
		}
    }
}