const btn_salvar = document.getElementById("executar");

btn_salvar.addEventListener("click", function(){
    let a = parseFloat(document.getElementById("a").value);
    let b = parseFloat(document.getElementById("b").value);

    document.getElementById("mensagem1").innerHTML = ``
    document.getElementById("mensagem2").innerHTML = ``
    document.getElementById("saida").innerHTML = ``
    
    let subintervalo_neg, subintervalo_pos;

    if (a < 0 && b > 0){
        subintervalo_neg = [a,0];
        subintervalo_pos = [0,b];
    }else if (b<=0){
        subintervalo_neg = [a,b];
    }else if(a>=0){
        subintervalo_pos = [a,b]
    }

    //definindo abreviacoes de subintervalos negativos e positivos se esses subintervalos existirem
    let a_neg, b_neg, a_pos, b_pos;

    if(subintervalo_neg){
        a_neg = subintervalo_neg[0];
        b_neg = subintervalo_neg[1];
    }

    if(subintervalo_pos){
        a_pos = subintervalo_pos[0];
        b_pos = subintervalo_pos[1];
    }

    function f(x) {
        return x ** 2 - Math.cos(x) - 2;
    }

    let fa = f(a);
    let fb = f(b);


    if (a === 0 && b === 0){
        document.getElementById("mensagem1").innerHTML = `<p>O intervalo [${a},${b}] não existe</p>`
    }else{
        if (fa == 0) {
        document.getElementById("mensagem1").innerHTML = `<p>f(${a}) é exatamente a raiz</p>`
    } else if (fb == 0) {
        document.getElementById("mensagem1").innerHTML = `<p>f(${b}) é exatamente a raiz</p>`
    } else {
        document.getElementById("mensagem1").innerHTML = `<p>1° - A raiz não se encontra nos extremos do intervalo</p>`

        let fa_neg, fb_neg, fa_pos, fb_pos;

        if(subintervalo_neg){
            fa_neg = f(a_neg);
            fb_neg = f(b_neg);
        }

        if(subintervalo_pos){
            fa_pos = f(a_pos);
            fb_pos = f(b_pos);
        }

        //criando a funcao calcular raiz
        function calcularRaiz(a,b,fa,fb){
            let c;
            let i = 0;
            let precisao = 10e-5;
            
            while (Math.abs(b-a) > precisao){
                i++
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
            document.getElementById("saida").innerHTML += `<p>Raiz ≈ ${c.toFixed(5)}</p>`;
            return c
            
        }

        //verificar se o intervalo possui mais de duas raizes
        if ((subintervalo_neg && fa_neg*fb_neg < 0) && (subintervalo_pos && fa_pos*fb_pos < 0)) {
            document.getElementById("mensagem2").innerHTML = `<p>2° - o intervalo <strong>(${a},${b})</strong> possui pelo menos duas raizes</p>`;
            
            // calcula as duas raízes
            calcularRaiz(a_neg, b_neg, fa_neg, fb_neg);
            calcularRaiz(a_pos, b_pos, fa_pos, fb_pos);

        } else if ((subintervalo_neg && fa_neg*fb_neg < 0) || (subintervalo_pos && fa_pos*fb_pos < 0)) {
            document.getElementById("mensagem2").innerHTML = `<p>2° - O intervalo <strong>[${a},${b}]</strong> possui apenas uma raiz</p>`;
            
            // calcula apenas a raiz existente
            if (subintervalo_neg && fa_neg*fb_neg < 0) {
                calcularRaiz(a_neg, b_neg, fa_neg, fb_neg);
            } 
            if (subintervalo_pos && fa_pos*fb_pos < 0) {
                calcularRaiz(a_pos, b_pos, fa_pos, fb_pos);
            }
        } else {
            document.getElementById("mensagem2").innerHTML = `<p>2° - Não existe raiz no intervalo definido.</p>`;
        }

        document.getElementById("show-intervalo-atual").innerHTML = `<h4>Intervalo atual (${a},${b})</h4>`
    }
    }

    
})
