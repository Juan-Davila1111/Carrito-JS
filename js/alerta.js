//Make the alert toast type
export const addToast = (toastInfo) => {
    // Allow passing custom container or fallback to global
    if(document.getElementById('container-toast') === null){
        let containerNew = document.createElement('div')
        containerNew.classList.add('container-toast')
        containerNew.id = ('container-toast')
        document.body.appendChild(containerNew)
    }

    const container = document.getElementById('container-toast');
    const toast = document.createElement('div');
    toast.classList.add('toast', toastInfo.tipo, 'auto-cierre');

    // Unique id for each toast
    const id = `${Math.floor(Math.random() * 100)}${Date.now()}`;
    toast.id = id;

    // Icons (can be customized via options)
    const icons = {
        great: `<i class="bi bi-check-square-fill"></i>`,
        warning: `<i class="bi bi-exclamation-triangle"></i>`,
        error: `<i class="bi bi-exclamation-octagon-fill"></i>`,
        info: `<i class="bi bi-info-circle"></i>`
    };

    toast.innerHTML = `
        <div class="main-toast">
            <div class="toast-icon">
                ${icons[toastInfo.tipo]}
            </div>
            <div class="toast-text">
                <div class="tittle-toast">${toastInfo.titulo}</div>
                <div class="description-toast">${toastInfo.descripcion}</div>
            </div>
        </div>
        <button class="btn btn-cerrar">
            <i class="bi bi-x"></i>
        </button>
    `;

    container.appendChild(toast);

    
    const handleCloseToast = (e) => {
        if (e.target.closest('.btn.btn-cerrar')) {
            e.target.parentNode.parentNode.classList.add('cerrando');
        }
    }
    
    const handleCloseAnimation = (e) => {
        if (e.animationName === "cierre" || e.animationName === "autoCierre" || e.animationName === "cerrando") {
            toast.removeEventListener('animationend', handleCloseAnimation);
            toast.remove();
        }
    };
    toast.addEventListener('click', handleCloseToast)
    toast.addEventListener('animationend', handleCloseAnimation);
};