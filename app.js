// app.js - Lógica de simulación para el frontend de Sombra 0 Costo

document.addEventListener('DOMContentLoaded', () => {
    
    // Elements
    const btnNuevaEvaluacion = document.getElementById('btn-nueva-evaluacion');
    const dynamicFlow = document.getElementById('dynamic-flow');
    const capturaSection = document.getElementById('captura');
    const ubicacionSection = document.getElementById('ubicacion');
    const btnTomarFoto = document.getElementById('btn-tomar-foto');
    const btnGaleria = document.getElementById('btn-seleccionar-galeria');
    const btnEnviar = document.getElementById('btn-enviar');
    
    const procesamientoSection = document.getElementById('procesamiento');
    const mainProgress = document.getElementById('main-progress');
    const checkSteps = [
        document.getElementById('step-1'),
        document.getElementById('step-2'),
        document.getElementById('step-3'),
        document.getElementById('step-4'),
        document.getElementById('step-5')
    ];
    
    const resultadosContainer = document.getElementById('resultados-container');
    
    // Scroll utility
    const scrollToElement = (element) => {
        setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
    };

    // Flow 1: Start New Evaluation
    btnNuevaEvaluacion.addEventListener('click', () => {
        dynamicFlow.classList.remove('hidden');
        capturaSection.classList.remove('hidden');
        btnNuevaEvaluacion.disabled = true;
        btnNuevaEvaluacion.innerHTML = '<span class="material-symbols-rounded">check</span> En progreso';
        scrollToElement(capturaSection);
    });

    // Flow 2: Capture / Select Photo
    const handlePhotoAcquisition = () => {
        // Simulate picking photo and showing location data
        ubicacionSection.classList.remove('hidden');
        btnEnviar.classList.remove('hidden');
        scrollToElement(ubicacionSection);
    };

    btnTomarFoto.addEventListener('click', handlePhotoAcquisition);
    btnGaleria.addEventListener('click', handlePhotoAcquisition);

    // Flow 3: Analyze
    btnEnviar.addEventListener('click', () => {
        btnEnviar.disabled = true;
        btnEnviar.innerHTML = '<span class="material-symbols-rounded">hourglass_empty</span> Analizando...';
        
        procesamientoSection.classList.remove('hidden');
        scrollToElement(procesamientoSection);
        
        // Simulate Processing Steps
        let currentStep = 0;
        
        const processInterval = setInterval(() => {
            if (currentStep < checkSteps.length) {
                // Update current step to active/done
                if(currentStep > 0) {
                    checkSteps[currentStep - 1].classList.remove('active');
                    checkSteps[currentStep - 1].classList.add('done');
                }
                
                checkSteps[currentStep].classList.remove('pending');
                checkSteps[currentStep].classList.add('active');
                
                // Update progress bar
                const progressPercentage = ((currentStep + 1) / checkSteps.length) * 100;
                mainProgress.style.width = `${progressPercentage}%`;
                
                currentStep++;
            } else {
                // Finish
                clearInterval(processInterval);
                checkSteps[checkSteps.length - 1].classList.remove('active');
                checkSteps[checkSteps.length - 1].classList.add('done');
                
                // Reveal Results
                setTimeout(() => {
                    procesamientoSection.classList.add('hidden'); // Optional: hide loading or keep it
                    resultadosContainer.classList.remove('hidden');
                    scrollToElement(document.getElementById('resultados'));
                    
                    // Simulate dynamic number counting up
                    animateValue("kpi-sombra", 0, 45, 1500);
                }, 800);
            }
        }, 1200); // 1.2s per step for demonstration
    });

    // Number animation utility
    function animateValue(id, start, end, duration) {
        const obj = document.getElementById(id);
        let startTimestamp = null;
        const step = (timestamp) => {
            if (!startTimestamp) startTimestamp = timestamp;
            const progress = Math.min((timestamp - startTimestamp) / duration, 1);
            obj.innerHTML = Math.floor(progress * (end - start) + start) + "%";
            if (progress < 1) {
                window.requestAnimationFrame(step);
            }
        };
        window.requestAnimationFrame(step);
    }
});
