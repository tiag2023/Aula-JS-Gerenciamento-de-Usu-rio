selecionarUsuarios();
document.querySelector('#salvar').addEventListener('click', () => {
    let nome = document.querySelector('#exampleInputName').value;
    let genero = document.querySelector('input[name=gender]:checked').value;
    let dtNascimento = document.querySelector("#exampleInputBirth").value;
    let pais = document.querySelector("#exampleInputCountry").value;
    let email = document.querySelector("#exampleInputEmail1").value;
    let senha = document.querySelector("#exampleInputPassword1").value;
    let foto = document.querySelector("#exampleInputFile").value;
    let admin = document.querySelector("#exampleInputAdmin").checked;

    if (admin == true) {
        admin = 'Sim';
    }
    else {
        admin = 'Não';
    }

    let json = {
        nome: nome, genero: genero, dtNascimento: dtNascimento,
        pais: pais, email: email, senha: senha, foto: foto,
        admin: admin
    };

    addLinha(json);

    inserir(json);
});

function addLinha(usuario) {
    let tr = document.createElement('tr');

    tr.innerHTML = `
        <td>
            <img src="dist/img/user1-128x128.jpg" 
            alt="Imagem do usuário" class="img-sm img-circle">
        </td>
        <td>${usuario.nome}</td>
        <td>${usuario.email}</td>
        <td>${usuario.admin}</td>
        <td>${new Date().toLocaleDateString()}</td>
        <td>
            <button type="button" class="btn btn-primary btn-sm">Editar</button>
            <button type="button" class="btn btn-danger btn-sm btn-delete" data-toggle="modal" data-target="#modalExcluir">Excluir</button>
        </td>
    `;

    document.querySelector('#table-users').appendChild(tr);

    addEventosBtn(tr);

    atualizaContagem();
}

function atualizaContagem() {
    let numUsuarios = 0;
    let numAdmins = 0;

    numUsuarios = 
        document.querySelector('#table-users').children.length;

    [...document.querySelector('#table-users').children].forEach(tr =>{
        if (tr.children[3].innerHTML == 'Sim') {
            numAdmins = numAdmins + 1;
        }
    });

    document.querySelector('#number-users').innerHTML = numUsuarios;
    document.querySelector('#number-users-admin').innerHTML = 
        numAdmins;
}

function addEventosBtn(tr) {
    tr.querySelector('.btn-delete').addEventListener('click', t=>{
        document.querySelector('#confirmar-exclusao').
            addEventListener('click', e => {
                tr.remove();
                atualizaContagem();
                $('#modalExcluir').modal('hide');
            });
    });
}

function inserir(json){

    let usuarios = [];
//elimina a sobreposição do cadastro
    if (sessionStorage.getItem('usuarios')){
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
    }
    usuarios.push(json);
sessionStorage.setItem('usuarios',JSON.stringify(usuarios));
}
//manter os dados mesmo quando o site for atualizado
function selecionarUsuarios() {
    let usuarios = [];

    if (sessionStorage.getItem('usuarios')){
        usuarios = JSON.parse(sessionStorage.getItem('usuarios'));
    }

    usuarios.forEach(usuario => {
        addLinha(usuario);
    });
}