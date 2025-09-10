/**
 * Servicio para manejar operaciones HTTP con la API de calificaciones
 * Proporciona funciones para realizar operaciones CRUD con manejo de errores y normalización de datos
 */
const BASE_URL = import.meta.env.VITE_API_URL;
const RESOURCE = `${BASE_URL}/calificaciones`;

function ensureCsrf() {
  return Promise.resolve();
}

function commonHeaders() {
  const headers = {
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest'
  };
  const token = localStorage.getItem('token');
  if (token) headers['Authorization'] = `Bearer ${token}`;
  return headers;
}

/**
 * Normaliza documentos de la API eliminando campos internos de MongoDB
 * @param {Object} doc - Documento a normalizar
 * @returns {Object} Documento normalizado con id en lugar de _id
 */
function normalizeDoc(doc) {
  if (!doc) return doc;
  const id = doc._id || doc.id;
  const { _id, __v, ...rest } = doc;
  return { id, ...rest };
}

/**
 * Maneja respuestas HTTP y normaliza el formato de retorno
 * @param {Response} res - Respuesta HTTP del fetch
 * @returns {Object} Objeto con success, status, payload y message
 */
async function handleResponse(res) {
  let data = null;
  try {
    data = await res.json();
  } catch (_) {
    // sin body
  }

  if (!res.ok) {
    const message = data?.error || data?.message || (res.status === 429 ? 'Demasiadas solicitudes' : 'Error de servidor');
    return { success: false, status: res.status, payload: null, message };
  }

  let payload = data;
  if (Array.isArray(data)) {
    payload = data.map(normalizeDoc);
  } else if (data && typeof data === 'object') {
    payload = normalizeDoc(data);
  }
  return { success: true, status: res.status, payload, message: 'OK' };
}

async function httpGet(url) {
  try {
    await ensureCsrf();
    const res = await fetch(url, { method: 'GET', headers: commonHeaders() });
    return await handleResponse(res);
  } catch (e) {
    return { success: false, status: 0, payload: null, message: e.message || 'Error de red' };
  }
}

async function httpPost(url, body) {
  try {
    await ensureCsrf();
    const res = await fetch(url, { method: 'POST', headers: commonHeaders(), body: JSON.stringify(body) });
    return await handleResponse(res);
  } catch (e) {
    return { success: false, status: 0, payload: null, message: e.message || 'Error de red' };
  }
}

async function httpPut(url, body) {
  try {
    await ensureCsrf();
    const res = await fetch(url, { method: 'PUT', headers: commonHeaders(), body: JSON.stringify(body) });
    return await handleResponse(res);
  } catch (e) {
    return { success: false, status: 0, payload: null, message: e.message || 'Error de red' };
  }
}

async function httpDelete(url) {
  try {
    await ensureCsrf();
    const res = await fetch(url, { method: 'DELETE', headers: commonHeaders() });
    return await handleResponse(res);
  } catch (e) {
    return { success: false, status: 0, payload: null, message: e.message || 'Error de red' };
  }
}

/**
 * Servicio exportado con operaciones CRUD para calificaciones
 */
export const assistanceService = {
  list: () => httpGet(RESOURCE),
  getById: (id) => httpGet(`${RESOURCE}/${id}`),
  create: (payload) => httpPost(RESOURCE, payload),
  update: (id, payload) => httpPut(`${RESOURCE}/${id}`, payload),
  remove: (id) => httpDelete(`${RESOURCE}/${id}`)
};