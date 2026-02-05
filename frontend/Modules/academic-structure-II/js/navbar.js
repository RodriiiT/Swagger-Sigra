document.addEventListener('DOMContentLoaded', () => {
    const API_BASE = 'https://sigra.irissoftware.lat/api/auth'
    const profileBtn = document.getElementById('profile-button')
    const profileDropdown = document.getElementById('profile-dropdown')
    const profileAvatar = document.getElementById('profile-avatar')
    const profileInfoName = document.getElementById('profile-info-name')

    function getAuthHeaders() {
        const token = localStorage.getItem('sigra_token') || ''
        return token ? { Authorization: `Bearer ${token}` } : {}
    }

    function getStoredUser() {
        const raw = localStorage.getItem('sigra_user')
        if (!raw) return null
        try {
            return JSON.parse(raw)
        } catch (_) {
            return null
        }
    }

    function clearSessionStorage() {
        localStorage.removeItem('sigra_token')
        localStorage.removeItem('sigra_user')
        localStorage.removeItem('sigra_user_raw')
    }

    async function logoutUser() {
        const stored = getStoredUser()
        const userId = stored?.id || stored?.user_id
        try {
            if (userId) {
                await fetch(`${API_BASE}/logout/${userId}`, {
                    method: 'POST',
                    headers: { ...getAuthHeaders() }
                })
            }
        } catch (error) {
            console.error('Error llamando a logout en backend:', error)
        } finally {
            clearSessionStorage()
            // Redirect to login page
            window.location.href = '/Modules/access-control-I/login.html'
        }
    }

    function setProfileUI() {
        const user = getStoredUser()
        const name = user ? `${user.first_name || ''} ${user.last_name || ''}`.trim() : ''
        const initials = name
            ? name
                .split(' ')
                .filter(Boolean)
                .slice(0, 2)
                .map((part) => part[0].toUpperCase())
                .join('')
            : '--'
        if (profileAvatar) profileAvatar.textContent = initials || '--'
        if (profileInfoName) profileInfoName.textContent = name || 'Usuario'

        // Ajuste dinámico para Control de Estudio (Id 4)
        const roleId = Number(user?.role_id || (user?.role && user?.role.role_id))
        if (roleId === 4 && profileDropdown) {
            const profileList = profileDropdown.querySelector('.profile-list')
            if (profileList) {
                profileList.innerHTML = `
                    <li class="profile-info" id="profile-info-name" role="presentation">${name || 'Control de Estudio'}</li>
                    <li role="none"><button type="button" class="profile-item" data-profile-action="view" role="menuitem">Ver usuario</button></li>
                    <li role="none"><button type="button" class="profile-item" data-profile-action="edit" role="menuitem">Editar usuario</button></li>
                    <li role="none"><button type="button" class="profile-item" data-profile-action="logout" role="menuitem">Cerrar sesión</button></li>
                `
            }
        }
    }

    function toggleProfileDropdown(forceState) {
        if (!profileDropdown) return;
        const isOpen = profileDropdown.classList.contains('open')
        const nextState = forceState !== undefined ? forceState : !isOpen
        profileDropdown.classList.toggle('open', nextState)
        if (profileBtn) profileBtn.setAttribute('aria-expanded', nextState ? 'true' : 'false')
    }

    // --- Lógica del Modal de Perfil Portátil (Deseado por el USER) ---
    const MODAL_ID = 'sigra-profile-modal-portal'
    const OVERLAY_ID = 'sigra-modal-overlay-portal'

    const modalStyles = `
        #${OVERLAY_ID} {
            position: fixed; inset: 0; background: rgba(0,0,0,0.4); 
            backdrop-filter: blur(3px); z-index: 9998; display: none;
            opacity: 0; transition: opacity 0.3s ease;
        }
        #${MODAL_ID} {
            position: fixed; top: 50%; left: 50%; transform: translate(-50%, -60%);
            background: #fff; width: 440px; max-width: 90%; border-radius: 16px;
            box-shadow: 0 25px 50px -12px rgba(0,0,0,0.25); z-index: 9999; display: none;
            opacity: 0; transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
            padding: 24px; font-family: 'Inter', sans-serif;
            color: #111827;
        }
        #${OVERLAY_ID}.active, #${MODAL_ID}.active {
            display: block; opacity: 1;
        }
        #${MODAL_ID}.active { transform: translate(-50%, -50%); }
        .p-modal-header { display: flex; justify-content: space-between; align-items: center; margin-bottom: 24px; }
        .p-modal-header h2 { margin: 0; font-size: 1.5rem; font-weight: 700; color: #111827; }
        .p-close-btn { 
            background: #f3f4f6; border: none; width: 32px; height: 32px; border-radius: 50%; 
            cursor: pointer; display: flex; align-items: center; justify-content: center; 
            transition: all 0.2s; font-size: 20px; color: #6b7280;
        }
        .p-close-btn:hover { background: #fee2e2; color: #ef4444; }
        .p-modal-body { display: flex; flex-direction: column; gap: 16px; overflow-y: auto; max-height: 70vh; padding-right: 4px; }
        .p-field { display: flex; flex-direction: column; gap: 6px; }
        .p-field label { font-size: 0.875rem; font-weight: 600; color: #374151; }
        .p-field input, .p-field select { 
            padding: 10px 14px; border: 1px solid #d1d5db; border-radius: 10px; 
            font-size: 1rem; outline: none; transition: all 0.2s; background: #fff;
        }
        .p-field input:focus { border-color: #2563eb; box-shadow: 0 0 0 4px rgba(37,99,235,0.1); }
        .p-field input:disabled { background: #f9fafb; color: #6b7280; border-color: #e5e7eb; cursor: not-allowed; }
        .p-modal-footer { margin-top: 24px; }
        .p-save-btn { 
            background: #2563eb; color: #fff; border: none; width: 100%; padding: 12px; 
            border-radius: 12px; font-weight: 700; font-size: 1rem; cursor: pointer; 
            transition: all 0.2s; 
        }
        .p-save-btn:hover { background: #1d4ed8; transform: translateY(-1px); box-shadow: 0 4px 12px rgba(37,99,235,0.2); }
        .p-save-btn:active { transform: translateY(0); }
        .p-save-btn:disabled { opacity: 0.7; cursor: not-allowed; }
    `

    function injectPortalModal() {
        if (document.getElementById(MODAL_ID)) return
        const styleTag = document.createElement('style')
        styleTag.textContent = modalStyles
        document.head.appendChild(styleTag)

        const overlay = document.createElement('div')
        overlay.id = OVERLAY_ID
        document.body.appendChild(overlay)

        const modal = document.createElement('div')
        modal.id = MODAL_ID
        modal.innerHTML = `
            <div class="p-modal-header">
                <h2 id="p-modal-title">Editar usuario</h2>
                <button class="p-close-btn" id="p-close-modal-x">&times;</button>
            </div>
            <form id="p-profile-form">
                <div class="p-modal-body">
                    <div class="p-field"><label>Nombre</label><input type="text" id="p-first_name" required></div>
                    <div class="p-field"><label>Apellido</label><input type="text" id="p-last_name" required></div>
                    <div class="p-field"><label>Cédula</label><input type="text" id="p-national_id" disabled></div>
                    <div class="p-field"><label>Correo</label><input type="email" id="p-email" required></div>
                    <div class="p-field"><label>Contraseña (opcional)</label><input type="password" id="p-password" placeholder="Mínimo 6 caracteres"></div>
                    <div class="p-field"><label>Confirmar Contraseña</label><input type="password" id="p-confirm-password"></div>
                    <div class="p-field"><label>Teléfono</label><input type="tel" id="p-phone"></div>
                    <div class="p-field"><label>Rol</label><select id="p-role" disabled></select></div>
                </div>
                <div class="p-modal-footer">
                    <button type="submit" class="p-save-btn" id="p-save-btn">Guardar</button>
                </div>
            </form>
        `
        document.body.appendChild(modal)

        const closeModal = () => {
            overlay.classList.remove('active')
            modal.classList.remove('active')
        }

        document.getElementById('p-close-modal-x').onclick = closeModal
        overlay.onclick = closeModal

        const form = modal.querySelector('#p-profile-form')
        form.onsubmit = async (e) => {
            e.preventDefault()
            await savePortalProfile()
        }
    }

    async function openPortalModal(mode = 'edit') {
        injectPortalModal()
        const user = getStoredUser()
        if (!user) return

        const overlay = document.getElementById(OVERLAY_ID)
        const modal = document.getElementById(MODAL_ID)
        const title = document.getElementById('p-modal-title')
        const saveBtn = document.getElementById('p-save-btn')
        const isView = mode === 'view'

        title.textContent = isView ? 'Ver usuario' : 'Editar usuario'
        saveBtn.style.display = isView ? 'none' : 'block'

        // Llenar y bloquear/desbloquear campos
        const fields = [
            'p-first_name', 'p-last_name', 'p-email', 'p-phone',
            'p-password', 'p-confirm-password'
        ]

        fields.forEach(id => {
            const el = document.getElementById(id)
            if (el) el.disabled = isView
        })

        document.getElementById('p-first_name').value = user.first_name || ''
        document.getElementById('p-last_name').value = user.last_name || ''
        document.getElementById('p-national_id').value = user.national_id || ''
        document.getElementById('p-email').value = user.email || ''
        document.getElementById('p-phone').value = user.phone || ''
        document.getElementById('p-password').value = isView ? '********' : ''
        document.getElementById('p-confirm-password').value = isView ? '********' : ''

        // El campo Rol y Cédula siempre están bloqueados para este rol, pero aseguramos estado
        document.getElementById('p-national_id').disabled = true

        const roleSelect = document.getElementById('p-role')
        roleSelect.disabled = true
        roleSelect.innerHTML = `<option value="${user.role_id}">${user.role_name || user.role?.role_name || 'Control de Estudios'}</option>`

        overlay.classList.add('active')
        modal.classList.add('active')
    }

    async function savePortalProfile() {
        const user = getStoredUser()
        const saveBtn = document.getElementById('p-save-btn')

        const password = document.getElementById('p-password').value
        const confirm = document.getElementById('p-confirm-password').value

        if (password && password.length < 6) return alert('La contraseña debe tener al menos 6 caracteres')
        if (password !== confirm) return alert('Las contraseñas no coinciden')

        saveBtn.disabled = true
        saveBtn.textContent = 'Guardando...'

        const payload = {
            first_name: document.getElementById('p-first_name').value,
            last_name: document.getElementById('p-last_name').value,
            email: document.getElementById('p-email').value,
            phone: document.getElementById('p-phone').value
        }
        if (password) payload.password = password

        try {
            const userId = user.id || user.user_id
            const response = await fetch(`${API_BASE}/update/${userId}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json', ...getAuthHeaders() },
                body: JSON.stringify(payload)
            })

            const data = await response.json()
            if (!response.ok) throw new Error(data.error || 'Error al actualizar')

            // Actualizar localmente
            const updatedUser = { ...user, ...payload }
            localStorage.setItem('sigra_user', JSON.stringify(updatedUser))
            setProfileUI()

            alert('Perfil actualizado con éxito')
            document.getElementById(OVERLAY_ID).classList.remove('active')
            document.getElementById(MODAL_ID).classList.remove('active')
        } catch (error) {
            alert(error.message)
        } finally {
            saveBtn.disabled = false
            saveBtn.textContent = 'Guardar'
        }
    }

    async function handleProfileAction(action) {
        if (action === 'logout') {
            await logoutUser()
            return
        }

        if (action === 'view') {
            openPortalModal('view')
            return
        }

        if (action === 'edit') {
            openPortalModal('edit')
            return
        }
    }

    if (profileBtn) {
        profileBtn.addEventListener('click', (e) => {
            e.stopPropagation();
            toggleProfileDropdown();
        })
    }

    document.addEventListener('click', (evt) => {
        if (profileDropdown && profileBtn && !profileDropdown.contains(evt.target) && !profileBtn.contains(evt.target)) {
            toggleProfileDropdown(false)
        }
    })

    if (profileDropdown) {
        profileDropdown.addEventListener('click', (evt) => {
            const item = evt.target.closest('[data-profile-action]')
            if (!item) return
            const action = item.dataset.profileAction
            handleProfileAction(action)
            toggleProfileDropdown(false)
        })
    }

    setProfileUI()
})
