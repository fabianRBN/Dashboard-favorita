// NOTE: This is where you could wire up your own data providers:
// GraphQL, Databases, REST APIs, CDNs, proxies, S3, Matrix, IPFS, you name itâ€¦

import { API_URL, REMOTE_ASSETS_BASE_URL } from '../app/constants.js';
import type { Endpoint, EndpointsToOperations } from '../types/entities.js';

export async function fetchData<Selected extends Endpoint>(endpoint: Selected) {
	const apiEndpoint = `${API_URL}${endpoint}`;

	const datos = [
		{
			id: 1,
			nombre: 'Fundación Esperanza ',
			ruc: '1790012345001',
			responsable: 'Juan Pérez',
			ejes: [
				{ id: 1, nombre: 'Salud' },
				{ id: 4, nombre: 'Inclusión Social' },
			],
			facturas: [
				{ id: 1, estado: 'Pagada', cantidad: 1500.5, fecha_pago: '2025-09-15' },
			],
			kpis: [
				{
					id: 1,
					nombre: 'Número de beneficiarios',
					meta: 1000,
					meta_cumplida: 750,
				},
				{ id: 4, nombre: 'Nivel de satisfacción', meta: 5, meta_cumplida: 4 },
			],
			evidencias: [
				{
					id: 1,
					documento: 'DOC-1001',
					id_proyecto: 101,
					descripcion: 'Informe de avance mensual',
				},
				{
					id: 4,
					documento: 'DOC-1004',
					id_proyecto: 104,
					descripcion: 'Encuesta de satisfacción',
				},
			],
		},
		{
			id: 2,
			nombre: 'ONG Ambiental Verde',
			ruc: '1790012345002',
			responsable: 'Ana Gómez',
			ejes: [
				{ id: 3, nombre: 'Medio Ambiente' },
				{ id: 10, nombre: 'Empoderamiento' },
			],
			facturas: [
				{
					id: 2,
					estado: 'Pendiente',
					cantidad: 2300.0,
					fecha_pago: '2025-09-20',
				},
			],
			kpis: [
				{
					id: 2,
					nombre: 'Cantidad de proyectos completados',
					meta: 10,
					meta_cumplida: 7,
				},
				{
					id: 6,
					nombre: 'Impacto ambiental reducido',
					meta: 30,
					meta_cumplida: 25,
				},
			],
			evidencias: [
				{
					id: 2,
					documento: 'DOC-1002',
					id_proyecto: 102,
					descripcion: 'Fotografía de la actividad',
				},
				{
					id: 6,
					documento: 'DOC-1006',
					id_proyecto: 106,
					descripcion: 'Reporte de impacto ambiental',
				},
			],
		},
		{
			id: 3,
			nombre: 'Educación para Todos',
			ruc: '1790012345003',
			responsable: 'Luis Martínez',
			ejes: [{ id: 2, nombre: 'Educación' }],
			facturas: [
				{
					id: 3,
					estado: 'Pagada',
					cantidad: 1200.75,
					fecha_pago: '2025-09-10',
				},
			],
			kpis: [
				{
					id: 3,
					nombre: 'Porcentaje de cumplimiento de metas',
					meta: 90,
					meta_cumplida: 65,
				},
				{
					id: 7,
					nombre: 'Tasa de asistencia escolar',
					meta: 95,
					meta_cumplida: 80,
				},
			],
			evidencias: [
				{
					id: 3,
					documento: 'DOC-1003',
					id_proyecto: 103,
					descripcion: 'Reporte de indicadores finales',
				},
				{
					id: 7,
					documento: 'DOC-1007',
					id_proyecto: 107,
					descripcion: 'Registro de asistencia escolar',
				},
			],
		},
	];

	if (datos.toString() == 'products') {
		//Retorname los datos del array como json
		console.log(datos);
		return Promise.resolve(datos);
	}
	console.info(`Fetching ${apiEndpoint}â€¦`);
	return fetch(apiEndpoint)
		.then(
			(r) =>
				r.json() as unknown as Promise<
					ReturnType<EndpointsToOperations[Selected]>
				>,
		)
		.catch((e) => {
			console.error(e);
			throw Error('Invalid API data!');
		});
}

// NOTE: These helpers are useful for unifying paths, app-wide
export function url(path = '') {
	return `${import.meta.env.SITE}${import.meta.env.BASE_URL}${path}`;
}

// TODO: Remove old local assets from git history (to make cloning snappier).
export function asset(path: string) {
	// NOTE: Fetching remote assets from the Hugo admin dashboard Vercel dist.
	return `${REMOTE_ASSETS_BASE_URL}/${path}`;
}
