// Seleciona o botão "Executar Bisseção"
const btn_salvar = document.getElementById("executar");

// Event listener para clique no botão
btn_salvar.addEventListener("click", function(){
    // Captura valores de a e b do input
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);

    // Limpa mensagens anteriores
    document.getElementById("mensagem1").innerHTML = ``
    document.getElementById("mensagem2").innerHTML = ``
    document.getElementById("saida").innerHTML = ``
    
    // Esconde seção de áudio (reset)
    document.getElementById("audio-section").style.display = "none";
    
    // Divide intervalo em subintervalos (negativo e/ou positivo)
    let subintervalo_neg, subintervalo_pos;
    if (a < 0 && b > 0){
        subintervalo_neg = [a,0];
        subintervalo_pos = [0,b];
    }else if (b<=0){
        subintervalo_neg = [a,b];
    }else if(a>=0){
        subintervalo_pos = [a,b]
    }

    // Define limites dos subintervalos
    let a_neg, b_neg, a_pos, b_pos;
    if(subintervalo_neg){
        a_neg = subintervalo_neg[0];
        b_neg = subintervalo_neg[1];
    }
    if(subintervalo_pos){
        a_pos = subintervalo_pos[0];
        b_pos = subintervalo_pos[1];
    }

    // Função f(x) = x² - cos(x) - 2
    function f(x) {
        return x ** 2 - Math.cos(x) - 2;
    }

    // Calcula f(a) e f(b)
    let fa = f(a);
    let fb = f(b);

    // Verifica intervalo inválido
    if (a === 0 && b === 0){
        document.getElementById("mensagem1").innerHTML = `<p>O intervalo [${a},${b}] não existe</p>`
    }else{
        // Verifica raiz exata em a ou b
        if (fa == 0) {
            document.getElementById("mensagem1").innerHTML = `<p>f(${a}) é exatamente a raiz</p>`
        } else if (fb == 0) {
            document.getElementById("mensagem1").innerHTML = `<p>f(${b}) é exatamente a raiz</p>`
        } else {
            // Mensagem: raiz não nos extremos
            document.getElementById("mensagem1").innerHTML = `<p>1° - A raiz não se encontra nos extremos do intervalo</p>`

            // Calcula f nos subintervalos
            let fa_neg, fb_neg, fa_pos, fb_pos;
            if(subintervalo_neg){
                fa_neg = f(a_neg);
                fb_neg = f(b_neg);
            }
            if(subintervalo_pos){
                fa_pos = f(a_pos);
                fb_pos = f(b_pos);
            }

            // Função de bisseção: itera até precisão
            function calcularRaiz(a,b,fa,fb){
                let c, i = 0;
                let precisao = 10e-5;
                
                while (Math.abs(b-a) > precisao){
                    i++;
                    c = (a+b)/2; 
                    let fc = f(c); 
                    
                    if (fa * fc < 0) {
                        b = c;
                        fb = fc;
                    }else {
                        a = c;
                        fa = fc;
                    }
                }
                // Exibe raiz aproximada
                document.getElementById("saida").innerHTML += `<p>Raiz ≈ ${c.toFixed(5)}</p>`;
                return c;
            }

            // Verifica mudança de sinal (raízes)
            // Duas raízes: sinal muda em neg E pos
            if ((subintervalo_neg && fa_neg*fb_neg < 0) && (subintervalo_pos && fa_pos*fb_pos < 0)) {
                document.getElementById("mensagem2").innerHTML = `<p>2° - o intervalo <strong>(${a},${b})</strong> possui pelo menos duas raizes</p>`;
                calcularRaiz(a_neg, b_neg, fa_neg, fb_neg);
                calcularRaiz(a_pos, b_pos, fa_pos, fb_pos);

            // Uma raiz: sinal muda em neg OU pos
            } else if ((subintervalo_neg && fa_neg*fb_neg < 0) || (subintervalo_pos && fa_pos*fb_pos < 0)) {
                document.getElementById("mensagem2").innerHTML = `<p>2° - O intervalo <strong>[${a},${b}]</strong> possui apenas uma raiz</p>`;
                if (subintervalo_neg && fa_neg*fb_neg < 0) {
                    calcularRaiz(a_neg, b_neg, fa_neg, fb_neg);
                } 
                if (subintervalo_pos && fa_pos*fb_pos < 0) {
                    calcularRaiz(a_pos, b_pos, fa_pos, fb_pos);
                }

            // Nenhuma raiz: sem mudança de sinal
            } else {
                document.getElementById("mensagem2").innerHTML = `<p>2° - Não existe raiz no intervalo definido.</p>`;
            }

            // Atualiza display do intervalo
            document.getElementById("show-intervalo-atual").innerHTML = `<h4>Intervalo atual (${a},${b})</h4>`
        }
    }
    
    // Mostra botão de áudio após execução
    document.getElementById("audio-section").style.display = "block";
});

// Event listener para botão de áudio (após DOM carregar)
document.addEventListener('DOMContentLoaded', function() {
    const btnAudio = document.getElementById('btn-audio');
    const audio = document.getElementById('mensagemAudio');
    
    if (btnAudio && audio) {
        btnAudio.addEventListener('click', function() {
            audio.currentTime = 0; // Reinicia áudio
            audio.play().catch(function(error) {
                console.log('Erro ao reproduzir áudio: ', error);
                alert('Não foi possível reproduzir o áudio. Verifique se o arquivo existe e se o navegador permite reprodução automática.');
            });
        });
    }
});